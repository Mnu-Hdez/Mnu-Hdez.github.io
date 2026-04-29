// Manuel Moreno — Network CV
// Vanilla JS: GitHub repos, ping live, uptime, mobile nav

(() => {
  // === Year ===
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // === Mobile nav toggle ===
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // === Live ping values (subtle jitter) ===
  setInterval(() => {
    document.querySelectorAll('.ping-ms').forEach(el => {
      const base = 0.4 + Math.random() * 0.25;
      el.textContent = base.toFixed(2);
    });
  }, 1800);

  // === Uptime (from a fixed start date) ===
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
    const txt = `${fmt(ms)} · load 0.${Math.floor(Math.random()*9)+1}`;
    const u = document.getElementById('uptime');
    const fu = document.getElementById('footUp');
    if (u) u.textContent = txt;
    if (fu) fu.textContent = fmt(ms);
  };
  updUp();
  setInterval(updUp, 60000);

  // === GitHub repos ===
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

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
        grid.innerHTML = '<p class="repos-loading">No hay repositorios públicos todavía.</p>';
        return;
      }

      grid.innerHTML = repos.map(r => {
        const color = langColors[r.language] || 'var(--accent-cyan)';
        const desc = r.description ? escapeHtml(r.description) : 'Sin descripción.';
        return `
          <a class="repo-card" href="${r.html_url}" target="_blank" rel="noreferrer">
            <span class="repo-name">${escapeHtml(r.name)}</span>
            <p class="repo-desc">${desc}</p>
            <div class="repo-meta">
              ${r.language ? `<span><span class="lang-dot" style="background:${color}"></span>${escapeHtml(r.language)}</span>` : ''}
              <span>★ ${r.stargazers_count}</span>
              <span>⑂ ${r.forks_count}</span>
            </div>
          </a>
        `;
      }).join('');
    })
    .catch(err => {
      grid.innerHTML = `<p class="repos-loading">No se pudieron cargar los repos (${escapeHtml(err.message)}).</p>`;
    });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => (
      { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]
    ));
  }
})();
