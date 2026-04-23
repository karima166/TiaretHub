import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import { C, F } from "../../styles/theme";
import { MOCK_PROVIDERS, MOCK_REQUESTS } from "../../data/mockData";

export default function Requests() {
  const provider = MOCK_PROVIDERS[0]; // Karim Boudiaf
  const myRequests = MOCK_REQUESTS.filter(r => r.provider === provider.name || r.provider === null);

  return (
    <div>
      <SectionTitle>Incoming Requests & Jobs</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {myRequests.map((r) => (
          <Card key={r.id} style={{ display: "flex", gap: 16, padding: "20px 24px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <div style={{ fontWeight: 800, color: C.dark, fontSize: 16, fontFamily: F.heading }}>{r.titre}</div>
                <Badge statut={r.status} />
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, fontWeight: 600 }}>
                Client: {r.client} · 📍 {r.address}
              </div>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 16, background: C.grayLt, padding: 12, borderRadius: 10 }}>
                {r.description}
              </div>

              {/* Task Granularity (The "Preserve Tasks" requirement) */}
              {r.tasks && r.tasks.length > 0 && (
                <div style={{ marginBottom: 16, border: `1px solid ${C.gray}`, borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ background: C.grayLt, padding: "8px 12px", fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase" }}>Work Order Details</div>
                  <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                    {r.tasks.map((t, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: C.dark }}><b>{t.qty || t.quantity}x</b> {t.name}</span>
                        <span style={{ fontWeight: 700, color: C.primary }}>{t.price || t.unit_price} DA</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.muted }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: C.primary, fontWeight: 700 }}>📅 Scheduled: {r.desired_date}</span>
              </div>
            </div>
            
            <div style={{ textAlign: "right", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                 <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase" }}>Total Budget</div>
                 <div style={{ fontSize: 24, fontWeight: 800, color: C.dark }}>{r.total_amount} <span style={{ fontSize: 14, color: C.muted }}>DA</span></div>
              </div>
              
              {["PENDING", "NEGOTIATING"].includes(r.status) && (
                <div style={{ display: "flex", gap: 8 }}>
                  <Button size="sm" variant="outline">Negotiate</Button>
                  <Button size="sm">Accept Job</Button>
                </div>
              )}
              {r.status === "ACCEPTED" && (
                <Button size="sm" variant="green">Mark as Started</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
