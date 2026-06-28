// Globalyapp Design System — Tooltip (hover/focus)

export function Tooltip({ label, placement = 'top', children, style = {} }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    left:   { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
    right:  { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  }[placement];
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span style={{
          position: 'absolute', ...pos, zIndex: 50, whiteSpace: 'nowrap',
          background: '#0F172A', color: '#fff', fontSize: 12, fontWeight: 500,
          padding: '5px 9px', borderRadius: 6, pointerEvents: 'none',
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
        }}>{label}</span>
      )}
    </span>
  );
}
