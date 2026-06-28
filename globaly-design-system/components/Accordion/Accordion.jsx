// Globalyapp Design System — Accordion

export function Accordion({ items = [], allowMultiple = false, defaultOpen = [], style = {} }) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = i => {
    setOpen(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} style={{ borderTop: i ? '1px solid #E2E8F0' : 'none' }}>
            <button onClick={() => toggle(i)} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 12, padding: '14px 16px', background: isOpen ? '#F8FAFC' : '#fff', border: 'none',
              cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#1E293B', fontFamily: 'inherit', textAlign: 'left',
            }}>
              {item.title}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s', flexShrink: 0 }}>
                <polyline points="4 6 8 10 12 6"/>
              </svg>
            </button>
            {isOpen && <div style={{ padding: '0 16px 16px', fontSize: 13, color: '#64748B', lineHeight: 1.55 }}>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
