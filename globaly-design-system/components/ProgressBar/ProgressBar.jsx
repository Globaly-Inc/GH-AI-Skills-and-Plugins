// Globalyapp Design System — ProgressBar

export function ProgressBar({ value = 0, max = 100, label, showValue = false, size = 'md', color = '#7F1D1D', style = {} }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const h = size === 'sm' ? 6 : size === 'lg' ? 12 : 8;
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          {label && <span style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>{label}</span>}
          {showValue && <span style={{ fontSize: 13, color: '#64748B' }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{ width: '100%', height: h, borderRadius: 9999, background: '#E2E8F0', overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', borderRadius: 9999, background: color, transition: 'width .3s ease' }} />
      </div>
    </div>
  );
}
