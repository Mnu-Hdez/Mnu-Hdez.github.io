// Manuel Moreno — Network CV
// Vanilla JS: GitHub repos, uptime, mobile nav, scroll animations

(() => {
  // === Year ====
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // === Mobile nav toggle ====
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        nav.classList.remove('nav-open');
      })
    );
  }

  // === Uptime (from a fixed start date) ====
  const start = new Date('2022-01-01T00:00:00Z'); // homelab launch
  const fmt = (ms) => {
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };
  const updUp = () => {
    const ms = Date.now() - start.getTime();
    const txt = `${fmt(ms)} \u00B7 load 0.${Math.floor(Math.random()*9)+1}`;
    const u = document.getElementById('uptime');
    const fu = document.getElementById('footUp');
    if (u) u.textContent = txt;
    if (fu) fu.textContent = fmt(ms);
  };
  updUp();
  setInterval(updUp, 60000);

  // === Language switch — persist preference ====
  document.querySelectorAll('.lang-switch a[data-lang]').forEach(a => {
    a.addEventListener('click', () => {
      try { localStorage.setItem('lang', a.getAttribute('data-lang')); } catch (e) {}
    });
  });

  // === Scroll animations ====
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementBottom = el.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100 && elementBottom > 0) {
        el.classList.add('animate');
      }
    });
  };

  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('resize', animateOnScroll);

  // === GitHub repos ====
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

  const i18n = {
    loading: grid.getAttribute('data-loading') || 'Loading...',
    empty:   grid.getAttribute('data-empty')   || 'No public repositories yet.',
    error:   grid.getAttribute('data-error')   || 'Could not load repos',
  };

  const langColors = {
    Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
    Shell: '#89e051', C: '#555', 'C++': '#f34b7d',
    HTML: '#e34c26', CSS: '#563d7c', Go: '#00ADD8', Rust: '#dea584',
  };

  fetch('https://api.github.com/users/Mnu-Hdez/repos?sort=updated&per_page=100')
    .then(r => r.ok ? r.json() : Promise.reject(new Error('GitHub API: ' + r.status)))
    .then(data => {
      const repos = data
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 6);

      if (!repos.length) {
        grid.innerHTML = '<p class="repos-loading">' + i18n.empty + '</p>';
        return;
      }

      grid.innerHTML = repos.map(r => {
        const color = langColors[r.language] || 'var(--accent-cyan)';
        const desc = r.description ? escapeHtml(r.description) : 'Sin descripcion.';
        return (
          '<a class="repo-card" href="' + r.html_url + '" target="_blank" rel="noreferrer">' +
            '<span class="repo-name">' + escapeHtml(r.name) + '</span>' +
            '<p class="repo-desc">' + desc + '</p>' +
            '<div class="repo-meta">' +
              (r.language ? '<span><span class="lang-dot" style="background:' + color + '"></span>' + escapeHtml(r.language) + '</span>' : '') +
              '<span>★ ' + r.stargazers_count + '</span>' +
              '<span>&#9794; ' + r.forks_count + '</span>' +
            '</div>' +
          '</a>'
        );
      }).join('');
    })
    .catch(err => {
      grid.innerHTML = '<p class="repos-loading">' + i18n.error + ' (' + escapeHtml(err.message) + ').</p>';
    });

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, "'");
  }
})();