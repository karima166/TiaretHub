import { useState } from "react";
import Card from "../../components/ui/Card";
import SearchBar from "../../components/ui/SearchBar";
import SectionTitle from "../../components/ui/SectionTitle";
import Stars from "../../components/ui/Stars";
import Chip from "../../components/ui/Chip";
import { C, F, SERVICE_STATUS_CONFIG } from "../../styles/theme";
import { MOCK_PROVIDERS, MOCK_CATEGORIES } from "../../data/mockData";

export default function Services() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const allServices = MOCK_PROVIDERS.flatMap(p => 
    p.services.map(s => ({ 
      ...s, 
      provider_id: p.id, 
      provider_name: p.name,
      category_name: p.categories?.[0]?.name || "N/A",
      category_id: p.categories?.[0]?.id || 0
    }))
  );

  const filtered = allServices.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });



  return (
    <div>
      <SectionTitle>Platform Services Catalog</SectionTitle>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search by service title..." />
        </div>
        {["all", "PUBLISHED", "DRAFT", "ARCHIVED"].map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            style={{
              padding: "8px 16px", borderRadius: 8, border: "none",
              background: statusFilter === f ? C.primary : C.grayLt,
              color: statusFilter === f ? "#fff" : C.text,
              fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: F.body,
            }}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: F.body }}>
          <thead>
            <tr style={{ background: C.grayLt, textAlign: "left" }}>
              <th style={{ padding: 14, fontWeight: 700, color: C.dark }}>Service</th>
              <th style={{ padding: 14, fontWeight: 700, color: C.dark }}>Provider</th>
              <th style={{ padding: 14, fontWeight: 700, color: C.dark }}>Category</th>
              <th style={{ padding: 14, fontWeight: 700, color: C.dark }}>Base Price</th>
              <th style={{ padding: 14, fontWeight: 700, color: C.dark }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const st = SERVICE_STATUS_CONFIG[s.status] || {};
              return (
                <tr key={s.id} style={{ borderBottom: `1px solid ${C.gray}` }}>
                    <td style={{ padding: 14, fontWeight: 600, color: C.dark }}>{s.title}</td>
                  <td style={{ padding: 14, color: C.text }}>{s.provider_name}</td>
                  <td style={{ padding: 14, color: C.muted }}>{s.category_name}</td>
                  <td style={{ padding: 14, fontWeight: 600, color: C.dark }}>{s.price} DA</td>
                  <td style={{ padding: 14 }}>
                    <Chip label={st.label} bg={st.bg} color={st.color} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
