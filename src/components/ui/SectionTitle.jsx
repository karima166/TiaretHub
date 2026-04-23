import { C, F } from "../../styles/theme";

export default function SectionTitle({ children, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
      <h3 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 17, color: C.dark, margin: 0 }}>{children}</h3>
      {action}
    </div>
  );
}
