export default function Chip({ label, bg, color }) {
  return (
    <span
      style={{
        padding: "3px 11px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        background: bg,
        color: color,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
