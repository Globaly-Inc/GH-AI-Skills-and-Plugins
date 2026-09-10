// Globalyapp Design System — Input, Textarea, Field, SearchInput, Select

const INPUT_HEIGHTS = { sm: 32, md: 40, lg: 48, xl: 56 };
const INPUT_FONTS   = { sm: 12, md: 14, lg: 16, xl: 16 };
const INPUT_PADS    = { sm: '0 8px', md: '0 10px', lg: '0 12px', xl: '0 12px' };

export function Input({
  value, onChange, placeholder, type = 'text',
  state = 'default', size = 'md', leadingIcon, trailingIcon,
  disabled = false, style = {}, ...props
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColors = {
    default: focused ? '#012E8A' : '#E2E8F0', active: '#012E8A',
    error: '#DC2626', success: '#16A34A', disabled: '#E2E8F0',
  };
  const bgColors = { default: '#F8FAFC', active: '#F8FAFC', error: '#FEE2E2', success: '#DCFCE7', disabled: '#F8FAFC' };
  const eff = disabled ? 'disabled' : state;
  const h = INPUT_HEIGHTS[size] || 40;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, height: h, borderRadius: 8,
      border: `1px solid ${borderColors[eff] || '#E2E8F0'}`, background: bgColors[eff] || '#F8FAFC',
      padding: INPUT_PADS[size] || '0 10px', transition: 'border-color 0.15s', opacity: disabled ? 0.5 : 1, ...style,
    }}>
      {leadingIcon && <span style={{ display: 'flex', alignItems: 'center', color: '#94A3B8', flexShrink: 0 }}>{leadingIcon}</span>}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', outline: 'none', fontSize: INPUT_FONTS[size] || 14, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", color: '#1E293B' }}
        {...props}
      />
      {trailingIcon && <span style={{ display: 'flex', alignItems: 'center', color: '#94A3B8', flexShrink: 0 }}>{trailingIcon}</span>}
    </div>
  );
}

export function Textarea({ value, onChange, placeholder, rows = 4, state = 'default', disabled = false, style = {}, ...props }) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = disabled ? '#E2E8F0' : state === 'error' ? '#DC2626' : state === 'success' ? '#16A34A' : focused ? '#012E8A' : '#E2E8F0';
  const bg = state === 'error' ? '#FEE2E2' : state === 'success' ? '#DCFCE7' : '#F8FAFC';
  return (
    <textarea
      value={value} onChange={onChange} placeholder={placeholder} rows={rows} disabled={disabled}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: '100%', borderRadius: 8, border: `1px solid ${borderColor}`, background: bg,
        padding: '10px 12px', fontSize: 14, resize: 'vertical', outline: 'none',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", color: '#1E293B',
        opacity: disabled ? 0.5 : 1, transition: 'border-color 0.15s', ...style,
      }}
      {...props}
    />
  );
}

export function Field({ label, hint, error, success, children, required = false, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 500, color: '#64748B', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", display: 'flex', gap: 4, alignItems: 'center' }}>
          {label}{required && <span style={{ color: '#DC2626' }}>*</span>}
        </label>
      )}
      {children}
      {(error || hint || success) && (
        <span style={{ fontSize: 12, color: error ? '#DC2626' : success ? '#16A34A' : '#64748B', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
          {error || success || hint}
        </span>
      )}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search…', size = 'md', style = {} }) {
  const searchIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5"/><path d="M13 13l-3-3"/>
    </svg>
  );
  return <Input value={value} onChange={onChange} placeholder={placeholder} size={size} leadingIcon={searchIcon} style={{ minWidth: 200, ...style }} />;
}

export function Select({ value, onChange, options = [], placeholder, size = 'md', style = {} }) {
  const h = INPUT_HEIGHTS[size] || 40;
  return (
    <div style={{ position: 'relative', ...style }}>
      <select value={value} onChange={onChange} style={{
        height: h, width: '100%', borderRadius: 8, border: '1px solid #E2E8F0', background: '#F8FAFC',
        padding: '0 32px 0 10px', fontSize: 14, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        color: value ? '#1E293B' : '#94A3B8', appearance: 'none', outline: 'none', cursor: 'pointer',
      }}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 5 7 10 12 5"/></svg>
      </span>
    </div>
  );
}
