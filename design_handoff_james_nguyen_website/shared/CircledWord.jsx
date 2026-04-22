// Hand-drawn ellipse around a word — the signature accent from old site.
function CircledWord({ children, color = '#7a1a1a', stroke = 2, tilt = -4, pad = 10 }) {
  const ref = React.useRef(null);
  const [box, setBox] = React.useState(null);
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setBox({ w: r.width, h: r.height });
  }, [children]);

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block', padding: `0 ${pad}px` }}>
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      {box && (
        <svg width={box.w} height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', transform: `rotate(${tilt}deg)` }}>
          <ellipse cx={box.w / 2} cy={box.h / 2}
            rx={box.w / 2 - 2} ry={box.h / 2 - 1}
            fill="none" stroke={color} strokeWidth={stroke} />
        </svg>
      )}
    </span>
  );
}

// Spiked underline (Hartcopy-style) — zigzag beneath text
function SpikedUnderline({ color = '#7a1a1a', spikes = 14, height = 8, width = '100%' }) {
  const pts = [];
  for (let i = 0; i <= spikes; i++) {
    const x = (i / spikes) * 100;
    const y = i % 2 === 0 ? 0 : height;
    pts.push(`${x},${y}`);
  }
  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" style={{ width, height, display: 'block' }}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

Object.assign(window, { CircledWord, SpikedUnderline });
