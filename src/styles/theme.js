/* ═══════════════════════════════════════════════════════════
   TiaretHub — Design Theme
   Single source of truth for colors, fonts, spacing
═══════════════════════════════════════════════════════════ */

export const theme = {
  colors: {
    primary:   "#e8590c",
    primaryDk: "#d63708",
    primaryLt: "#fff4f0",

    dark:    "#1a1a2e",
    darker:  "#121220",
    gray:    "#e9ecef",
    grayLt:  "#f8f9fa",
    muted:   "#6c757d",
    text:    "#495057",
    white:   "#ffffff",

    green:    "#2f9e44",
    greenLt:  "#ebfbee",
    blue:     "#1971c2",
    blueLt:   "#e7f5ff",
    yellow:   "#f59f00",
    yellowLt: "#fff9db",
    red:      "#e03131",
    redLt:    "#fff5f5",
    purple:   "#7048e8",
    purpleLt: "#f3f0ff",
    teal:     "#0ca678",
    tealLt:   "#e6fcf5",
  },

  fonts: {
    heading: "'Syne', sans-serif",
    body:    "'DM Sans', sans-serif",
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
};

/* Shortcut */
export const C = theme.colors;
export const F = theme.fonts;
export const R = theme.radius;

/* ── Status configs used across dashboards ── */
export const STATUS_CONFIG = {
  PENDING:     { label: "Pending",     bg: C.yellowLt, color: C.yellow,  icon: "⏳" },
  NEGOTIATING: { label: "Negotiating", bg: C.tealLt,   color: C.teal,    icon: "💬" },
  ACCEPTED:    { label: "Accepted",    bg: C.blueLt,   color: C.blue,    icon: "✅" },
  IN_PROGRESS: { label: "In Progress", bg: C.purpleLt, color: C.purple,  icon: "🔄" },
  COMPLETED:   { label: "Completed",   bg: C.greenLt,  color: C.green,   icon: "🎉" },
  REJECTED:    { label: "Rejected",    bg: C.redLt,    color: C.red,     icon: "⚠️" },
  CANCELLED:   { label: "Cancelled",   bg: C.grayLt,   color: C.muted,   icon: "✕"  },
};

export const ACCOUNT_STATUS_CONFIG = {
  ACTIVE:    { label: "Active",    bg: C.greenLt,  color: C.green,  icon: "✅" },
  PENDING:   { label: "Pending",   bg: C.yellowLt, color: C.yellow, icon: "⏳" },
  SUSPENDED: { label: "Suspended", bg: C.redLt,    color: C.red,    icon: "🚫" },
};

export const SERVICE_STATUS_CONFIG = {
  PUBLISHED: { label: "Published", bg: C.greenLt,  color: C.green,  icon: "🌍" },
  DRAFT:     { label: "Draft",     bg: C.yellowLt, color: C.yellow, icon: "📝" },
  ARCHIVED:  { label: "Archived",  bg: C.grayLt,   color: C.muted,  icon: "📦" },
};
