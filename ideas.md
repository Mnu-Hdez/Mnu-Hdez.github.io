# Dirección de diseño — Portfolio de Manu Hernández

## Tres enfoques explorados

### 1. Cuaderno de producto
**Muy breve introducción:** Una presencia editorial cálida, inspirada en libretas de campo y sistemas de señalética. Convierte el portfolio en una secuencia de hallazgos y decisiones, no en una cuadrícula de tarjetas.

**Probabilidad:** 0.07

### 2. Archivo monocromático
**Muy breve introducción:** Una galería sobria de museo contemporáneo, con tipografía de gran escala, fondos minerales y proyectos tratados como piezas de archivo. El tono es silencioso, preciso y selectivo.

**Probabilidad:** 0.04

### 3. Cartografía digital
**Muy breve introducción:** Un relato visual guiado por coordenadas, trayectorias y capas semitransparentes. Sugiere exploración y pensamiento sistémico sin recurrir a códigos visuales tecnológicos previsibles.

**Probabilidad:** 0.09

## Enfoque elegido: Cuaderno de producto

### Movimiento de diseño
**Editorialismo funcional contemporáneo**, con referencias a la composición de revistas independientes, papelería técnica y la claridad de los sistemas de información suizos. La ejecución será digital, no nostálgica: precisa, respirada y claramente utilitaria.

### Principios centrales

1. **Narrativa antes que catálogo:** cada bloque explicará una faceta profesional mediante ritmo, jerarquía y una progresión de lectura clara.
2. **Asimetría deliberada:** encabezados, etiquetas y masa de contenido se distribuyen en columnas desplazadas, evitando el patrón centrado y repetitivo.
3. **Materialidad contenida:** papel claro, tinta oscura, una línea de acento y textura de grano casi imperceptible aportan profundidad sin distraer.
4. **Movimiento como orientación:** el scroll revela información por capas y la barra de progreso ayuda a percibir el recorrido; la animación acompaña el contenido, nunca lo sustituye.

### Filosofía de color
La interfaz usará un fondo de **papel mineral** (`#F1EFE8`) para proyectar cercanía y sofisticación, texto en **tinta azul-negra** (`#172129`) para una lectura firme, y **naranja bermellón** (`#E95A2E`) como señal inequívoca de energía, selección e interacción. Las zonas oscuras se reservarán para pausas narrativas y proyectos destacados, creando una cadencia entre superficie editorial y profundidad técnica.

### Paradigma de layout
La página se organiza como un **margen editorial persistente**: a la izquierda, un riel de numeración y estado del recorrido; a la derecha, bloques de anchura variable que entran en escena como páginas de un cuaderno. En escritorio, el héroe divide la composición entre manifiesto y una pieza gráfica; en móvil, los elementos se reordenan sin perder el sentido de secuencia.

### Elementos distintivos

1. Un **subrayado bermellón modular** que marca títulos, enlaces y estados de navegación.
2. Etiquetas de proyecto en formato de **ficha de archivo** —número, categoría y año— en versalitas espaciadas.
3. Una **línea de progreso vertical** que se completa suavemente con el desplazamiento y acompaña el contenido principal.

### Filosofía de interacción
Las interacciones son nítidas y táctiles: botones con presión breve, enlaces que despliegan un subrayado direccional y proyectos que descubren contexto con una traslación mínima. La navegación ancla realiza desplazamiento suave y cada cambio mantiene orientación espacial. Se respetará `prefers-reduced-motion`.

### Animación
Las entradas por scroll combinarán opacidad y traslación vertical corta, con escalonado de 60 ms para grupos de elementos. Las piezas visuales tendrán una ligera deriva horizontal, y los contadores/etiquetas responderán con transformaciones GPU. Se usarán curvas `cubic-bezier(0.23, 1, 0.32, 1)` para apariciones y no se animarán propiedades de layout. El progreso se actualizará de forma discreta, sin efectos invasivos.

### Sistema tipográfico
**DM Serif Display** para titulares, declaraciones y cifras significativas: aporta carácter editorial y contraste. **DM Mono** para navegación, etiquetas y metadatos: refuerza la noción de precisión. El cuerpo se resuelve con **Manrope**, legible y contemporánea. Los titulares usan cortes amplios y ritmo vertical; las etiquetas usan mayúsculas con espaciado; el cuerpo evita densidad excesiva.

### Esencia de marca
**Un portfolio de producto y tecnología para convertir problemas complejos en experiencias claras, pensado para equipos que valoran pensamiento, ejecución y detalle.**

Personalidad: **precisa, inquisitiva, cercana**.

### Voz de marca
La voz es directa, reflexiva y concreta; evita promesas huecas y se apoya en verbos de acción y observación.

> “Diseño experiencias que aclaran lo complejo.”

> “Veamos qué puede hacer una buena decisión de producto.”

### Logotipo y símbolo
El monograma será una **M construida a partir de tres trazos editoriales escalonados**, como un marcador de página o una señal de recorrido. Debe funcionar sin texto, en azul-negro sobre fondo mineral y en negativo sobre zonas oscuras.

### Color de marca distintivo
**Bermellón de decisión — `#E95A2E`**. Será la señal visual reservada para orientación, llamada a la acción y detalles memorables.
