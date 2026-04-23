import Card from "../../components/ui/Card";
import SectionTitle from "../../components/ui/SectionTitle";
import Stars from "../../components/ui/Stars";
import Chip from "../../components/ui/Chip";
import Avatar from "../../components/ui/Avatar";
import { C, F } from "../../styles/theme";
import { MOCK_REVIEWS } from "../../data/mockData";

export default function Reviews() {
  return (
    <div>
      <SectionTitle>Platform Review Administration</SectionTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {MOCK_REVIEWS.map((r) => (
          <Card key={r.id} style={{ display: "flex", gap: 20, padding: 24, alignItems: "flex-start" }}>
            <Avatar initials={r.client[0]} size={42} color={C.primary} />
            
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 800, color: C.dark, fontSize: 15 }}>{r.client}</span>
                  <span style={{ color: C.muted, fontSize: 12 }}>evaluated</span>
                  <span style={{ fontWeight: 700, color: C.primary, fontSize: 13 }}>{r.provider}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {r.flagged ? (
                    <Chip label="⚠ Reported" bg={C.redLt} color={C.red} />
                  ) : (
                    <Chip label="Verified review" bg={C.greenLt} color={C.green} />
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <Stars note={r.note} size={14} />
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{r.service} · {r.date}</span>
              </div>

              <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.6, fontStyle: "italic", background: C.grayLt, padding: "12px 16px", borderRadius: 12 }}>
                "{r.commentaire}"
              </p>

              <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                <button style={{ background: "transparent", border: "none", color: C.muted, fontSize: 12, fontWeight: 700, cursor: "not-allowed" }}>👍 {r.helpful} helpful</button>
                <div style={{ flex: 1 }}></div>
                <button style={{ background: "transparent", border: "none", color: C.red, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Delete Review</button>
                <button style={{ background: C.dark, color: C.white, border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Keep & Verify</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
