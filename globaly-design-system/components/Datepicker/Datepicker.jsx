// Globalyapp Design System — Datepicker (calendar)

const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function Datepicker({ value, onChange, style = {} }) {
  const today = new Date();
  const sel = value ? new Date(value) : null;
  const [view, setView] = React.useState(() => {
    const base = sel || today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const shift = n => setView(v => {
    let m = v.m + n, y = v.y;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    return { y, m };
  });
  const isSel = d => sel && sel.getFullYear() === view.y && sel.getMonth() === view.m && sel.getDate() === d;
  const isToday = d => today.getFullYear() === view.y && today.getMonth() === view.m && today.getDate() === d;

  return (
    <div style={{
      width: 280, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 14,
      boxShadow: '0 4px 6px rgba(0,0,0,0.06)', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button onClick={() => shift(-1)} style={navBtn}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 3 5 7 9 11"/></svg></button>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>{MONTHS[view.m]} {view.y}</span>
        <button onClick={() => shift(1)} style={navBtn}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 3 9 7 5 11"/></svg></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 4 }}>
        {DOW.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#94A3B8', padding: '4px 0' }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
        {cells.map((d, i) => d == null ? <div key={i} /> : (
          <button key={i} onClick={() => onChange && onChange(new Date(view.y, view.m, d))}
            style={{
              height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13,
              fontFamily: 'inherit', fontWeight: isSel(d) ? 600 : 500,
              background: isSel(d) ? '#012E8A' : 'transparent',
              color: isSel(d) ? '#fff' : isToday(d) ? '#012E8A' : '#334155',
              boxShadow: isToday(d) && !isSel(d) ? 'inset 0 0 0 1px #FCA5A5' : 'none',
            }}
            onMouseEnter={e => { if (!isSel(d)) e.currentTarget.style.background = '#F1F5F9'; }}
            onMouseLeave={e => { if (!isSel(d)) e.currentTarget.style.background = 'transparent'; }}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

const navBtn = {
  width: 28, height: 28, borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff',
  cursor: 'pointer', color: '#475569', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};
