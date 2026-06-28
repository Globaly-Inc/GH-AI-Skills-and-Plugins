// Globalyapp Design System — Card, StatCard, SectionHeader

export function Card({ children, padding = 20, style = {}, ...props }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding, ...style }} {...props}>
      {children}
    </div>
  );
}

export function StatCard({ title, value, change, changeType = 'positive', icon, accent = '#7F1D1D', style = {} }) {
  const changeColor = changeType === 'positive' ? '#15803D' : changeType === 'negative' ? '#DC2626' : '#64748B';
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
        {icon && (
          <span style={{ width: 32, height: 32, borderRadius: 8, background: accent + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>{icon}</span>
        )}
      </div>
      <span style={{ fontSize: 28, fontWeight: 700, color: '#1E293B', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", lineHeight: 1 }}>{value}</span>
      {change && <span style={{ fontSize: 12, color: changeColor, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{change}</span>}
    </Card>
  );
}

export function SectionHeader({ title, subtitle, actions, style = {} }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, ...style }}>
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 13, color: '#64748B', margin: '2px 0 0', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{actions}</div>}
    </div>
  );
}
