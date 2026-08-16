/* ESTILO: Cuaderno de producto — composición editorial asimétrica, tinta azul-negra, papel mineral y bermellón de decisión. */
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  Check,
  CircleDot,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Menu,
  Network,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ESTILO: Los recursos viven en public/assets para que Vite ajuste sus rutas con BASE_URL tanto en Pages como en local.
const asset = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;
const markUrl = asset("manu-mark.webp");
const heroImage = asset("hero-infrastructure.webp");
const topologyImage = asset("network-geometry.webp");
const operationsImage = asset("operations-detail.webp");

const navItems = [
  { label: "Perfil", href: "#perfil" },
  { label: "Sistema", href: "#sistema" },
  { label: "Trayectoria", href: "#trayectoria" },
  { label: "Contacto", href: "#contacto" },
];

const skills = [
  {
    number: "01",
    icon: Server,
    name: "Sistemas & storage",
    description: "Linux, TrueNAS y ZFS para servicios persistentes, ordenados y recuperables.",
    tags: ["Linux", "TrueNAS", "ZFS", "Docker"],
  },
  {
    number: "02",
    icon: Network,
    name: "Redes que se entienden",
    description: "Diseño, inventario y operación de TCP/IP, DNS, DHCP, VLANs y cableado estructurado.",
    tags: ["TCP/IP", "DNS", "VLANs", "DHCP"],
  },
  {
    number: "03",
    icon: ShieldCheck,
    name: "Seguridad práctica",
    description: "Acceso remoto seguro, observabilidad y aprendizaje continuo en entornos ofensivos.",
    tags: ["WireGuard", "Tailscale", "Kali", "CTFs"],
  },
  {
    number: "04",
    icon: Cpu,
    name: "Automatización & cloud",
    description: "IA aplicada a flujos técnicos, fundamentos de Azure y administración de directorio en evolución.",
    tags: ["Claude SDK", "Azure", "Active Directory", "LDAP"],
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-14% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLead({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-lead">
      <div className="section-number" aria-hidden="true">{number}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <img src={markUrl} alt="" className="brand-mark" />
          <span>MANU H.</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a className="header-contact" href="#contacto">
          <span>Hablemos</span>
          <ArrowUpRight size={16} />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        {navItems.map((item, index) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span>{item.label}<ArrowDownRight size={18} />
          </a>
        ))}
      </div>

      <main>
        <section id="inicio" className="hero section-wrap" aria-labelledby="hero-heading">
          <div className="hero-rail" aria-hidden="true">
            <span>01</span>
            <i />
            <span>SCROLL</span>
          </div>

          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow"><CircleDot size={12} /> Ingeniería de computadores · UPM</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="hero-heading">Sistemas que siguen <em>en pie</em> cuando importa.</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="hero-summary">Infraestructura, redes y seguridad construidas desde la curiosidad y operadas con criterio. De un homelab real a un entorno IT de producción.</p>
            </Reveal>
            <Reveal delay={0.18} className="hero-actions">
              <a className="button-primary" href="#contacto"><span>Iniciar conversación</span><ArrowDownRight size={19} /></a>
              <a className="text-link" href="https://www.linkedin.com/in/manu-hdez" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a>
            </Reveal>
          </div>

          <Reveal className="hero-visual" delay={0.14}>
            <div className="image-index">/ INFRA-01</div>
            <img src={heroImage} alt="Infraestructura de homelab organizada en un entorno oscuro" />
            <div className="visual-caption"><span>homelab</span><span>24 / 7</span></div>
            <div className="hero-orbit">SYS<br />OPS</div>
          </Reveal>

          <div className="hero-footer">
            <div><strong>15+</strong><span>servicios en producción</span></div>
            <div><strong>2023</strong><span>operando infraestructura propia</span></div>
            <div><strong>Madrid</strong><span>disponible para colaborar</span></div>
          </div>
        </section>

        <section id="perfil" className="profile-section section-wrap" aria-labelledby="perfil-title">
          <Reveal>
            <SectionLead number="02" eyebrow="La persona tras la consola" title={<>Aprender en producción.<br /><em>Documentar para repetir.</em></>}>
              <p className="section-intro">No se trata solo de levantar servicios. Se trata de saber qué observar, cómo responder y qué dejar claro para la siguiente persona.</p>
            </SectionLead>
          </Reveal>

          <div className="profile-grid">
            <Reveal className="profile-story" delay={0.08}>
              <p className="lead-copy">Desde 2023 mantengo una infraestructura propia en producción continua. Es mi laboratorio para entender cómo se sostienen los sistemas y qué hacer cuando algo falla.</p>
              <p>Actualmente estudio Ingeniería de Computadores en la Universidad Politécnica de Madrid y realizo prácticas de TI en Industrias Duero. Allí participo en auditorías de infraestructura, resolución de incidencias y documentación técnica para un entorno que no puede detenerse.</p>
              <a className="text-link arrow-link" href="#trayectoria">Ver trayectoria <ArrowDownRight size={16} /></a>
            </Reveal>

            <Reveal className="principles-panel" delay={0.16}>
              <p className="panel-label">Principios de operación</p>
              {["Menos suposiciones, más observabilidad.", "La recuperación también se diseña.", "La documentación forma parte del sistema."].map((line, index) => (
                <div className="principle" key={line}><span>0{index + 1}</span><p>{line}</p><Check size={17} /></div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="sistema" className="systems-section" aria-labelledby="sistema-title">
          <div className="section-wrap systems-inner">
            <Reveal>
              <SectionLead number="03" eyebrow="Capacidades" title={<>Una capa a la vez,<br /><em>todo conectado.</em></>}>
                <p className="section-intro">Un stack técnico construido y probado en el cruce de administración, redes, seguridad y automatización.</p>
              </SectionLead>
            </Reveal>

            <div className="skills-list">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <Reveal className="skill-row" delay={index * 0.06} key={skill.number}>
                    <div className="skill-no">{skill.number}</div>
                    <div className="skill-icon"><Icon size={23} strokeWidth={1.5} /></div>
                    <div className="skill-main"><h3>{skill.name}</h3><p>{skill.description}</p></div>
                    <div className="skill-tags">{skill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <ArrowUpRight className="skill-arrow" size={18} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lab-section section-wrap" aria-labelledby="lab-title">
          <Reveal>
            <SectionLead number="04" eyebrow="Caso vivo" title={<>Homelab: donde las ideas<br /><em>tienen que funcionar.</em></>}>
              <p className="section-intro">Más de quince servicios activos sobre TrueNAS con foco en disponibilidad, acceso remoto, monitorización y recuperación.</p>
            </SectionLead>
          </Reveal>

          <div className="lab-layout">
            <Reveal className="lab-image topology" delay={0.08}>
              <img src={topologyImage} alt="Interpretación visual de una topología de red" />
              <span>TOPOLOGÍA / 2026</span>
            </Reveal>
            <Reveal className="lab-entries" delay={0.12}>
              <article>
                <span>01 / CONTENEDORES</span>
                <h3>Docker, Nginx y SSL automatizado</h3>
                <p>Despliegue de servicios sobre TrueNAS y ZFS con proxy inverso para mantener la operación ordenada y expuesta de forma segura.</p>
              </article>
              <article>
                <span>02 / ACCESO</span>
                <h3>Acceso remoto sin atajos</h3>
                <p>WireGuard y Tailscale para conectar de forma segura con la infraestructura desde fuera de la red local.</p>
              </article>
              <article>
                <span>03 / VISIBILIDAD</span>
                <h3>Estado antes que sorpresa</h3>
                <p>DNS local con AdGuard y observabilidad mediante Netdata y Uptime Kuma para detectar el problema antes de que escale.</p>
              </article>
            </Reveal>
          </div>

          <Reveal className="backup-band" delay={0.12}>
            <div><span className="eyebrow"><ShieldCheck size={12} /> Resiliencia</span><h3>Los datos no se improvisan.</h3></div>
            <p>Rutinas de backup y procedimientos de recuperación documentados para que la continuidad no dependa de una sola memoria.</p>
            <ArrowDownRight size={27} />
          </Reveal>
        </section>

        <section id="trayectoria" className="timeline-section" aria-labelledby="trayectoria-title">
          <div className="section-wrap">
            <Reveal>
              <SectionLead number="05" eyebrow="Trayectoria" title={<>Trabajo técnico<br /><em>en contexto real.</em></>}>
                <p className="section-intro">Cada experiencia ha reforzado el mismo hábito: escuchar, diagnosticar, actuar y dejar el sistema en mejor estado.</p>
              </SectionLead>
            </Reveal>

            <div className="timeline-list">
              <Reveal className="timeline-item" delay={0.06}>
                <div className="timeline-date">ABR 2026 — AGO 2026</div>
                <div className="timeline-role"><p className="eyebrow">Industrias Duero · Madrid</p><h3>Becario de TI</h3></div>
                <div className="timeline-body"><p>Auditorías periódicas de red, resolución de incidencias de hardware y software, control de inventario e impulso de la base de conocimiento del departamento.</p><ul><li>Diagnóstico claro, con atención a la necesidad real detrás de cada ticket.</li><li>Verificación de activos y corrección de discrepancias entre inventario físico y digital.</li><li>Documentación de configuraciones, procesos y soluciones recurrentes.</li></ul></div>
              </Reveal>
              <Reveal className="timeline-item" delay={0.12}>
                <div className="timeline-date">JUL 2023 — AGO 2023</div>
                <div className="timeline-role"><p className="eyebrow">42 Madrid · Fundación Telefónica</p><h3>Programa de selección intensivo</h3></div>
                <div className="timeline-body"><p>Inmersión de veintiséis días consecutivos en programación colaborativa, sistemas y lógica en C, bajo un ritmo de entrega exigente.</p><ul><li>Aprendizaje autónomo a partir de documentación, ensayo y colaboración.</li><li>Priorización y resiliencia en proyectos de programación bajo presión.</li></ul></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="credentials-section section-wrap" aria-labelledby="credenciales-title">
          <Reveal className="credentials-heading"><p className="eyebrow">Formación continua</p><h2 id="credenciales-title">La base técnica<br /><em>también se entrena.</em></h2></Reveal>
          <div className="credentials-grid">
            <Reveal delay={0.06}><div className="credential-block"><span>EDUCACIÓN</span><h3>Ingeniería de Computadores</h3><p>Universidad Politécnica de Madrid · 2020—2026</p><h3>Bachillerato Científico</h3><p>IES Campiña Alta · 2017—2020</p></div></Reveal>
            <Reveal delay={0.12}><div className="credential-block cert-block"><span>CERTIFICACIONES</span><p>Claude Code in Action <small>Anthropic</small></p><p>Introduction to Intra/Social Entrepreneurship <small>Xijia Incubator & UPM</small></p><p>Certificado IA Generativa <small>Santander Academy</small></p></div></Reveal>
            <Reveal className="operations-image" delay={0.18}><img src={operationsImage} alt="Mantenimiento preciso de cableado en un homelab" /><span>OPERACIÓN / DETALLE</span></Reveal>
          </div>
        </section>

        <section id="contacto" className="contact-section" aria-labelledby="contacto-title">
          <div className="section-wrap contact-inner">
            <Reveal><p className="eyebrow light"><CircleDot size={12} /> Disponible para nuevos retos</p></Reveal>
            <Reveal delay={0.06}><h2 id="contacto-title">La infraestructura<br />empieza por una<br /><em>conversación.</em></h2></Reveal>
            <Reveal className="contact-actions" delay={0.12}>
              <a className="button-light" href="mailto:cuentashdez@protonmail.com"><AtSign size={19} /><span>cuentashdez@protonmail.com</span><ArrowUpRight size={19} /></a>
              <a className="contact-social" href="https://www.linkedin.com/in/manu-hdez" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={16} /></a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <div className="footer-brand"><img src={markUrl} alt="" /><span>MANU H.</span></div>
        <p>Cloud & Infrastructure Engineer<br />Madrid, España</p>
        <div className="footer-links"><a href="https://github.com/mnu-hdez" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="#inicio">Volver arriba <ArrowUpRight size={15} /></a></div>
      </footer>
    </div>
  );
}
