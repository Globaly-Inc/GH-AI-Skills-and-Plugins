// Globalyapp Design System — Drawer

export function Drawer({ open = false, title, children, footer, onClose, side = 'right', width = 380, style = {} }) {
  if (!open) return null;
  const isRight = side === 'right';
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 100,
      display: 'flex', justifyContent: isRight ? 'flex-end' : 'flex-start',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width, maxWidth: '100%', height: '100%', background: '#fff',
        display: 'flex', flexDirection: 'column',
        boxShadow: isRight ? '-12px 0 24px rgba(0,0,0,0.12)' : '12px 0 24px rgba(0,0,0,0.12)', ...style,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #E2E8F0' }}>
          {title && <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h3>}
          {onClose && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4, marginRight: -4, display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
            </button>
          )}
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '18px 20px', fontSize: 14, color: '#475569', lineHeight: 1.5 }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '14px 20px', borderTop: '1px solid #E2E8F0' }}>{footer}</div>}
      </div>
    </div>
  );
}
