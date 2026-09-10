// Globalyapp Design System — Sidebar Component
// Load with: <script type="text/babel" src="Sidebar.jsx"></script>
// Exports: Sidebar, NavItem to window

const sidebarIcons = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/>
      <rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/>
    </svg>
  ),
  applications: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"/><path d="M1 10h14"/><path d="M4 10v3"/><path d="M12 10v3"/>
    </svg>
  ),
  documents: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5L9 1z"/>
      <polyline points="9 1 9 5 13 5"/><line x1="5" y1="9" x2="11" y2="9"/><line x1="5" y1="12" x2="8" y2="12"/>
    </svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5"/><path d="M13 13l-3-3"/>
    </svg>
  ),
  chart: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="14" height="14" rx="2"/><polyline points="4 11 6 8 8 10 11 6"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="14" height="12" rx="2"/><line x1="1" y1="7" x2="15" y2="7"/>
      <line x1="5" y1="1" x2="5" y2="5"/><line x1="11" y1="1" x2="11" y2="5"/>
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2.5"/>
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"/>
    </svg>
  ),
  payments: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="14" height="9" rx="2"/><line x1="1" y1="8" x2="15" y2="8"/>
    </svg>
  ),
};

function NavItem({ icon, label, active = false, onClick, badge }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 9,
        padding: '8px 10px', borderRadius: 6,
        cursor: 'pointer',
        background: active ? '#fff' : hovered ? 'rgba(0,0,0,0.04)' : 'transparent',
        boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        transition: 'background 0.12s, box-shadow 0.12s',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? '#012E8A' : '#475569',
        userSelect: 'none',
      }}
    >
      <span style={{ opacity: active ? 1 : 0.65, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span style={{
          background: '#012E8A', color: '#fff', borderRadius: 9999,
          fontSize: 10, fontWeight: 700, padding: '1px 6px', minWidth: 18, textAlign: 'center',
        }}>{badge}</span>
      )}
    </div>
  );
}

function Sidebar({ activeScreen, onNavigate, userName = 'Jane Doe', userRole = 'Immigration Agent' }) {
  const navItems = [
    { id: 'dashboard',    label: 'Dashboard',    icon: sidebarIcons.dashboard },
    { id: 'applications', label: 'Applications', icon: sidebarIcons.applications, badge: 3 },
    { id: 'documents',    label: 'Documents',    icon: sidebarIcons.documents },
    { id: 'search',       label: 'Search',       icon: sidebarIcons.search },
    { id: 'calendar',     label: 'Calendar',     icon: sidebarIcons.calendar },
    { id: 'payments',     label: 'Payments',     icon: sidebarIcons.payments },
  ];
  const reportItems = [
    { id: 'report-month', label: 'Month to Date', icon: sidebarIcons.chart },
    { id: 'report-year',  label: 'Year to Date',  icon: sidebarIcons.chart },
  ];

  const initials = userName.split(' ').map(n => n[0]).join('');

  return (
    <div style={{
      width: 240, flexShrink: 0, height: '100%',
      background: '#F1F5F9', borderRadius: 12,
      padding: '16px 16px',
      display: 'flex', flexDirection: 'column', gap: 2,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 10px', marginBottom: 12,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'linear-gradient(135deg, #1D4ED8 0%, #012E8A 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="9" cy="4" r="2" fill="rgba(255,255,255,0.6)"/>
            <circle cx="7.5" cy="8.5" r="3" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M4 13 Q7.5 15.5 11 13" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#1E293B' }}>
          Globalyapp
        </span>
      </div>

      {/* Main nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {navItems.map(item => (
          <NavItem key={item.id} {...item} active={activeScreen === item.id} onClick={() => onNavigate(item.id)} />
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E2E8F0', margin: '8px 0' }} />

      {/* Reports section */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12, color: '#94A3B8', padding: '4px 10px 6px',
      }}>Reports</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {reportItems.map(item => (
          <NavItem key={item.id} {...item} active={activeScreen === item.id} onClick={() => onNavigate(item.id)} />
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E2E8F0', margin: '8px 0' }} />

      {/* Settings */}
      <NavItem icon={sidebarIcons.settings} label="Settings" active={activeScreen === 'settings'} onClick={() => onNavigate('settings')} />

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* User */}
      <div style={{ height: 1, background: '#E2E8F0', margin: '8px 0' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 10px', cursor: 'pointer' }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#012E8A', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, flexShrink: 0,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>{initials}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{userName}</div>
          <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{userRole}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, NavItem, sidebarIcons });
