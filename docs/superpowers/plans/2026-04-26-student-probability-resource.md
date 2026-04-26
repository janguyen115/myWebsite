# Student Probability Resource Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone interactive probability distribution table page to the site and link it from the instruction page.

**Architecture:** `student-probability-resource.html` is a self-contained React + Babel + MathJax page that follows the same CDN-based, no-build pattern as `index.html`. Distribution data lives as a plain JS array at the top of the file — no component changes needed to add rows. The instruction page (`index.html`) gets a new resource card before the existing Numerical Bayes guide card.

**Tech Stack:** React 18.3.1 (CDN), Babel standalone 7.29.0 (CDN), MathJax 3 (CDN), Google Fonts (Libre Baskerville, Archivo, IBM Plex Mono), inline CSS.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `myWebsite/student-probability-resource.html` | Full standalone page: data array, all React components, styles |
| Modify | `myWebsite/index.html` lines ~889–923 | Add resource card before Numerical Bayes guide; update subtitle |

---

## Task 1: Create `student-probability-resource.html` — shell, tokens, and data array

**Files:**
- Create: `myWebsite/student-probability-resource.html`

- [ ] **Step 1: Create the file with this exact content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Probability Distributions — James A. Nguyen</title>
  <link rel="icon" href="images/favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Archivo:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script>
    window.MathJax = {
      tex: { inlineMath: [['\\(','\\)']], displayMath: [['\\[','\\]']] },
      startup: { typeset: false }
    };
  </script>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script" async></script>
  <style>
    html, body, #root { margin: 0; padding: 0; min-height: 100%; background: #f4f1ea; box-sizing: border-box; }
    *, *::before, *::after { box-sizing: inherit; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>
  <script type="text/babel" data-presets="env,react">

// ─── Tokens ───────────────────────────────────────────────────────────────────
const JN = {
  paper:     '#f4f1ea',
  paperWarm: '#efeadf',
  ink:       '#1a1a1c',
  inkSoft:   '#2c2a28',
  mute:      '#6e655a',
  muteCool:  '#5a5c62',
  rule:      '#cec8bb',
  ruleSoft:  '#e2dccf',
  red:       '#7a1a1a',
  redTint:   '#e8d6d0',
};
const F = {
  serif: "'Libre Baskerville', Georgia, serif",
  sans:  "'Archivo', sans-serif",
  mono:  "'IBM Plex Mono', monospace",
};

// ─── Column definitions ───────────────────────────────────────────────────────
const ALWAYS_COLS = [
  { key: 'name',       label: 'Distribution', width: '180px',  clickable: false },
  { key: 'parameters', label: 'Parameters',   width: '240px',  clickable: false },
  { key: 'pmfPdf',     label: 'PMF / PDF',    width: '1fr',    clickable: true  },
];
const TOGGLE_COLS = [
  { key: 'cdf',      label: 'CDF',    width: '1fr',   clickable: true },
  { key: 'mean',     label: 'E(X)',   width: '120px', clickable: true },
  { key: 'variance', label: 'Var(X)', width: '120px', clickable: true },
  { key: 'mgf',      label: 'MGF',   width: '1fr',   clickable: true },
];

// ─── Distribution data ────────────────────────────────────────────────────────
// Add one object per distribution. LaTeX strings go inside \( \) for inline
// or \[ \] for display — MathJax renders them automatically.
// Leave a field as '' to show '—' in the cell.
const DISTRIBUTIONS = [
  {
    id: 'binomial',
    name: 'Binomial',
    parameters: 'X \\sim \\operatorname{Binomial}(n,\\, p)',
    pmfPdf:    '\\binom{n}{k} p^{k}(1-p)^{n-k}',
    cdf:       '',
    mean:      'np',
    variance:  'np(1-p)',
    mgf:       '(1-p+pe^{t})^{n}',
    useCases:    '',
    history:     '',
    example:     '',
    relationships: '',
    derivations: {
      pmfPdf:   '',
      cdf:      '',
      mean:     '',
      variance: '',
      mgf:      '',
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getGridTemplate(visibleCols, activeCol) {
  const cols = [
    ...ALWAYS_COLS,
    ...TOGGLE_COLS.filter(c => visibleCols[c.key]),
  ];
  return cols.map(c => {
    if (c.key === activeCol) return 'minmax(320px, 2fr)';
    return c.width;
  }).join(' ');
}

function MathCell({ latex }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!latex || !ref.current || !window.MathJax) return;
    window.MathJax.typesetPromise([ref.current]).catch(() => {});
  }, [latex]);
  if (!latex) return <span style={{ color: JN.mute, fontFamily: F.serif, fontSize: 15 }}>—</span>;
  return (
    <span ref={ref} style={{ fontFamily: F.serif, fontSize: 15 }}>
      {`\\(${latex}\\)`}
    </span>
  );
}

// ─── Expanded row ─────────────────────────────────────────────────────────────
function ExpandedRow({ dist, activeCol }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.MathJax) {
      window.MathJax.typesetPromise([ref.current]).catch(() => {});
    }
  }, [dist.id, activeCol]);

  const sections = [
    { key: 'useCases',     label: 'Use Cases'     },
    { key: 'history',      label: 'History'       },
    { key: 'example',      label: 'Example'       },
    { key: 'relationships',label: 'Relationships' },
  ];

  const derivation = activeCol ? dist.derivations[activeCol] : null;
  const colLabel = activeCol
    ? [...ALWAYS_COLS, ...TOGGLE_COLS].find(c => c.key === activeCol)?.label
    : null;

  return (
    <div ref={ref} style={{
      borderBottom: `1px solid ${JN.rule}`,
      background: JN.paperWarm,
      padding: '28px 24px',
    }}>
      {derivation && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: JN.red, marginBottom: 10 }}>
            {colLabel} — Derivation
          </div>
          <div style={{ fontFamily: F.serif, fontSize: 15, lineHeight: 1.75, color: JN.ink }}
            dangerouslySetInnerHTML={{ __html: derivation }} />
        </div>
      )}
      {!derivation && activeCol && (
        <div style={{ marginBottom: 28, fontFamily: F.serif, fontSize: 14, fontStyle: 'italic', color: JN.mute }}>
          No derivation added yet.
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 48px' }}>
        {sections.map(({ key, label }) => {
          const content = dist[key];
          return (
            <div key={key}>
              <div style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: JN.mute, marginBottom: 8 }}>
                {label}
              </div>
              {content
                ? <div style={{ fontFamily: F.serif, fontSize: 15, lineHeight: 1.7, color: JN.inkSoft }}
                    dangerouslySetInnerHTML={{ __html: content }} />
                : <div style={{ fontFamily: F.serif, fontSize: 14, fontStyle: 'italic', color: JN.mute }}>—</div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Distribution row ─────────────────────────────────────────────────────────
function DistRow({ dist, expandedRow, setExpandedRow, activeCol, setActiveCol, visibleCols, gridTemplate }) {
  const isExpanded = expandedRow === dist.id;

  const handleNameClick = () => {
    if (isExpanded && activeCol === null) {
      setExpandedRow(null);
    } else {
      setExpandedRow(dist.id);
      setActiveCol(null);
    }
  };

  const handleCellClick = (colKey) => {
    if (isExpanded && activeCol === colKey) {
      setExpandedRow(null);
      setActiveCol(null);
    } else {
      setExpandedRow(dist.id);
      setActiveCol(colKey);
    }
  };

  const visibleToggleCols = TOGGLE_COLS.filter(c => visibleCols[c.key]);

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: gridTemplate,
        borderBottom: isExpanded ? 'none' : `1px solid ${JN.ruleSoft}`,
        transition: 'background 0.15s',
      }}>
        {/* Distribution name */}
        <div
          onClick={handleNameClick}
          style={{
            padding: '18px 16px',
            cursor: 'pointer',
            fontFamily: F.serif,
            fontSize: 16,
            color: isExpanded && activeCol === null ? JN.red : JN.ink,
            borderRight: `1px solid ${JN.ruleSoft}`,
            userSelect: 'none',
          }}
        >
          {dist.name}
        </div>

        {/* Parameters (not clickable) */}
        <div style={{
          padding: '18px 16px',
          borderRight: `1px solid ${JN.ruleSoft}`,
          display: 'flex',
          alignItems: 'center',
        }}>
          <MathCell latex={dist.parameters} />
        </div>

        {/* PMF/PDF */}
        <CellClickable
          colKey="pmfPdf"
          latex={dist.pmfPdf}
          isActive={isExpanded && activeCol === 'pmfPdf'}
          onClick={() => handleCellClick('pmfPdf')}
          borderRight={visibleToggleCols.length > 0}
        />

        {/* Toggleable formula columns */}
        {visibleToggleCols.map((col, i) => (
          <CellClickable
            key={col.key}
            colKey={col.key}
            latex={dist[col.key]}
            isActive={isExpanded && activeCol === col.key}
            onClick={() => handleCellClick(col.key)}
            borderRight={i < visibleToggleCols.length - 1}
          />
        ))}
      </div>

      {isExpanded && (
        <ExpandedRow dist={dist} activeCol={activeCol} />
      )}
    </>
  );
}

function CellClickable({ latex, isActive, onClick, borderRight }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '18px 16px',
        cursor: 'pointer',
        background: isActive ? JN.redTint : 'transparent',
        borderRight: borderRight ? `1px solid ${JN.ruleSoft}` : 'none',
        display: 'flex',
        alignItems: 'center',
        transition: 'background 0.15s',
        userSelect: 'none',
      }}
    >
      <MathCell latex={latex} />
    </div>
  );
}

// ─── Column toggles ───────────────────────────────────────────────────────────
function ColumnToggles({ visibleCols, setVisibleCols }) {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: JN.mute }}>
        Show columns
      </span>
      {TOGGLE_COLS.map(col => (
        <label key={col.key} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={visibleCols[col.key]}
            onChange={e => setVisibleCols(prev => ({ ...prev, [col.key]: e.target.checked }))}
            style={{ accentColor: JN.red, width: 14, height: 14 }}
          />
          <span style={{ fontFamily: F.sans, fontSize: 13, color: JN.inkSoft }}>
            {col.label}
          </span>
        </label>
      ))}
    </div>
  );
}

// ─── Table header ─────────────────────────────────────────────────────────────
function TableHeader({ visibleCols, activeCol, gridTemplate }) {
  const visibleToggleCols = TOGGLE_COLS.filter(c => visibleCols[c.key]);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: gridTemplate,
      borderBottom: `2px solid ${JN.rule}`,
      background: JN.paperWarm,
    }}>
      {[...ALWAYS_COLS, ...visibleToggleCols].map((col, i, arr) => (
        <div key={col.key} style={{
          padding: '12px 16px',
          fontFamily: F.sans,
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: activeCol === col.key ? JN.red : JN.muteCool,
          borderRight: i < arr.length - 1 ? `1px solid ${JN.ruleSoft}` : 'none',
          fontWeight: activeCol === col.key ? 500 : 400,
        }}>
          {col.label}
        </div>
      ))}
    </div>
  );
}

// ─── Nav header ───────────────────────────────────────────────────────────────
function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 48px',
      borderBottom: `1px solid ${JN.ruleSoft}`,
      background: JN.paper,
    }}>
      <a href="index.html" style={{ textDecoration: 'none', color: JN.ink, fontFamily: F.serif, fontSize: 17 }}>
        James A. Nguyen
      </a>
      <nav style={{ display: 'flex', gap: 32 }}>
        <a href="index.html#instruction" style={navLink}>Instruction</a>
        <a href="index.html#cv"          style={navLink}>CV</a>
      </nav>
    </header>
  );
}
const navLink = {
  textDecoration: 'none',
  fontFamily: F.sans,
  fontSize: 13,
  letterSpacing: '0.08em',
  color: JN.mute,
};

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [expandedRow, setExpandedRow]   = React.useState(null);
  const [activeCol, setActiveCol]       = React.useState(null);
  const [visibleCols, setVisibleCols]   = React.useState({ cdf: false, mean: false, variance: false, mgf: false });

  const handleSetExpanded = (id) => {
    if (id !== expandedRow) setActiveCol(null);
    setExpandedRow(id);
  };

  const gridTemplate = getGridTemplate(visibleCols, activeCol);

  return (
    <div style={{ color: JN.ink, minHeight: '100vh', background: JN.paper }}>
      <Header />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 48px 80px' }}>
        {/* Page heading */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 15, color: JN.mute, marginBottom: 12 }}>
            Instruction
          </div>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, lineHeight: 1.1, margin: '0 0 16px', color: JN.ink }}>
            Probability Distributions
          </h1>
          <p style={{ fontFamily: F.serif, fontSize: 17, lineHeight: 1.65, color: JN.inkSoft, margin: '0 0 36px', maxWidth: 680 }}>
            A reference table for common probability distributions. Click a distribution name to expand narrative details. Click a formula cell to expand its derivation.
          </p>
          <ColumnToggles visibleCols={visibleCols} setVisibleCols={setVisibleCols} />
        </div>

        {/* Table */}
        <div style={{ border: `1px solid ${JN.rule}`, borderRadius: 2, overflow: 'hidden' }}>
          <TableHeader visibleCols={visibleCols} activeCol={activeCol} gridTemplate={gridTemplate} />
          {DISTRIBUTIONS.map(dist => (
            <DistRow
              key={dist.id}
              dist={dist}
              expandedRow={expandedRow}
              setExpandedRow={handleSetExpanded}
              activeCol={activeCol}
              setActiveCol={setActiveCol}
              visibleCols={visibleCols}
              gridTemplate={gridTemplate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>
```

- [ ] **Step 2: Open `student-probability-resource.html` in a browser and verify**

Expected:
- Header shows "James A. Nguyen" linking back to `index.html`
- Page heading "Probability Distributions" visible
- "Show columns" toggle bar with 4 unchecked checkboxes (CDF, E(X), Var(X), MGF)
- Table renders with 3 columns: Distribution | Parameters | PMF/PDF
- One row for "Binomial" with formula `X ~ Binomial(n, p)` and PMF formula rendered by MathJax
- Clicking "Binomial" expands a row below with 4 narrative sections (all showing "—" since fields are empty)
- Clicking the PMF/PDF cell expands the row and highlights that cell with a red tint; shows "No derivation added yet."
- Clicking the same cell again collapses the row
- Checking a toggle checkbox adds that column to the table
- MathJax renders formulas (may take 1–2 seconds to load)

- [ ] **Step 3: Commit**

```bash
git -C /Users/jamesanguyen/Desktop/professional/projects/myWebsite add student-probability-resource.html
git -C /Users/jamesanguyen/Desktop/professional/projects/myWebsite commit -m "feat: add student probability resource page"
```

---

## Task 2: Add resource card to the instruction page in `index.html`

**Files:**
- Modify: `myWebsite/index.html` — `InstructionBlueprint` component, the Resources section (~line 888)

The Resources section currently has one card (Numerical Bayes guide) and the subtitle "One active, more to come". Add a card for the probability resource **before** the Numerical Bayes card, and update the subtitle.

- [ ] **Step 1: Locate the Resources section in `index.html`**

Search for `SheetHeaderB num="01" title="Resources"` — it is around line 889. The section looks like:

```jsx
<section className="jn-section" style={{ padding: '72px 72px' }}>
  <SheetHeaderB num="01" title="Resources" subtitle="One active, more to come" fonts={fonts} />
  <div style={{ marginTop: 40 }}>
    <button onClick={() => nav('guide')} style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}>
      <div className="jn-grid-2col" style={{ display: 'grid', gridTemplateColumns: '220px 1fr 160px', gap: 48, padding: '28px 8px', borderBottom: `1px dashed ${JN.ruleSoft}`, transition: 'background 0.2s' }}
        ...existing Numerical Bayes card content...
      </div>
    </button>
  </div>
  ...toc...
```

- [ ] **Step 2: Replace the subtitle and add the probability resource card before the Numerical Bayes card**

Find this exact block:

```jsx
        <SheetHeaderB num="01" title="Resources" subtitle="One active, more to come" fonts={fonts} />
        <div style={{ marginTop: 40 }}>
          <button onClick={() => nav('guide')} style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}>
```

Replace it with:

```jsx
        <SheetHeaderB num="01" title="Resources" subtitle="Two active, more to come" fonts={fonts} />
        <div style={{ marginTop: 40 }}>
          <button onClick={() => { window.location.href = 'student-probability-resource.html'; }} style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}>
            <div className="jn-grid-2col" style={{ display: 'grid', gridTemplateColumns: '220px 1fr 160px', gap: 48, padding: '28px 8px', borderBottom: `1px dashed ${JN.ruleSoft}`, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,241,234,0.5)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ aspectRatio: '3/4', background: JN.paperWarm, border: `1px solid ${JN.ruleSoft}`, padding: 16 }}>
                <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 11, color: JN.muteCool, marginBottom: 8 }}>Reference &middot; in progress</div>
                <div style={{ fontFamily: fonts.serif, fontSize: 22, lineHeight: 1.1, fontStyle: 'italic', color: JN.ink, marginBottom: 16 }}>
                  Probability <em style={{ color: JN.red }}>Distributions</em>
                </div>
                <svg viewBox="0 0 140 160" style={{ width: '100%', height: 'auto' }}>
                  <line x1="10" y1="40" x2="130" y2="40" stroke={JN.rule} strokeWidth="0.5" />
                  <line x1="10" y1="70" x2="130" y2="70" stroke={JN.rule} strokeWidth="0.5" />
                  <line x1="10" y1="100" x2="130" y2="100" stroke={JN.rule} strokeWidth="0.5" />
                  <line x1="10" y1="130" x2="130" y2="130" stroke={JN.rule} strokeWidth="0.5" />
                  <rect x="10" y="28" width="50" height="12" fill={JN.red} opacity="0.15" rx="1" />
                  <rect x="10" y="58" width="70" height="12" fill={JN.ruleSoft} rx="1" />
                  <rect x="10" y="88" width="60" height="12" fill={JN.ruleSoft} rx="1" />
                  <rect x="10" y="118" width="80" height="12" fill={JN.ruleSoft} rx="1" />
                  <text x="10" y="38" fontFamily="serif" fontSize="7" fill={JN.red} opacity="0.9">Binomial</text>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, color: JN.muteCool, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>In progress &middot; interactive</div>
                <h3 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 400, lineHeight: 1.1, margin: '0 0 14px', color: JN.ink }}>Probability <em>Distributions</em></h3>
                <p style={{ fontFamily: fonts.serif, fontSize: 17, lineHeight: 1.65, color: JN.inkSoft, margin: '0 0 16px', maxWidth: 620 }}>
                  An interactive reference table for common probability distributions — parameters, PMF/PDF, CDF, moments, and MGF, with derivations and worked examples I add over time.
                </p>
              </div>
              <div style={{ alignSelf: 'center', textAlign: 'right' }}>
                <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 16, color: JN.red }}>explore &rarr;</div>
              </div>
            </div>
          </button>
          <button onClick={() => nav('guide')} style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}>
```

- [ ] **Step 3: Open `index.html#instruction` in a browser and verify**

Expected:
- Resources section subtitle reads "Two active, more to come"
- A new card "Probability Distributions" appears before "A Student's Guide to Numerical Bayes"
- Hovering the card shows the background highlight
- Clicking the card navigates to `student-probability-resource.html`
- The Numerical Bayes card still works and navigates to its guide

- [ ] **Step 4: Commit**

```bash
git -C /Users/jamesanguyen/Desktop/professional/projects/myWebsite add index.html
git -C /Users/jamesanguyen/Desktop/professional/projects/myWebsite commit -m "feat: link probability resource from instruction page"
```

---

## Self-Review

**Spec coverage:**
- ✅ `student-probability-resource.html` — standalone, CDN React + MathJax, matches site palette/fonts
- ✅ Distribution data as plain JS array at top of file; one Binomial example entry included
- ✅ Always-visible: Distribution, Parameters, PMF/PDF
- ✅ Toggleable: CDF, E(X), Var(X), MGF — checkboxes above table
- ✅ Click distribution name → row expands downward with 4 narrative sections
- ✅ Click formula cell → row expands + that column widens + derivation shown
- ✅ One row open at a time; opening another collapses current
- ✅ Clicking active trigger again collapses row
- ✅ Instruction page: new card added before Numerical Bayes guide
- ✅ Instruction page subtitle updated

**No redirect file:** The spec draft included a `student-probability-resource-redirect.html` modeled on `cv.html` / `collaborators.html`, but those redirect to SPA hash routes. Since `student-probability-resource.html` is itself the destination (not a hash route), no redirect file is needed — the instruction page links directly to it.

**LaTeX rendering:** MathJax is async. `MathCell` uses a `useEffect` + `typesetPromise` to render after mount. Expanding/collapsing rows re-triggers typesetting via `useEffect` dependencies. This matches the pattern in `index.html`.

**`dangerouslySetInnerHTML`:** Used for narrative fields (`useCases`, `history`, `example`, `relationships`, `derivations.*`). The content comes entirely from the user's own data array — no external input — so XSS is not a concern.
