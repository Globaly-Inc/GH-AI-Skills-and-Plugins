// Globalyapp Design System — Table

export function Table({ columns = [], data = [], rowKey = 'id', onRowClick, empty = 'No data', style = {} }) {
  return (
    <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: 12, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{
                textAlign: col.align || 'left', fontSize: 11, fontWeight: 700, color: '#94A3B8',
                textTransform: 'uppercase', letterSpacing: '0.05em', padding: '11px 16px',
                borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap', background: '#F8FAFC',
              }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} style={{ padding: 40, textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>{empty}</td></tr>
          ) : data.map((row, ri) => (
            <tr key={row[rowKey] != null ? row[rowKey] : ri}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default', transition: 'background .1s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FAFAFA'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; }}>
              {columns.map(col => (
                <td key={col.key} style={{
                  textAlign: col.align || 'left', fontSize: 13, color: '#334155', padding: '12px 16px',
                  borderBottom: ri === data.length - 1 ? 'none' : '1px solid #F1F5F9',
                }}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
