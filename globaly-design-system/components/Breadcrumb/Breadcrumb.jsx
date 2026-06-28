// Globalyapp Design System — Breadcrumb

export function Breadcrumb({ items = [], style = {} }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {item.href && !last ? (
              <a href={item.href} style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>{item.label}</a>
            ) : (
              <span style={{ fontSize: 13, fontWeight: last ? 600 : 400, color: last ? '#0F172A' : '#64748B' }}>{item.label}</span>
            )}
            {!last && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 3 9 7 5 11"/></svg>
            )}
          </span>
        );
      })}
    </nav>
  );
}
