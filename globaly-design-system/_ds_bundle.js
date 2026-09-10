/* @ds-bundle: {"format":3,"namespace":"GlobalyDesignSystem_c92b6a","components":[{"name":"Accordion","sourcePath":"components/Accordion/Accordion.jsx"},{"name":"Alert","sourcePath":"components/Alert/Alert.jsx"},{"name":"AuthCode","sourcePath":"components/AuthCode/AuthCode.jsx"},{"name":"Avatar","sourcePath":"components/Avatar/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/Avatar/Avatar.jsx"},{"name":"Badge","sourcePath":"components/Badge/Badge.jsx"},{"name":"StatusBadge","sourcePath":"components/Badge/Badge.jsx"},{"name":"Tag","sourcePath":"components/Badge/Badge.jsx"},{"name":"Chip","sourcePath":"components/Badge/Badge.jsx"},{"name":"Breadcrumb","sourcePath":"components/Breadcrumb/Breadcrumb.jsx"},{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"IconButton","sourcePath":"components/Button/Button.jsx"},{"name":"Card","sourcePath":"components/Card/Card.jsx"},{"name":"StatCard","sourcePath":"components/Card/Card.jsx"},{"name":"SectionHeader","sourcePath":"components/Card/Card.jsx"},{"name":"Carousel","sourcePath":"components/Carousel/Carousel.jsx"},{"name":"Checkbox","sourcePath":"components/Checkbox/Checkbox.jsx"},{"name":"Combobox","sourcePath":"components/Combobox/Combobox.jsx"},{"name":"Datepicker","sourcePath":"components/Datepicker/Datepicker.jsx"},{"name":"Drawer","sourcePath":"components/Drawer/Drawer.jsx"},{"name":"Dropdown","sourcePath":"components/Dropdown/Dropdown.jsx"},{"name":"Input","sourcePath":"components/Input/Input.jsx"},{"name":"Textarea","sourcePath":"components/Input/Input.jsx"},{"name":"Field","sourcePath":"components/Input/Input.jsx"},{"name":"SearchInput","sourcePath":"components/Input/Input.jsx"},{"name":"Select","sourcePath":"components/Input/Input.jsx"},{"name":"Modal","sourcePath":"components/Modal/Modal.jsx"},{"name":"Pagination","sourcePath":"components/Pagination/Pagination.jsx"},{"name":"Popover","sourcePath":"components/Popover/Popover.jsx"},{"name":"ProgressBar","sourcePath":"components/ProgressBar/ProgressBar.jsx"},{"name":"Radio","sourcePath":"components/Radio/Radio.jsx"},{"name":"RadioGroup","sourcePath":"components/Radio/Radio.jsx"},{"name":"SegmentedControl","sourcePath":"components/SegmentedControl/SegmentedControl.jsx"},{"name":"Spinner","sourcePath":"components/Spinner/Spinner.jsx"},{"name":"Switch","sourcePath":"components/Switch/Switch.jsx"},{"name":"Table","sourcePath":"components/Table/Table.jsx"},{"name":"Tabs","sourcePath":"components/Tabs/Tabs.jsx"},{"name":"Toast","sourcePath":"components/Toast/Toast.jsx"},{"name":"Snackbar","sourcePath":"components/Toast/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/Tooltip/Tooltip.jsx"}],"sourceHashes":{"components/Accordion/Accordion.jsx":"b62f68c319b9","components/Alert/Alert.jsx":"f8ee515e3193","components/AuthCode/AuthCode.jsx":"6f143e806542","components/Avatar/Avatar.jsx":"38a14b2bff95","components/Badge/Badge.jsx":"aa1f13392c04","components/Breadcrumb/Breadcrumb.jsx":"3bd031f971fa","components/Button/Button.jsx":"990d85dc2926","components/Card/Card.jsx":"ee9a71fd507a","components/Carousel/Carousel.jsx":"673105d8e62c","components/Checkbox/Checkbox.jsx":"faa784846b50","components/Combobox/Combobox.jsx":"6aff3ebb6007","components/Datepicker/Datepicker.jsx":"2a74b1c1fd46","components/Drawer/Drawer.jsx":"12ca46c24510","components/Dropdown/Dropdown.jsx":"f4929284f3a0","components/Input/Input.jsx":"04c18d31eb3e","components/Modal/Modal.jsx":"d3c0a46eaf40","components/Pagination/Pagination.jsx":"a6a91fa05445","components/Popover/Popover.jsx":"6f0b1e3c362f","components/ProgressBar/ProgressBar.jsx":"64f8a2e6774b","components/Radio/Radio.jsx":"505c1ac6659f","components/SegmentedControl/SegmentedControl.jsx":"3f65efab1437","components/Spinner/Spinner.jsx":"87a9ed0f43d6","components/Switch/Switch.jsx":"4b9614602003","components/Table/Table.jsx":"eaa0d026ee9a","components/Tabs/Tabs.jsx":"5411405a0b65","components/Toast/Toast.jsx":"e0985fda599c","components/Tooltip/Tooltip.jsx":"7997caf3742a","ui_kits/globalyapp/Sidebar.jsx":"c6f07ac378b1","ui_kits/globalyapp/TopBar.jsx":"9576aaf3b7da"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GlobalyDesignSystem_c92b6a = window.GlobalyDesignSystem_c92b6a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Accordion/Accordion.jsx
try { (() => {
// Globalyapp Design System — Accordion

function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  style = {}
}) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = i => {
    setOpen(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);else next.add(i);
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid #E2E8F0',
      borderRadius: 12,
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, items.map((item, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: i ? '1px solid #E2E8F0' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '14px 16px',
        background: isOpen ? '#F8FAFC' : '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600,
        color: '#1E293B',
        fontFamily: 'inherit',
        textAlign: 'left'
      }
    }, item.title, /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "#94A3B8",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        transform: isOpen ? 'rotate(180deg)' : 'none',
        transition: 'transform .15s',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "4 6 8 10 12 6"
    }))), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px 16px',
        fontSize: 13,
        color: '#64748B',
        lineHeight: 1.55
      }
    }, item.content));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Accordion/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/Alert/Alert.jsx
try { (() => {
// Globalyapp Design System — Alert

const ALERT_VARIANTS = {
  info: {
    bg: '#DBEAFE',
    border: '#BFDBFE',
    icon: '#2563EB',
    title: '#1E40AF',
    text: '#1E3A8A'
  },
  success: {
    bg: '#DCFCE7',
    border: '#BBF7D0',
    icon: '#16A34A',
    title: '#15803D',
    text: '#166534'
  },
  warning: {
    bg: '#FEF3C7',
    border: '#FDE68A',
    icon: '#D97706',
    title: '#92400E',
    text: '#78350F'
  },
  error: {
    bg: '#FEE2E2',
    border: '#FECACA',
    icon: '#DC2626',
    title: '#991B1B',
    text: '#7F1D1D'
  }
};
const ALERT_ICONS = {
  info: /*#__PURE__*/React.createElement("path", {
    d: "M10 13v-3M10 7h.01M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
  }),
  success: /*#__PURE__*/React.createElement("path", {
    d: "M6 10l3 3 5-6M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
  }),
  warning: /*#__PURE__*/React.createElement("path", {
    d: "M10 7v4M10 14h.01M8.6 2.5 1.7 14a1.6 1.6 0 0 0 1.4 2.4h13.8a1.6 1.6 0 0 0 1.4-2.4L11.4 2.5a1.6 1.6 0 0 0-2.8 0z"
  }),
  error: /*#__PURE__*/React.createElement("path", {
    d: "M10 6v4M10 14h.01M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
  })
};
function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  style = {}
}) {
  const v = ALERT_VARIANTS[variant] || ALERT_VARIANTS.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      padding: '12px 14px',
      borderRadius: 10,
      background: v.bg,
      border: `1px solid ${v.border}`,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      color: v.icon,
      display: 'flex',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, ALERT_ICONS[variant])), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: v.title,
      marginBottom: children ? 3 : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: v.text,
      lineHeight: 1.45
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flexShrink: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: v.icon,
      padding: 0,
      display: 'flex',
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "3",
    x2: "13",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "13",
    y1: "3",
    x2: "3",
    y2: "13"
  }))));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Alert/Alert.jsx", error: String((e && e.message) || e) }); }

// components/AuthCode/AuthCode.jsx
try { (() => {
// Globalyapp Design System — AuthCode (one-time code input)

function AuthCode({
  length = 6,
  value = '',
  onChange,
  disabled = false,
  error = false,
  style = {}
}) {
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 8,
      ...style
    }
  }, chars.map((c, i) => /*#__PURE__*/React.createElement("input", {
    key: i,
    ref: el => refs.current[i] = el,
    value: c,
    disabled: disabled,
    onChange: e => onInput(i, e),
    onKeyDown: e => onKey(i, e),
    inputMode: "numeric",
    maxLength: 1,
    style: {
      width: 44,
      height: 52,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 700,
      borderRadius: 10,
      border: `1.5px solid ${error ? '#DC2626' : c ? '#012E8A' : '#E2E8F0'}`,
      background: error ? '#FEE2E2' : '#F8FAFC',
      color: '#1E293B',
      outline: 'none',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color .12s'
    }
  })));
}
Object.assign(__ds_scope, { AuthCode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/AuthCode/AuthCode.jsx", error: String((e && e.message) || e) }); }

// components/Avatar/Avatar.jsx
try { (() => {
// Globalyapp Design System — Avatar

const AVATAR_SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64
};
function initialsOf(name) {
  if (!name) return '';
  return name.trim().split(/\s+/).slice(0, 2).map(s => s[0].toUpperCase()).join('');
}
function Avatar({
  name,
  src,
  size = 'md',
  status,
  color = '#012E8A',
  style = {}
}) {
  const dim = AVATAR_SIZES[size] || size || 40;
  const statusColors = {
    online: '#16A34A',
    away: '#D97706',
    offline: '#94A3B8',
    busy: '#DC2626'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: dim,
      height: dim,
      flexShrink: 0,
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || '',
    style: {
      width: dim,
      height: dim,
      borderRadius: '50%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      borderRadius: '50%',
      background: color,
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: dim * 0.4,
      fontWeight: 700,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }
  }, initialsOf(name)), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: dim * 0.28,
      height: dim * 0.28,
      borderRadius: '50%',
      background: statusColors[status] || '#94A3B8',
      border: '2px solid #fff'
    }
  }));
}
function AvatarGroup({
  children,
  max = 4,
  size = 'md',
  style = {}
}) {
  const dim = AVATAR_SIZES[size] || 40;
  const kids = React.Children.toArray(children);
  const shown = kids.slice(0, max);
  const extra = kids.length - shown.length;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      ...style
    }
  }, shown.map((child, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i ? -dim * 0.3 : 0,
      borderRadius: '50%',
      boxShadow: '0 0 0 2px #fff'
    }
  }, child)), extra > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -dim * 0.3,
      width: dim,
      height: dim,
      borderRadius: '50%',
      background: '#F1F5F9',
      color: '#475569',
      boxShadow: '0 0 0 2px #fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: dim * 0.34,
      fontWeight: 600,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }
  }, "+", extra));
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Avatar/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/Badge/Badge.jsx
try { (() => {
// Globalyapp Design System — Badge, StatusBadge, Chip, Tag

const BADGE_VARIANTS = {
  red: {
    background: '#FEE2E2',
    color: '#991B1B',
    dot: '#EF4444'
  },
  green: {
    background: '#DCFCE7',
    color: '#15803D',
    dot: '#22C55E'
  },
  blue: {
    background: '#DBEAFE',
    color: '#1E40AF',
    dot: '#3B82F6'
  },
  yellow: {
    background: '#FEF9C3',
    color: '#713F12',
    dot: '#EAB308'
  },
  slate: {
    background: '#F1F5F9',
    color: '#334155',
    dot: '#64748B'
  },
  purple: {
    background: '#F4EEFF',
    color: '#5618BF',
    dot: '#6820E4'
  },
  orange: {
    background: '#FFEDD5',
    color: '#9A3412',
    dot: '#F97316'
  }
};
const STATUS_MAP = {
  active: 'green',
  approved: 'green',
  success: 'green',
  pending: 'yellow',
  warning: 'yellow',
  'in review': 'blue',
  review: 'blue',
  info: 'blue',
  rejected: 'red',
  error: 'red',
  draft: 'slate'
};
function Badge({
  children,
  variant = 'slate',
  dot = false,
  size = 'sm',
  style = {}
}) {
  const v = BADGE_VARIANTS[variant] || BADGE_VARIANTS.slate;
  const fontSize = size === 'xs' ? 10 : 12;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '2px 10px',
      borderRadius: 9999,
      fontSize,
      fontWeight: 500,
      background: v.background,
      color: v.color,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: v.dot,
      flexShrink: 0
    }
  }), children);
}
function StatusBadge({
  status,
  dot = true,
  style = {}
}) {
  const key = (status || '').toLowerCase();
  const variant = STATUS_MAP[key] || 'slate';
  const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : '';
  return /*#__PURE__*/React.createElement(Badge, {
    variant: variant,
    dot: dot,
    style: style
  }, label);
}
function Tag({
  children,
  variant = 'slate',
  style = {}
}) {
  const v = BADGE_VARIANTS[variant] || BADGE_VARIANTS.slate;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 8px',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      background: v.background,
      color: v.color,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}
function Chip({
  children,
  onRemove,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 9999,
      fontSize: 12,
      fontWeight: 500,
      border: '1px solid #E2E8F0',
      background: '#F8FAFC',
      color: '#334155',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      display: 'flex',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      color: '#94A3B8'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "1",
    x2: "11",
    y2: "11"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "11",
    y1: "1",
    x2: "1",
    y2: "11"
  }))));
}
Object.assign(__ds_scope, { Badge, StatusBadge, Tag, Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Badge/Badge.jsx", error: String((e && e.message) || e) }); }

// components/Breadcrumb/Breadcrumb.jsx
try { (() => {
// Globalyapp Design System — Breadcrumb

function Breadcrumb({
  items = [],
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, items.map((item, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, item.href && !last ? /*#__PURE__*/React.createElement("a", {
      href: item.href,
      style: {
        fontSize: 13,
        color: '#64748B',
        textDecoration: 'none'
      }
    }, item.label) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: last ? 600 : 400,
        color: last ? '#0F172A' : '#64748B'
      }
    }, item.label), !last && /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      stroke: "#CBD5E1",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "5 3 9 7 5 11"
    })));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Breadcrumb/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
// Globalyapp Design System — Button
// Exported design-system component.

const BTN_SIZES = {
  xs: {
    height: 24,
    padding: '0 8px',
    fontSize: 12,
    borderRadius: 4
  },
  sm: {
    height: 32,
    padding: '0 12px',
    fontSize: 14,
    borderRadius: 4
  },
  md: {
    height: 40,
    padding: '0 16px',
    fontSize: 14,
    borderRadius: 6
  },
  lg: {
    height: 44,
    padding: '0 20px',
    fontSize: 16,
    borderRadius: 8
  },
  xl: {
    height: 56,
    padding: '0 24px',
    fontSize: 16,
    borderRadius: 8,
    fontWeight: 700
  }
};
const BTN_VARIANTS = {
  primary: {
    background: '#012E8A',
    color: '#fff',
    hoverBg: '#012670'
  },
  secondary: {
    background: '#1E293B',
    color: '#fff',
    hoverBg: '#334155'
  },
  outline: {
    background: 'transparent',
    color: '#1E293B',
    border: '1.5px solid #E2E8F0',
    hoverBg: '#F8FAFC'
  },
  ghost: {
    background: 'transparent',
    color: '#475569',
    hoverBg: '#F1F5F9'
  },
  danger: {
    background: '#DC2626',
    color: '#fff',
    hoverBg: '#B91C1C'
  },
  subtle: {
    background: '#DBEAFE',
    color: '#012E8A',
    hoverBg: '#BFDBFE'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  iconRight,
  style = {},
  onClick,
  type = 'button',
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.primary;
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  const bg = hovered && !disabled ? v.hoverBg : v.background;
  return React.createElement('button', {
    type,
    disabled,
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      border: v.border || 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      fontWeight: s.fontWeight || 500,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      transition: 'background 0.15s, opacity 0.15s',
      outline: 'none',
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      borderRadius: s.borderRadius,
      background: bg,
      color: v.color,
      opacity: disabled ? 0.5 : 1,
      ...style
    },
    ...props
  }, icon && React.createElement('span', {
    style: {
      display: 'flex',
      alignItems: 'center',
      color: 'inherit'
    }
  }, icon), children, iconRight && React.createElement('span', {
    style: {
      display: 'flex',
      alignItems: 'center',
      color: 'inherit'
    }
  }, iconRight));
}
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  onClick,
  style = {},
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.ghost;
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  const dim = s.height;
  return React.createElement('button', {
    disabled,
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      padding: 0,
      background: hovered && !disabled ? v.hoverBg : v.background,
      color: v.color,
      border: v.border || 'none',
      borderRadius: s.borderRadius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      transition: 'background 0.15s',
      outline: 'none',
      flexShrink: 0,
      ...style
    },
    ...props
  }, icon);
}
Object.assign(__ds_scope, { Button, IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/Card/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Globalyapp Design System — Card, StatCard, SectionHeader

function Card({
  children,
  padding = 20,
  style = {},
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: '#fff',
      border: '1px solid #E2E8F0',
      borderRadius: 12,
      padding,
      ...style
    }
  }, props), children);
}
function StatCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  accent = '#012E8A',
  style = {}
}) {
  const changeColor = changeType === 'positive' ? '#15803D' : changeType === 'negative' ? '#DC2626' : '#64748B';
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: '#64748B',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, title), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: accent + '14',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: accent
    }
  }, icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: '#1E293B',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      lineHeight: 1
    }
  }, value), change && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: changeColor,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }
  }, change));
}
function SectionHeader({
  title,
  subtitle,
  actions,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: '#1E293B',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: '#64748B',
      margin: '2px 0 0',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, actions));
}
Object.assign(__ds_scope, { Card, StatCard, SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Card/Card.jsx", error: String((e && e.message) || e) }); }

// components/Carousel/Carousel.jsx
try { (() => {
// Globalyapp Design System — Carousel

function Carousel({
  slides = [],
  height = 220,
  autoplay = false,
  interval = 4000,
  style = {}
}) {
  const [i, setI] = React.useState(0);
  const n = slides.length;
  const go = idx => setI((idx + n) % n);
  React.useEffect(() => {
    if (!autoplay || n <= 1) return;
    const t = setInterval(() => setI(p => (p + 1) % n), interval);
    return () => clearInterval(t);
  }, [autoplay, interval, n]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      transform: `translateX(-${i * 100}%)`,
      transition: 'transform .35s ease'
    }
  }, slides.map((s, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      flex: '0 0 100%',
      height
    }
  }, s))), n > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => go(i - 1),
    style: {
      ...carBtn,
      left: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "10 3 5 8 10 13"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => go(i + 1),
    style: {
      ...carBtn,
      right: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 3 11 8 6 13"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 12,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      gap: 6
    }
  }, slides.map((_, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    onClick: () => go(idx),
    style: {
      width: idx === i ? 20 : 7,
      height: 7,
      borderRadius: 9999,
      border: 'none',
      cursor: 'pointer',
      background: idx === i ? '#012E8A' : 'rgba(255,255,255,0.7)',
      transition: 'all .2s',
      boxShadow: '0 0 0 1px rgba(0,0,0,0.06)'
    }
  })))));
}
const carBtn = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 34,
  height: 34,
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  background: 'rgba(255,255,255,0.92)',
  color: '#1E293B',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
};
Object.assign(__ds_scope, { Carousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Carousel/Carousel.jsx", error: String((e && e.message) || e) }); }

// components/Checkbox/Checkbox.jsx
try { (() => {
// Globalyapp Design System — Checkbox

function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  style = {}
}) {
  const dim = size === 'sm' ? 16 : 18;
  const on = checked || indeterminate;
  const box = /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      borderRadius: 4,
      flexShrink: 0,
      border: `1.5px solid ${on ? '#012E8A' : '#CBD5E1'}`,
      background: on ? '#012E8A' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .12s, border-color .12s'
    }
  }, indeterminate ? /*#__PURE__*/React.createElement("svg", {
    width: dim - 6,
    height: dim - 6,
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "6",
    x2: "10",
    y2: "6"
  })) : checked ? /*#__PURE__*/React.createElement("svg", {
    width: dim - 5,
    height: dim - 5,
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "2 6 5 9 10 3"
  })) : null);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), box, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: '#334155'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Checkbox/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/Combobox/Combobox.jsx
try { (() => {
// Globalyapp Design System — Combobox (searchable select)

function Combobox({
  options = [],
  value,
  onChange,
  placeholder = 'Select…',
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const selected = options.find(o => o.value === value);
  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      width: 260,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      width: '100%',
      height: 40,
      borderRadius: 8,
      border: `1px solid ${open ? '#012E8A' : '#E2E8F0'}`,
      background: '#F8FAFC',
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      fontSize: 14,
      fontFamily: 'inherit',
      color: selected ? '#1E293B' : '#94A3B8'
    }
  }, selected ? selected.label : placeholder, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "#94A3B8",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "2 5 7 10 12 5"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 6,
      zIndex: 60,
      background: '#fff',
      border: '1px solid #E2E8F0',
      borderRadius: 10,
      boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 8,
      borderBottom: '1px solid #F1F5F9'
    }
  }, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search\u2026",
    style: {
      width: '100%',
      height: 32,
      borderRadius: 6,
      border: '1px solid #E2E8F0',
      background: '#F8FAFC',
      padding: '0 8px',
      fontSize: 13,
      fontFamily: 'inherit',
      outline: 'none',
      color: '#1E293B'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 180,
      overflowY: 'auto',
      padding: 6
    }
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px',
      fontSize: 13,
      color: '#94A3B8',
      textAlign: 'center'
    }
  }, "No matches"), filtered.map(o => {
    const on = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => {
        onChange && onChange(o.value);
        setOpen(false);
        setQuery('');
      },
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '8px 10px',
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        background: on ? '#DBEAFE' : 'transparent',
        color: on ? '#012E8A' : '#334155',
        fontSize: 13,
        fontWeight: on ? 600 : 500,
        fontFamily: 'inherit',
        textAlign: 'left'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = '#F1F5F9';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = 'transparent';
      }
    }, o.label, on && /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "2 7 6 11 12 3"
    })));
  }))));
}
Object.assign(__ds_scope, { Combobox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Combobox/Combobox.jsx", error: String((e && e.message) || e) }); }

// components/Datepicker/Datepicker.jsx
try { (() => {
// Globalyapp Design System — Datepicker (calendar)

const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function Datepicker({
  value,
  onChange,
  style = {}
}) {
  const today = new Date();
  const sel = value ? new Date(value) : null;
  const [view, setView] = React.useState(() => {
    const base = sel || today;
    return {
      y: base.getFullYear(),
      m: base.getMonth()
    };
  });
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const shift = n => setView(v => {
    let m = v.m + n,
      y = v.y;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    return {
      y,
      m
    };
  });
  const isSel = d => sel && sel.getFullYear() === view.y && sel.getMonth() === view.m && sel.getDate() === d;
  const isToday = d => today.getFullYear() === view.y && today.getMonth() === view.m && today.getDate() === d;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      background: '#fff',
      border: '1px solid #E2E8F0',
      borderRadius: 12,
      padding: 14,
      boxShadow: '0 4px 6px rgba(0,0,0,0.06)',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => shift(-1),
    style: navBtn
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 3 5 7 9 11"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#1E293B'
    }
  }, MONTHS[view.m], " ", view.y), /*#__PURE__*/React.createElement("button", {
    onClick: () => shift(1),
    style: navBtn
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "5 3 9 7 5 11"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      gap: 2,
      marginBottom: 4
    }
  }, DOW.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      textAlign: 'center',
      fontSize: 11,
      fontWeight: 600,
      color: '#94A3B8',
      padding: '4px 0'
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      gap: 2
    }
  }, cells.map((d, i) => d == null ? /*#__PURE__*/React.createElement("div", {
    key: i
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => onChange && onChange(new Date(view.y, view.m, d)),
    style: {
      height: 32,
      borderRadius: 8,
      border: 'none',
      cursor: 'pointer',
      fontSize: 13,
      fontFamily: 'inherit',
      fontWeight: isSel(d) ? 600 : 500,
      background: isSel(d) ? '#012E8A' : 'transparent',
      color: isSel(d) ? '#fff' : isToday(d) ? '#012E8A' : '#334155',
      boxShadow: isToday(d) && !isSel(d) ? 'inset 0 0 0 1px #93C5FD' : 'none'
    },
    onMouseEnter: e => {
      if (!isSel(d)) e.currentTarget.style.background = '#F1F5F9';
    },
    onMouseLeave: e => {
      if (!isSel(d)) e.currentTarget.style.background = 'transparent';
    }
  }, d))));
}
const navBtn = {
  width: 28,
  height: 28,
  borderRadius: 8,
  border: '1px solid #E2E8F0',
  background: '#fff',
  cursor: 'pointer',
  color: '#475569',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
};
Object.assign(__ds_scope, { Datepicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Datepicker/Datepicker.jsx", error: String((e && e.message) || e) }); }

// components/Drawer/Drawer.jsx
try { (() => {
// Globalyapp Design System — Drawer

function Drawer({
  open = false,
  title,
  children,
  footer,
  onClose,
  side = 'right',
  width = 380,
  style = {}
}) {
  if (!open) return null;
  const isRight = side === 'right';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,23,42,0.5)',
      zIndex: 100,
      display: 'flex',
      justifyContent: isRight ? 'flex-end' : 'flex-start',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      height: '100%',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: isRight ? '-12px 0 24px rgba(0,0,0,0.12)' : '12px 0 24px rgba(0,0,0,0.12)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 20px',
      borderBottom: '1px solid #E2E8F0'
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: '#1E293B',
      margin: 0
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#94A3B8',
      padding: 4,
      marginRight: -4,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "4",
    x2: "14",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "4",
    x2: "4",
    y2: "14"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '18px 20px',
      fontSize: 14,
      color: '#475569',
      lineHeight: 1.5
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      padding: '14px 20px',
      borderTop: '1px solid #E2E8F0'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Drawer/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/Dropdown/Dropdown.jsx
try { (() => {
// Globalyapp Design System — Dropdown / Menu

function Dropdown({
  trigger,
  items = [],
  align = 'left',
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-flex',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'inline-flex'
    }
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      [align]: 0,
      marginTop: 6,
      zIndex: 60,
      minWidth: 180,
      background: '#fff',
      border: '1px solid #E2E8F0',
      borderRadius: 10,
      boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)',
      padding: 6
    }
  }, items.map((item, i) => item.divider ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 1,
      background: '#F1F5F9',
      margin: '5px 0'
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => {
      setOpen(false);
      item.onClick && item.onClick();
    },
    disabled: item.disabled,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '8px 10px',
      borderRadius: 6,
      border: 'none',
      background: 'transparent',
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      fontSize: 13,
      fontWeight: 500,
      color: item.danger ? '#DC2626' : item.disabled ? '#CBD5E1' : '#334155',
      fontFamily: 'inherit',
      textAlign: 'left'
    },
    onMouseEnter: e => {
      if (!item.disabled) e.currentTarget.style.background = item.danger ? '#FEF2F2' : '#F1F5F9';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
    }
  }, item.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexShrink: 0
    }
  }, item.icon), item.label))));
}
Object.assign(__ds_scope, { Dropdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Dropdown/Dropdown.jsx", error: String((e && e.message) || e) }); }

// components/Input/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Globalyapp Design System — Input, Textarea, Field, SearchInput, Select

const INPUT_HEIGHTS = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56
};
const INPUT_FONTS = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 16
};
const INPUT_PADS = {
  sm: '0 8px',
  md: '0 10px',
  lg: '0 12px',
  xl: '0 12px'
};
function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  state = 'default',
  size = 'md',
  leadingIcon,
  trailingIcon,
  disabled = false,
  style = {},
  ...props
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColors = {
    default: focused ? '#012E8A' : '#E2E8F0',
    active: '#012E8A',
    error: '#DC2626',
    success: '#16A34A',
    disabled: '#E2E8F0'
  };
  const bgColors = {
    default: '#F8FAFC',
    active: '#F8FAFC',
    error: '#FEE2E2',
    success: '#DCFCE7',
    disabled: '#F8FAFC'
  };
  const eff = disabled ? 'disabled' : state;
  const h = INPUT_HEIGHTS[size] || 40;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: h,
      borderRadius: 8,
      border: `1px solid ${borderColors[eff] || '#E2E8F0'}`,
      background: bgColors[eff] || '#F8FAFC',
      padding: INPUT_PADS[size] || '0 10px',
      transition: 'border-color 0.15s',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      color: '#94A3B8',
      flexShrink: 0
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      background: 'transparent',
      outline: 'none',
      fontSize: INPUT_FONTS[size] || 14,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      color: '#1E293B'
    }
  }, props)), trailingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      color: '#94A3B8',
      flexShrink: 0
    }
  }, trailingIcon));
}
function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  state = 'default',
  disabled = false,
  style = {},
  ...props
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = disabled ? '#E2E8F0' : state === 'error' ? '#DC2626' : state === 'success' ? '#16A34A' : focused ? '#012E8A' : '#E2E8F0';
  const bg = state === 'error' ? '#FEE2E2' : state === 'success' ? '#DCFCE7' : '#F8FAFC';
  return /*#__PURE__*/React.createElement("textarea", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      borderRadius: 8,
      border: `1px solid ${borderColor}`,
      background: bg,
      padding: '10px 12px',
      fontSize: 14,
      resize: 'vertical',
      outline: 'none',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      color: '#1E293B',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color 0.15s',
      ...style
    }
  }, props));
}
function Field({
  label,
  hint,
  error,
  success,
  children,
  required = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: '#64748B',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#DC2626'
    }
  }, "*")), children, (error || hint || success) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? '#DC2626' : success ? '#16A34A' : '#64748B',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }
  }, error || success || hint));
}
function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  size = 'md',
  style = {}
}) {
  const searchIcon = /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 13l-3-3"
  }));
  return /*#__PURE__*/React.createElement(Input, {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    size: size,
    leadingIcon: searchIcon,
    style: {
      minWidth: 200,
      ...style
    }
  });
}
function Select({
  value,
  onChange,
  options = [],
  placeholder,
  size = 'md',
  style = {}
}) {
  const h = INPUT_HEIGHTS[size] || 40;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    style: {
      height: h,
      width: '100%',
      borderRadius: 8,
      border: '1px solid #E2E8F0',
      background: '#F8FAFC',
      padding: '0 32px 0 10px',
      fontSize: 14,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      color: value ? '#1E293B' : '#94A3B8',
      appearance: 'none',
      outline: 'none',
      cursor: 'pointer'
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(opt => /*#__PURE__*/React.createElement("option", {
    key: opt.value,
    value: opt.value
  }, opt.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: '#94A3B8'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "2 5 7 10 12 5"
  }))));
}
Object.assign(__ds_scope, { Input, Textarea, Field, SearchInput, Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Input/Input.jsx", error: String((e && e.message) || e) }); }

// components/Modal/Modal.jsx
try { (() => {
// Globalyapp Design System — Modal

function Modal({
  open = false,
  title,
  children,
  footer,
  onClose,
  width = 480,
  style = {}
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,23,42,0.5)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '20px 22px 0'
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: '#1E293B',
      margin: 0
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#94A3B8',
      padding: 4,
      marginRight: -4,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "4",
    x2: "14",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "4",
    x2: "4",
    y2: "14"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 22px 20px',
      fontSize: 14,
      color: '#475569',
      lineHeight: 1.5
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      padding: '0 22px 20px'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Modal/Modal.jsx", error: String((e && e.message) || e) }); }

// components/Pagination/Pagination.jsx
try { (() => {
// Globalyapp Design System — Pagination

function Pagination({
  page = 1,
  total = 1,
  onChange,
  style = {}
}) {
  const go = p => {
    if (p >= 1 && p <= total && p !== page && onChange) onChange(p);
  };
  const pages = [];
  const add = p => pages.push(p);
  add(1);
  let start = Math.max(2, page - 1),
    end = Math.min(total - 1, page + 1);
  if (start > 2) add('…l');
  for (let p = start; p <= end; p++) add(p);
  if (end < total - 1) add('…r');
  if (total > 1) add(total);
  const btn = (content, opts = {}) => /*#__PURE__*/React.createElement("button", {
    onClick: opts.onClick,
    disabled: opts.disabled,
    style: {
      minWidth: 34,
      height: 34,
      padding: '0 8px',
      borderRadius: 8,
      border: `1px solid ${opts.active ? '#012E8A' : '#E2E8F0'}`,
      background: opts.active ? '#012E8A' : '#fff',
      color: opts.active ? '#fff' : opts.disabled ? '#CBD5E1' : '#334155',
      fontSize: 13,
      fontWeight: opts.active ? 600 : 500,
      cursor: opts.disabled ? 'not-allowed' : 'pointer',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 6,
      alignItems: 'center',
      ...style
    }
  }, btn(/*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 3 5 7 9 11"
  })), {
    onClick: () => go(page - 1),
    disabled: page === 1
  }), pages.map((p, i) => typeof p === 'number' ? /*#__PURE__*/React.createElement("span", {
    key: i
  }, btn(p, {
    onClick: () => go(p),
    active: p === page
  })) : /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: '#94A3B8',
      padding: '0 2px'
    }
  }, "\u2026")), btn(/*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "5 3 9 7 5 11"
  })), {
    onClick: () => go(page + 1),
    disabled: page === total
  }));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Pagination/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/Popover/Popover.jsx
try { (() => {
// Globalyapp Design System — Popover

function Popover({
  trigger,
  children,
  placement = 'bottom',
  width = 240,
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const pos = {
    bottom: {
      top: '100%',
      left: 0,
      marginTop: 8
    },
    top: {
      bottom: '100%',
      left: 0,
      marginBottom: 8
    },
    right: {
      left: '100%',
      top: 0,
      marginLeft: 8
    },
    left: {
      right: '100%',
      top: 0,
      marginRight: 8
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-flex',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'inline-flex'
    }
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 60,
      width,
      background: '#fff',
      border: '1px solid #E2E8F0',
      borderRadius: 12,
      boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)',
      padding: 14
    }
  }, children));
}
Object.assign(__ds_scope, { Popover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Popover/Popover.jsx", error: String((e && e.message) || e) }); }

// components/ProgressBar/ProgressBar.jsx
try { (() => {
// Globalyapp Design System — ProgressBar

function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  color = '#012E8A',
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const h = size === 'sm' ? 6 : size === 'lg' ? 12 : 8;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: '#334155'
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#64748B'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: h,
      borderRadius: 9999,
      background: '#E2E8F0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 9999,
      background: color,
      transition: 'width .3s ease'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ProgressBar/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/Radio/Radio.jsx
try { (() => {
// Globalyapp Design System — Radio & RadioGroup

function Radio({
  checked = false,
  onChange,
  label,
  value,
  name,
  disabled = false,
  style = {}
}) {
  const dim = 18;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    checked: checked,
    onChange: onChange,
    value: value,
    name: name,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      borderRadius: '50%',
      flexShrink: 0,
      border: `1.5px solid ${checked ? '#012E8A' : '#CBD5E1'}`,
      background: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color .12s'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#012E8A'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: '#334155'
    }
  }, label));
}
function RadioGroup({
  value,
  onChange,
  options = [],
  name = 'radio-group',
  direction = 'column',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: direction,
      gap: direction === 'row' ? 20 : 12,
      ...style
    }
  }, options.map(opt => /*#__PURE__*/React.createElement(Radio, {
    key: opt.value,
    name: name,
    value: opt.value,
    label: opt.label,
    checked: value === opt.value,
    disabled: opt.disabled,
    onChange: () => onChange && onChange(opt.value)
  })));
}
Object.assign(__ds_scope, { Radio, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Radio/Radio.jsx", error: String((e && e.message) || e) }); }

// components/SegmentedControl/SegmentedControl.jsx
try { (() => {
// Globalyapp Design System — SegmentedControl

function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style = {}
}) {
  const active = value != null ? value : options[0] && options[0].value;
  const h = size === 'sm' ? 30 : 36;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      borderRadius: 9999,
      background: '#F1F5F9',
      gap: 2,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, options.map(opt => {
    const on = opt.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      onClick: () => onChange && onChange(opt.value),
      style: {
        height: h,
        padding: '0 16px',
        borderRadius: 9999,
        border: 'none',
        cursor: 'pointer',
        background: on ? '#fff' : 'transparent',
        color: on ? '#012E8A' : '#64748B',
        fontSize: 13,
        fontWeight: on ? 600 : 500,
        fontFamily: 'inherit',
        boxShadow: on ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
        transition: 'all .12s',
        whiteSpace: 'nowrap'
      }
    }, opt.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SegmentedControl/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/Spinner/Spinner.jsx
try { (() => {
// Globalyapp Design System — Spinner

function Spinner({
  size = 24,
  color = '#012E8A',
  thickness = 2.5,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    style: {
      animation: 'gly-spin 0.7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: "none",
    stroke: "#E2E8F0",
    strokeWidth: thickness
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 0-9-9",
    fill: "none",
    stroke: color,
    strokeWidth: thickness,
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes gly-spin { to { transform: rotate(360deg); } }`));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Spinner/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/Switch/Switch.jsx
try { (() => {
// Globalyapp Design System — Switch

function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  style = {}
}) {
  const w = size === 'sm' ? 32 : 40;
  const h = size === 'sm' ? 18 : 22;
  const knob = h - 4;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: w,
      height: h,
      borderRadius: 9999,
      flexShrink: 0,
      position: 'relative',
      background: checked ? '#012E8A' : '#CBD5E1',
      transition: 'background .15s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? w - knob - 2 : 2,
      width: knob,
      height: knob,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      transition: 'left .15s'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: '#334155'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Switch/Switch.jsx", error: String((e && e.message) || e) }); }

// components/Table/Table.jsx
try { (() => {
// Globalyapp Design System — Table

function Table({
  columns = [],
  data = [],
  rowKey = 'id',
  onRowClick,
  empty = 'No data',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      border: '1px solid #E2E8F0',
      borderRadius: 12,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(col => /*#__PURE__*/React.createElement("th", {
    key: col.key,
    style: {
      textAlign: col.align || 'left',
      fontSize: 11,
      fontWeight: 700,
      color: '#94A3B8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      padding: '11px 16px',
      borderBottom: '1px solid #E2E8F0',
      whiteSpace: 'nowrap',
      background: '#F8FAFC'
    }
  }, col.header)))), /*#__PURE__*/React.createElement("tbody", null, data.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      padding: 40,
      textAlign: 'center',
      color: '#94A3B8',
      fontSize: 14
    }
  }, empty)) : data.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: row[rowKey] != null ? row[rowKey] : ri,
    onClick: () => onRowClick && onRowClick(row),
    style: {
      cursor: onRowClick ? 'pointer' : 'default',
      transition: 'background .1s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = '#FAFAFA';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = '';
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("td", {
    key: col.key,
    style: {
      textAlign: col.align || 'left',
      fontSize: 13,
      color: '#334155',
      padding: '12px 16px',
      borderBottom: ri === data.length - 1 ? 'none' : '1px solid #F1F5F9'
    }
  }, col.render ? col.render(row[col.key], row) : row[col.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Table/Table.jsx", error: String((e && e.message) || e) }); }

// components/Tabs/Tabs.jsx
try { (() => {
// Globalyapp Design System — Tabs (underline style)

function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  const active = value != null ? value : tabs[0] && tabs[0].value;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid #E2E8F0',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, tabs.map(tab => {
    const on = tab.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.value,
      onClick: () => !tab.disabled && onChange && onChange(tab.value),
      disabled: tab.disabled,
      style: {
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: tab.disabled ? 'not-allowed' : 'pointer',
        padding: '10px 14px',
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        color: tab.disabled ? '#CBD5E1' : on ? '#012E8A' : '#64748B',
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        marginBottom: -1
      }
    }, tab.label, tab.badge != null && /*#__PURE__*/React.createElement("span", {
      style: {
        background: on ? '#DBEAFE' : '#F1F5F9',
        color: on ? '#012E8A' : '#64748B',
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 600,
        padding: '0 6px',
        minWidth: 18,
        textAlign: 'center'
      }
    }, tab.badge), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        borderRadius: 2,
        background: on ? '#012E8A' : 'transparent'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tabs/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/Toast/Toast.jsx
try { (() => {
// Globalyapp Design System — Toast & Snackbar

const TOAST_VARIANTS = {
  info: {
    icon: '#2563EB',
    d: /*#__PURE__*/React.createElement("path", {
      d: "M9 12v-3M9 6h.01M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z"
    })
  },
  success: {
    icon: '#16A34A',
    d: /*#__PURE__*/React.createElement("path", {
      d: "M5 9l3 3 5-6M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z"
    })
  },
  warning: {
    icon: '#D97706',
    d: /*#__PURE__*/React.createElement("path", {
      d: "M9 6v4M9 13h.01M7.7 2.2 1.5 13a1.5 1.5 0 0 0 1.3 2.3h12.4a1.5 1.5 0 0 0 1.3-2.3L10.3 2.2a1.5 1.5 0 0 0-2.6 0z"
    })
  },
  error: {
    icon: '#DC2626',
    d: /*#__PURE__*/React.createElement("path", {
      d: "M9 5v4M9 13h.01M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z"
    })
  }
};
function Toast({
  variant = 'info',
  title,
  message,
  action,
  onClose,
  style = {}
}) {
  const v = TOAST_VARIANTS[variant] || TOAST_VARIANTS.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 11,
      minWidth: 300,
      maxWidth: 420,
      background: '#fff',
      border: '1px solid #E2E8F0',
      borderRadius: 12,
      padding: '12px 14px',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      color: v.icon,
      display: 'flex',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, v.d)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#1E293B',
      marginBottom: message ? 2 : 0
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#64748B',
      lineHeight: 1.4
    }
  }, message), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flexShrink: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#94A3B8',
      padding: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "3",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "3",
    x2: "3",
    y2: "12"
  }))));
}
function Snackbar({
  message,
  action,
  onAction,
  actionLabel = 'Undo',
  onClose,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      minWidth: 280,
      maxWidth: 460,
      background: '#1E293B',
      color: '#fff',
      borderRadius: 10,
      padding: '12px 16px',
      boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14
    }
  }, message), (action || onAction) && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      background: 'none',
      border: 'none',
      color: '#FCA5A5',
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: 'inherit',
      flexShrink: 0
    }
  }, actionLabel), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#94A3B8',
      padding: 0,
      display: 'flex',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "3",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "3",
    x2: "3",
    y2: "12"
  }))));
}
Object.assign(__ds_scope, { Toast, Snackbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Toast/Toast.jsx", error: String((e && e.message) || e) }); }

// components/Tooltip/Tooltip.jsx
try { (() => {
// Globalyapp Design System — Tooltip (hover/focus)

function Tooltip({
  label,
  placement = 'top',
  children,
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 8
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, children, open && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 50,
      whiteSpace: 'nowrap',
      background: '#0F172A',
      color: '#fff',
      fontSize: 12,
      fontWeight: 500,
      padding: '5px 9px',
      borderRadius: 6,
      pointerEvents: 'none',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tooltip/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/globalyapp/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Globalyapp Design System — Sidebar Component
// Load with: <script type="text/babel" src="Sidebar.jsx"></script>
// Exports: Sidebar, NavItem to window

const sidebarIcons = {
  dashboard: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "6",
    height: "6",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "1",
    width: "6",
    height: "6",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "9",
    width: "6",
    height: "6",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6",
    rx: "1.5"
  })),
  applications: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1 10h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 10v3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 10v3"
  })),
  documents: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5L9 1z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 1 9 5 13 5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "9",
    x2: "11",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "8",
    y2: "12"
  })),
  search: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 13l-3-3"
  })),
  chart: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "14",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "4 11 6 8 8 10 11 6"
  })),
  calendar: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "3",
    width: "14",
    height: "12",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "7",
    x2: "15",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "1",
    x2: "5",
    y2: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "11",
    y1: "1",
    x2: "11",
    y2: "5"
  })),
  settings: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
  })),
  payments: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "4",
    width: "14",
    height: "9",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "8",
    x2: "15",
    y2: "8"
  }))
};
function NavItem({
  icon,
  label,
  active = false,
  onClick,
  badge
}) {
  const [hovered, setHovered] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '8px 10px',
      borderRadius: 6,
      cursor: 'pointer',
      background: active ? '#fff' : hovered ? 'rgba(0,0,0,0.04)' : 'transparent',
      boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
      transition: 'background 0.12s, box-shadow 0.12s',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 14,
      fontWeight: active ? 600 : 400,
      color: active ? '#012E8A' : '#475569',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: active ? 1 : 0.65,
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#012E8A',
      color: '#fff',
      borderRadius: 9999,
      fontSize: 10,
      fontWeight: 700,
      padding: '1px 6px',
      minWidth: 18,
      textAlign: 'center'
    }
  }, badge));
}
function Sidebar({
  activeScreen,
  onNavigate,
  userName = 'Jane Doe',
  userRole = 'Immigration Agent'
}) {
  const navItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: sidebarIcons.dashboard
  }, {
    id: 'applications',
    label: 'Applications',
    icon: sidebarIcons.applications,
    badge: 3
  }, {
    id: 'documents',
    label: 'Documents',
    icon: sidebarIcons.documents
  }, {
    id: 'search',
    label: 'Search',
    icon: sidebarIcons.search
  }, {
    id: 'calendar',
    label: 'Calendar',
    icon: sidebarIcons.calendar
  }, {
    id: 'payments',
    label: 'Payments',
    icon: sidebarIcons.payments
  }];
  const reportItems = [{
    id: 'report-month',
    label: 'Month to Date',
    icon: sidebarIcons.chart
  }, {
    id: 'report-year',
    label: 'Year to Date',
    icon: sidebarIcons.chart
  }];
  const initials = userName.split(' ').map(n => n[0]).join('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240,
      flexShrink: 0,
      height: '100%',
      background: '#F1F5F9',
      borderRadius: 12,
      padding: '16px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 10px',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: 'linear-gradient(135deg, #1D4ED8 0%, #012E8A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "4",
    r: "2",
    fill: "rgba(255,255,255,0.6)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7.5",
    cy: "8.5",
    r: "3",
    stroke: "white",
    strokeWidth: "2",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 13 Q7.5 15.5 11 13",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: 15,
      color: '#1E293B'
    }
  }, "Globalyapp")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, navItems.map(item => /*#__PURE__*/React.createElement(NavItem, _extends({
    key: item.id
  }, item, {
    active: activeScreen === item.id,
    onClick: () => onNavigate(item.id)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#E2E8F0',
      margin: '8px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      color: '#94A3B8',
      padding: '4px 10px 6px'
    }
  }, "Reports"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, reportItems.map(item => /*#__PURE__*/React.createElement(NavItem, _extends({
    key: item.id
  }, item, {
    active: activeScreen === item.id,
    onClick: () => onNavigate(item.id)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#E2E8F0',
      margin: '8px 0'
    }
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: sidebarIcons.settings,
    label: "Settings",
    active: activeScreen === 'settings',
    onClick: () => onNavigate('settings')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#E2E8F0',
      margin: '8px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '6px 10px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: '#012E8A',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
      flexShrink: 0,
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }
  }, initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: '#1E293B',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }
  }, userName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#94A3B8',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }
  }, userRole))));
}
Object.assign(window, {
  Sidebar,
  NavItem,
  sidebarIcons
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/globalyapp/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/globalyapp/TopBar.jsx
try { (() => {
// Globalyapp Design System — TopBar Component
// Load with: <script type="text/babel" src="TopBar.jsx"></script>
// Exports: TopBar to window

function TopBar({
  title,
  subtitle,
  actions,
  onSearch,
  searchValue,
  searchPlaceholder = 'Search…'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0 20px 0',
      borderBottom: '1px solid #E2E8F0',
      marginBottom: 24,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 20,
      fontWeight: 700,
      color: '#1E293B',
      margin: 0,
      lineHeight: 1.2
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 13,
      color: '#64748B',
      margin: '3px 0 0'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexShrink: 0
    }
  }, onSearch && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 36,
      padding: '0 10px',
      borderRadius: 8,
      border: '1px solid #E2E8F0',
      background: '#F8FAFC',
      minWidth: 200
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "#94A3B8",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "4.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 11l-2.5-2.5"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: searchValue,
    onChange: e => onSearch(e.target.value),
    placeholder: searchPlaceholder,
    style: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      fontSize: 13,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: '#1E293B',
      width: '100%'
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      border: '1px solid #E2E8F0',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#64748B',
      flexShrink: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 1.5a4.5 4.5 0 0 0-4.5 4.5v3L2 11h12l-1.5-2V6A4.5 4.5 0 0 0 8 1.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 11v.5a1.5 1.5 0 0 0 3 0V11"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: '#012E8A',
      border: '1px solid #fff'
    }
  })), actions));
}
Object.assign(window, {
  TopBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/globalyapp/TopBar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.AuthCode = __ds_scope.AuthCode;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Carousel = __ds_scope.Carousel;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Combobox = __ds_scope.Combobox;

__ds_ns.Datepicker = __ds_scope.Datepicker;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Dropdown = __ds_scope.Dropdown;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Popover = __ds_scope.Popover;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Snackbar = __ds_scope.Snackbar;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
