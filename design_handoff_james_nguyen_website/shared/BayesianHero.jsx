// Animated Bayesian hero: prior fades in, then posterior + marginal draw
// in and subtly adapt. Plays once on load, persists static after.
// Renders inside an SVG so it scales cleanly.

function BayesianHero({ color = '#7a1a1a', accent = '#2b3f6b', height = 220, showCaption = true, seed = 0 }) {
  const W = 780, H = height;
  const [t, setT] = React.useState(0); // 0..1 progress

  React.useEffect(() => {
    const key = 'jn_hero_played_' + seed;
    const played = sessionStorage.getItem(key);
    if (played) { setT(1); return; }
    let raf;
    const start = performance.now();
    const dur = 2600;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else sessionStorage.setItem(key, '1');
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seed]);

  // Easings
  const e1 = easeOutCubic(clamp01(t / 0.45));          // prior 0..0.45
  const e2 = easeOutCubic(clamp01((t - 0.35) / 0.45)); // likelihood 0.35..0.8
  const e3 = easeOutCubic(clamp01((t - 0.55) / 0.45)); // posterior 0.55..1

  // Distributions
  const prior    = makeGaussian(0.50, 0.17, 1.0);           // wide prior
  const likeAdult = makeGaussian(0.62, 0.09, 1.25);         // sharp likelihood shifts right
  // Posterior interpolates from prior→combined as e3 progresses (Bayes update feeling)
  const postMu = lerp(prior.mu, combineMu(prior, likeAdult), e3);
  const postSd = lerp(prior.sd, combineSd(prior, likeAdult), e3);
  const posterior = makeGaussian(postMu, postSd, 1.45);

  const path = (d, amp) => distPath(d, W, H, amp);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`jn-prior-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.18" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`jn-like-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.22" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`jn-post-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.55" />
          <stop offset="1" stopColor={color} stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Baseline */}
      <line x1="0" y1={H - 18} x2={W} y2={H - 18} stroke={color} strokeWidth="0.5" strokeOpacity="0.35" />

      {/* Prior — fill + stroke */}
      <path d={path(prior, e1)} fill={`url(#jn-prior-${seed})`} />
      <path d={strokePath(prior, W, H, e1)} fill="none" stroke={color} strokeOpacity="0.5" strokeWidth="1" />

      {/* Likelihood (marginal feel) */}
      <path d={path(likeAdult, e2)} fill={`url(#jn-like-${seed})`} />
      <path d={strokePath(likeAdult, W, H, e2)} fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="3 2" />

      {/* Posterior — bold */}
      <path d={path(posterior, e3)} fill={`url(#jn-post-${seed})`} />
      <path d={strokePath(posterior, W, H, e3)} fill="none" stroke={color} strokeWidth="1.6" />

      {/* Reflection (subtle) */}
      <g transform={`translate(0 ${H - 18}) scale(1 -0.35)`} opacity="0.18">
        <path d={strokePath(posterior, W, H, e3)} fill="none" stroke={color} strokeWidth="1.2" />
      </g>

      {showCaption && (
        <g opacity={clamp01((t - 0.8) / 0.2)}>
          <text x={prior.mu * W - 110} y={H - 32} fontSize="10" fill={color} fontFamily="ui-monospace, Menlo, monospace" letterSpacing="0.08em">PRIOR π(θ)</text>
          <text x={likeAdult.mu * W + 10} y={H - 80} fontSize="10" fill={accent} fontFamily="ui-monospace, Menlo, monospace" letterSpacing="0.08em">LIKELIHOOD L(θ|x)</text>
          <text x={posterior.mu * W - 40} y={24} fontSize="10" fill={color} fontFamily="ui-monospace, Menlo, monospace" letterSpacing="0.08em">POSTERIOR π(θ|x)</text>
        </g>
      )}
    </svg>
  );
}

function clamp01(x) { return Math.max(0, Math.min(1, x)); }
function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function lerp(a, b, t) { return a + (b - a) * t; }
function makeGaussian(mu, sd, h) { return { mu, sd, h }; }
function combineMu(a, b) {
  const wa = 1 / (a.sd * a.sd), wb = 1 / (b.sd * b.sd);
  return (wa * a.mu + wb * b.mu) / (wa + wb);
}
function combineSd(a, b) {
  return Math.sqrt(1 / (1 / (a.sd * a.sd) + 1 / (b.sd * b.sd)));
}
function distY(d, x) {
  const z = (x - d.mu) / d.sd;
  return d.h * Math.exp(-0.5 * z * z);
}
function distPath(d, W, H, amp) {
  const baseline = H - 18;
  const topPad = 28;
  const maxY = H - topPad - 18;
  const N = 180;
  let out = `M 0 ${baseline}`;
  for (let i = 0; i <= N; i++) {
    const x = i / N;
    const px = x * W;
    const y = distY(d, x);
    const py = baseline - y * maxY * amp;
    out += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
  }
  out += ` L ${W} ${baseline} Z`;
  return out;
}
function strokePath(d, W, H, amp) {
  const baseline = H - 18;
  const topPad = 28;
  const maxY = H - topPad - 18;
  const N = 180;
  let out = '';
  for (let i = 0; i <= N; i++) {
    const x = i / N;
    const px = x * W;
    const y = distY(d, x);
    const py = baseline - y * maxY * amp;
    out += (i === 0 ? 'M' : 'L') + ` ${px.toFixed(1)} ${py.toFixed(1)} `;
  }
  return out;
}

Object.assign(window, { BayesianHero });
