# Portfolio — Frontend

Portfolio personal de **Lucas Camino**, construido con Angular.
Single-page bilingüe (ES/EN), tema dual claro/oscuro, animaciones nivel 2.

## Stack

- **Framework:** Angular 21 — standalone components, signals, zoneless change detection.
- **Estilos:** SCSS modular con CSS custom properties (theming dual).
- **i18n:** `@ngx-translate/core` + `@ngx-translate/http-loader`.
- **Iconos:** `lucide-angular`.
- **Build:** `@angular/build` (esbuild).
- **Hosting:** Netlify.

## Comandos

```bash
npm install           # instala dependencias
npm start             # dev server en http://localhost:4200
npm run build         # build de producción → dist/frontend/browser
npm test              # tests con Vitest
```

## Estructura

```
src/
├── app/
│   ├── core/            servicios singleton (theme, language, contact)
│   ├── shared/          componentes y directivas reutilizables
│   ├── layout/          header, footer
│   ├── features/
│   │   ├── home/        ruta "/" (single-page)
│   │   │   └── sections/  hero, about, soft-skills, stack, projects, experience, contact
│   │   └── project-detail/  ruta "/proyectos/:slug"
│   └── data/            data estática tipada del portfolio
├── styles/              tokens, themes, typography, animations
└── styles.scss          entry global
```

## Theming

Dos temas (`dark` por defecto, `light` opcional). Implementado con CSS custom properties
sobre `:root[data-theme="dark|light"]`. La preferencia se persiste en `localStorage` y un
script en `index.html` aplica el tema antes de hidratar Angular para evitar el flash inicial.

## i18n

Archivos en `public/assets/i18n/{es,en}.json`. Cambio en caliente sin reload.
La preferencia se persiste en `localStorage`; si no hay, se detecta el idioma del navegador.

## Assets que faltan

- `public/assets/cv/lucas-camino-cv.pdf` — CV en PDF.
- `public/assets/images/projects/loki.png` — cover de Loki.
- `public/assets/images/projects/bonvoyage.png` — cover de BonVoyageApp.
- `public/assets/images/projects/mis-finanzas.png` — cover de Mis Finanzas.
- Foto del Hero — reemplazar el placeholder de iniciales "LC" cuando esté disponible.

## Backend de contacto

El formulario apunta a un endpoint propio Spring Boot que se aloja en Render.
Configurar la URL final en `src/app/core/services/contact.service.ts`.
Hay un warm-up automático a `/health` al cargar el portfolio para mitigar el cold start.

## Deploy

Configuración de Netlify en `netlify.toml` (en este directorio).
- Build command: `npm ci && npm run build`
- Publish directory: `frontend/dist/frontend/browser`
- SPA fallback configurado para que Angular Router maneje `/proyectos/:slug`.
