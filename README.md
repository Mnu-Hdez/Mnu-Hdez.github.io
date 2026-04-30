# Manuel Moreno — CV (multi-idioma)

CV estático para GitHub Pages con soporte de **español** e **inglés** mediante subdirectorios.

## Estructura

```
.
├── index.html        # Detecta el idioma del navegador y redirige a /es/ o /en/
├── es/
│   └── index.html    # Versión en español
├── en/
│   └── index.html    # Versión en inglés
└── assets/
    ├── styles.css    # Estilos compartidos
    └── script.js     # Lógica compartida (GitHub API, ping, uptime, i18n)
```

## Cómo funciona el idioma

1. Al entrar en `https://mnu-hdez.github.io/`, el `index.html` raíz:
   - Lee `localStorage.lang` si el usuario ya eligió antes.
   - Si no, mira `navigator.language`: si empieza por `es` → `/es/`, si no → `/en/`.
   - Conserva el `#hash` durante la redirección.
2. En cada página hay un selector **EN / ES** en la nav. Al hacer clic se guarda la preferencia.

## Despliegue en GitHub Pages

1. Sube todo el contenido a la raíz del repo `mnu-hdez.github.io` (rama `main`).
2. En **Settings → Pages**, selecciona la rama `main` y carpeta `/ (root)`.
3. Espera el deploy. URLs:
   - `https://mnu-hdez.github.io/`     → redirección automática
   - `https://mnu-hdez.github.io/es/`  → español
   - `https://mnu-hdez.github.io/en/`  → inglés

## SEO

Cada idioma incluye etiquetas `hreflang` y `canonical`, además de `og:locale` para que Google y redes sociales entiendan las versiones disponibles.

## Editar contenido

- Texto en español: `es/index.html`
- Texto en inglés: `en/index.html`
- Estilos / animaciones: `assets/styles.css`
- Comportamiento (ping live, uptime, repos GitHub): `assets/script.js`

Los textos del bloque de repos (cargando / vacío / error) se controlan desde `data-loading`, `data-empty`, `data-error` del `#repos-grid` en cada `index.html`.
