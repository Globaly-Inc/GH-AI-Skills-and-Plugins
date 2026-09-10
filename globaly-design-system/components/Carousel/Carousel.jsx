// Globalyapp Design System — Carousel

export function Carousel({ slides = [], height = 220, autoplay = false, interval = 4000, style = {} }) {
  const [i, setI] = React.useState(0);
  const n = slides.length;
  const go = idx => setI((idx + n) % n);
  React.useEffect(() => {
    if (!autoplay || n <= 1) return;
    const t = setInterval(() => setI(p => (p + 1) % n), interval);
    return () => clearInterval(t);
  }, [autoplay, interval, n]);

  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      <div style={{ display: 'flex', transform: `translateX(-${i * 100}%)`, transition: 'transform .35s ease' }}>
        {slides.map((s, idx) => (
          <div key={idx} style={{ flex: '0 0 100%', height }}>{s}</div>
        ))}
      </div>
      {n > 1 && (
        <>
          <button onClick={() => go(i - 1)} style={{ ...carBtn, left: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="10 3 5 8 10 13"/></svg>
          </button>
          <button onClick={() => go(i + 1)} style={{ ...carBtn, right: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 3 11 8 6 13"/></svg>
          </button>
          <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => go(idx)} style={{
                width: idx === i ? 20 : 7, height: 7, borderRadius: 9999, border: 'none', cursor: 'pointer',
                background: idx === i ? '#012E8A' : 'rgba(255,255,255,0.7)', transition: 'all .2s',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.06)',
              }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const carBtn = {
  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
  width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer',
  background: 'rgba(255,255,255,0.92)', color: '#1E293B', display: 'inline-flex',
  alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
};
