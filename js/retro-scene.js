/* retro-scene.js — typewriter + scroll-driven screen text for the CRT scene */
(function () {
  'use strict';

  const screen = document.getElementById('screen-text');
  if (!screen) return;

  // Section labels shown on the CRT as the user scrolls
  const labels = [
    'CARGANDO PERFIL...',
    'SOBRE MI',
    'HOMELAB',
    'EXPERIENCIA',
    'EDUCACION',
    'CERTIFICACIONES',
    'IDIOMAS',
    'CONTACTO',
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let typewriterTimer = null;

  // Typewriter effect — clears screen, types char by char
  function setTypeText(text) {
    if (typewriterTimer) clearTimeout(typewriterTimer);
    if (reduceMotion) { screen.textContent = text; return; }
    let i = 0;
    screen.textContent = '';
    function tick() {
      if (i < text.length) {
        screen.textContent += text[i];
        i++;
        typewriterTimer = setTimeout(tick, 55);
      }
    }
    tick();
  }

  // Initial "CARGANDO PERFIL..."
  setTypeText(labels[0]);

  // Map sections to labels by index order
  const sections = [
    document.querySelector('header.hero'),
    document.getElementById('about'),
    document.getElementById('skills'),
    document.getElementById('experience'),
    document.getElementById('education'),
    document.getElementById('certs'),
    document.querySelector('section:nth-of-type(7)'),
    document.getElementById('contact'),
  ];

  let activeIdx = -1;

  const observer = new IntersectionObserver(
    function (entries) {
      // Pick the most visible section
      let best = null;
      let bestRatio = 0;
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio > bestRatio) {
          best = e;
          bestRatio = e.intersectionRatio;
        }
      });
      if (!best || bestRatio < 0.15) return;

      const idx = sections.indexOf(best.target);
      if (idx >= 0 && idx !== activeIdx && idx < labels.length) {
        activeIdx = idx;
        setTypeText(labels[idx]);
      }
    },
    { threshold: [0.15, 0.3, 0.5, 0.7], rootMargin: '-20% 0px -20% 0px' }
  );

  sections.forEach(function (el) { if (el) observer.observe(el); });
})();