// Globalyapp Design System — Pagination

export function Pagination({ page = 1, total = 1, onChange, style = {} }) {
  const go = p => { if (p >= 1 && p <= total && p !== page && onChange) onChange(p); };
  const pages = [];
  const add = p => pages.push(p);
  add(1);
  let start = Math.max(2, page - 1), end = Math.min(total - 1, page + 1);
  if (start > 2) add('…l');
  for (let p = start; p <= end; p++) add(p);
  if (end < total - 1) add('…r');
  if (total > 1) add(total);

  const btn = (content, opts = {}) => (
    <button onClick={opts.onClick} disabled={opts.disabled}
      style={{
        minWidth: 34, height: 34, padding: '0 8px', borderRadius: 8,
        border: `1px solid ${opts.active ? '#7F1D1D' : '#E2E8F0'}`,
        background: opts.active ? '#7F1D1D' : '#fff',
        color: opts.active ? '#fff' : opts.disabled ? '#CBD5E1' : '#334155',
        fontSize: 13, fontWeight: opts.active ? 600 : 500, cursor: opts.disabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{content}</button>
  );

  return (
    <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center', ...style }}>
      {btn(<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 3 5 7 9 11"/></svg>, { onClick: () => go(page - 1), disabled: page === 1 })}
      {pages.map((p, i) => typeof p === 'number'
        ? <span key={i}>{btn(p, { onClick: () => go(p), active: p === page })}</span>
        : <span key={i} style={{ color: '#94A3B8', padding: '0 2px' }}>…</span>
      )}
      {btn(<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 3 9 7 5 11"/></svg>, { onClick: () => go(page + 1), disabled: page === total })}
    </div>
  );
}
