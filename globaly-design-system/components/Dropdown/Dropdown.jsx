// Globalyapp Design System — Dropdown / Menu

export function Dropdown({ trigger, items = [], align = 'left', style = {} }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      <span onClick={() => setOpen(o => !o)} style={{ display: 'inline-flex' }}>{trigger}</span>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', [align]: 0, marginTop: 6, zIndex: 60,
          minWidth: 180, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10,
          boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)', padding: 6,
        }}>
          {items.map((item, i) => item.divider ? (
            <div key={i} style={{ height: 1, background: '#F1F5F9', margin: '5px 0' }} />
          ) : (
            <button key={i} onClick={() => { setOpen(false); item.onClick && item.onClick(); }}
              disabled={item.disabled}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px',
                borderRadius: 6, border: 'none', background: 'transparent', cursor: item.disabled ? 'not-allowed' : 'pointer',
                fontSize: 13, fontWeight: 500, color: item.danger ? '#DC2626' : item.disabled ? '#CBD5E1' : '#334155',
                fontFamily: 'inherit', textAlign: 'left',
              }}
              onMouseEnter={e => { if (!item.disabled) e.currentTarget.style.background = item.danger ? '#FEF2F2' : '#F1F5F9'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              {item.icon && <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}
