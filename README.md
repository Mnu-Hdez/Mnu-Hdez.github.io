# Manuel Moreno — CV (i18n)

Static multilingual CV for GitHub Pages.

## Structure

```
/index.html        # auto-redirect by browser language / localStorage
/es/index.html     # Spanish
/en/index.html     # English
/fr/index.html     # French
/jp/index.html     # Japanese
/assets/styles.css
/assets/script.js
```

## Behavior

- Visiting `/` runs a JS redirect to `/es/`, `/en/`, `/fr/` or `/jp/`:
  1. Saved preference in `localStorage.lang`
  2. Browser language (`navigator.languages`): `es`→es, `en`→en, `fr`→fr, `ja`→jp
  3. Fallback: `en`
- The hash (e.g. `#contact`) is preserved across the redirect.
- Each page has a language switcher (EN / ES / FR / 日本語) that stores the choice in `localStorage`.
- `<noscript>` users get a plain choice page.

## SEO

- `hreflang` alternates for `es`, `en`, `fr`, `ja` and `x-default`.
- Canonical URL per language.
- `og:locale` per language plus `og:locale:alternate` for the others.

## Deploy on GitHub Pages

1. Push the repo (e.g. `mnu-hdez.github.io`) with these files at the root.
2. Enable Pages → branch `main` → folder `/ (root)`.
3. Open `https://mnu-hdez.github.io/` — it will redirect to your language.
