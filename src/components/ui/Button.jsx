import { C, F } from "../../styles/theme";

const SIZES = {
  sm: { padding: "6px 14px", fontSize: 12 },
  md: { padding: "10px 20px", fontSize: 14 },
  lg: { padding: "13px 28px", fontSize: 15 },
};

const VARIANTS = {
  primary:      { background: C.primary, color: "#fff", border: "none" },
  outline:      { background: "transparent", color: C.primary, border: `2px solid ${C.primary}` },
  ghost:        { background: C.grayLt, color: C.text, border: `2px solid ${C.gray}` },
  danger:       { background: C.red, color: "#fff", border: "none" },
  dangerOutline:{ background: "transparent", color: C.red, border: `2px solid ${C.red}` },
  green:        { background: C.green, color: "#fff", border: "none" },
  yellow:       { background: C.yellow, color: "#fff", border: "none" },
};

export default function Button({ children, onClick, variant = "primary", size = "md", style = {}, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...SIZES[size],
        ...VARIANTS[variant],
        borderRadius: 10,
        cursor: "pointer",
        fontFamily: F.body,
        fontWeight: 700,
        transition: "opacity .15s",
        ...style,
      }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = ".85")}
      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
}
