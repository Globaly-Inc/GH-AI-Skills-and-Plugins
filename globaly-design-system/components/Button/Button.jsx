// Globalyapp Design System — Button
// Exported design-system component.

const BTN_SIZES = {
  xs: { height: 24, padding: '0 8px',  fontSize: 12, borderRadius: 4 },
  sm: { height: 32, padding: '0 12px', fontSize: 14, borderRadius: 4 },
  md: { height: 40, padding: '0 16px', fontSize: 14, borderRadius: 6 },
  lg: { height: 44, padding: '0 20px', fontSize: 16, borderRadius: 8 },
  xl: { height: 56, padding: '0 24px', fontSize: 16, borderRadius: 8, fontWeight: 700 },
};

const BTN_VARIANTS = {
  primary:   { background: '#012E8A', color: '#fff', hoverBg: '#012670' },
  secondary: { background: '#1E293B', color: '#fff', hoverBg: '#334155' },
  outline:   { background: 'transparent', color: '#1E293B', border: '1.5px solid #E2E8F0', hoverBg: '#F8FAFC' },
  ghost:     { background: 'transparent', color: '#475569', hoverBg: '#F1F5F9' },
  danger:    { background: '#DC2626', color: '#fff', hoverBg: '#B91C1C' },
  subtle:    { background: '#DBEAFE', color: '#012E8A', hoverBg: '#BFDBFE' },
};

export function Button({
  children, variant = 'primary', size = 'md',
  disabled = false, icon, iconRight, style = {}, onClick, type = 'button', ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.primary;
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  const bg = hovered && !disabled ? v.hoverBg : v.background;

  return (
    React.createElement('button', {
      type, disabled, onClick,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, border: v.border || 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontWeight: s.fontWeight || 500, lineHeight: 1, whiteSpace: 'nowrap',
        transition: 'background 0.15s, opacity 0.15s', outline: 'none',
        height: s.height, padding: s.padding, fontSize: s.fontSize, borderRadius: s.borderRadius,
        background: bg, color: v.color, opacity: disabled ? 0.5 : 1, ...style,
      },
      ...props,
    },
      icon && React.createElement('span', { style: { display: 'flex', alignItems: 'center', color: 'inherit' } }, icon),
      children,
      iconRight && React.createElement('span', { style: { display: 'flex', alignItems: 'center', color: 'inherit' } }, iconRight),
    )
  );
}

export function IconButton({ icon, variant = 'ghost', size = 'md', disabled = false, onClick, style = {}, ...props }) {
  const [hovered, setHovered] = React.useState(false);
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.ghost;
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  const dim = s.height;

  return (
    React.createElement('button', {
      disabled, onClick,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: dim, height: dim, padding: 0,
        background: hovered && !disabled ? v.hoverBg : v.background,
        color: v.color, border: v.border || 'none',
        borderRadius: s.borderRadius, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        transition: 'background 0.15s', outline: 'none', flexShrink: 0, ...style,
      },
      ...props,
    }, icon)
  );
}
