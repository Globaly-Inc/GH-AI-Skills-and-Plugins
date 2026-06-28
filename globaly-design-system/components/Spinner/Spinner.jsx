// Globalyapp Design System — Spinner

export function Spinner({ size = 24, color = '#7F1D1D', thickness = 2.5, style = {} }) {
  return (
    <span style={{ display: 'inline-flex', width: size, height: size, ...style }}>
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: 'gly-spin 0.7s linear infinite' }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="#E2E8F0" strokeWidth={thickness} />
        <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" />
      </svg>
      <style>{`@keyframes gly-spin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}
