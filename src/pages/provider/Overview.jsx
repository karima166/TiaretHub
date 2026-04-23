import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import SectionTitle from "../../components/ui/SectionTitle";
import Stars from "../../components/ui/Stars";
import Avatar from "../../components/ui/Avatar";
import { C, F } from "../../styles/theme";
import { MOCK_PROVIDERS, MOCK_REQUESTS, MOCK_REVIEWS } from "../../data/mockData";

export default function Overview({ user, setActive }) {
  const provider = MOCK_PROVIDERS.find(p => p.email === user?.email) || MOCK_PROVIDERS[0];
  const myRequests = MOCK_REQUESTS.filter(r => r.provider === provider.name);
  const myReviews = MOCK_REVIEWS.filter(r => r.provider === provider.name).sort((a,b) => new Date(b.date) - new Date(a.date));

  const stats = [
    { icon: "📬", label: "Active Jobs",    value: myRequests.filter(r => ["IN_PROGRESS", "ACCEPTED", "NEGOTIATING"].includes(r.status)).length, color: C.primary, bg: C.primaryLt },
    { icon: "✅", label: "Completed",      value: myRequests.filter(r => r.status === "COMPLETED").length, color: C.green,   bg: C.greenLt },
    { icon: "⭐", label: "Avg Rating",     value: provider.rating_average || provider.rating, color: C.yellow, bg: C.yellowLt },
    { icon: "🛡️", label: "Trust Score",    value: `${provider.trust_score}%`, color: C.blue, bg: C.blueLt },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20 }}>
        <Card>
          <SectionTitle>Recent Job Requests</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {myRequests.slice(0, 4).map((r) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: C.grayLt, borderRadius: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{r.titre}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Client: {r.client} · 📅 {r.desired_date}</div>
                </div>
                <Badge statut={r.status} />
              </div>
            ))}
            {myRequests.length === 0 && <div style={{ textAlign: "center", padding: "20px", color: C.muted, fontSize: 13 }}>No requests yet.</div>}
            <button onClick={() => setActive("requests")} style={{ padding: "12px", background: "transparent", border: `1px solid ${C.gray}`, borderRadius: 10, fontSize: 12, fontWeight: 700, color: C.muted, cursor: "pointer", marginTop: 8 }}>View All Requests →</button>
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <SectionTitle style={{ marginBottom: 0 }}>Latest Reviews</SectionTitle>
            <button onClick={() => setActive("reviews")} style={{ background: "transparent", border: "none", color: C.primary, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>View All</button>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {myReviews.slice(0, 3).map((r) => (
              <div key={r.id} style={{ padding: "14px", background: C.grayLt, borderRadius: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Avatar initials={r.client[0]} size={32} color={C.primary} />
                  <div style={{ flex: 1 }}>
                     <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{r.client}</div>
                     <div style={{ fontSize: 10, color: C.muted }}>{r.date}</div>
                  </div>
                  <Stars note={r.note} size={12} />
                </div>
                <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5, fontStyle: "italic" }}>"{r.commentaire}"</div>
              </div>
            ))}
            {myReviews.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px", color: C.muted, fontSize: 13 }}>No reviews received yet.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

