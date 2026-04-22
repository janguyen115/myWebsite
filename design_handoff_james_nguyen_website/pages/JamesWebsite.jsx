/* James A. Nguyen — unified clickable prototype
   Direction: B (Technical Blueprint) for home + instruction + CV + collaborators,
              A (Editorial) for project detail pages.
   Single-document routing via window.JN_ROUTE state. */

const JN = window.JN_TOKENS;

function useRoute() {
  const [route, setRoute] = React.useState(() => {
    if (typeof window === 'undefined') return { page: 'home' };
    const h = window.location.hash.slice(1);
    if (!h) return { page: 'home' };
    const [page, id] = h.split('/');
    return { page, id };
  });
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (!h) return setRoute({ page: 'home' });
      const [page, id] = h.split('/');
      setRoute({ page, id });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const nav = (page, id) => {
    window.location.hash = id ? `${page}/${id}` : page;
    window.scrollTo(0, 0);
  };
  return [route, nav];
}

function JamesWebsite({ fontPairB = 'ibm', fontPairA = 'baskerville' }) {
  const [route, nav] = useRoute();
  // On route change, scroll to top
  React.useEffect(() => {
    const el = document.scrollingElement || document.documentElement;
    el.scrollTo?.(0, 0);
  }, [route.page, route.id]);

  if (route.page === 'project') {
    return <ProjectDetailEditorial id={route.id} fontPair={fontPairA} nav={nav} />;
  }
  if (route.page === 'instruction') {
    return <InstructionBlueprint fontPair={fontPairB} nav={nav} />;
  }
  if (route.page === 'cv') {
    return <CVBlueprint fontPair={fontPairB} nav={nav} />;
  }
  if (route.page === 'collaborators') {
    return <CollaboratorsBlueprint fontPair={fontPairB} nav={nav} />;
  }
  if (route.page === 'guide') {
    return <GuideBlueprint fontPair={fontPairB} nav={nav} />;
  }
  return <HomeBlueprint fontPair={fontPairB} nav={nav} />;
}

// ─────────────────────────────────────────────────────────────
// Shared chrome: top meta bar + nav
// ─────────────────────────────────────────────────────────────
function BFonts(fontPair) {
  return fontPair === 'jetbrains'
    ? { mono: '"JetBrains Mono", ui-monospace, Menlo, monospace', serif: '"Cormorant Garamond", Georgia, serif', sans: '"Inter", system-ui, sans-serif' }
    : fontPair === 'spectral'
    ? { mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace', serif: '"Spectral", Georgia, serif', sans: '"IBM Plex Sans", system-ui, sans-serif' }
    : { mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace', serif: '"Libre Caslon Text", "Libre Baskerville", Georgia, serif', sans: '"IBM Plex Sans", system-ui, sans-serif' };
}

function AFonts(fontPair) {
  return fontPair === 'playfair'
    ? { serif: '"Playfair Display", Georgia, serif', sans: 'Inter, system-ui, sans-serif', mono: '"IBM Plex Mono", ui-monospace, monospace' }
    : fontPair === 'garamond'
    ? { serif: '"EB Garamond", Georgia, serif', sans: '"Archivo", sans-serif', mono: '"IBM Plex Mono", ui-monospace, monospace' }
    : { serif: '"Libre Baskerville", Georgia, serif', sans: '"Archivo", system-ui, sans-serif', mono: '"IBM Plex Mono", ui-monospace, monospace' };
}

// A tiny sashiko running-stitch divider. Quiet, handmade feel.
function SashikoRule({ color = JN.red, opacity = 1, width = '100%', my = 0 }) {
  return (
    <div style={{
      width,
      height: 12,
      margin: my ? `${my}px 0` : 0,
      backgroundImage: window.JN_TEXTURES.sashikoRule(color, opacity),
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'left center',
      backgroundSize: '200px 12px',
    }} />
  );
}

// Komorebi overlay — soft dapples of warm light, very low contrast.
function Komorebi({ opacity = 0.55 }) {
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity, mixBlendMode: 'soft-light' }}
      dangerouslySetInnerHTML={{ __html: window.JN_KOMOREBI_SVG }}
    />
  );
}

// Kept for backwards-compat: MetaBar is now a no-op so older pages don't break while we migrate.
function MetaBar() { return null; }

function TopNav({ fonts, nav, active = 'home' }) {
  const items = [
    ['home', 'index'],
    ['home#about', 'about'],
    ['home#projects', 'projects'],
    ['instruction', 'instruction'],
    ['home#contact', 'contact'],
  ];
  const hamburger = [
    ['cv', 'CV'],
    ['collaborators', 'Collaborators'],
    ['guide', "A Student's Guide to Numerical Bayes"],
  ];
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isActive = (path) => {
    if (active === 'home' && path.startsWith('home')) return path === 'home';
    return active === path;
  };
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(244, 241, 234, 0.88)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${JN.ruleSoft}`, padding: '18px 72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: fonts.sans, fontSize: 13 }}>
      <button onClick={() => nav('home')} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: fonts.serif, fontSize: 17, letterSpacing: '0.01em', color: JN.ink }}>
        <span style={{ fontStyle: 'italic' }}>James A.</span><span style={{ color: JN.red }}>Nguyen</span>
      </button>
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center', color: JN.inkSoft }}>
        {items.map(([path, l]) => {
          const act = isActive(path);
          return (
            <button key={l} onClick={() => {
              if (path.includes('#')) {
                const [p, anchor] = path.split('#');
                if (active === 'home') {
                  document.getElementById(anchor)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
                } else {
                  nav(p);
                  setTimeout(() => document.getElementById(anchor)?.scrollIntoView?.({ behavior: 'smooth' }), 100);
                }
              } else {
                nav(path);
              }
            }} style={{ all: 'unset', cursor: 'pointer', color: act ? JN.red : JN.inkSoft, fontFamily: fonts.sans, fontSize: 13, letterSpacing: '0.02em', borderBottom: act ? `1px solid ${JN.red}` : '1px solid transparent', paddingBottom: 2 }}>
              {l}
            </button>
          );
        })}
        <div style={{ position: 'relative', marginLeft: 8 }}>
          <button onClick={() => setMenuOpen(o => !o)} onBlur={() => setTimeout(() => setMenuOpen(false), 200)} style={{ all: 'unset', cursor: 'pointer', color: JN.inkSoft, fontFamily: fonts.sans, fontSize: 16, letterSpacing: '0.05em' }}>
            more +
          </button>
          {menuOpen && (
            <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, minWidth: 300, background: JN.paper, border: `1px solid ${JN.ruleSoft}`, boxShadow: '0 10px 30px rgba(40,30,20,0.08)', zIndex: 30 }}>
              {hamburger.map(([p, label], i) => (
                <button key={p} onMouseDown={() => nav(p)} style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', boxSizing: 'border-box', padding: '14px 18px', borderBottom: i < hamburger.length - 1 ? `1px dashed ${JN.ruleSoft}` : 'none', fontFamily: fonts.serif, fontSize: 15, color: JN.inkSoft, fontStyle: 'italic' }}>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function SheetFooter({ fonts, fontName }) {
  return (
    <footer style={{ padding: '32px 72px 40px', borderTop: `1px solid ${JN.ruleSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: fonts.serif, fontSize: 14, color: JN.mute, background: 'transparent' }}>
      <span style={{ fontStyle: 'italic' }}>© James A. Nguyen, 2026</span>
      <span style={{ fontSize: 12, color: JN.muteCool }}>Set in {fontName || `${fonts.serif.split(',')[0].replace(/"/g,'')} &amp; ${fonts.mono.split(',')[0].replace(/"/g,'')}`}</span>
      <span style={{ fontStyle: 'italic' }}>Irvine, California</span>
    </footer>
  );
}

function SheetHeaderB({ num, title, subtitle, fonts }) {
  // Roman section markers look more "literary" than a giant mono number block.
  const roman = { '01': 'I', '02': 'II', '03': 'III', '04': 'IV', '05': 'V', '06': 'VI' }[num] || num;
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
        <span style={{ fontFamily: fonts.serif, fontSize: 18, color: JN.red, fontStyle: 'italic', letterSpacing: '0.02em' }}>§ {roman}</span>
        <SashikoRule color={JN.red} opacity={1} width={48} />
        <span style={{ fontFamily: fonts.serif, fontSize: 14, color: JN.mute, fontStyle: 'italic' }}>{subtitle}</span>
      </div>
      <h2 style={{ fontFamily: fonts.serif, fontSize: 'clamp(32px, 4.2vw, 52px)', fontWeight: 400, letterSpacing: '-0.015em', margin: 0, color: JN.ink, lineHeight: 1.05 }}>
        {title.charAt(0) + title.slice(1).toLowerCase()}
      </h2>
    </div>
  );
}

// Retained for backwards-compat; now renders nothing.
function CornerTicks() { return null; }

// ─────────────────────────────────────────────────────────────
// HOME — Blueprint
// ─────────────────────────────────────────────────────────────
function HomeBlueprint({ fontPair = 'ibm', nav }) {
  const fonts = BFonts(fontPair);
  const L = window.JN_DATA;
  const bg = {
    backgroundColor: JN.paper,
    backgroundImage: `${window.JN_TEXTURES.graphPaper(0.035, 26, '#8a7a60')}`,
    backgroundSize: '26px 26px',
  };
  return (
    <div style={{ ...bg, color: JN.ink, fontFamily: fonts.serif, minHeight: '100%', width: '100%', position: 'relative' }}>
      <style>{`
        .b-a { color: ${JN.red}; text-decoration: none; }
        .b-a:hover { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
      `}</style>

      <TopNav fonts={fonts} nav={nav} active="home" />

      {/* Hero */}
      <section id="index" style={{ padding: '72px 72px 48px', position: 'relative', overflow: 'hidden' }}>
        <Komorebi opacity={0.5} />
        <div style={{ position: 'relative' }}>
          {/* Bayesian hero — aligned to bottom of the meta row, sized to hug the right side */}
          <div style={{
            position: 'absolute',
            right: -24,
            bottom: 0,
            width: 'min(560px, 55%)',
            pointerEvents: 'none',
            opacity: 0.9,
            zIndex: 2,
          }}>
            <BayesianHero color={JN.red} accent={JN.blue} height={220} seed="hero3" showCaption={false} />
          </div>

          {/* Foreground heading + intro */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(40px, 6.4vw, 96px)', lineHeight: 1.02, fontWeight: 400, letterSpacing: '-0.02em', margin: 0, color: JN.ink, whiteSpace: 'nowrap' }}>
              James A.&nbsp;<span style={{ fontStyle: 'italic' }}><CircledWord color={JN.red} stroke={1.5} tilt={-4} pad={14}>Nguyen</CircledWord></span>
            </h1>
            <p style={{ fontFamily: fonts.serif, fontSize: 22, lineHeight: 1.45, color: JN.inkSoft, margin: '28px 0 0', maxWidth: 560, textWrap: 'pretty' }}>
              Ph.D. candidate in Statistics at UC Irvine, working with <span style={{ color: JN.red }}>Eric Sudderth</span> and <span style={{ color: JN.red }}>Stephan Mandt</span> on scalable Bayesian inference.
            </p>
            <SashikoRule color={JN.red} opacity={1} width={120} my={36} />
            <div style={{ display: 'flex', gap: 40, fontFamily: fonts.sans, fontSize: 13, color: JN.mute, letterSpacing: '0.02em' }}>
              <div><span style={{ color: JN.muteCool, display: 'block', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Program</span>PhD, Statistics</div>
              <div><span style={{ color: JN.muteCool, display: 'block', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Advisors</span>Sudderth · Mandt</div>
              <div><span style={{ color: JN.muteCool, display: 'block', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Cohort</span>Class of 2032</div>
            </div>
          </div>
        </div>
      </section>

      <SashikoRule color={JN.red} opacity={1} />

      {/* About */}
      <section id="about" style={{ padding: '72px 72px', scrollMarginTop: 64, position: 'relative' }}>
        <SheetHeaderB num="01" title="About" subtitle="A few words" fonts={fonts} />
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 56, marginTop: 40 }}>
          <figure style={{ margin: 0 }}>
            <img src="assets/about_banner.jpg" alt="James at Rowland Hall" style={{ width: '100%', display: 'block', filter: 'saturate(0.7) contrast(1.02)' }} />
            <figcaption style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 13, color: JN.mute, marginTop: 10 }}>
              Rowland Hall, a quiet afternoon.
            </figcaption>
          </figure>
          <div>
            <p style={{ fontFamily: fonts.serif, fontSize: 22, lineHeight: 1.5, color: JN.ink, textWrap: 'pretty', margin: '0 0 20px' }}>
              Hello — I'm James. A recent UCI graduate in Applied Mathematics, now a Ph.D. student in Statistics.
            </p>
            <p style={{ fontFamily: fonts.serif, fontSize: 17, lineHeight: 1.65, color: JN.inkSoft, textWrap: 'pretty', maxWidth: 560, margin: '0 0 28px' }}>
              My research is about the computational limits of Bayesian inference — particularly efficient <em>variational</em> methods for high-dimensional data, with applications in machine learning. I like problems where the geometry of the posterior tells you something about the system.
            </p>
            <div style={{ fontFamily: fonts.serif, fontSize: 16, color: JN.inkSoft, lineHeight: 1.9 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.muteCool, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Interests</div>
              scalable variational inference · high-dimensional posteriors ·<br/>
              iterative solvers &amp; linear systems · applied ML and sequential data
            </div>
          </div>
        </div>
      </section>

      <SashikoRule color={JN.red} opacity={1} />

      {/* Projects */}
      <section id="projects" style={{ padding: '72px 72px', scrollMarginTop: 64 }}>
        <SheetHeaderB num="02" title="Projects" subtitle={`Selected work, 2023–2025`} fonts={fonts} />
        <div style={{ marginTop: 40 }}>
          {L.projects.map((p, i) => (
            <ProjectRow key={p.id} p={p} i={i} fonts={fonts} last={i === L.projects.length - 1} nav={nav} />
          ))}
        </div>
      </section>

      <SashikoRule color={JN.red} opacity={1} />

      {/* Instruction teaser */}
      <section id="instruction" style={{ padding: '72px 72px', scrollMarginTop: 64 }}>
        <SheetHeaderB num="03" title="Instruction" subtitle="Notes in progress" fonts={fonts} />
        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.muteCool, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>In draft</div>
            <h3 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 400, lineHeight: 1.15, margin: '0 0 16px', color: JN.ink }}>A Student's Guide to <em>Numerical Bayes</em></h3>
            <p style={{ fontFamily: fonts.serif, fontSize: 17, lineHeight: 1.65, color: JN.inkSoft, textWrap: 'pretty', margin: 0 }}>
              A reading companion to Turkman, Paulino &amp; Müller's <em>Computational Bayesian Statistics</em>. My attempt to simplify — to others, and to myself — numerical solutions to Bayesian inference, built around worked examples that develop gradually.
            </p>
            <button onClick={() => nav('guide')} className="b-a" style={{ all: 'unset', cursor: 'pointer', display: 'inline-block', marginTop: 20, fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 16, color: JN.red, borderBottom: `1px solid ${JN.red}`, paddingBottom: 2 }}>Read the draft →</button>
          </div>
          <div>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.muteCool, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Contents</div>
            {['Bayes, in brief', 'Monte Carlo &amp; importance', 'Metropolis–Hastings', 'Gibbs sampling', 'Variational methods', 'Examples &amp; errata'].map((c, i) => (
              <div key={i} style={{ fontFamily: fonts.serif, padding: '10px 0', borderBottom: i < 5 ? `1px dashed ${JN.ruleSoft}` : 'none', display: 'flex', justifyContent: 'space-between', fontSize: 16, color: JN.inkSoft }}>
                <span><span style={{ color: JN.red, fontStyle: 'italic', marginRight: 12 }}>{['I','II','III','IV','V','VI'][i]}.</span><span dangerouslySetInnerHTML={{ __html: c }} /></span>
                <span style={{ color: JN.mute, fontStyle: 'italic', fontSize: 14 }}>§ {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SashikoRule color={JN.red} opacity={1} />

      {/* Contact */}
      <section id="contact" style={{ padding: '72px 72px', scrollMarginTop: 64 }}>
        <SheetHeaderB num="04" title="Contact" subtitle="Get in touch" fonts={fonts} />
        <div style={{ marginTop: 40 }}>
          {L.contacts.map((c, i) => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener" style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', alignItems: 'baseline', padding: '20px 0', borderBottom: `1px dashed ${JN.ruleSoft}`, textDecoration: 'none' }}>
              <span style={{ fontFamily: fonts.sans, color: JN.muteCool, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{c.label}</span>
              <span style={{ fontFamily: fonts.serif, fontSize: 22, color: JN.ink }}>{c.value}</span>
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', color: JN.red, fontSize: 15 }}>open →</span>
            </a>
          ))}
        </div>
      </section>

      <SheetFooter fonts={fonts} />
    </div>
  );
}

function ProjectRow({ p, i, fonts, last, nav }) {
  return (
    <button onClick={() => nav('project', p.id)} style={{ all: 'unset', cursor: 'pointer', display: 'grid', gridTemplateColumns: '60px 80px 1fr auto auto', alignItems: 'baseline', gap: 24, padding: '24px 8px', width: '100%', boxSizing: 'border-box', borderBottom: last ? 'none' : `1px dashed ${JN.ruleSoft}`, transition: 'background 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(244, 241, 234, 0.5)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 16, color: JN.red }}>{p.num}.</span>
      <span style={{ fontFamily: fonts.sans, fontSize: 12, color: JN.muteCool, letterSpacing: '0.1em' }}>{p.year}</span>
      <span style={{ fontFamily: fonts.serif, fontSize: 22, color: JN.ink, paddingRight: 24, lineHeight: 1.3 }}>{p.title}</span>
      <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 14, color: JN.mute, paddingRight: 24 }}>{p.tag}</span>
      <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 14, color: JN.red }}>read →</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT DETAIL — Editorial (Variation A)
// ─────────────────────────────────────────────────────────────
function ProjectDetailEditorial({ id, fontPair = 'baskerville', nav }) {
  const fonts = AFonts(fontPair);
  const L = window.JN_DATA;
  const idx = Math.max(0, L.projects.findIndex(x => x.id === id));
  const p = L.projects[idx];
  const prev = idx > 0 ? L.projects[idx - 1] : null;
  const next = idx < L.projects.length - 1 ? L.projects[idx + 1] : null;
  const bg = {
    backgroundColor: JN.paper,
    backgroundImage: `${window.JN_TEXTURES.graphPaper(0.035, 26, '#8a7a60')}`,
    backgroundSize: '26px 26px',
  };

  return (
    <div style={{ ...bg, color: JN.ink, fontFamily: fonts.serif, minHeight: '100%' }}>
      {/* Minimal editorial nav (no blueprint meta bar — a different register for detail) */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(244, 241, 234, 0.92)', backdropFilter: 'blur(6px)', borderBottom: `1px solid ${JN.rule}`, padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: fonts.sans, fontSize: 12 }}>
        <button onClick={() => nav('home')} style={{ all: 'unset', cursor: 'pointer', letterSpacing: '0.18em', textTransform: 'uppercase', color: JN.inkSoft }}>
          ← <span style={{ color: JN.red }}>Nguyen</span> · Journal
        </button>
        <nav style={{ display: 'flex', gap: 28, fontFamily: fonts.sans, fontSize: 13, letterSpacing: '0.04em' }}>
          <button onClick={() => nav('home')} style={{ all: 'unset', cursor: 'pointer', color: JN.inkSoft }}>About</button>
          <button onClick={() => nav('home')} style={{ all: 'unset', cursor: 'pointer', color: JN.red }}>Projects</button>
          <button onClick={() => nav('instruction')} style={{ all: 'unset', cursor: 'pointer', color: JN.inkSoft }}>Instruction</button>
          <button onClick={() => nav('home')} style={{ all: 'unset', cursor: 'pointer', color: JN.inkSoft }}>Contact</button>
        </nav>
      </header>

      <div style={{ padding: '56px 48px 80px', maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, letterSpacing: '0.22em', color: JN.mute, textTransform: 'uppercase', marginBottom: 12 }}>
          <button onClick={() => nav('home')} style={{ all: 'unset', cursor: 'pointer', color: JN.red, textDecoration: 'underline', textUnderlineOffset: 3 }}>Index</button>
          &nbsp;/ Projects · § {p.num}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 32, marginBottom: 32, alignItems: 'baseline' }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, letterSpacing: '0.22em', color: JN.red, textTransform: 'uppercase' }}>§ {p.num} · {p.year}</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, letterSpacing: '0.14em', color: JN.mute }}>{p.tag}</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.mute }}>{p.status || '—'}</div>
        </div>

        <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 24px', textWrap: 'balance', color: JN.ink }}>
          {renderEditorialTitle(p.title)}
        </h1>
        <p style={{ fontSize: 22, lineHeight: 1.4, color: JN.inkSoft, maxWidth: 820, textWrap: 'pretty', margin: '0 0 48px', fontStyle: 'italic' }}>
          {p.desc.split('. ')[0]}.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, borderTop: `1px solid ${JN.rule}`, paddingTop: 28 }}>
          <aside style={{ fontFamily: fonts.sans, fontSize: 12, color: JN.mute, letterSpacing: '0.04em', position: 'sticky', top: 96, height: 'min-content' }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: JN.red, marginBottom: 8 }}>Collaborators</div>
              {(p.collaborators || []).map(a => <div key={a} style={{ color: JN.ink, marginBottom: 3 }}>{a}</div>)}
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: JN.red, marginBottom: 8 }}>Status</div>
              <div style={{ color: JN.ink }}>{p.status}</div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: JN.red, marginBottom: 8 }}>Keywords</div>
              <div style={{ color: JN.ink, lineHeight: 1.6 }}>{(p.keywords || []).join(' · ')}</div>
            </div>

            <div style={{ borderTop: `1px solid ${JN.rule}`, paddingTop: 20, marginTop: 24 }}>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: JN.red, marginBottom: 10 }}>Files</div>
              {p.pdf && (
                <a href={p.pdf} target="_blank" rel="noopener" style={{ display: 'block', padding: '10px 0', borderBottom: `1px dashed ${JN.ruleSoft}`, color: JN.ink, textDecoration: 'none', fontFamily: fonts.sans, fontSize: 13 }}>
                  <span style={{ fontFamily: fonts.mono, color: JN.red, fontSize: 11, letterSpacing: '0.14em', marginRight: 8 }}>PDF</span>
                  working paper →
                </a>
              )}
              {p.publication && (
                <a href={p.publication} target="_blank" rel="noopener" style={{ display: 'block', padding: '10px 0', borderBottom: `1px dashed ${JN.ruleSoft}`, color: JN.ink, textDecoration: 'none', fontFamily: fonts.sans, fontSize: 13 }}>
                  <span style={{ fontFamily: fonts.mono, color: JN.red, fontSize: 11, letterSpacing: '0.14em', marginRight: 8 }}>PUB</span>
                  Nature Communications →
                </a>
              )}
              {p.arxiv && (
                <a href={p.arxiv} target="_blank" rel="noopener" style={{ display: 'block', padding: '10px 0', borderBottom: `1px dashed ${JN.ruleSoft}`, color: JN.ink, textDecoration: 'none', fontFamily: fonts.sans, fontSize: 13 }}>
                  <span style={{ fontFamily: fonts.mono, color: JN.red, fontSize: 11, letterSpacing: '0.14em', marginRight: 8 }}>arXiv</span>
                  landing page →
                </a>
              )}
            </div>
          </aside>

          <article>
            <p style={{ fontSize: 18, lineHeight: 1.6, textWrap: 'pretty', margin: '0 0 32px', color: JN.inkSoft }}>
              <span style={{ float: 'left', fontSize: 64, lineHeight: 0.85, paddingRight: 10, color: JN.red, fontFamily: fonts.serif, marginTop: 4 }}>{p.desc[0]}</span>
              {p.desc.slice(1)}
            </p>
            <div style={{ aspectRatio: '16/7', border: `1px solid ${JN.rule}`, background: JN.paperWarm, margin: '24px 0 8px' }}>
              {p.id === 'spectral_sampling' ? <KaczmarzPlaceholder color={JN.red} /> : p.id === 'hiv_tb' ? <HivTbPlaceholder color={JN.red} accent={JN.blue} /> : <ReplayPlaceholder color={JN.red} accent={JN.blue} />}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.mute, letterSpacing: '0.06em', marginBottom: 40 }}>
              Fig. 1 — {figCaption(p.id)}.
            </div>
            {projectSections(p.id).map(s => (
              <div key={s.h} style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 24, fontWeight: 400, lineHeight: 1.2, margin: '0 0 10px', letterSpacing: '-0.005em', color: JN.ink }}>{s.h}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: JN.inkSoft, textWrap: 'pretty', margin: 0 }}>{s.p}</p>
              </div>
            ))}

            <div style={{ marginTop: 56, paddingTop: 20, borderTop: `1px solid ${JN.rule}`, display: 'flex', justifyContent: 'space-between', fontFamily: fonts.sans, fontSize: 12, color: JN.mute, letterSpacing: '0.12em' }}>
              {prev ? (
                <button onClick={() => nav('project', prev.id)} style={{ all: 'unset', cursor: 'pointer', color: JN.red }}>← § {prev.num} · {prev.shortTitle}</button>
              ) : <span />}
              <button onClick={() => nav('home')} style={{ all: 'unset', cursor: 'pointer', color: JN.mute }}>↑ Index</button>
              {next ? (
                <button onClick={() => nav('project', next.id)} style={{ all: 'unset', cursor: 'pointer', color: JN.red }}>§ {next.num} · {next.shortTitle} →</button>
              ) : <span />}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function renderEditorialTitle(title) {
  // italicize trailing "method name" for editorial feel — simple heuristic
  const words = title.split(' ');
  if (words.length > 4) {
    const pivot = Math.floor(words.length * 0.55);
    return <>{words.slice(0, pivot).join(' ')} <em>{words.slice(pivot).join(' ')}</em></>;
  }
  return title;
}

function figCaption(id) {
  return id === 'spectral_sampling' ? 'iterates projecting onto successive hyperplanes under spectral weighting'
       : id === 'hiv_tb' ? 'treatment-outcome trajectories, pre/post universal ART, Gaborone'
       : 'decoded odor-sequence ensembles during post-task quiescence';
}

function projectSections(id) {
  if (id === 'spectral_sampling') return [
    { h: '01 · Motivation', p: 'In tomography, consensus, and constrained optimization we meet systems Ax = b with m ≫ n. Iterative row-action methods are attractive because they avoid forming A⊤A and scale in m without ever holding the whole matrix. The question is which row to pick next.' },
    { h: '02 · Spectral weights', p: 'We derive a weight proportional to each row\'s alignment with the least-resolved singular direction. Computed once, reused across iterations. The cost is a small eigenpair estimate; the benefit is a geometry-aware sampler.' },
    { h: '03 · Convergence', p: 'On ill-conditioned problems we observe a consistent reduction in iterates-to-tolerance, with stronger gains at tighter tolerances. Acceleration is most pronounced for systems whose energy concentrates in a few directions.' },
    { h: '04 · Inequalities', p: 'The sampler extends naturally to overdetermined systems of linear inequalities, where the projection operator is one-sided. We show conditions under which the spectral bias remains well-defined.' },
  ];
  if (id === 'hiv_tb') return [
    { h: '01 · Background', p: 'Botswana\'s 2016 rollout of universal access to antiretroviral therapy created a natural discontinuity for studying how HIV co-infection interacts with tuberculosis treatment outcomes.' },
    { h: '02 · Data & design', p: 'Patient-level records from Gaborone health facilities were analyzed with a difference-in-differences specification, paired with a propensity-matched control for ART adherence.' },
    { h: '03 · Findings', p: 'Post-policy cohorts show meaningfully improved cure rates among HIV-positive TB patients, with the effect concentrated among those achieving viral suppression within six months.' },
  ];
  return [
    { h: '01 · Setup', p: 'Rats trained on an odor-sequence memory task; hippocampal ensemble activity recorded across task performance and subsequent quiescence.' },
    { h: '02 · Decoding', p: 'Bayesian ensemble decoders trained on task-phase activity were applied to replay windows. Candidate sequences were scored against the trained and novel task structure.' },
    { h: '03 · Result', p: 'Nonspatial odor sequences are replayed during quiescence with a forward/reverse bias dependent on task epoch, consistent with a role in consolidation of event order.' },
  ];
}

// ─────────────────────────────────────────────────────────────
// INSTRUCTION — Blueprint
// ─────────────────────────────────────────────────────────────
function InstructionBlueprint({ fontPair = 'ibm', nav }) {
  const fonts = BFonts(fontPair);
  const bg = {
    backgroundColor: JN.paper,
    backgroundImage: `${window.JN_TEXTURES.graphPaper(0.035, 26, '#8a7a60')}`,
    backgroundSize: '26px 26px',
  };
  const toc = [
    { n: 'I', title: 'Bayes, in brief', desc: 'Prior, likelihood, posterior; why the denominator is the hard part.' },
    { n: 'II', title: 'Monte Carlo & importance sampling', desc: 'Approximating expectations when the integrand is tractable but the integral is not.' },
    { n: 'III', title: 'Metropolis–Hastings', desc: 'Building a chain whose stationary distribution is the target; proposal design and diagnostics.' },
    { n: 'IV', title: 'Gibbs sampling', desc: 'Coordinate-wise conditionals when the full conditional is easy; blocked and collapsed variants.' },
    { n: 'V', title: 'Variational methods', desc: 'Optimization instead of sampling; the ELBO, mean-field approximations, and where they break down.' },
    { n: 'VI', title: 'Examples & errata', desc: 'Worked examples from Turkman, Paulino & Müller (Chapters 4–9) with corrections.' },
  ];
  return (
    <div style={{ ...bg, color: JN.ink, fontFamily: fonts.serif, minHeight: '100%' }}>
      <TopNav fonts={fonts} nav={nav} active="instruction" />

      <section style={{ padding: '72px 72px 48px', position: 'relative', overflow: 'hidden' }}>
        <Komorebi opacity={0.45} />
        <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: JN.mute, marginBottom: 18 }}>
          Instruction
        </div>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.02em', margin: 0, maxWidth: 1000, color: JN.ink, position: 'relative' }}>
          Notes I write to teach myself, kept public.
        </h1>
        <p style={{ fontFamily: fonts.serif, fontSize: 20, color: JN.inkSoft, marginTop: 24, maxWidth: 700, textWrap: 'pretty', position: 'relative' }}>
          Working documents and teaching material, mostly in progress. Everything here is a draft.
        </p>
      </section>

      <SashikoRule color={JN.red} opacity={1} />

      <section style={{ padding: '72px 72px' }}>
        <SheetHeaderB num="01" title="Resources" subtitle="One active — more to come" fonts={fonts} />
        <div style={{ marginTop: 40 }}>
          <button onClick={() => nav('guide')} style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 160px', gap: 48, padding: '28px 8px', transition: 'background 0.2s', borderBottom: `1px dashed ${JN.ruleSoft}` }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(244, 241, 234, 0.5)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Thumbnail */}
              <div style={{ aspectRatio: '3/4', background: JN.paperWarm, border: `1px solid ${JN.ruleSoft}`, position: 'relative', overflow: 'hidden', padding: 16 }}>
                <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 11, color: JN.muteCool, marginBottom: 8 }}>Volume I · draft</div>
                <div style={{ fontFamily: fonts.serif, fontSize: 22, lineHeight: 1.1, fontStyle: 'italic', color: JN.ink, marginBottom: 16 }}>A Student's Guide to <em style={{ color: JN.red }}>Numerical Bayes</em></div>
                <svg viewBox="0 0 140 160" style={{ width: '100%', height: 'auto' }}>
                  <path d="M 10 120 Q 40 40 70 100 T 130 120" fill="none" stroke={JN.red} strokeWidth="1.2" opacity="0.8" />
                  <path d="M 10 120 Q 40 70 70 110 T 130 120" fill="none" stroke={JN.red} strokeWidth="1.2" opacity="0.5" strokeDasharray="3,3" />
                  <line x1="10" y1="120" x2="130" y2="120" stroke={JN.ink} strokeWidth="0.5" />
                  {[20, 40, 60, 80, 100].map(x => <line key={x} x1={x} y1="120" x2={x} y2="124" stroke={JN.ink} strokeWidth="0.5" />)}
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.muteCool, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>In draft · 42 pages</div>
                <h3 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, lineHeight: 1.1, margin: '0 0 14px', color: JN.ink }}>A Student's Guide to <em>Numerical Bayes</em></h3>
                <p style={{ fontFamily: fonts.serif, fontSize: 17, lineHeight: 1.65, color: JN.inkSoft, textWrap: 'pretty', margin: '0 0 16px', maxWidth: 620 }}>
                  A reading companion to <em>Computational Bayesian Statistics — An Introduction</em> by Turkman, Paulino &amp; Müller. My attempt to simplify — to others, and to myself — the concepts and methods of numerical solutions to Bayesian inference, in a more accessible and intuitive way.
                </p>
                <p style={{ fontFamily: fonts.serif, fontSize: 15, lineHeight: 1.6, color: JN.mute, textWrap: 'pretty', margin: 0, maxWidth: 620, fontStyle: 'italic' }}>
                  A work in progress, and likely to contain mistakes — please <a href={'mailto:' + window.JN_DATA.contacts[0].value} style={{ color: JN.red }}>write to me</a> with any corrections or feedback.
                </p>
              </div>
              <div style={{ alignSelf: 'center', textAlign: 'right' }}>
                <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 16, color: JN.red }}>read →</div>
              </div>
            </div>
          </button>
        </div>

        {/* TOC preview */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.muteCool, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
            Table of contents
          </div>
          {toc.map((c, i) => (
            <div key={c.n} style={{ display: 'grid', gridTemplateColumns: '60px 260px 1fr auto', padding: '16px 0', borderBottom: i < toc.length - 1 ? `1px dashed ${JN.ruleSoft}` : 'none', alignItems: 'baseline', gap: 20 }}>
              <span style={{ fontFamily: fonts.serif, fontSize: 18, color: JN.red, fontStyle: 'italic' }}>{c.n}.</span>
              <span style={{ fontFamily: fonts.serif, fontSize: 20, color: JN.ink }}>{c.title}</span>
              <span style={{ fontFamily: fonts.serif, fontSize: 15, color: JN.inkSoft, textWrap: 'pretty', lineHeight: 1.5 }}>{c.desc}</span>
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 13, color: JN.mute }}>p. {i * 7 + 3}</span>
            </div>
          ))}
        </div>
      </section>

      <SashikoRule color={JN.red} opacity={1} />

      <section style={{ padding: '72px 72px' }}>
        <SheetHeaderB num="02" title="Soon" subtitle="Placeholders, still drafting" fonts={fonts} />
        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          {[
            { t: 'Variational inference, a working intuition', d: 'Why the ELBO looks the way it does; what the mean-field gives up.' },
            { t: 'Reading Strohmer–Vershynin', d: 'A slow pass through the paper that started my Kaczmarz curiosity.' },
          ].map(x => (
            <div key={x.t} style={{ opacity: 0.75 }}>
              <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 13, color: JN.mute, marginBottom: 8 }}>Not yet drafted</div>
              <h4 style={{ fontFamily: fonts.serif, fontSize: 24, fontWeight: 400, margin: '0 0 8px', color: JN.ink, lineHeight: 1.2 }}>{x.t}</h4>
              <p style={{ fontFamily: fonts.serif, fontSize: 16, lineHeight: 1.6, color: JN.inkSoft, margin: 0 }}>{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SheetFooter fonts={fonts} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GUIDE — simple reading view placeholder
// ─────────────────────────────────────────────────────────────
function GuideBlueprint({ fontPair, nav }) {
  const fonts = BFonts(fontPair);
  const bg = {
    backgroundColor: JN.paper,
    backgroundImage: `${window.JN_TEXTURES.graphPaper(0.035, 26, '#8a7a60')}`,
    backgroundSize: '26px 26px',
  };
  return (
    <div style={{ ...bg, color: JN.ink, fontFamily: fonts.serif, minHeight: '100%' }}>
      <TopNav fonts={fonts} nav={nav} active="instruction" />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 72px' }}>
        <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 14, color: JN.mute, marginBottom: 14 }}>Volume I — a draft</div>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.01em', margin: '0 0 20px', color: JN.ink }}>
          A Student's Guide to <em>Numerical Bayes</em>
        </h1>
        <p style={{ fontFamily: fonts.serif, fontSize: 20, lineHeight: 1.5, color: JN.inkSoft, textWrap: 'pretty', margin: '0 0 32px', fontStyle: 'italic' }}>
          with worked examples — after Turkman, Paulino &amp; Müller.
        </p>
        <SashikoRule color={JN.red} opacity={1} width={80} my={8} />
        <p style={{ fontFamily: fonts.serif, fontSize: 17, lineHeight: 1.75, color: JN.inkSoft, textWrap: 'pretty', margin: '28px 0 40px' }}>
          This is a reading companion, not a textbook. I wrote it while working through <em>Computational Bayesian Statistics — An Introduction</em>, and kept it public so that another student starting the same book might have a slightly shorter road.
        </p>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.muteCool, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>Contents</div>
        {[
          ['I', 'Bayes, in brief', 3],
          ['II', 'Monte Carlo & importance sampling', 10],
          ['III', 'Metropolis–Hastings', 17],
          ['IV', 'Gibbs sampling', 24],
          ['V', 'Variational methods', 31],
          ['VI', 'Examples & errata', 38],
        ].map(([n, title, p], i) => (
          <div key={n} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px dashed ${JN.ruleSoft}`, fontFamily: fonts.serif, fontSize: 18, color: JN.ink }}>
            <span><span style={{ color: JN.red, fontStyle: 'italic', marginRight: 16 }}>{n}.</span>{title}</span>
            <span style={{ fontStyle: 'italic', color: JN.mute, fontSize: 14 }}>p. {p}</span>
          </div>
        ))}
        <div style={{ marginTop: 48, padding: '24px 0', textAlign: 'center', fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 14, color: JN.mute }}>
          · body text in the PDF build ·
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button onClick={() => nav('instruction')} style={{ all: 'unset', cursor: 'pointer', fontFamily: fonts.serif, fontStyle: 'italic', color: JN.red, fontSize: 16 }}>← back to instruction</button>
        </div>
      </div>
      <SheetFooter fonts={fonts} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CV — Blueprint
// ─────────────────────────────────────────────────────────────
function CVBlueprint({ fontPair, nav }) {
  const fonts = BFonts(fontPair);
  const L = window.JN_DATA;
  const cv = L.cv;
  const bg = {
    backgroundColor: JN.paper,
    backgroundImage: `${window.JN_TEXTURES.graphPaper(0.035, 26, '#8a7a60')}`,
    backgroundSize: '26px 26px',
  };
  const roman = (n) => ({ '01': 'I', '02': 'II', '03': 'III', '04': 'IV' }[n] || n);
  const Block = ({ n, title, rows }) => (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 18, color: JN.red }}>§ {roman(n)}</span>
        <SashikoRule color={JN.red} opacity={1} width={32} />
        <h2 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em', margin: 0, color: JN.ink }}>{title}</h2>
      </div>
      <div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', padding: '16px 0', borderBottom: i < rows.length - 1 ? `1px dashed ${JN.ruleSoft}` : 'none', alignItems: 'baseline', gap: 24 }}>
            <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 14, color: JN.mute }}>{r.year}</span>
            <div>
              <div style={{ fontFamily: fonts.serif, fontSize: 19, color: JN.ink }}>{r.title}</div>
              {r.inst && <div style={{ fontFamily: fonts.serif, fontSize: 15, color: JN.inkSoft, marginTop: 2, fontStyle: 'italic' }}>{r.inst}</div>}
            </div>
            <div style={{ fontFamily: fonts.serif, fontSize: 15, color: JN.mute, textWrap: 'pretty', lineHeight: 1.55 }}>{r.note || ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ ...bg, color: JN.ink, fontFamily: fonts.serif, minHeight: '100%' }}>
      <TopNav fonts={fonts} nav={nav} active="cv" />
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '72px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end', marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: JN.mute, marginBottom: 12 }}>Curriculum vitae</div>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1, fontWeight: 400, letterSpacing: '-0.02em', margin: 0, color: JN.ink }}>
              James A. <em>Nguyen</em>
            </h1>
            <div style={{ fontFamily: fonts.serif, fontSize: 15, color: JN.mute, marginTop: 16, fontStyle: 'italic' }}>
              UC Irvine · PhD Statistics, class of 2032 · {L.contacts[0].value}
            </div>
          </div>
          <a href="files/nguyenJames_cv.pdf" target="_blank" rel="noopener" style={{ display: 'inline-block', padding: '10px 18px', borderBottom: `1px solid ${JN.red}`, color: JN.red, fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 16, textDecoration: 'none' }}>
            download PDF ↓
          </a>
        </div>

        <SashikoRule color={JN.red} opacity={1} />
        <div style={{ height: 40 }} />

        <Block n="01" title="Education" rows={cv.education} />
        <Block n="02" title="Research" rows={cv.research} />
        <Block n="03" title="Awards" rows={cv.awards} />
        <Block n="04" title="Teaching" rows={cv.teaching} />

        <div style={{ marginTop: 32, padding: '24px 0', fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: JN.mute, textAlign: 'center' }}>
          Full CV as PDF — <a href="files/nguyenJames_cv.pdf" target="_blank" rel="noopener" style={{ color: JN.red }}>files/nguyenJames_cv.pdf</a>
        </div>
      </div>
      <SheetFooter fonts={fonts} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COLLABORATORS — Blueprint
// ─────────────────────────────────────────────────────────────
function CollaboratorsBlueprint({ fontPair, nav }) {
  const fonts = BFonts(fontPair);
  const L = window.JN_DATA;
  const bg = {
    backgroundColor: JN.paper,
    backgroundImage: `${window.JN_TEXTURES.graphPaper(0.035, 26, '#8a7a60')}`,
    backgroundSize: '26px 26px',
  };
  return (
    <div style={{ ...bg, color: JN.ink, fontFamily: fonts.serif, minHeight: '100%', position: 'relative' }}>
      <TopNav fonts={fonts} nav={nav} active="collaborators" />
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '72px 72px', position: 'relative' }}>
        <Komorebi opacity={0.4} />
        <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: JN.mute, marginBottom: 16, position: 'relative' }}>Collaborators</div>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 48px', color: JN.ink, maxWidth: 900, position: 'relative' }}>
          People I've had the fortune to work with.
        </h1>
        <SashikoRule color={JN.red} opacity={1} />
        <div style={{ marginTop: 8 }}>
          {L.collaborators.map((c, i) => (
            <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr', padding: '22px 0', borderBottom: i < L.collaborators.length - 1 ? `1px dashed ${JN.ruleSoft}` : 'none', alignItems: 'baseline', gap: 20 }}>
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: JN.red }}>{i + 1}.</span>
              <span style={{ fontFamily: fonts.serif, fontSize: 22, color: JN.ink }}>{c.name}</span>
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 15, color: JN.mute }}>{c.role}</span>
              <span style={{ fontFamily: fonts.serif, fontSize: 16, color: JN.inkSoft }}>{c.inst}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: fonts.serif, fontSize: 17, color: JN.inkSoft, fontStyle: 'italic', marginTop: 40, maxWidth: 720, textWrap: 'pretty', lineHeight: 1.6 }}>
          Collaboration is the quiet engine of academic work. If you think there's a useful overlap with what you're working on, <a href={'mailto:' + L.contacts[0].value} style={{ color: JN.red }}>please write</a>.
        </p>
      </section>
      <SheetFooter fonts={fonts} />
    </div>
  );
}

Object.assign(window, {
  JamesWebsite,
  HomeBlueprint,
  ProjectDetailEditorial,
  InstructionBlueprint,
  GuideBlueprint,
  CVBlueprint,
  CollaboratorsBlueprint,
});
