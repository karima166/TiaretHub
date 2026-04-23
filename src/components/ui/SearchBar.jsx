import { C, F } from "../../styles/theme";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 15 }}>🔍</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          paddingLeft: 36,
          paddingRight: 14,
          paddingTop: 9,
          paddingBottom: 9,
          borderRadius: 10,
          border: `2px solid ${C.gray}`,
          fontSize: 13,
          fontFamily: F.body,
          width: "100%",
          boxSizing: "border-box",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = C.primary)}
        onBlur={(e) => (e.target.style.borderColor = C.gray)}
      />
    </div>
  );
}
