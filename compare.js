/* Búsqueda de comparación en Home: "200 kc bandos" compara el precio del
   servicio entre todos los servidores. Local, sin backend ni IA: lee
   prices-index.json (generado por build_index.py desde los MD).
   El buscador de cada pestaña de servidor sigue filtrando solo su lista. */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.OSRSCompare = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  var SERVERS = ["machines", "tons", "neer", "bald", "lorax", "elite", "kings"];
  var SERVER_LABELS = {
    machines: "Machines", tons: "TONS", neer: "Neer", bald: "Bald",
    lorax: "Lorax", elite: "Elite", kings: "Kings"
  };
  // Divisor para el total: flat y 1-99 ignoran la cantidad.
  var DIVISOR = { kc: 1, each: 1, flat: 0, "1-99": 0, per100: 100, per1000: 1000 };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fmtMoney(v) {
    if (v == null || isNaN(v)) return "";
    if (v >= 1000) {
      return "$" + v.toLocaleString("en-US",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (v >= 1) return "$" + v.toFixed(2);
    var s = v.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
    var dot = s.indexOf(".");
    if (dot === -1) s += ".00";
    else if (s.length - dot - 1 < 2) s += "0";
    return "$" + s;
  }

  /* "200 kc bandos" -> {qty:200, explicitKc:true, tokens:["bandos"]}.
     "prayer 85-99" -> tokens:["prayer"], rangeNote:true.
     "prayer 1-99" -> tokens:["1-99","prayer"]. */
  function parseQuery(raw) {
    var q = " " + String(raw || "").toLowerCase().trim() + " ";
    var qty = null, explicitKc = false, rangeNote = false;
    var tokens = [];
    q = q.replace(/(\d+)\s*[-–—]\s*(\d+)/g, function (m, a, b) {
      if (a === "1" && b === "99") tokens.push("1-99");
      else rangeNote = true;
      return " ";
    });
    var m = q.match(/^\s*(\d[\d,]*)\s*(kc|kills?)?\s*/);
    if (m) {
      qty = parseInt(m[1].replace(/,/g, ""), 10);
      if (m[2]) explicitKc = true;
      q = q.slice(m[0].length);
    }
    q.split(/[^a-z0-9]+/).forEach(function (t) {
      if (t && t !== "kc" && tokens.indexOf(t) === -1) tokens.push(t);
    });
    return { qty: qty, explicitKc: explicitKc, rangeNote: rangeNote,
             tokens: tokens };
  }

  function entryWords(e) {
    var words = [];
    var add = function (s) {
      String(s || "").toLowerCase().split(/[^a-z0-9]+/).forEach(function (w) {
        if (w && words.indexOf(w) === -1) words.push(w);
      });
    };
    add(e.name);
    (e.aliases || []).forEach(add);
    return words;
  }

  function matchOnce(entries, parsed) {
    var out = [];
    var catRank = { boss: 0, raid: 1, quest: 2, skill: 3, diary: 4,
                    minigame: 5, "guaranteed-item": 6, other: 7 };
    entries.forEach(function (e) {
      if (parsed.explicitKc && e.unit !== "kc") return;
      var words = entryWords(e);
      var ok = true, score = 0;
      parsed.tokens.forEach(function (t) {
        if (t === "1-99") {
          if (e.unit !== "1-99") { ok = false; return; }
          score += 10;
          return;
        }
        var hit = null;
        for (var i = 0; i < words.length; i++) {
          if (words[i].indexOf(t) !== -1) { hit = words[i]; break; }
        }
        if (hit === null) { ok = false; return; }
        score += (hit === t) ? 10 : 4;
      });
      if (ok) {
        // El nombre entero coincide con la consulta ("firecape" -> Firecape).
        var nameSquash = e.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (nameSquash === parsed.tokens.join("")) score += 20;
        out.push({ entry: e, score: score });
      }
    });
    out.sort(function (a, b) {
      return b.score - a.score ||
        (catRank[a.entry.category] - catRank[b.entry.category]) ||
        a.entry.name.localeCompare(b.entry.name);
    });
    return out.map(function (c) { return c.entry; });
  }

  function matchEntries(entries, parsed) {
    if (!parsed.tokens.length) return [];
    var found = matchOnce(entries, parsed);
    if (found.length || !parsed.explicitKc) return found;
    // Con "kc" explícito y sin coincidencias por KC, probar sin el filtro.
    return matchOnce(entries,
      { qty: parsed.qty, explicitKc: false,
        rangeNote: parsed.rangeNote, tokens: parsed.tokens });
  }

  function totalFor(value, unit, qty) {
    if (value == null) return null;
    if (unit === "flat" || unit === "1-99") return value;
    if (qty == null) return null;
    if (unit === "per100") return value * qty / 100;
    if (unit === "per1000") return value * qty / 1000;
    return value * qty; // kc, each
  }

  function unitLabel(entry, t) {
    switch (entry.unit) {
      case "kc": return "KC";
      case "each": return t.cmp_each || "each";
      case "flat": return t.cmp_flat || "one-off price";
      case "1-99": return "1–99";
      case "per100": return "per 100";
      case "per1000": return "per 1,000";
      default: return entry.unit;
    }
  }

  function perUnitText(entry, price, t) {
    if (price == null) return "—";
    var v = fmtMoney(price.value);
    if (entry.unit === "flat" || entry.unit === "1-99") return v;
    if (entry.unit === "per100") return v + " / 100";
    if (entry.unit === "per1000") return v + " / 1,000";
    return v + " / " + unitLabel(entry, t);
  }

  function renderEntry(entry, parsed, t) {
    var qty = parsed.qty;
    var totals = {};
    var cheapest = null;
    SERVERS.forEach(function (s) {
      var p = entry.prices[s];
      var tot = p ? totalFor(p.value, entry.unit, qty) : null;
      totals[s] = tot;
      if (tot != null && (cheapest == null || tot < cheapest)) cheapest = tot;
    });
    var sub = qty != null
      ? (t.cmp_qty || "Quantity") + ": " + qty.toLocaleString("en-US") +
        " (" + esc(unitLabel(entry, t)) + ")"
      : esc(unitLabel(entry, t));
    var html = "<h3>" + esc(entry.name) + "</h3>";
    html += "<p class=\"comparar-sub\">" + sub + "</p>";
    if (qty == null && (entry.unit === "kc" || entry.unit === "each" ||
        entry.unit === "per100" || entry.unit === "per1000")) {
      html += "<p class=\"comparar-sub\">" + esc(t.cmp_add_qty || "") + "</p>";
    }
    html += "<table><thead><tr><th>" + esc(t.cmp_server || "Server") +
      "</th><th>" + esc(t.cmp_per_unit || "Per-unit price") +
      "</th><th>" + esc(t.cmp_total || "Total") +
      "</th><th>" + esc(t.cmp_note || "Note") + "</th></tr></thead><tbody>";
    SERVERS.forEach(function (s) {
      var p = entry.prices[s];
      var tot = totals[s];
      var cls = (tot != null && tot === cheapest) ? " class=\"cheapest\"" : "";
      var badge = (tot != null && tot === cheapest)
        ? " <span class=\"etiqueta-barato\">★ " + esc(t.cmp_cheapest || "Cheapest") + "</span>"
        : "";
      html += "<tr" + cls + "><td>" + esc(SERVER_LABELS[s]) + badge + "</td>";
      if (p == null) {
        html += "<td>—</td><td>—</td><td>" + esc(t.cmp_notlisted || "Not listed") + "</td>";
      } else {
        html += "<td>" + esc(perUnitText(entry, p, t)) + "</td>";
        html += "<td>" + (tot == null ? "—" : esc(fmtMoney(tot))) + "</td>";
        html += "<td>" + esc(p.note || "") + "</td>";
      }
      html += "</tr>";
    });
    html += "</tbody></table>";
    return html;
  }

  function renderPickList(matches, t) {
    var html = "<p class=\"comparar-sub\">" + esc(t.cmp_pick || "") + "</p>";
    html += "<div class=\"comparar-lista\">";
    matches.slice(0, 10).forEach(function (e) {
      var catKey = "cmp_cat_" +
        (e.category === "guaranteed-item" ? "guaranteed" : e.category);
      var cat = t[catKey] || e.category;
      html += "<button type=\"button\" data-pick-id=\"" + esc(e.id) + "\">" +
        esc(e.name) + " <span>" + esc(cat) + "</span></button>";
    });
    html += "</div>";
    return html;
  }

  /* ---- Pegamento con el DOM (solo en el navegador) ---- */
  function initCompare() {
    if (typeof document === "undefined") return;
    var input = document.getElementById("buscar");
    var panel = document.getElementById("comparar");
    if (!input || !panel) return;
    var state = { entries: null, failed: false, pickedId: null };

    function lang() {
      return document.documentElement.lang || "es";
    }
    function dict() {
      var d = (typeof window !== "undefined" && window.I18N) || {};
      return d[lang()] || d.es || {};
    }
    function rerender() {
      var t = dict();
      var parsed = parseQuery(input.value);
      if (!parsed.tokens.length) {
        panel.innerHTML = "";
        panel.hidden = true;
        return;
      }
      panel.hidden = false;
      if (state.failed) {
        panel.innerHTML = "<p>" + esc(t.cmp_failed || "") + "</p>";
        return;
      }
      if (!state.entries) {
        panel.innerHTML = "<p>" + esc(t.cmp_loading || "") + "</p>";
        return;
      }
      var matches = matchEntries(state.entries, parsed);
      if (!matches.length) {
        panel.innerHTML = "<p>" + esc(t.search_noresults || "") + "</p>";
        return;
      }
      var html = "";
      if (parsed.rangeNote) {
        html += "<p class=\"comparar-sub\">" + esc(t.cmp_range_note || "") + "</p>";
      }
      if (matches.length === 1) {
        html += renderEntry(matches[0], parsed, t);
      } else if (parsed.rangeNote) {
        // Rango de nivel (p. ej. "prayer 85-99"): la respuesta es el
        // total 1–99 de la skill, no una lista de variantes.
        var skills = matches.filter(function (e) { return e.unit === "1-99"; });
        if (skills.length === 1) {
          html += renderEntry(skills[0], parsed, t);
        } else if (state.pickedId &&
                   matches.some(function (e) { return e.id === state.pickedId; })) {
          var pickedR = null;
          matches.forEach(function (e) { if (e.id === state.pickedId) pickedR = e; });
          html += renderEntry(pickedR, parsed, t);
          html += renderPickList(matches, t);
        } else {
          html += renderPickList(matches, t);
        }
      } else if (state.pickedId &&
                 matches.some(function (e) { return e.id === state.pickedId; })) {
        var picked = null;
        matches.forEach(function (e) { if (e.id === state.pickedId) picked = e; });
        html += renderEntry(picked, parsed, t);
        html += renderPickList(matches, t);
      } else {
        html += renderPickList(matches, t);
      }
      panel.innerHTML = html;
    }

    if (typeof fetch !== "undefined") {
      fetch("prices-index.json")
        .then(function (r) { return r.json(); })
        .then(function (data) {
          state.entries = data.entries || [];
          rerender();
        })
        .catch(function () { state.failed = true; rerender(); });
    } else {
      state.failed = true;
    }
    input.addEventListener("input", function () {
      state.pickedId = null;
      rerender();
    });
    panel.addEventListener("click", function (ev) {
      var b = ev.target && ev.target.closest
        ? ev.target.closest("[data-pick-id]") : null;
      if (b) {
        state.pickedId = b.getAttribute("data-pick-id");
        rerender();
      }
    });
    if (typeof window !== "undefined" && typeof window.applyLang === "function") {
      var _applyLang = window.applyLang;
      window.applyLang = function (lang) {
        _applyLang(lang);
        rerender();
      };
    }
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initCompare);
    } else {
      initCompare();
    }
  }

  return {
    parseQuery: parseQuery,
    matchEntries: matchEntries,
    totalFor: totalFor,
    fmtMoney: fmtMoney,
    renderEntry: renderEntry,
    renderPickList: renderPickList,
    SERVERS: SERVERS
  };
});
