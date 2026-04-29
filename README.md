# Network & Infrastructure CV

CV personal estático en HTML/CSS/JS puro.

## Estructura

- `index.html` — markup semántico
- `styles.css` — design system (paleta navy/cyan, fuentes JetBrains Mono + Space Grotesk)
- `script.js` — repos de GitHub vía API pública, ping live, uptime, nav móvil

## Toques particulares de "infra de redes"

- Topología SVG animada (paquetes viajando por las líneas)
- Terminal con `ping` y `uptime` en vivo
- Líneas de fondo tipo cableado
- Tags de protocolos (TCP/IP, BGP, OSPF, WireGuard…)
- Borde lateral cyan en cada panel (estilo "interface up")

## Personalización rápida

Cambia los colores en `styles.css` → `:root`:
```css
--accent-cyan: #00d4ff;
--accent-blue: #3b82f6;
--accent-green: #10b981;
```
