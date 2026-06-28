// Globalyapp Design System — Alert

const ALERT_VARIANTS = {
  info:    { bg: '#DBEAFE', border: '#BFDBFE', icon: '#2563EB', title: '#1E40AF', text: '#1E3A8A' },
  success: { bg: '#DCFCE7', border: '#BBF7D0', icon: '#16A34A', title: '#15803D', text: '#166534' },
  warning: { bg: '#FEF3C7', border: '#FDE68A', icon: '#D97706', title: '#92400E', text: '#78350F' },
  error:   { bg: '#FEE2E2', border: '#FECACA', icon: '#DC2626', title: '#991B1B', text: '#7F1D1D' },
};

const ALERT_ICONS = {
  info:    <path d="M10 13v-3M10 7h.01M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />,
  success: <path d="M6 10l3 3 5-6M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />,
  warning: <path d="M10 7v4M10 14h.01M8.6 2.5 1.7 14a1.6 1.6 0 0 0 1.4 2.4h13.8a1.6 1.6 0 0 0 1.4-2.4L11.4 2.5a1.6 1.6 0 0 0-2.8 0z" />,
  error:   <path d="M10 6v4M10 14h.01M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />,
};

export function Alert({ variant = 'info', title, children, onClose, style = {} }) {
  const v = ALERT_VARIANTS[variant] || ALERT_VARIANTS.info;
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 10,
      background: v.bg, border: `1px solid ${v.border}`,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      <span style={{ flexShrink: 0, color: v.icon, display: 'flex', marginTop: 1 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {ALERT_ICONS[variant]}
        </svg>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 14, fontWeight: 600, color: v.title, marginBottom: children ? 3 : 0 }}>{title}</div>}
        {children && <div style={{ fontSize: 13, color: v.text, lineHeight: 1.45 }}>{children}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', color: v.icon, padding: 0, display: 'flex', opacity: 0.7 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
        </button>
      )}
    </div>
  );
}
