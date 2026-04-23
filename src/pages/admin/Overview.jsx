import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import SectionTitle from "../../components/ui/SectionTitle";
import { C, F } from "../../styles/theme";
import { MOCK_REQUESTS, MOCK_USERS } from "../../data/mockData";

export default function Overview() {
  const stats = [
    { icon: "👥", label: "Total Users",    value: MOCK_USERS.length,  sub: "+3 this week", color: C.blue,   bg: C.blueLt },
    { icon: "🛠️", label: "Providers",      value: MOCK_PROVIDERS.length, sub: "Active", color: C.green,  bg: C.greenLt },
    { icon: "📬", label: "Active Requests", value: MOCK_REQUESTS.filter(r => !["COMPLETED", "CANCELLED", "REJECTED"].includes(r.status)).length, sub: "In progress", color: C.primary, bg: C.primaryLt },
    { icon: "⭐", label: "Avg Rating",     value: "4.7", sub: "Platform average", color: C.yellow, bg: C.yellowLt },
  ];

  const alerts = [
    { type: "warning", icon: "⚠️", message: "2 providers pending verification", time: "1 hour ago" },
    { type: "info",    icon: "🔔", message: "Monthly report available for download", time: "3 hours ago" },
    { type: "success", icon: "✅", message: "Platform uptime at 99.8% this month", time: "Today" },
  ];

  const recentRequests = MOCK_REQUESTS.slice(0, 5);

  return (
    <div>
      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Alerts */}
        <Card>
          <SectionTitle>System Alerts</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {alerts.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: C.grayLt, borderRadius: 10 }}>
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{a.message}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent requests */}
        <Card>
          <SectionTitle>Recent Requests</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recentRequests.map((r) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 14px", background: C.grayLt, borderRadius: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{r.titre}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{r.client} → {r.provider || "Unassigned"}</div>
                </div>
                <Badge statut={r.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
