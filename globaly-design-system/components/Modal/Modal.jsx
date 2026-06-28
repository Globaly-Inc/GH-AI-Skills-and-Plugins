// Globalyapp Design System — Modal

export function Modal({ open = false, title, children, footer, onClose, width = 480, style = {} }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}>
      <div onClick={e => e.stopPropagation()} style={{
        width, maxWidth: '100%', maxHeight: '90vh', overflow: 'auto',
        background: '#fff', borderRadius: 16, boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        display: 'flex', flexDirection: 'column', ...style,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 22px 0' }}>
          {title && <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h3>}
          {onClose && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4, marginRight: -4, display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
            </button>
          )}
        </div>
        <div style={{ padding: '12px 22px 20px', fontSize: 14, color: '#475569', lineHeight: 1.5 }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '0 22px 20px' }}>{footer}</div>}
      </div>
    </div>
  );
}
