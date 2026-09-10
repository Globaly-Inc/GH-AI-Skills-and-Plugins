// Globalyapp Design System — Checkbox

export function Checkbox({ checked = false, indeterminate = false, onChange, label, disabled = false, size = 'md', style = {} }) {
  const dim = size === 'sm' ? 16 : 18;
  const on = checked || indeterminate;
  const box = (
    <span style={{
      width: dim, height: dim, borderRadius: 4, flexShrink: 0,
      border: `1.5px solid ${on ? '#012E8A' : '#CBD5E1'}`,
      background: on ? '#012E8A' : '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background .12s, border-color .12s',
    }}>
      {indeterminate ? (
        <svg width={dim - 6} height={dim - 6} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><line x1="2" y1="6" x2="10" y2="6"/></svg>
      ) : checked ? (
        <svg width={dim - 5} height={dim - 5} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3"/></svg>
      ) : null}
    </span>
  );
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      {box}
      {label && <span style={{ fontSize: 14, color: '#334155' }}>{label}</span>}
    </label>
  );
}
