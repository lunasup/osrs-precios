/* Selector de idioma del sitio OSRS precios: es (por defecto), en, ar (árabe de Egipto).
   Solo traduce la interfaz (navegación, buscador, pie, intros, tarjetas).
   Los precios y los nombres de servicios quedan como los publica cada servidor. */
var I18N = {
  es: {
    brand: "Comparación de precios OSRS",
    nav_inicio: "Inicio",
    nav_propuesta: "Propuesta",
    search_label: "Buscar en esta página:",
    search_placeholder: "Ej.: SOTE, quiver, synapse…",
    search_noresults: "Sin resultados para esa búsqueda.",
    footer: "Precios tal como los publica cada servidor (extracción del 9 de noviembre de 2026; addenda hasta el 19 de noviembre de 2026). Sin afiliación con ninguno de los servidores. Los precios pueden cambiar; verifica siempre en el servidor antes de cotizar.",
    h1_index: "Comparación de precios OSRS",
    h1_propuesta: "Propuesta intermedia",
    title_index: "Comparación de precios OSRS — Machines vs 6 servidores",
    title_machines: "OSRS Machines — Lista de precios completa",
    title_tons: "TONS of XP — Precios",
    title_neer: "Neer Death — Precios",
    title_bald: "Bald — Precios",
    title_lorax: "Lorax Services — Precios",
    title_elite: "Elite Services — Precios",
    title_kings: "Kings Boosting — Precios",
    title_propuesta: "Propuesta intermedia — Precios Machines vs 6 servidores",
    intro_p1: "Comparación de precios de servicios de Old School RuneScape entre <strong>OSRS Machines</strong> y seis servidores de boosting (TONS of XP, Neer Death, Bald, Lorax, Elite Services y Kings Boosting), extraídos el <strong>9 de noviembre de 2026</strong>. La propuesta intermedia es el punto medio entre el precio actual de Machines y la mediana de los competidores que publican cada servicio: ni el más barato ni el más caro, un precio justo para el cliente.",
    intro_p2: "Los precios están tal como los publica cada servidor, sin recalcular. Las páginas de cada servidor incluyen un buscador para filtrar la lista. Las consultas en vivo (ítems garantizados, chinchompas, Sailing…) están en la página de la propuesta, con addenda del 12 al 18 de noviembre de 2026.",
    h2_propuestos: "Precios intermedios propuestos",
    link_propuesta: "Ver la propuesta completa →",
    h2_servidores: "Servidores",
    card_machines: "Lista completa de precios (servidor de referencia)",
    card_tons: "Precios del servidor 1",
    card_neer: "Precios del servidor 2",
    card_bald: "Precios del servidor 3",
    card_lorax: "Precios del servidor 4",
    card_elite: "Precios del servidor 5",
    card_kings: "Precios del servidor 6",
    card_propuesta: "Precios intermedios propuestos para Machines + addenda",
    prop_fecha: "Fecha: lunes 2026-11-09, 09:06 Caracas. Servidores comparados: TONS of XP, Neer Death (NDS), Bald / Bald.gg, Lorax Services, Elite Services, Kings Boosting. Precios Machines de <code>osrs-machines-precios-completos.md</code>. Conversión NDS/Elite: 1M = $0.30 (tasa de la usuaria); Lorax publica en $ con tasa interna 1M = $0.19. Kings: todo en USD, del canal #prices.",
    prop_metodo_h: "Método (el mismo de la propuesta de 5 servidores, a validar por la usuaria)",
    prop_metodo_p: "Precio intermedio = punto medio entre el precio actual de Machines y la <strong>mediana</strong> de los competidores que publican ese servicio. Con 6 valores la mediana es el promedio de los dos centrales; con 5, el valor central. Las medianas se recalculan cuando entren los servidores 7–10."
  },
  en: {
    brand: "OSRS Price Comparison",
    nav_inicio: "Home",
    nav_propuesta: "Proposal",
    search_label: "Search this page:",
    search_placeholder: "E.g.: SOTE, quiver, synapse…",
    search_noresults: "No results for this search.",
    footer: "Prices exactly as published by each server (extracted 9 November 2026; addenda up to 19 November 2026). Not affiliated with any of the servers. Prices may change; always verify on the server before quoting.",
    h1_index: "OSRS Price Comparison",
    h1_propuesta: "Intermediate Proposal",
    title_index: "OSRS Price Comparison — Machines vs 6 Servers",
    title_machines: "OSRS Machines — Full Price List",
    title_tons: "TONS of XP — Prices",
    title_neer: "Neer Death — Prices",
    title_bald: "Bald — Prices",
    title_lorax: "Lorax Services — Prices",
    title_elite: "Elite Services — Prices",
    title_kings: "Kings Boosting — Prices",
    title_propuesta: "Intermediate Proposal — Machines Prices vs 6 Servers",
    intro_p1: "Price comparison for Old School RuneScape services between <strong>OSRS Machines</strong> and six boosting servers (TONS of XP, Neer Death, Bald, Lorax, Elite Services and Kings Boosting), extracted on <strong>9 November 2026</strong>. The intermediate proposal is the midpoint between Machines' current price and the median of the competitors that publish each service: neither the cheapest nor the most expensive — a fair price for the client.",
    intro_p2: "Prices are shown exactly as each server publishes them, without recalculation. Each server's page has a search box to filter the list. Live lookups (guaranteed items, chinchompas, Sailing…) are on the proposal page, with addenda from 12 to 18 November 2026.",
    h2_propuestos: "Proposed Intermediate Prices",
    link_propuesta: "See the full proposal →",
    h2_servidores: "Servers",
    card_machines: "Full price list (reference server)",
    card_tons: "Prices from server 1",
    card_neer: "Prices from server 2",
    card_bald: "Prices from server 3",
    card_lorax: "Prices from server 4",
    card_elite: "Prices from server 5",
    card_kings: "Prices from server 6",
    card_propuesta: "Proposed intermediate prices for Machines + addenda",
    prop_fecha: "Date: Monday 9 November 2026, 09:06 Caracas. Servers compared: TONS of XP, Neer Death (NDS), Bald / Bald.gg, Lorax Services, Elite Services, Kings Boosting. Machines prices from <code>osrs-machines-precios-completos.md</code>. NDS/Elite conversion: 1M = $0.30 (the user's rate); Lorax publishes in $ with an internal rate of 1M = $0.19. Kings: all in USD, from the #prices channel.",
    prop_metodo_h: "Method (same as the 5-server proposal, to be validated by the user)",
    prop_metodo_p: "Intermediate price = the midpoint between Machines' current price and the <strong>median</strong> of the competitors that publish that service. With 6 values the median is the average of the two middle ones; with 5, the middle value. Medians are recalculated when servers 7–10 are added."
  },
  ar: {
    brand: "مقارنة أسعار OSRS",
    nav_inicio: "الرئيسية",
    nav_propuesta: "الاقتراح",
    search_label: "دوّر في الصفحة دي:",
    search_placeholder: "مثال: SOTE, quiver, synapse…",
    search_noresults: "مفيش نتائج للبحث ده.",
    footer: "الأسعار زي ما كل سيرفر ناشرها بالظبط (متاخدة يوم 9 نوفمبر 2026؛ والإضافات لحد 19 نوفمبر 2026). مش تابعين لأي سيرفر منهم. الأسعار ممكن تتغير؛ اتأكد دايمًا من السيرفر قبل ما تسعّر.",
    h1_index: "مقارنة أسعار OSRS",
    h1_propuesta: "الاقتراح الوسيط",
    title_index: "مقارنة أسعار OSRS — Machines مقابل 6 سيرفرات",
    title_machines: "OSRS Machines — قايمة الأسعار الكاملة",
    title_tons: "TONS of XP — الأسعار",
    title_neer: "Neer Death — الأسعار",
    title_bald: "Bald — الأسعار",
    title_lorax: "Lorax Services — الأسعار",
    title_elite: "Elite Services — الأسعار",
    title_kings: "Kings Boosting — الأسعار",
    title_propuesta: "الاقتراح الوسيط — أسعار Machines مقابل 6 سيرفرات",
    intro_p1: "مقارنة أسعار خدمات Old School RuneScape بين <strong>OSRS Machines</strong> و6 سيرفرات بوستينج (TONS of XP, Neer Death, Bald, Lorax, Elite Services و Kings Boosting)، متاخدة يوم <strong>9 نوفمبر 2026</strong>. الاقتراح الوسيط هو النقطة اللي في النص بين سعر Machines الحالي والوسيط (median) بتاع المنافسين اللي ناشرين كل خدمة: لا أرخص سعر ولا أغلى سعر، سعر عادل للعميل.",
    intro_p2: "الأسعار معروضة زي ما كل سيرفر ناشرها بالظبط، من غير ما نعيد حسابها. كل صفحة سيرفر فيها بحث عشان تفلتر القايمة. الاستفسارات المباشرة (الأيتمز المضمونة، الشينشومبا، الـSailing…) موجودة في صفحة الاقتراح، مع إضافات من 12 لحد 18 نوفمبر 2026.",
    h2_propuestos: "الأسعار الوسيطة المقترحة",
    link_propuesta: "شوف الاقتراح كامل ←",
    h2_servidores: "السيرفرات",
    card_machines: "قايمة الأسعار الكاملة (السيرفر المرجعي)",
    card_tons: "أسعار السيرفر 1",
    card_neer: "أسعار السيرفر 2",
    card_bald: "أسعار السيرفر 3",
    card_lorax: "أسعار السيرفر 4",
    card_elite: "أسعار السيرفر 5",
    card_kings: "أسعار السيرفر 6",
    card_propuesta: "الأسعار الوسيطة المقترحة لـMachines + الإضافات",
    prop_fecha: "التاريخ: يوم الاتنين 9 نوفمبر 2026، 09:06 كاراكاس. السيرفرات اللي اتقارنت: TONS of XP, Neer Death (NDS), Bald / Bald.gg, Lorax Services, Elite Services, Kings Boosting. أسعار Machines من <code>osrs-machines-precios-completos.md</code>. التحويل بتاع NDS/Elite: 1M = $0.30 (السعر بتاعها)؛ Lorax بينشر بالدولار بسعر داخلي 1M = $0.19. Kings: كله بالدولار، من قناة #prices.",
    prop_metodo_h: "الطريقة (نفس طريقة اقتراح الـ5 سيرفرات، مستنية تأكيد المستخدمة)",
    prop_metodo_p: "السعر الوسيط = النقطة اللي في النص بين سعر Machines الحالي و<strong>الوسيط (median)</strong> بتاع المنافسين اللي ناشرين الخدمة دي. مع 6 قيم الوسيط بيكون متوسط القيمتين اللي في النص؛ ومع 5 بيكون القيمة اللي في النص. الوسايط بتتحسب من تاني لما السيرفرات 7–10 تدخل."
  }
};

var LANG_KEY = "osrs-lang";

function applyLang(lang) {
  if (!I18N[lang]) lang = "es";
  var dict = I18N[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var v = dict[el.getAttribute("data-i18n")];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
    var v = dict[el.getAttribute("data-i18n-html")];
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    var v = dict[el.getAttribute("data-i18n-placeholder")];
    if (v != null) el.setAttribute("placeholder", v);
  });
  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    var on = b.getAttribute("data-lang") === lang;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function initI18n() {
  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
  applyLang(saved && I18N[saved] ? saved : "es");
  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initI18n);
} else {
  initI18n();
}
