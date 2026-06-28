// Globalyapp Design System — Popover

export function Popover({ trigger, children, placement = 'bottom', width = 240, style = {} }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const pos = {
    bottom: { top: '100%', left: 0, marginTop: 8 },
    top:    { bottom: '100%', left: 0, marginBottom: 8 },
    right:  { left: '100%', top: 0, marginLeft: 8 },
    left:   { right: '100%', top: 0, marginRight: 8 },
  }[placement];
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      <span onClick={() => setOpen(o => !o)} style={{ display: 'inline-flex' }}>{trigger}</span>
      {open && (
        <div style={{
          position: 'absolute', ...pos, zIndex: 60, width,
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12,
          boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)', padding: 14,
        }}>{children}</div>
      )}
    </span>
  );
}
