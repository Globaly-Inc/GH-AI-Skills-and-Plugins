// Globalyapp Design System — Toast & Snackbar

const TOAST_VARIANTS = {
  info:    { icon: '#2563EB', d: <path d="M9 12v-3M9 6h.01M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z" /> },
  success: { icon: '#16A34A', d: <path d="M5 9l3 3 5-6M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z" /> },
  warning: { icon: '#D97706', d: <path d="M9 6v4M9 13h.01M7.7 2.2 1.5 13a1.5 1.5 0 0 0 1.3 2.3h12.4a1.5 1.5 0 0 0 1.3-2.3L10.3 2.2a1.5 1.5 0 0 0-2.6 0z" /> },
  error:   { icon: '#DC2626', d: <path d="M9 5v4M9 13h.01M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z" /> },
};

export function Toast({ variant = 'info', title, message, action, onClose, style = {} }) {
  const v = TOAST_VARIANTS[variant] || TOAST_VARIANTS.info;
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 11, minWidth: 300, maxWidth: 420,
      background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '12px 14px',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      <span style={{ flexShrink: 0, color: v.icon, display: 'flex', marginTop: 1 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{v.d}</svg>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', marginBottom: message ? 2 : 0 }}>{title}</div>}
        {message && <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.4 }}>{message}</div>}
        {action && <div style={{ marginTop: 8 }}>{action}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0, display: 'flex' }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="3" x2="12" y2="12"/><line x1="12" y1="3" x2="3" y2="12"/></svg>
        </button>
      )}
    </div>
  );
}

export function Snackbar({ message, action, onAction, actionLabel = 'Undo', onClose, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, minWidth: 280, maxWidth: 460,
      background: '#1E293B', color: '#fff', borderRadius: 10, padding: '12px 16px',
      boxShadow: '0 10px 15px rgba(0,0,0,0.2)', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      <span style={{ flex: 1, fontSize: 14 }}>{message}</span>
      {(action || onAction) && (
        <button onClick={onAction} style={{ background: 'none', border: 'none', color: '#FCA5A5', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
          {actionLabel}
        </button>
      )}
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0, display: 'flex', flexShrink: 0 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="3" x2="12" y2="12"/><line x1="12" y1="3" x2="3" y2="12"/></svg>
        </button>
      )}
    </div>
  );
}
