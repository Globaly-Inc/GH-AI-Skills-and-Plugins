// Globalyapp Design System — AuthCode (one-time code input)

export function AuthCode({ length = 6, value = '', onChange, disabled = false, error = false, style = {} }) {
  const refs = React.useRef([]);
  const chars = value.split('').slice(0, length);
  while (chars.length < length) chars.push('');

  const setAt = (i, ch) => {
    const next = chars.slice();
    next[i] = ch;
    const joined = next.join('').slice(0, length);
    onChange && onChange(joined);
  };
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !chars[i] && i > 0) refs.current[i - 1] && refs.current[i - 1].focus();
  };
  const onInput = (i, e) => {
    const ch = e.target.value.replace(/\D/g, '').slice(-1);
    setAt(i, ch);
    if (ch && i < length - 1) refs.current[i + 1] && refs.current[i + 1].focus();
  };

  return (
    <div style={{ display: 'inline-flex', gap: 8, ...style }}>
      {chars.map((c, i) => (
        <input key={i} ref={el => refs.current[i] = el}
          value={c} disabled={disabled}
          onChange={e => onInput(i, e)} onKeyDown={e => onKey(i, e)}
          inputMode="numeric" maxLength={1}
          style={{
            width: 44, height: 52, textAlign: 'center', fontSize: 20, fontWeight: 700,
            borderRadius: 10, border: `1.5px solid ${error ? '#DC2626' : c ? '#7F1D1D' : '#E2E8F0'}`,
            background: error ? '#FEE2E2' : '#F8FAFC', color: '#1E293B', outline: 'none',
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", opacity: disabled ? 0.5 : 1,
            transition: 'border-color .12s',
          }} />
      ))}
    </div>
  );
}
