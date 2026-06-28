// Globalyapp Design System — Tabs (underline style)

export function Tabs({ tabs = [], value, onChange, style = {} }) {
  const active = value != null ? value : (tabs[0] && tabs[0].value);
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid #E2E8F0', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      {tabs.map(tab => {
        const on = tab.value === active;
        return (
          <button key={tab.value} onClick={() => !tab.disabled && onChange && onChange(tab.value)}
            disabled={tab.disabled}
            style={{
              position: 'relative', background: 'none', border: 'none', cursor: tab.disabled ? 'not-allowed' : 'pointer',
              padding: '10px 14px', fontSize: 14, fontWeight: on ? 600 : 500,
              color: tab.disabled ? '#CBD5E1' : on ? '#7F1D1D' : '#64748B',
              fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: -1,
            }}>
            {tab.label}
            {tab.badge != null && (
              <span style={{ background: on ? '#FEE2E2' : '#F1F5F9', color: on ? '#991B1B' : '#64748B', borderRadius: 9999, fontSize: 11, fontWeight: 600, padding: '0 6px', minWidth: 18, textAlign: 'center' }}>{tab.badge}</span>
            )}
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, borderRadius: 2, background: on ? '#7F1D1D' : 'transparent' }} />
          </button>
        );
      })}
    </div>
  );
}
