# Distribution Visualizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive SVG visualizer to the hero section of `student-probability-resource.html` that plots the PDF/PMF and CDF of whichever distribution is currently expanded in the table, with adjustable parameter sliders, a draggable x-value for reading off CDF, and toggleable z-score and CDF overlays.

**Architecture:** All code lives inline inside the existing `<script type="text/babel">` block in `student-probability-resource.html` — no new files, no build step. A `DIST_MATH` lookup object (keyed by `dist.id`) provides JS math functions (pdf/pmf, cdf, xRange, mean, std) and parameter slider config for all 13 distributions. A `DistributionViz` React component renders the SVG plot and controls. The hero section becomes a flex row: left = existing text, right = `DistributionViz`.

**Tech Stack:** React 18 UMD, inline SVG (no D3/Recharts), Lanczos gamma approximation, Simpson's-rule numerical CDF for Gamma/Beta/Chi-Square.

---

## File structure

- **Modify only:** `myWebsite/instruction_content/student-probability-resource.html`
  - Insert math utilities after `const ACTIVE_BONUS = 80;`
  - Insert `DIST_MATH` config after math utilities
  - Insert `DistributionViz` component before `// ─── Expand arrow bar ───`
  - Modify `App` to add `vizParams`, `vizSelectedX`, `vizShowCDF`, `vizShowZScore` state
  - Modify hero `<section>` to flex layout with `DistributionViz` on the right

---

## Task 1: Math utility functions

**Files:**
- Modify: `myWebsite/instruction_content/student-probability-resource.html` — insert after `const ACTIVE_BONUS = 80;`

- [ ] **Step 1: Insert math utility block**

Find the line `const ACTIVE_BONUS = 80;` and insert the following immediately after it:

```javascript
// ─── Math utilities ───────────────────────────────────────────────────────────
function lnGamma(z) {
  // Lanczos approximation
  const C = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313,  -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  let x = C[0];
  for (let i = 1; i < 9; i++) x += C[i] / (z + i);
  const t = z + 7.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function gammaFn(z) { return Math.exp(lnGamma(z)); }

// Abramowitz & Stegun 7-term rational erfc
function erfc(x) {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y = (((((1.061405429*t - 1.453152027)*t + 1.421413741)*t
               - 0.284496736)*t + 0.254829592)*t) * Math.exp(-x*x);
  return x >= 0 ? y : 2 - y;
}

function normalCDF(z) { return 0.5 * erfc(-z / Math.SQRT2); }

function logBinom(n, k) {
  if (k < 0 || k > n) return -Infinity;
  return lnGamma(n + 1) - lnGamma(k + 1) - lnGamma(n - k + 1);
}

// Simpson's rule — used for CDFs with no closed form
function simpsonCDF(pdfFn, xMin, xVal, steps = 400) {
  if (xVal <= xMin) return 0;
  const n = steps % 2 === 0 ? steps : steps + 1;
  const h = (xVal - xMin) / n;
  let s = pdfFn(xMin) + pdfFn(xVal);
  for (let i = 1; i < n; i++) s += (i % 2 === 0 ? 2 : 4) * pdfFn(xMin + i * h);
  return Math.max(0, Math.min(1, (h / 3) * s));
}
```

- [ ] **Step 2: Verify in browser**

Open `student-probability-resource.html` in a browser. Open the console and run:
```javascript
normalCDF(0)        // → 0.5
normalCDF(1.96)     // → ~0.975
gammaFn(5)          // → 24  (= 4!)
logBinom(10, 3)     // → ~4.787 (= ln C(10,3))
```
All four should match expected values. Fix any syntax errors before proceeding.

- [ ] **Step 3: Commit**
```bash
git add myWebsite/instruction_content/student-probability-resource.html
git commit -m "feat: add math utility functions for distribution visualizer"
```

---

## Task 2: DIST_MATH configuration object

**Files:**
- Modify: `student-probability-resource.html` — insert immediately after the math utilities block from Task 1

Each entry provides: `paramConfig` (slider specs), `pdf(x, p)` or `pmf(k, p)`, `cdf(x, p)`, `xRange(p)` → `[min, max]`, `mean(p)`, `std(p)`, `continuous` (boolean).

- [ ] **Step 1: Insert DIST_MATH block**

```javascript
// ─── Distribution math config ─────────────────────────────────────────────────
const DIST_MATH = {
  'uniform-discrete': {
    continuous: false,
    paramConfig: [
      { key: 'a', label: 'a', min: -10, max: 10, step: 1, defaultVal: 0 },
      { key: 'b', label: 'b', min: -9,  max: 20, step: 1, defaultVal: 5 },
    ],
    xRange: p => [p.a - 0.5, p.b + 0.5],
    pdf:    (k, p) => (k >= p.a && k <= p.b && Number.isInteger(k)) ? 1 / (p.b - p.a + 1) : 0,
    cdf:    (x, p) => x < p.a ? 0 : x >= p.b ? 1 : (Math.floor(x) - p.a + 1) / (p.b - p.a + 1),
    mean:   p => (p.a + p.b) / 2,
    std:    p => Math.sqrt(((p.b - p.a + 1) ** 2 - 1) / 12),
  },

  'uniform-continuous': {
    continuous: true,
    paramConfig: [
      { key: 'a', label: 'a', min: -10, max: 9,  step: 0.1, defaultVal: 0 },
      { key: 'b', label: 'b', min: -9,  max: 10, step: 0.1, defaultVal: 1 },
    ],
    xRange: p => [p.a - (p.b - p.a) * 0.1, p.b + (p.b - p.a) * 0.1],
    pdf:    (x, p) => (x >= p.a && x <= p.b && p.b > p.a) ? 1 / (p.b - p.a) : 0,
    cdf:    (x, p) => x <= p.a ? 0 : x >= p.b ? 1 : (x - p.a) / (p.b - p.a),
    mean:   p => (p.a + p.b) / 2,
    std:    p => (p.b - p.a) / Math.sqrt(12),
  },

  'bernoulli': {
    continuous: false,
    paramConfig: [
      { key: 'p', label: 'p', min: 0.01, max: 0.99, step: 0.01, defaultVal: 0.5 },
    ],
    xRange: _ => [-0.5, 1.5],
    pdf:    (k, p) => k === 0 ? (1 - p.p) : k === 1 ? p.p : 0,
    cdf:    (x, p) => x < 0 ? 0 : x < 1 ? (1 - p.p) : 1,
    mean:   p => p.p,
    std:    p => Math.sqrt(p.p * (1 - p.p)),
  },

  'binomial': {
    continuous: false,
    paramConfig: [
      { key: 'n', label: 'n', min: 1,    max: 50,   step: 1,    defaultVal: 10  },
      { key: 'p', label: 'p', min: 0.01, max: 0.99, step: 0.01, defaultVal: 0.5 },
    ],
    xRange: p => [-0.5, p.n + 0.5],
    pdf: (k, p) => {
      if (k < 0 || k > p.n || !Number.isInteger(k)) return 0;
      return Math.exp(logBinom(p.n, k) + k * Math.log(p.p) + (p.n - k) * Math.log(1 - p.p));
    },
    cdf: (x, p) => {
      let s = 0;
      for (let k = 0; k <= Math.floor(x) && k <= p.n; k++) {
        s += Math.exp(logBinom(p.n, k) + k * Math.log(p.p) + (p.n - k) * Math.log(1 - p.p));
      }
      return Math.min(1, s);
    },
    mean: p => p.n * p.p,
    std:  p => Math.sqrt(p.n * p.p * (1 - p.p)),
  },

  'exponential': {
    continuous: true,
    paramConfig: [
      { key: 'lambda', label: 'λ', min: 0.1, max: 5, step: 0.1, defaultVal: 1 },
    ],
    xRange: p => [0, 5 / p.lambda],
    pdf:    (x, p) => x < 0 ? 0 : p.lambda * Math.exp(-p.lambda * x),
    cdf:    (x, p) => x < 0 ? 0 : 1 - Math.exp(-p.lambda * x),
    mean:   p => 1 / p.lambda,
    std:    p => 1 / p.lambda,
  },

  'gamma': {
    continuous: true,
    paramConfig: [
      { key: 'alpha', label: 'α', min: 0.5, max: 10, step: 0.5, defaultVal: 2 },
      { key: 'beta',  label: 'β', min: 0.1, max: 5,  step: 0.1, defaultVal: 1 },
    ],
    xRange: p => [0, p.alpha * p.beta + 5 * Math.sqrt(p.alpha) * p.beta],
    pdf: (x, p) => {
      if (x <= 0) return 0;
      return Math.exp((p.alpha - 1) * Math.log(x) - x / p.beta
        - p.alpha * Math.log(p.beta) - lnGamma(p.alpha));
    },
    cdf: (x, p) => {
      if (x <= 0) return 0;
      const pdfFn = t => t <= 0 ? 0 : Math.exp((p.alpha - 1) * Math.log(t) - t / p.beta
        - p.alpha * Math.log(p.beta) - lnGamma(p.alpha));
      return simpsonCDF(pdfFn, 0, x);
    },
    mean: p => p.alpha * p.beta,
    std:  p => Math.sqrt(p.alpha) * p.beta,
  },

  'poisson': {
    continuous: false,
    paramConfig: [
      { key: 'lambda', label: 'λ', min: 0.5, max: 20, step: 0.5, defaultVal: 3 },
    ],
    xRange: p => [-0.5, Math.max(15, p.lambda + 5 * Math.sqrt(p.lambda)) + 0.5],
    pdf: (k, p) => {
      if (k < 0 || !Number.isInteger(k)) return 0;
      return Math.exp(k * Math.log(p.lambda) - p.lambda - lnGamma(k + 1));
    },
    cdf: (x, p) => {
      let s = 0;
      for (let k = 0; k <= Math.floor(x); k++) {
        s += Math.exp(k * Math.log(p.lambda) - p.lambda - lnGamma(k + 1));
      }
      return Math.min(1, s);
    },
    mean: p => p.lambda,
    std:  p => Math.sqrt(p.lambda),
  },

  'geometric': {
    continuous: false,
    paramConfig: [
      { key: 'p', label: 'p', min: 0.05, max: 0.95, step: 0.05, defaultVal: 0.3 },
    ],
    xRange: p => [0.5, Math.ceil(Math.log(0.001) / Math.log(1 - p.p)) + 0.5],
    pdf:    (k, p) => (k >= 1 && Number.isInteger(k)) ? Math.pow(1 - p.p, k - 1) * p.p : 0,
    cdf:    (x, p) => x < 1 ? 0 : 1 - Math.pow(1 - p.p, Math.floor(x)),
    mean:   p => 1 / p.p,
    std:    p => Math.sqrt((1 - p.p) / (p.p ** 2)),
  },

  'negative binomial': {
    continuous: false,
    paramConfig: [
      { key: 'r', label: 'r', min: 1,    max: 20,   step: 1,    defaultVal: 3   },
      { key: 'p', label: 'p', min: 0.05, max: 0.95, step: 0.05, defaultVal: 0.5 },
    ],
    xRange: p => [-0.5, Math.ceil(p.r * (1 - p.p) / p.p + 5 * Math.sqrt(p.r * (1 - p.p)) / p.p) + 0.5],
    pdf: (k, p) => {
      if (k < 0 || !Number.isInteger(k)) return 0;
      return Math.exp(logBinom(k + p.r - 1, k) + k * Math.log(1 - p.p) + p.r * Math.log(p.p));
    },
    cdf: (x, p) => {
      let s = 0;
      for (let k = 0; k <= Math.floor(x); k++) {
        s += Math.exp(logBinom(k + p.r - 1, k) + k * Math.log(1 - p.p) + p.r * Math.log(p.p));
      }
      return Math.min(1, s);
    },
    mean: p => p.r * (1 - p.p) / p.p,
    std:  p => Math.sqrt(p.r * (1 - p.p) / (p.p ** 2)),
  },

  'hypergeometric': {
    continuous: false,
    paramConfig: [
      { key: 'N', label: 'N', min: 10, max: 100, step: 1, defaultVal: 50 },
      { key: 'K', label: 'K', min: 1,  max: 50,  step: 1, defaultVal: 20 },
      { key: 'n', label: 'n', min: 1,  max: 40,  step: 1, defaultVal: 15 },
    ],
    xRange: p => [
      Math.max(0, p.n + p.K - p.N) - 0.5,
      Math.min(p.n, p.K) + 0.5,
    ],
    pdf: (k, p) => {
      if (!Number.isInteger(k) || k < Math.max(0, p.n + p.K - p.N) || k > Math.min(p.n, p.K)) return 0;
      return Math.exp(logBinom(p.K, k) + logBinom(p.N - p.K, p.n - k) - logBinom(p.N, p.n));
    },
    cdf: (x, p) => {
      let s = 0;
      const kMin = Math.max(0, p.n + p.K - p.N);
      for (let k = kMin; k <= Math.min(Math.floor(x), p.n, p.K); k++) {
        s += Math.exp(logBinom(p.K, k) + logBinom(p.N - p.K, p.n - k) - logBinom(p.N, p.n));
      }
      return Math.min(1, s);
    },
    mean: p => p.n * p.K / p.N,
    std:  p => Math.sqrt(p.n * (p.K / p.N) * (1 - p.K / p.N) * (p.N - p.n) / (p.N - 1)),
  },

  'normal': {
    continuous: true,
    paramConfig: [
      { key: 'mu',    label: 'μ', min: -10, max: 10, step: 0.1, defaultVal: 0 },
      { key: 'sigma', label: 'σ', min: 0.1, max: 5,  step: 0.1, defaultVal: 1 },
    ],
    xRange: p => [p.mu - 4 * p.sigma, p.mu + 4 * p.sigma],
    pdf:    (x, p) => Math.exp(-0.5 * ((x - p.mu) / p.sigma) ** 2) / (p.sigma * Math.sqrt(2 * Math.PI)),
    cdf:    (x, p) => normalCDF((x - p.mu) / p.sigma),
    mean:   p => p.mu,
    std:    p => p.sigma,
  },

  'chi-square': {
    continuous: true,
    paramConfig: [
      { key: 'k', label: 'k', min: 1, max: 30, step: 1, defaultVal: 3 },
    ],
    xRange: p => [0, p.k + 5 * Math.sqrt(2 * p.k)],
    pdf: (x, p) => {
      if (x <= 0) return 0;
      const k = p.k;
      return Math.exp((k / 2 - 1) * Math.log(x) - x / 2 - (k / 2) * Math.log(2) - lnGamma(k / 2));
    },
    cdf: (x, p) => {
      if (x <= 0) return 0;
      const pdfFn = t => t <= 0 ? 0 : Math.exp((p.k / 2 - 1) * Math.log(t) - t / 2
        - (p.k / 2) * Math.log(2) - lnGamma(p.k / 2));
      return simpsonCDF(pdfFn, 0, x);
    },
    mean: p => p.k,
    std:  p => Math.sqrt(2 * p.k),
  },

  'beta': {
    continuous: true,
    paramConfig: [
      { key: 'alpha', label: 'α', min: 0.5, max: 10, step: 0.5, defaultVal: 2 },
      { key: 'beta',  label: 'β', min: 0.5, max: 10, step: 0.5, defaultVal: 2 },
    ],
    xRange: _ => [0, 1],
    pdf: (x, p) => {
      if (x <= 0 || x >= 1) return 0;
      const lnB = lnGamma(p.alpha) + lnGamma(p.beta) - lnGamma(p.alpha + p.beta);
      return Math.exp((p.alpha - 1) * Math.log(x) + (p.beta - 1) * Math.log(1 - x) - lnB);
    },
    cdf: (x, p) => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      const lnB = lnGamma(p.alpha) + lnGamma(p.beta) - lnGamma(p.alpha + p.beta);
      const pdfFn = t => t <= 0 || t >= 1 ? 0
        : Math.exp((p.alpha - 1) * Math.log(t) + (p.beta - 1) * Math.log(1 - t) - lnB);
      return simpsonCDF(pdfFn, 0, x);
    },
    mean: p => p.alpha / (p.alpha + p.beta),
    std:  p => Math.sqrt(p.alpha * p.beta / ((p.alpha + p.beta) ** 2 * (p.alpha + p.beta + 1))),
  },
};
```

- [ ] **Step 2: Verify in browser console**

Open the page and run:
```javascript
// Exponential(λ=1): pdf at x=1 should be ~0.368, cdf at x=1 should be ~0.632
DIST_MATH['exponential'].pdf(1, {lambda: 1})   // → ~0.368
DIST_MATH['exponential'].cdf(1, {lambda: 1})   // → ~0.632

// Normal(μ=0,σ=1): cdf at x=0 should be 0.5
DIST_MATH['normal'].cdf(0, {mu: 0, sigma: 1})  // → 0.5

// Binomial(n=10, p=0.5): pmf at k=5 should be ~0.246
DIST_MATH['binomial'].pdf(5, {n: 10, p: 0.5}) // → ~0.246
```

- [ ] **Step 3: Commit**
```bash
git add myWebsite/instruction_content/student-probability-resource.html
git commit -m "feat: add DIST_MATH config for all 13 distributions"
```

---

## Task 3: SVG plot component

**Files:**
- Modify: `student-probability-resource.html` — insert `DistPlot` component before `// ─── Expand arrow bar ───`

The plot renders an SVG with axes, PDF/PMF curve or bars, and optional overlays passed as props.

- [ ] **Step 1: Insert DistPlot component**

```javascript
// ─── Distribution visualizer ──────────────────────────────────────────────────
const PLOT_W = 480, PLOT_H = 260;
const MARGIN = { top: 16, right: 16, bottom: 36, left: 44 };
const PW = PLOT_W - MARGIN.left - MARGIN.right;  // 420
const PH = PLOT_H - MARGIN.top  - MARGIN.bottom; // 208

function toSvgX(x, xMin, xMax) { return MARGIN.left + ((x - xMin) / (xMax - xMin)) * PW; }
function toSvgY(y, yMax)        { return MARGIN.top  + (1 - y / yMax) * PH; }

function DistPlot({ math, params, showCDF, showZScore, selectedX, onSelectX }) {
  const [xMin, xMax] = math.xRange(params);
  const mu  = math.mean(params);
  const sig = math.std(params);

  // Build plot points
  const points = [];
  const N = math.continuous ? 300 : Math.min(Math.round(xMax - xMin) + 1, 120);

  if (math.continuous) {
    for (let i = 0; i <= N; i++) {
      const x = xMin + (i / N) * (xMax - xMin);
      points.push({ x, y: math.pdf(x, params) });
    }
  } else {
    for (let k = Math.ceil(xMin); k <= Math.floor(xMax); k++) {
      points.push({ x: k, y: math.pdf(k, params) });
    }
  }

  const yMax = Math.max(...points.map(p => p.y)) * 1.18 || 1;

  // Axes
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => f * yMax).filter(v => v <= yMax);
  const xTickCount = 6;
  const xTicks = Array.from({ length: xTickCount + 1 }, (_, i) =>
    xMin + (i / xTickCount) * (xMax - xMin));

  // CDF shading path (continuous)
  let cdfPath = '';
  if (showCDF && math.continuous) {
    const cdfPts = points.filter(p => p.x <= selectedX);
    if (cdfPts.length > 1) {
      const lineCoords = cdfPts.map(p => `${toSvgX(p.x, xMin, xMax).toFixed(1)},${toSvgY(p.y, yMax).toFixed(1)}`).join(' ');
      const bL = toSvgX(cdfPts[0].x,  xMin, xMax).toFixed(1);
      const bR = toSvgX(cdfPts[cdfPts.length - 1].x, xMin, xMax).toFixed(1);
      const bY = (MARGIN.top + PH).toFixed(1);
      cdfPath = `M${bL},${bY} L${lineCoords} L${bR},${bY} Z`;
    }
  }

  // Drag handler
  const svgRef = React.useRef(null);
  const dragging = React.useRef(false);
  const resolveX = (clientX) => {
    const rect = svgRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left - MARGIN.left) / PW;
    return Math.max(xMin, Math.min(xMax, xMin + ratio * (xMax - xMin)));
  };
  const onMouseDown = (e) => { dragging.current = true; onSelectX(resolveX(e.clientX)); e.preventDefault(); };
  const onMouseMove = (e) => { if (dragging.current) onSelectX(resolveX(e.clientX)); };
  const onMouseUp   = ()  => { dragging.current = false; };

  const selSvgX   = toSvgX(selectedX, xMin, xMax);
  const selCDF    = math.cdf(selectedX, params);
  const zScore    = sig > 0 ? (selectedX - mu) / sig : 0;
  const barWidth  = math.continuous ? 0 : Math.max(2, PW / (points.length + 1) * 0.65);

  return (
    <svg
      ref={svgRef}
      width={PLOT_W} height={PLOT_H}
      style={{ display: 'block', cursor: 'crosshair', userSelect: 'none' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* CDF shading (continuous) */}
      {showCDF && cdfPath && (
        <path d={cdfPath} fill={JN.redTint} fillOpacity={0.7} stroke="none" />
      )}

      {/* PDF curve (continuous) */}
      {math.continuous && points.length > 1 && (
        <polyline
          points={points.map(p => `${toSvgX(p.x, xMin, xMax).toFixed(1)},${toSvgY(p.y, yMax).toFixed(1)}`).join(' ')}
          fill="none"
          stroke={JN.red}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      )}

      {/* PMF bars (discrete) */}
      {!math.continuous && points.map(({ x, y }) => {
        const bx = toSvgX(x, xMin, xMax) - barWidth / 2;
        const by = toSvgY(y, yMax);
        const bh = MARGIN.top + PH - by;
        const isLeft = showCDF && x <= selectedX;
        return (
          <rect
            key={x}
            x={bx.toFixed(1)} y={by.toFixed(1)}
            width={barWidth.toFixed(1)} height={Math.max(0, bh).toFixed(1)}
            fill={isLeft ? JN.red : JN.redTint}
            fillOpacity={isLeft ? 0.75 : 0.5}
            stroke={JN.red}
            strokeWidth={0.8}
          />
        );
      })}

      {/* x-value indicator line */}
      <line
        x1={selSvgX.toFixed(1)} y1={MARGIN.top}
        x2={selSvgX.toFixed(1)} y2={MARGIN.top + PH}
        stroke={JN.ink} strokeWidth={1} strokeDasharray="3 3"
      />
      <circle cx={selSvgX.toFixed(1)} cy={(MARGIN.top + PH / 2).toFixed(1)} r={4}
        fill={JN.ink} />

      {/* Z-score mean/sigma markers */}
      {showZScore && sig > 0 && [-2, -1, 1, 2].map(n => {
        const mx = toSvgX(mu + n * sig, xMin, xMax);
        if (mx < MARGIN.left || mx > MARGIN.left + PW) return null;
        return (
          <g key={n}>
            <line x1={mx} y1={MARGIN.top} x2={mx} y2={MARGIN.top + PH}
              stroke={JN.mute} strokeWidth={0.8} strokeDasharray="2 4" />
            <text x={mx} y={MARGIN.top + PH + 12}
              fontFamily={F.sans} fontSize={8} fill={JN.mute}
              textAnchor="middle">{n > 0 ? '+' : ''}{n}σ</text>
          </g>
        );
      })}

      {/* Axes */}
      <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={MARGIN.top + PH}
        stroke={JN.rule} strokeWidth={1} />
      <line x1={MARGIN.left} y1={MARGIN.top + PH} x2={MARGIN.left + PW} y2={MARGIN.top + PH}
        stroke={JN.rule} strokeWidth={1} />

      {/* x-axis ticks */}
      {xTicks.map((v, i) => {
        const sx = toSvgX(v, xMin, xMax);
        const label = Math.abs(v) < 0.001 ? '0' : v % 1 === 0 ? v.toFixed(0) : v.toFixed(1);
        return (
          <g key={i}>
            <line x1={sx} y1={MARGIN.top + PH} x2={sx} y2={MARGIN.top + PH + 4}
              stroke={JN.rule} strokeWidth={1} />
            <text x={sx} y={MARGIN.top + PH + 14}
              fontFamily={F.sans} fontSize={9} fill={JN.mute} textAnchor="middle">
              {label}
            </text>
          </g>
        );
      })}

      {/* y-axis ticks */}
      {yTicks.map((v, i) => {
        const sy = toSvgY(v, yMax);
        const label = v.toFixed(v < 0.1 ? 3 : 2);
        return (
          <g key={i}>
            <line x1={MARGIN.left - 4} y1={sy} x2={MARGIN.left} y2={sy}
              stroke={JN.rule} strokeWidth={1} />
            <text x={MARGIN.left - 7} y={sy + 3}
              fontFamily={F.sans} fontSize={9} fill={JN.mute} textAnchor="end">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 2: Verify — component renders without errors**

Add a temporary test render just above `ReactDOM.createRoot(...)`:
```javascript
// TEMP — remove after verification
console.log('DistPlot defined:', typeof DistPlot);
```
Open browser, check console — should see `DistPlot defined: function`. Remove the temp line.

- [ ] **Step 3: Commit**
```bash
git add myWebsite/instruction_content/student-probability-resource.html
git commit -m "feat: add DistPlot SVG component with PDF/PMF and CDF shading"
```

---

## Task 4: DistributionViz panel (sliders, toggles, stats)

**Files:**
- Modify: `student-probability-resource.html` — insert `DistributionViz` component immediately after `DistPlot`

- [ ] **Step 1: Insert DistributionViz component**

```javascript
function DistributionViz({ dist, vizParams, setVizParams, selectedX, setSelectedX, showCDF, setShowCDF, showZScore, setShowZScore }) {
  if (!dist) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 340, color: JN.mute, fontFamily: F.serif, fontStyle: 'italic', fontSize: 15,
      }}>
        Click any row or cell to visualize its distribution.
      </div>
    );
  }

  const math = DIST_MATH[dist.id];
  if (!math) return null;

  // Build current params from vizParams state (falling back to defaults)
  const params = {};
  math.paramConfig.forEach(pc => {
    params[pc.key] = vizParams[dist.id]?.[pc.key] ?? pc.defaultVal;
  });

  const [xMin, xMax] = math.xRange(params);
  const mu   = math.mean(params);
  const sig  = math.std(params);
  const cdfVal = math.cdf(selectedX, params);
  const zVal   = sig > 0 ? (selectedX - mu) / sig : 0;

  const updateParam = (key, val) => {
    setVizParams(prev => ({
      ...prev,
      [dist.id]: { ...prev[dist.id], [key]: val },
    }));
  };

  const toggleStyle = (active) => ({
    all: 'unset', cursor: 'pointer',
    padding: '3px 10px',
    fontFamily: F.sans, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
    color: active ? JN.red : JN.mute,
    background: active ? JN.redTint : 'transparent',
    border: `1px solid ${active ? JN.rule : JN.ruleSoft}`,
    borderRadius: 2,
    transition: 'background 0.15s, color 0.15s',
  });

  return (
    <div style={{ fontFamily: F.sans }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 15, color: JN.ink }}>
          {dist.name}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={toggleStyle(showCDF)}    onClick={() => setShowCDF(v => !v)}>CDF</button>
          <button style={toggleStyle(showZScore)} onClick={() => setShowZScore(v => !v)}>z-score</button>
        </div>
      </div>

      {/* Plot */}
      <div style={{ border: `1px solid ${JN.ruleSoft}`, borderRadius: 2, overflow: 'hidden', background: JN.paper }}>
        <DistPlot
          math={math}
          params={params}
          showCDF={showCDF}
          showZScore={showZScore}
          selectedX={selectedX}
          onSelectX={setSelectedX}
        />
      </div>

      {/* x-value slider */}
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: JN.mute, flexShrink: 0 }}>x</span>
        <input
          type="range"
          min={xMin} max={xMax}
          step={math.continuous ? (xMax - xMin) / 400 : 1}
          value={selectedX}
          onChange={e => setSelectedX(Number(e.target.value))}
          style={{ flex: 1, accentColor: JN.red }}
        />
        <span style={{ fontSize: 11, color: JN.inkSoft, minWidth: 44, textAlign: 'right' }}>
          {selectedX % 1 === 0 ? selectedX.toFixed(0) : selectedX.toFixed(2)}
        </span>
      </div>

      {/* Stats readout */}
      <div style={{
        marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: '6px 16px', padding: '8px 12px',
        background: JN.paperWarm, border: `1px solid ${JN.ruleSoft}`, borderRadius: 2,
      }}>
        {[
          { label: showZScore ? 'z' : 'x',  value: showZScore ? zVal.toFixed(3) : (selectedX % 1 === 0 ? selectedX.toFixed(0) : selectedX.toFixed(3)) },
          { label: 'F(x)',  value: cdfVal.toFixed(4) },
          { label: 'E[X]',  value: Number.isFinite(mu)  ? mu.toFixed(3)  : '—' },
          { label: '1–F(x)', value: (1 - cdfVal).toFixed(4) },
          { label: 'σ',     value: Number.isFinite(sig) ? sig.toFixed(3) : '—' },
          { label: showZScore ? 'x' : 'z',  value: showZScore ? (selectedX % 1 === 0 ? selectedX.toFixed(0) : selectedX.toFixed(3)) : zVal.toFixed(3) },
        ].map(({ label, value }) => (
          <div key={label}>
            <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: JN.mute, marginBottom: 2 }}>{label}</div>
            <div style={{ fontFamily: F.mono, fontSize: 12, color: JN.inkSoft }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Parameter sliders */}
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {math.paramConfig.map(pc => {
          const val = params[pc.key];
          return (
            <div key={pc.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: JN.mute, minWidth: 20 }}>{pc.label}</span>
              <input
                type="range"
                min={pc.min} max={pc.max} step={pc.step}
                value={val}
                onChange={e => updateParam(pc.key, Number(e.target.value))}
                style={{ flex: 1, accentColor: JN.red }}
              />
              <span style={{ fontFamily: F.mono, fontSize: 11, color: JN.inkSoft, minWidth: 36, textAlign: 'right' }}>
                {val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add myWebsite/instruction_content/student-probability-resource.html
git commit -m "feat: add DistributionViz panel with sliders, toggles, and stats"
```

---

## Task 5: App state wiring + hero layout

**Files:**
- Modify: `student-probability-resource.html` — `App` function and hero `<section>`

- [ ] **Step 1: Add new state to App**

Inside `function App()`, after the existing `const [typeFilter, ...]` line, add:

```javascript
  const [vizParams,   setVizParams]   = React.useState({});
  const [vizSelectedX, setVizSelectedX] = React.useState(0);
  const [vizShowCDF,   setVizShowCDF]   = React.useState(true);
  const [vizShowZScore, setVizShowZScore] = React.useState(false);
```

- [ ] **Step 2: Reset selectedX when the active distribution changes**

After the existing `React.useEffect` that resets `expandedRow` when `displayedDists` changes, add:

```javascript
  // Reset x-slider to mean of new distribution
  React.useEffect(() => {
    if (!expandedRow) return;
    const dist = DISTRIBUTIONS.find(d => d.id === expandedRow);
    if (!dist) return;
    const math = DIST_MATH[dist.id];
    if (!math) return;
    const pc = math.paramConfig;
    const params = {};
    pc.forEach(p => { params[p.key] = vizParams[dist.id]?.[p.key] ?? p.defaultVal; });
    setVizSelectedX(math.mean(params));
  }, [expandedRow]);
```

- [ ] **Step 3: Compute currentVizDist**

After the `handleToggleExpand` function, add:

```javascript
  const currentVizDist = expandedRow ? DISTRIBUTIONS.find(d => d.id === expandedRow) : null;
```

- [ ] **Step 4: Rewrite the hero section to flex layout**

Find the entire `{/* Hero */}` section block and replace it:

```jsx
      {/* Hero */}
      <section className="jn-hero" style={{ padding: '72px 72px 48px', position: 'relative', overflow: 'hidden' }}>
        <Komorebi />
        <div style={{ position: 'relative', display: 'flex', gap: 56, alignItems: 'flex-start' }}>
          {/* Left: title + description */}
          <div style={{ flex: '0 0 auto', maxWidth: 500 }}>
            {/* Breadcrumb */}
            <div style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: JN.mute, marginBottom: 32 }}>
              <a href="../index.html" style={{ all: 'unset', cursor: 'pointer', color: JN.mute }}>Home</a>
              <span style={{ margin: '0 8px' }}>/</span>
              <a href="../index.html#instruction" style={{ all: 'unset', cursor: 'pointer', color: JN.red }}>Instruction</a>
              <span style={{ margin: '0 8px' }}>/</span>
              <span style={{ color: JN.muteCool }}>Probability Distributions</span>
            </div>
            <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 15, color: JN.mute, marginBottom: 18 }}>Reference &middot; in progress</div>
            <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 24px', color: JN.ink }}>
              Probability Distributions
            </h1>
            <p style={{ fontFamily: F.serif, fontSize: 18, color: JN.inkSoft, margin: '0 0 14px', lineHeight: 1.6 }}>
              A reference table for common probability distributions and their properties.
            </p>
            <p style={{ fontFamily: F.sans, fontSize: 13, color: JN.mute, margin: '0 0 6px', lineHeight: 1.6 }}>
              Collapse columns to hide CDF, E(x), Var(x), MGF.
            </p>
            <p style={{ fontFamily: F.sans, fontSize: 13, color: JN.mute, margin: '0 0 6px', lineHeight: 1.6 }}>
              Click any cell to view relevant derivations and other useful descriptions.
            </p>
            <p style={{ fontFamily: F.sans, fontSize: 13, color: JN.mute, margin: '0 0 6px', lineHeight: 1.6 }}>
              Notation key available in the sidebar on the left.
            </p>
          </div>

          {/* Right: visualizer */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <DistributionViz
              dist={currentVizDist}
              vizParams={vizParams}
              setVizParams={setVizParams}
              selectedX={vizSelectedX}
              setSelectedX={setVizSelectedX}
              showCDF={vizShowCDF}
              setShowCDF={setVizShowCDF}
              showZScore={vizShowZScore}
              setShowZScore={setVizShowZScore}
            />
          </div>
        </div>
      </section>
```

- [ ] **Step 5: Verify end-to-end**

Open `student-probability-resource.html` in the browser:
1. Hero should show title left, placeholder text right ("Click any row or cell to visualize…")
2. Click the "Normal (Gaussian)" row name → visualizer appears on the right with a bell curve
3. Drag the μ slider → curve shifts left/right
4. Drag the σ slider → curve narrows/widens
5. Toggle "CDF" button → shaded area appears/disappears under the curve left of the indicator
6. Toggle "z-score" button → dashed vertical lines at ±1σ, ±2σ appear
7. Drag the x-slider or click on the SVG → indicator line moves, F(x) and z values update in the stats panel
8. Click "Binomial" row → bars appear, CDF shading turns bars red for k ≤ x
9. Switching distributions resets x to the new distribution's mean

Fix any issues before committing.

- [ ] **Step 6: Commit**
```bash
git add myWebsite/instruction_content/student-probability-resource.html
git commit -m "feat: wire DistributionViz into hero section, linked to active table row"
```

---

## Self-review

**Spec coverage:**

| Requirement | Covered by |
|---|---|
| Visualize distribution of active row | Task 5 Step 4 — `currentVizDist` from `expandedRow` |
| Parameter sliders | Task 4 — `paramConfig` → `<input type="range">` |
| x-value slider to read CDF | Task 4 — x-slider + `math.cdf(selectedX, params)` |
| SVG drag to set x | Task 3 — `onMouseDown/Move` on SVG |
| CDF toggleable | Task 4 — `showCDF` toggle button + shading in Task 3 |
| Z-score toggleable | Task 4 — `showZScore` toggle button + markers in Task 3 |
| Empty hero space used | Task 5 — hero becomes flex row |
| Discrete distributions (bars) | Task 3 — `!math.continuous` branch |
| Continuous distributions (curve) | Task 3 — `math.continuous` polyline |
| All 13 distributions | Task 2 — `DIST_MATH` covers all entries in `DISTRIBUTIONS` |

**Placeholder scan:** None found — all steps contain complete code.

**Type consistency:** `vizParams` is `{ [distId]: { [paramKey]: number } }` — used consistently across `App` state, `updateParam`, and `params` construction in `DistributionViz`. `math.pdf/cdf` always takes `(x, params)` — matches call sites in `DistPlot` and stats readout. `onSelectX` prop in `DistPlot` matches `setSelectedX` passed from `DistributionViz`. All consistent.

---

Plan complete and saved to `docs/superpowers/plans/2026-04-28-distribution-visualizer.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
