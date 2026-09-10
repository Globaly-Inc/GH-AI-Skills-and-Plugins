// Globalyapp Design System — TopBar Component
// Load with: <script type="text/babel" src="TopBar.jsx"></script>
// Exports: TopBar to window

function TopBar({ title, subtitle, actions, onSearch, searchValue, searchPlaceholder = 'Search…' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 0 20px 0', borderBottom: '1px solid #E2E8F0', marginBottom: 24,
      gap: 16,
    }}>
      {/* Left: title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 20, fontWeight: 700, color: '#1E293B', margin: 0,
            lineHeight: 1.2,
          }}>{title}</h1>
        )}
        {subtitle && (
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13, color: '#64748B', margin: '3px 0 0',
          }}>{subtitle}</p>
        )}
      </div>

      {/* Right: search + actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {onSearch && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            height: 36, padding: '0 10px', borderRadius: 8,
            border: '1px solid #E2E8F0', background: '#F8FAFC',
            minWidth: 200,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="4.5"/><path d="M11 11l-2.5-2.5"/>
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={e => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#1E293B', width: '100%',
              }}
            />
          </div>
        )}

        {/* Notification bell */}
        <button style={{
          width: 36, height: 36, borderRadius: 8,
          border: '1px solid #E2E8F0', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#64748B', flexShrink: 0, position: 'relative',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5v3L2 11h12l-1.5-2V6A4.5 4.5 0 0 0 8 1.5z"/>
            <path d="M6.5 11v.5a1.5 1.5 0 0 0 3 0V11"/>
          </svg>
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 6, height: 6, borderRadius: '50%',
            background: '#012E8A', border: '1px solid #fff',
          }} />
        </button>

        {actions}
      </div>
    </div>
  );
}

Object.assign(window, { TopBar });
