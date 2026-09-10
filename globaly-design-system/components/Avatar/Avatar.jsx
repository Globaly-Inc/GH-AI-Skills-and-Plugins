// Globalyapp Design System — Avatar

const AVATAR_SIZES = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

function initialsOf(name) {
  if (!name) return '';
  return name.trim().split(/\s+/).slice(0, 2).map(s => s[0].toUpperCase()).join('');
}

export function Avatar({ name, src, size = 'md', status, color = '#012E8A', style = {} }) {
  const dim = AVATAR_SIZES[size] || size || 40;
  const statusColors = { online: '#16A34A', away: '#D97706', offline: '#94A3B8', busy: '#DC2626' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: dim, height: dim, flexShrink: 0, ...style }}>
      {src ? (
        <img src={src} alt={name || ''} style={{ width: dim, height: dim, borderRadius: '50%', objectFit: 'cover' }} />
      ) : (
        <span style={{
          width: dim, height: dim, borderRadius: '50%', background: color, color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: dim * 0.4, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        }}>{initialsOf(name)}</span>
      )}
      {status && (
        <span style={{
          position: 'absolute', right: 0, bottom: 0,
          width: dim * 0.28, height: dim * 0.28, borderRadius: '50%',
          background: statusColors[status] || '#94A3B8', border: '2px solid #fff',
        }} />
      )}
    </span>
  );
}

export function AvatarGroup({ children, max = 4, size = 'md', style = {} }) {
  const dim = AVATAR_SIZES[size] || 40;
  const kids = React.Children.toArray(children);
  const shown = kids.slice(0, max);
  const extra = kids.length - shown.length;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', ...style }}>
      {shown.map((child, i) => (
        <span key={i} style={{ marginLeft: i ? -dim * 0.3 : 0, borderRadius: '50%', boxShadow: '0 0 0 2px #fff' }}>{child}</span>
      ))}
      {extra > 0 && (
        <span style={{
          marginLeft: -dim * 0.3, width: dim, height: dim, borderRadius: '50%',
          background: '#F1F5F9', color: '#475569', boxShadow: '0 0 0 2px #fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: dim * 0.34, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        }}>+{extra}</span>
      )}
    </span>
  );
}
