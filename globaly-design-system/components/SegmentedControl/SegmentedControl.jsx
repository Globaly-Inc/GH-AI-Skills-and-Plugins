// Globalyapp Design System — SegmentedControl

export function SegmentedControl({ options = [], value, onChange, size = 'md', style = {} }) {
  const active = value != null ? value : (options[0] && options[0].value);
  const h = size === 'sm' ? 30 : 36;
  return (
    <div style={{
      display: 'inline-flex', padding: 3, borderRadius: 9999, background: '#F1F5F9', gap: 2,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      {options.map(opt => {
        const on = opt.value === active;
        return (
          <button key={opt.value} onClick={() => onChange && onChange(opt.value)}
            style={{
              height: h, padding: '0 16px', borderRadius: 9999, border: 'none', cursor: 'pointer',
              background: on ? '#fff' : 'transparent', color: on ? '#7F1D1D' : '#64748B',
              fontSize: 13, fontWeight: on ? 600 : 500, fontFamily: 'inherit',
              boxShadow: on ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', transition: 'all .12s', whiteSpace: 'nowrap',
            }}>{opt.label}</button>
        );
      })}
    </div>
  );
}
