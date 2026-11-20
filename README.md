# Comparación de precios OSRS — Machines vs 6 servidores

Sitio estático (sin dependencias externas) con la comparación de precios
de servicios de Old School RuneScape entre OSRS Machines y seis servidores
de boosting: TONS of XP, Neer Death, Bald, Lorax, Elite Services y Kings
Boosting. Precios extraídos el 9 de noviembre de 2026; la propuesta
intermedia y sus addenda llegan hasta el 18 de noviembre de 2026.

## Archivos

- `index.html` — portada con la tabla de precios intermedios propuestos
- `machines.html` — lista completa de precios de OSRS Machines
- `tons.html`, `neer.html`, `bald.html`, `lorax.html`, `elite.html`,
  `kings.html` — precios de cada servidor competidor
- `propuesta.html` — propuesta intermedia completa
- `style.css` — estilos (tema oscuro, responsive)
- `.nojekyll` — para que GitHub Pages sirva los archivos tal cual
- `build.py` — script que regenera el HTML desde los archivos Markdown
  originales (requiere Python 3 y la librería `markdown`)

## Vista previa local

```bash
cd osrs-precios-site
python3 -m http.server 8000
```

Luego abre http://localhost:8000 en el navegador.

## Publicar en GitHub Pages

1. **Crea un repositorio en GitHub** (por ejemplo `osrs-precios`).
   No hace falta que sea con README ni .gitignore; puede quedar vacío.
2. **Desde esta carpeta, sube los archivos:**

   ```bash
   cd osrs-precios-site
   git init
   git add .
   git commit -m "Sitio de comparación de precios OSRS"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/osrs-precios.git
   git push -u origin main
   ```

   Cambia `TU-USUARIO` y `osrs-precios` por tu usuario y tu repositorio.
3. **Activa GitHub Pages:** en el repositorio, ve a **Settings →
   Pages**, en "Build and deployment" elige **Deploy from a branch**,
   rama **main** y carpeta **/(root)**. Guarda.
4. Espera 1–2 minutos. La página quedará en
   `https://TU-USUARIO.github.io/osrs-precios/`.

> **Nota:** la herramienta `gh` en esta máquina NO tiene sesión iniciada,
> así que el `git push` pedirá tus credenciales de GitHub. Opciones:
> inicia sesión con `gh auth login`, o usa tu usuario y un token
> personal (Personal Access Token) como contraseña cuando Git te lo pida,
> o haz los pasos 1–2 desde tu propia computadora.

## Actualizar los precios

Edita los archivos Markdown originales, vuelve a correr
`build.py` (con la librería `markdown` instalada) y haz commit + push
de los HTML regenerados. El script excluye automáticamente la sección
privada del addendum del 17 de noviembre y cualquier identificador
personal que aparezca en los MD.
