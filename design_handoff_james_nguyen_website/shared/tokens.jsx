// Shared design tokens for the Nguyen website redesign explorations.
// Palette: neutral paper/bone base, oxblood/iron-red dominant, muted indigo secondary.

window.JN_TOKENS = {
  // Bone / paper neutrals
  paper: '#f4f1ea',       // primary bg
  paperWarm: '#efeadf',   // alt bg
  paperCool: '#edeae3',   // cooler alt
  ink: '#1a1a1c',         // near-black body
  inkSoft: '#2c2a28',
  mute: '#6e655a',        // muted warm gray
  muteCool: '#5a5c62',    // muted cool gray
  rule: '#cec8bb',        // rule lines
  ruleSoft: '#e2dccf',

  // Oxblood red (deep iron-red)
  red: '#7a1a1a',
  redInk: '#5e1515',
  redSoft: '#a23d32',
  redTint: '#e8d6d0',

  // Muted indigo secondary (blueprint-ish but toned down)
  blue: '#2b3f6b',
  blueSoft: '#4d6a9a',
  blueTint: '#d3dbe8',
};

// Graph paper + sashiko textures as data URIs (intensity 1 per user prefs — very subtle)
window.JN_TEXTURES = {
  graphPaper: (opacity = 0.04, size = 24, color = '#6e655a') => {
    const c = encodeURIComponent(color);
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Cpath d='M ${size} 0 L 0 0 0 ${size}' fill='none' stroke='${c}' stroke-width='0.5' opacity='${opacity}'/%3E%3C/svg%3E")`;
  },
  sashikoHitomezashi: (color = '#7a1a1a', opacity = 0.5) => {
    // small vertical dashed line — used as a tiny repeating accent
    const c = encodeURIComponent(color);
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M6 0 V4 M6 6 V10' stroke='${c}' stroke-width='1' opacity='${opacity}'/%3E%3C/svg%3E")`;
  },
  // Horizontal sashiko running stitch — hand-drawn feel inspired by loose District-Vision-style linework.
  // Each stitch is a curved path with per-stitch wobble, pressure variation (stroke-width),
  // and small ink-bleed dots at terminations.
  sashikoRule: (color = '#7a1a1a', opacity = 0.55) => {
    const c = encodeURIComponent(color);
    // Tile: 200x12. Center y ≈ 6.
    const stitches = [
      { x: 2,   len: 12, o: 0.9,  sw: 1.4, ty: 5.6, wob: 0.6,  pull: -0.3 },
      { x: 20,  len: 9,  o: 0.7,  sw: 1.0, ty: 6.3, wob: -0.4, pull: 0.2 },
      { x: 36,  len: 14, o: 0.95, sw: 1.6, ty: 5.7, wob: 0.8,  pull: -0.5 },
      { x: 58,  len: 8,  o: 0.65, sw: 0.9, ty: 6.4, wob: -0.5, pull: 0.3 },
      { x: 72,  len: 13, o: 0.88, sw: 1.3, ty: 5.9, wob: 0.5,  pull: -0.2 },
      { x: 92,  len: 10, o: 0.75, sw: 1.1, ty: 6.1, wob: -0.6, pull: 0.4 },
      { x: 108, len: 15, o: 0.93, sw: 1.5, ty: 5.8, wob: 0.7,  pull: -0.4 },
      { x: 130, len: 9,  o: 0.7,  sw: 1.0, ty: 6.2, wob: -0.3, pull: 0.2 },
      { x: 146, len: 12, o: 0.85, sw: 1.3, ty: 6.0, wob: 0.5,  pull: -0.3 },
      { x: 164, len: 8,  o: 0.68, sw: 0.95,ty: 6.3, wob: -0.4, pull: 0.1 },
      { x: 178, len: 13, o: 0.88, sw: 1.35,ty: 5.9, wob: 0.6,  pull: -0.3 },
    ];
    // Build a curved path for each stitch — quadratic bezier w/ a wobble control point.
    // Start and end y are slightly offset (handheld pull); control point adds the curvy wobble.
    const strokes = stitches.map(s => {
      const x1 = s.x;
      const y1 = s.ty + s.pull * 0.4;
      const x2 = s.x + s.len;
      const y2 = s.ty - s.pull * 0.4;
      const cx = s.x + s.len * 0.5;
      const cy = (y1 + y2) / 2 + s.wob;
      return `%3Cpath d='M${x1} ${y1.toFixed(2)} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${x2} ${y2.toFixed(2)}' stroke='${c}' stroke-width='${s.sw}' stroke-linecap='round' fill='none' opacity='${(s.o * opacity).toFixed(2)}'/%3E`;
    }).join('');
    // Ink-bleed dots at stitch endpoints — tiny, low opacity
    const dots = stitches.map(s => {
      const r1 = (s.sw * 0.7).toFixed(2);
      const r2 = (s.sw * 0.6).toFixed(2);
      return `%3Ccircle cx='${s.x}' cy='${(s.ty + s.pull * 0.4).toFixed(2)}' r='${r1}' fill='${c}' opacity='${(s.o * opacity * 0.35).toFixed(2)}'/%3E%3Ccircle cx='${s.x + s.len}' cy='${(s.ty - s.pull * 0.4).toFixed(2)}' r='${r2}' fill='${c}' opacity='${(s.o * opacity * 0.3).toFixed(2)}'/%3E`;
    }).join('');
    // Blurred bloom layer — wider, very low opacity, filtered
    const bloom = stitches.map(s => {
      const x1 = s.x;
      const y1 = s.ty + s.pull * 0.4;
      const x2 = s.x + s.len;
      const y2 = s.ty - s.pull * 0.4;
      const cx = s.x + s.len * 0.5;
      const cy = (y1 + y2) / 2 + s.wob;
      return `%3Cpath d='M${x1} ${y1.toFixed(2)} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${x2} ${y2.toFixed(2)}' stroke='${c}' stroke-width='${(s.sw * 2.4).toFixed(2)}' stroke-linecap='round' fill='none' opacity='${(s.o * opacity * 0.22).toFixed(2)}'/%3E`;
    }).join('');
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='12' viewBox='0 0 200 12'%3E%3Cdefs%3E%3Cfilter id='b' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeGaussianBlur stdDeviation='0.7'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23b)'%3E${bloom}%3C/g%3E${dots}${strokes}%3C/svg%3E")`;
  },
  // Grainy mesh gradient: warm paper with soft komorebi dapples.
  grainMesh: () => (
    `radial-gradient(ellipse 900px 600px at 12% 8%, rgba(255, 244, 214, 0.55), transparent 60%),
     radial-gradient(ellipse 700px 500px at 88% 18%, rgba(232, 214, 208, 0.35), transparent 65%),
     radial-gradient(ellipse 600px 700px at 30% 95%, rgba(211, 219, 232, 0.28), transparent 70%),
     radial-gradient(circle 300px at 70% 70%, rgba(255, 236, 196, 0.32), transparent 70%)`
  ),
  // Fine film grain via SVG turbulence
  grainNoise: (opacity = 0.07) => {
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.4 0 0 0 0 0.36 0 0 0 0 0.3 0 0 0 ${opacity} 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
  },
};

// Komorebi (light-through-leaves) dappled light overlay component markup
window.JN_KOMOREBI_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;mix-blend-mode:soft-light;opacity:0.6">
  <defs>
    <filter id="komBlur"><feGaussianBlur stdDeviation="28"/></filter>
  </defs>
  <g filter="url(#komBlur)">
    <ellipse cx="180" cy="140" rx="90" ry="40" fill="#fff4c8" opacity="0.55"/>
    <ellipse cx="320" cy="240" rx="60" ry="30" fill="#ffecb0" opacity="0.4"/>
    <ellipse cx="540" cy="90" rx="110" ry="50" fill="#fff0c0" opacity="0.5"/>
    <ellipse cx="850" cy="180" rx="80" ry="40" fill="#ffe8a8" opacity="0.45"/>
    <ellipse cx="1050" cy="320" rx="100" ry="50" fill="#fff4c8" opacity="0.4"/>
    <ellipse cx="240" cy="520" rx="70" ry="35" fill="#fff0c0" opacity="0.35"/>
    <ellipse cx="720" cy="640" rx="120" ry="55" fill="#ffecb0" opacity="0.4"/>
  </g>
</svg>
`;
