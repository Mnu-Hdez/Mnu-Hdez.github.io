# Diagnóstico de GitHub Pages

## Hallazgos verificados

El 16 de agosto de 2026 se comprobó que `https://mnu-hdez.github.io/` responde con el 404 estándar de GitHub Pages. El repositorio público `Mnu-Hdez/Mnu-Hdez.github.io` contiene código fuente y el script `build:pages`, pero no contiene el archivo `.github/workflows/deploy-pages.yml` que genera y publica la carpeta `dist/`.

Los cuatro recursos WebP requeridos por la landing —logotipo, hero, geometría de red y detalle de operación— están presentes en `client/public/assets/`. También se confirmó que `client/src/pages/Home.tsx` referencia esos activos mediante `import.meta.env.BASE_URL`. Por tanto, el diseño y los activos son correctos; el error es exclusivamente de publicación.

## Causa principal

GitHub Pages está intentando servir archivos sin que exista una compilación estática publicada. Un proyecto Vite/React no expone un `index.html` final en la raíz del repositorio: necesita ejecutar `pnpm build:pages` y publicar el resultado generado en `dist/` mediante GitHub Actions.

## Corrección necesaria

Se debe subir la estructura completa del proyecto —incluida la carpeta oculta `.github/`— y seleccionar **GitHub Actions** como fuente en **Settings → Pages**. El workflow incluido compilará y entregará `dist/` automáticamente tras un `push` a `main`.
