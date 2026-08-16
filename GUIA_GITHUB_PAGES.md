# Guía de arquitectura y publicación en GitHub Pages

**Proyecto:** Portfolio de Manu H.  
**Tecnología:** React, TypeScript, Vite, Tailwind CSS y Framer Motion  
**Modelo de publicación:** sitio estático construido por GitHub Actions y servido desde GitHub Pages

## 1. Qué se ha adaptado

Esta landing ya no necesita un servidor de Node.js para publicarse. GitHub Pages solo recibe el resultado estático de la compilación: archivos HTML, CSS, JavaScript, imágenes y tipografías. Vite crea ese resultado en `dist/`, y el flujo de GitHub Actions lo publica automáticamente cuando se hace `push` a la rama `main`.[1] [2]

> La regla más importante es sencilla: **se edita el código fuente; nunca se edita `dist/` a mano**. El directorio `dist/` se vuelve a generar de cero cada vez que se compila la aplicación.

| Cambio aplicado | Motivo | Resultado práctico |
|---|---|---|
| Script `build:pages` | Separar la compilación estática de la vista previa local | Genera solo los archivos necesarios para Pages |
| Variable `VITE_BASE_PATH` | Resolver correctamente las rutas cuando el sitio vive bajo `/<repositorio>/` | Imágenes, CSS y JavaScript cargan sin rutas rotas |
| Recursos en `client/public/assets/` | El hosting estático debe incluir las imágenes junto al código publicado | La web no depende de servicios externos de desarrollo |
| Flujo `.github/workflows/deploy-pages.yml` | Automatizar instalación, comprobación, compilación y publicación | Cada `push` a `main` actualiza la web |
| Archivo `.nojekyll` | Indicar que el contenido es un bundle estático y no una página Jekyll | Evita procesado no necesario de los activos |

## 2. Arquitectura general

La aplicación usa una arquitectura de **cliente estático**. React construye la interfaz dentro del navegador y Vite transforma el código fuente en archivos optimizados. No hay base de datos, rutas de API, autenticación ni secretos de servidor; por ello GitHub Pages es adecuado para este portfolio.

```text
Código fuente (React + TypeScript + CSS)
                │
                ▼
      Vite: pnpm build:pages
                │
                ▼
  dist/ (HTML + CSS + JS + imágenes WebP)
                │
                ▼
 GitHub Actions: upload-pages-artifact
                │
                ▼
      GitHub Pages: web pública
```

| Capa | Ubicación principal | Función |
|---|---|---|
| Entrada HTML | `client/index.html` | Crea el documento HTML base, el contenedor `#root`, el título, la descripción y el favicon. |
| Arranque de React | `client/src/main.tsx` | Monta React dentro de `#root` para que la aplicación sea visible. |
| Aplicación y rutas | `client/src/App.tsx` | Activa los proveedores globales y declara que la página principal se muestra en la ruta `/`. |
| Landing y contenido | `client/src/pages/Home.tsx` | Contiene las secciones, textos, enlaces, navegación ancla y animaciones de scroll. |
| Diseño responsive | `client/src/index.css` | Define tipografías, color, composición, media queries y reglas de accesibilidad para movimiento reducido. |
| Recursos visuales | `client/public/assets/` | Incluye el logotipo y las imágenes comprimidas; Vite las copia a `dist/assets/`. |
| Compilación | `vite.config.ts` | Configura Vite, la carpeta de salida y la ruta base que depende de GitHub Pages. |
| Automatización | `.github/workflows/deploy-pages.yml` | Ejecuta la validación y publica la compilación estática. |

## 3. Cómo se organiza la página

La página no está dividida en muchos archivos de sección porque es una landing de una sola ruta. La composición se concentra en `Home.tsx` para que el relato visual, los enlaces ancla y las animaciones estén coordinados en un único lugar. El diseño reutilizable se concentra en las clases de `index.css` y en el pequeño componente `Reveal`, que muestra bloques al entrar en el viewport.

| Sección de `Home.tsx` | Identificador | Función en la experiencia |
|---|---|---|
| Hero | `#inicio` | Presenta la propuesta de valor, los servicios activos y las llamadas a la acción. |
| Perfil | `#perfil` | Explica el enfoque profesional, la formación y los principios operativos. |
| Sistema | `#sistema` | Agrupa capacidades técnicas: sistemas, redes, seguridad y automatización. |
| Homelab | — | Da contexto práctico a la infraestructura y a las prácticas de continuidad. |
| Trayectoria | `#trayectoria` | Presenta experiencia profesional y formación intensiva. |
| Credenciales | — | Incluye educación y certificaciones. |
| Contacto | `#contacto` | Ofrece el correo y el enlace de LinkedIn. |

## 4. Gestión de rutas y activos

GitHub Pages utiliza dos esquemas de URL. Si el repositorio se llama `<usuario>.github.io`, el sitio se sirve desde la raíz, por ejemplo `https://mnu-hdez.github.io/`. Si el repositorio se llama `mi-portfolio`, el sitio se sirve desde `https://<usuario>.github.io/mi-portfolio/`. Vite exige que la opción `base` coincida con ese prefijo para generar bien las rutas de los activos.[2]

La configuración ya resuelve ambos casos sin editar código. El flujo compara el nombre del repositorio con `<propietario>.github.io`: asigna `/` para un sitio de usuario y `/<repositorio>/` para un sitio de proyecto. A continuación entrega ese valor a `VITE_BASE_PATH`. El helper `asset()` de `Home.tsx` usa `import.meta.env.BASE_URL`, por lo que el logo y las imágenes se construyen con la ruta correcta.

| Tipo de repositorio | URL final esperada | Valor de `VITE_BASE_PATH` |
|---|---|---|
| Sitio de usuario `mnu-hdez.github.io` | `https://mnu-hdez.github.io/` | `/` |
| Repositorio de proyecto `portfolio` | `https://mnu-hdez.github.io/portfolio/` | `/portfolio/` |

## 5. El flujo de publicación automática

El archivo `.github/workflows/deploy-pages.yml` se ejecuta con cada cambio enviado a `main` y también permite iniciar una publicación manual desde la pestaña **Actions**. Primero descarga el repositorio, configura pnpm y Node.js, instala las dependencias bloqueadas por `pnpm-lock.yaml`, ejecuta la comprobación de TypeScript y genera el sitio con `pnpm build:pages`. Después empaqueta `dist/` y lo publica en el entorno `github-pages` mediante las acciones oficiales de GitHub.[1] [3]

| Paso del flujo | Acción | Función |
|---|---|---|
| `checkout` | `actions/checkout` | Obtiene el código de la rama `main`. |
| Preparación | `pnpm/action-setup` y `actions/setup-node` | Garantiza versiones reproducibles de gestor de paquetes y runtime. |
| Validación | `pnpm check` | Detiene el despliegue si TypeScript detecta un error. |
| Build | `pnpm build:pages` | Crea `dist/` y aplica la ruta base apropiada. |
| Artefacto | `actions/upload-pages-artifact` | Entrega el directorio estático a GitHub Pages. |
| Despliegue | `actions/deploy-pages` | Publica el artefacto y expone la URL final. |

GitHub requiere que el trabajo de despliegue tenga los permisos `pages: write` e `id-token: write`, y que dependa del trabajo que prepara el artefacto. El flujo incluido cumple ambas condiciones.[1]

## 6. Publicar la landing paso a paso

### Paso 1: crear o usar el repositorio

Para conservar la URL actual `https://mnu-hdez.github.io/`, el repositorio debe llamarse **`mnu-hdez.github.io`** y pertenecer a la cuenta `mnu-hdez`. Si prefieres otro nombre, también funcionará, aunque la dirección tendrá el nombre del repositorio al final.

### Paso 2: subir el proyecto a GitHub

Desde la carpeta del proyecto, inicializa Git si fuera necesario, asocia el repositorio remoto y sube los cambios a `main`. Sustituye la URL por la de tu repositorio real.

```bash
git init
git add .
git commit -m "Preparar portfolio para GitHub Pages"
git branch -M main
git remote add origin https://github.com/mnu-hdez/mnu-hdez.github.io.git
git push -u origin main
```

Si el repositorio ya existe y tiene un remoto configurado, basta con usar `git add .`, `git commit` y `git push`.

### Paso 3: habilitar GitHub Pages

Abre el repositorio en GitHub y entra en **Settings → Pages**. En **Build and deployment**, selecciona **GitHub Actions** como fuente de publicación. GitHub recomienda esta opción cuando el sitio necesita un proceso de compilación, como ocurre con Vite.[2]

### Paso 4: revisar la primera publicación

En la pestaña **Actions**, abre el flujo “Publicar landing en GitHub Pages”. Cuando ambos trabajos aparezcan en verde, vuelve a **Settings → Pages** para ver la URL pública. Los siguientes `push` a `main` repetirán el mismo proceso de forma automática.

## 7. Comprobar el resultado antes de subirlo

Para simular una URL de repositorio antes de hacer `push`, usa estos comandos desde la raíz del proyecto. El segundo genera una copia estática con el prefijo `/mi-repositorio/`; sustituye ese texto por el nombre real de tu repositorio cuando no sea `mnu-hdez.github.io`.

```bash
pnpm install
pnpm check
GITHUB_PAGES=true VITE_BASE_PATH=/mi-repositorio/ pnpm build:pages
pnpm vite preview --outDir dist
```

El resultado de `pnpm build:pages` es el único contenido que GitHub Pages debe recibir. Vite documenta que su compilación estática se despliega desde el directorio de salida y que `vite preview` sirve únicamente para comprobar ese resultado de forma local.[2]

## 8. Mantenimiento habitual

Para modificar contenido, actualiza `client/src/pages/Home.tsx`. Para cambiar colores, tamaños, responsive o animaciones, actualiza `client/src/index.css`. Las imágenes de la landing deben mantenerse en `client/public/assets/` y referenciarse con el helper `asset()` para conservar compatibilidad con cualquier ruta base.

| Necesidad | Archivo que debes modificar | Qué no debes modificar |
|---|---|---|
| Texto, experiencia, enlaces o habilidades | `client/src/pages/Home.tsx` | Archivos generados en `dist/` |
| Paleta, espaciado y responsive | `client/src/index.css` | El flujo de Pages, salvo que cambie la rama de publicación |
| Icono, fotografía o ilustración | `client/public/assets/` y su referencia en `Home.tsx` | Rutas absolutas como `/assets/...` sin `BASE_URL` |
| Proceso de publicación | `.github/workflows/deploy-pages.yml` | Artefactos generados por GitHub Actions |

## 9. Problemas comunes

| Síntoma | Causa habitual | Solución |
|---|---|---|
| La web abre, pero las imágenes o estilos no cargan | La ruta base no coincide con el nombre del repositorio | Comprueba que el flujo define `VITE_BASE_PATH` y que los activos usan `import.meta.env.BASE_URL`. |
| La página muestra 404 tras hacer `push` | Pages no está configurado para usar GitHub Actions o el flujo falló | Selecciona **GitHub Actions** en Settings → Pages y revisa la ejecución en Actions. |
| Falla `pnpm install --frozen-lockfile` | `package.json` y `pnpm-lock.yaml` no están sincronizados | Ejecuta `pnpm install` localmente, confirma los cambios del lockfile y vuelve a subirlos. |
| Los cambios no se publican | El cambio fue enviado a otra rama | Publica en `main` o cambia `branches: [main]` en el flujo. |
| El vínculo de una subpágina falla al recargar | GitHub Pages solo entrega archivos estáticos | Esta landing usa una sola ruta y anclas, por lo que no requiere un rewrite. Si se añaden rutas reales, conviene usar un sitio multipágina o configurar una estrategia de fallback. |

## 10. Límites y seguridad

GitHub Pages es apropiado para esta landing porque todo se ejecuta en el navegador. No debes añadir claves de API, contraseñas o datos privados al código: el contenido de un sitio publicado puede inspeccionarse desde el navegador. GitHub también advierte que los sitios de Pages son públicos, incluso cuando un repositorio privado puede ser publicado según el plan o la organización.[3]

Si en el futuro el portfolio necesita un formulario que envíe correos, autenticación, una base de datos o una API privada, deberá usar un proveedor externo para esa función o migrar a un hosting con backend. La capa visual puede mantenerse prácticamente igual.

## Referencias

[1]: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages "GitHub Docs — Using custom workflows with GitHub Pages"

[2]: https://vite.dev/guide/static-deploy.html "Vite — Deploying a Static Site"

[3]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site "GitHub Docs — Configuring a publishing source for your GitHub Pages site"
