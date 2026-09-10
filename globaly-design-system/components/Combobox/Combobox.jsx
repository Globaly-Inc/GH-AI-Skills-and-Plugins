// Globalyapp Design System — Combobox (searchable select)

export function Combobox({ options = [], value, onChange, placeholder = 'Select…', style = {} }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const selected = options.find(o => o.value === value);
  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={ref} style={{ position: 'relative', width: 260, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', height: 40, borderRadius: 8, border: `1px solid ${open ? '#012E8A' : '#E2E8F0'}`,
        background: '#F8FAFC', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', color: selected ? '#1E293B' : '#94A3B8',
      }}>
        {selected ? selected.label : placeholder}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 5 7 10 12 5"/></svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6, zIndex: 60,
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10,
          boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden',
        }}>
          <div style={{ padding: 8, borderBottom: '1px solid #F1F5F9' }}>
            <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…"
              style={{ width: '100%', height: 32, borderRadius: 6, border: '1px solid #E2E8F0', background: '#F8FAFC', padding: '0 8px', fontSize: 13, fontFamily: 'inherit', outline: 'none', color: '#1E293B' }} />
          </div>
          <div style={{ maxHeight: 180, overflowY: 'auto', padding: 6 }}>
            {filtered.length === 0 && <div style={{ padding: '10px', fontSize: 13, color: '#94A3B8', textAlign: 'center' }}>No matches</div>}
            {filtered.map(o => {
              const on = o.value === value;
              return (
                <button key={o.value} onClick={() => { onChange && onChange(o.value); setOpen(false); setQuery(''); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                    padding: '8px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
                    background: on ? '#DBEAFE' : 'transparent', color: on ? '#012E8A' : '#334155',
                    fontSize: 13, fontWeight: on ? 600 : 500, fontFamily: 'inherit', textAlign: 'left',
                  }}
                  onMouseEnter={e => { if (!on) e.currentTarget.style.background = '#F1F5F9'; }}
                  onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
                  {o.label}
                  {on && <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 7 6 11 12 3"/></svg>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
