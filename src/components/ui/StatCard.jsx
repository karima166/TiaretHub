import { C, F } from "../../styles/theme";

export default function StatCard({ icon, label, value, sub, color, bg }) {
  return (
    <div
      style={{
        background: bg || C.white,
        borderRadius: 16,
        padding: "18px 12px",
        border: bg ? "none" : `1px solid ${C.gray}`,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 30, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontFamily: F.heading, fontSize: 26, fontWeight: 800, color: color || C.dark }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
