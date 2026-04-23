import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import SectionTitle from "../../components/ui/SectionTitle";
import { C } from "../../styles/theme";
import { MOCK_REQUESTS, MOCK_REVIEWS } from "../../data/mockData";

export default function Overview() {
  /* filter for Rachid (demo user) */
  const myRequests = MOCK_REQUESTS.filter(r => r.client?.startsWith("Rachid"));
  const myReviews = MOCK_REVIEWS.filter(r => r.client?.startsWith("Rachid"));

  const stats = [
    { icon: "📬", label: "Total Requests", value: myRequests.length, color: C.primary, bg: C.primaryLt },
    { icon: "🔄", label: "In Progress",    value: myRequests.filter(r => r.status === "IN_PROGRESS" || r.status === "ACCEPTED").length, color: C.blue, bg: C.blueLt },
    { icon: "✅", label: "Completed",      value: myRequests.filter(r => r.status === "COMPLETED").length, color: C.green, bg: C.greenLt },
    { icon: "⭐", label: "Reviews Given",  value: myReviews.length, color: C.yellow, bg: C.yellowLt },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <SectionTitle>My Recent Requests</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {myRequests.slice(0, 4).map((r) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: C.grayLt, borderRadius: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{r.titre}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{r.provider || "Awaiting provider"} · {r.desired_date}</div>
                </div>
                <Badge statut={r.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Quick Actions</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "🔍", label: "Browse Providers", desc: "Find a professional for your job" },
              { icon: "📝", label: "New Request",      desc: "Submit a new service request" },
              { icon: "⭐", label: "Write a Review",   desc: "Rate a completed service" },
              { icon: "💬", label: "Messages",         desc: "Chat with your service providers" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: C.grayLt, borderRadius: 10, cursor: "pointer" }}>
                <span style={{ fontSize: 22 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
