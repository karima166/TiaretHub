import { useState } from "react";
import Card from "../../components/ui/Card";
import SearchBar from "../../components/ui/SearchBar";
import SectionTitle from "../../components/ui/SectionTitle";
import Badge from "../../components/ui/Badge";
import { C, F } from "../../styles/theme";
import { MOCK_REQUESTS } from "../../data/mockData";

export default function Requests() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const statuses = ["all", "PENDING", "NEGOTIATING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "REJECTED"];
  const filtered = MOCK_REQUESTS.filter((r) => {
    const matchSearch = r.titre.toLowerCase().includes(search.toLowerCase()) || r.client.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <SectionTitle>Request Monitoring</SectionTitle>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search by title or client..." />
        </div>
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: filter === s ? C.primary : C.grayLt, color: filter === s ? "#fff" : C.text, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: F.body }}>
            {s === "all" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((r) => (
          <Card key={r.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: C.dark, fontSize: 14, marginBottom: 4 }}>{r.titre}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{r.client} → {r.provider || "Unassigned"} · {r.category} · {r.desired_date}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>📍 {r.address}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <Badge statut={r.status} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginTop: 8 }}>{r.total_amount} DA</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
