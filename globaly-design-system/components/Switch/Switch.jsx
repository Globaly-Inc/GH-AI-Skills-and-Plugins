// Globalyapp Design System — Switch

export function Switch({ checked = false, onChange, label, disabled = false, size = 'md', style = {} }) {
  const w = size === 'sm' ? 32 : 40;
  const h = size === 'sm' ? 18 : 22;
  const knob = h - 4;
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: w, height: h, borderRadius: 9999, flexShrink: 0, position: 'relative',
        background: checked ? '#012E8A' : '#CBD5E1', transition: 'background .15s',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: checked ? w - knob - 2 : 2,
          width: knob, height: knob, borderRadius: '50%', background: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)', transition: 'left .15s',
        }} />
      </span>
      {label && <span style={{ fontSize: 14, color: '#334155' }}>{label}</span>}
    </label>
  );
}
