# Reparación del despliegue en GitHub Pages

## Diagnóstico confirmado

Los archivos de la landing, sus imágenes y su configuración de compilación son correctos. El 404 de `https://mnu-hdez.github.io/` ocurre porque al repositorio remoto le falta el archivo oculto `.github/workflows/deploy-pages.yml`. Sin ese workflow, GitHub Pages no compila Vite ni publica el `index.html` que se genera en `dist/`.

## Método recomendado: publicar desde el código fuente

Descarga el archivo `manu-portfolio-source-corrected.zip` y descomprímelo **sobre la raíz del repositorio local**, no dentro de una carpeta adicional. Debe quedar visible la estructura `.github/workflows/deploy-pages.yml` junto a `package.json`, `client/` y `vite.config.ts`.

Después, desde esa carpeta local, ejecuta:

```bash
git add -A
git commit -m "Corregir publicación de GitHub Pages"
git push origin main
```

En GitHub, abre **Settings → Pages** y selecciona **GitHub Actions** como fuente. En **Actions**, el flujo **Publicar landing en GitHub Pages** debe acabar con los trabajos `build` y `deploy` en verde. Al terminar, `https://mnu-hdez.github.io/` mostrará la landing editorial.

> Si se usa Finder, el explorador de Windows o la subida web de GitHub, confirma explícitamente que la carpeta `.github` se incluye: por comenzar por punto puede permanecer oculta y fue el archivo que faltó en el repositorio actual.

## Método alternativo: publicar los archivos ya compilados

El archivo `manu-portfolio-static-ready.zip` contiene únicamente el resultado de `pnpm build:pages`. Su archivo `index.html` está en la raíz del ZIP. Puedes extraer ese contenido en la raíz de una rama dedicada, como `gh-pages`, y en **Settings → Pages** seleccionar **Deploy from a branch → gh-pages → /(root)**. Este método publica el resultado actual, pero no actualiza el sitio automáticamente al modificar el código.
