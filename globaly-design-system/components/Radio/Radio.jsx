// Globalyapp Design System — Radio & RadioGroup

export function Radio({ checked = false, onChange, label, value, name, disabled = false, style = {} }) {
  const dim = 18;
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      <input type="radio" checked={checked} onChange={onChange} value={value} name={name} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: dim, height: dim, borderRadius: '50%', flexShrink: 0,
        border: `1.5px solid ${checked ? '#012E8A' : '#CBD5E1'}`, background: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color .12s',
      }}>
        {checked && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#012E8A' }} />}
      </span>
      {label && <span style={{ fontSize: 14, color: '#334155' }}>{label}</span>}
    </label>
  );
}

export function RadioGroup({ value, onChange, options = [], name = 'radio-group', direction = 'column', style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: direction, gap: direction === 'row' ? 20 : 12, ...style }}>
      {options.map(opt => (
        <Radio key={opt.value} name={name} value={opt.value} label={opt.label}
          checked={value === opt.value} disabled={opt.disabled}
          onChange={() => onChange && onChange(opt.value)} />
      ))}
    </div>
  );
}
