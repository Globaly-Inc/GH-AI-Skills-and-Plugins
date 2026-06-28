// Globalyapp Design System — Badge, StatusBadge, Chip, Tag

const BADGE_VARIANTS = {
  red:    { background: '#FEE2E2', color: '#991B1B', dot: '#EF4444' },
  green:  { background: '#DCFCE7', color: '#15803D', dot: '#22C55E' },
  blue:   { background: '#DBEAFE', color: '#1E40AF', dot: '#3B82F6' },
  yellow: { background: '#FEF9C3', color: '#713F12', dot: '#EAB308' },
  slate:  { background: '#F1F5F9', color: '#334155', dot: '#64748B' },
  purple: { background: '#F4EEFF', color: '#5618BF', dot: '#6820E4' },
  orange: { background: '#FFEDD5', color: '#9A3412', dot: '#F97316' },
};

const STATUS_MAP = {
  active: 'green', approved: 'green', success: 'green',
  pending: 'yellow', warning: 'yellow',
  'in review': 'blue', review: 'blue', info: 'blue',
  rejected: 'red', error: 'red',
  draft: 'slate',
};

export function Badge({ children, variant = 'slate', dot = false, size = 'sm', style = {} }) {
  const v = BADGE_VARIANTS[variant] || BADGE_VARIANTS.slate;
  const fontSize = size === 'xs' ? 10 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 10px', borderRadius: 9999, fontSize, fontWeight: 500,
      background: v.background, color: v.color,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", whiteSpace: 'nowrap', ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: v.dot, flexShrink: 0 }} />}
      {children}
    </span>
  );
}

export function StatusBadge({ status, dot = true, style = {} }) {
  const key = (status || '').toLowerCase();
  const variant = STATUS_MAP[key] || 'slate';
  const label = status ? (status.charAt(0).toUpperCase() + status.slice(1)) : '';
  return <Badge variant={variant} dot={dot} style={style}>{label}</Badge>;
}

export function Tag({ children, variant = 'slate', style = {} }) {
  const v = BADGE_VARIANTS[variant] || BADGE_VARIANTS.slate;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 500,
      background: v.background, color: v.color,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", whiteSpace: 'nowrap', ...style,
    }}>{children}</span>
  );
}

export function Chip({ children, onRemove, style = {} }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 500,
      border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#334155',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      {children}
      {onRemove && (
        <button onClick={onRemove} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#94A3B8' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
          </svg>
        </button>
      )}
    </div>
  );
}
