export default function Avatar({ initials, color = "#e8590c", size = 40, fontSize = 13 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize,
        flexShrink: 0,
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {initials}
    </div>
  );
}
