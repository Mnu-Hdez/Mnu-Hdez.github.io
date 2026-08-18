# Solución del error 404 en GitHub Pages

## Diagnóstico confirmado

El repositorio `Mnu-Hdez/Mnu-Hdez.github.io` todavía **no tiene GitHub Pages configurado** y su raíz no contiene una landing estática compilada. Por eso `https://mnu-hdez.github.io/` devuelve 404. No es un error del diseño: el código y las cuatro imágenes requeridas sí están presentes y la compilación del repositorio produce la landing correcta.

> No selecciones **Deploy from a branch → main → /(root)** para el código fuente. En esa rama, `index.html` está dentro de `client/` y todavía necesita que Vite lo compile.

## Opción recomendada: GitHub Actions

Usa **`manu-portfolio-source-corrected.zip`**. Este ZIP contiene el código fuente completo y el archivo que faltaba: `.github/workflows/deploy-pages.yml`. Extrae su contenido directamente en la raíz de tu repositorio local; no lo dejes dentro de otra carpeta.

La raíz del repositorio debe tener exactamente esta estructura relevante:

| Ruta | Debe existir | Para qué sirve |
|---|---:|---|
| `.github/workflows/deploy-pages.yml` | Sí | Instala dependencias, ejecuta `pnpm build:pages` y publica `dist/`. |
| `client/index.html` | Sí | Plantilla HTML que Vite transforma en el `index.html` final. |
| `client/src/pages/Home.tsx` | Sí | Contenido y estructura de la landing. |
| `client/src/index.css` | Sí | Diseño, responsive y animaciones. |
| `client/public/assets/` | Sí | Logo e imágenes WebP de la landing. |
| `package.json` y `pnpm-lock.yaml` | Sí | Dependencias y scripts de compilación reproducibles. |
| `vite.config.ts` | Sí | Indica a Vite cómo generar el sitio para GitHub Pages. |
| `dist/` | No hace falta subirlo | GitHub Actions lo crea automáticamente. |
| `node_modules/` | No hace falta subirlo | GitHub Actions instala las dependencias. |

Haz `commit` y `push` de los archivos anteriores a `main` con los siguientes comandos desde la raíz del repositorio:

```bash
git add -A
git commit -m "Configurar GitHub Pages"
git push origin main
```

Después abre **GitHub → Mnu-Hdez.github.io → Settings → Pages**. En **Build and deployment**, cambia **Source** a **GitHub Actions**. Ve a la pestaña **Actions** y abre el flujo **Publicar landing en GitHub Pages**. Debes ver `build` y `deploy` en verde. Al terminar, GitHub mostrará la URL publicada en Settings → Pages. GitHub documenta que un proyecto con proceso de build debe publicarse mediante un workflow y que el workflow sube el artefacto estático resultante.[1] [2]

## Opción alternativa: publicar los archivos ya construidos

Usa **`manu-portfolio-static-ready.zip`** si no quieres configurar Node.js ni GitHub Actions. Este ZIP ya contiene la landing terminada. Extrae **el contenido del ZIP**, donde `index.html` queda en la raíz, en una rama llamada `gh-pages`. En GitHub, abre **Settings → Pages** y selecciona **Deploy from a branch → gh-pages → /(root)**.

| Verificación antes de guardar | Debe ser cierto |
|---|---:|
| `index.html` aparece en la raíz de `gh-pages` | Sí |
| La carpeta `assets/` aparece junto a `index.html` | Sí |
| `assets/manu-mark.webp` existe | Sí |
| `assets/hero-infrastructure.webp` existe | Sí |
| Se ha seleccionado la rama `gh-pages`, no `main` | Sí |

Esta alternativa publica la landing actual, pero cuando cambies el contenido tendrás que volver a generar y subir los archivos estáticos. La opción con GitHub Actions es la adecuada para mantener el portfolio a largo plazo.

## Comprobación final

Cuando el despliegue termine, abre `https://mnu-hdez.github.io/` en una pestaña privada o recarga forzada (`Ctrl+F5` / `Cmd+Shift+R`). Si GitHub Actions muestra el despliegue en verde pero la URL aún da 404, confirma que el repositorio sigue llamándose exactamente **`Mnu-Hdez.github.io`** y que pertenece al usuario **`Mnu-Hdez`**.

## Referencias

[1]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site "GitHub Docs — Configuring a publishing source"

[2]: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages "GitHub Docs — Using custom workflows with GitHub Pages"
