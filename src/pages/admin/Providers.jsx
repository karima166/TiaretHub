import { useState } from "react";
import Card from "../../components/ui/Card";
import SearchBar from "../../components/ui/SearchBar";
import SectionTitle from "../../components/ui/SectionTitle";
import Stars from "../../components/ui/Stars";
import Chip from "../../components/ui/Chip";
import Avatar from "../../components/ui/Avatar";
import { C, F, ACCOUNT_STATUS_CONFIG } from "../../styles/theme";
import { MOCK_PROVIDERS } from "../../data/mockData";

export default function Providers() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_PROVIDERS.filter((p) => {
    return p.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <SectionTitle>Provider Management Audit</SectionTitle>
      <div style={{ marginBottom: 20 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search providers by name..." />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {filtered.map((p) => {
          const st = ACCOUNT_STATUS_CONFIG[p.account_status] || {};
          const initials = p.initials || p.name.split(" ").map(n => n[0]).join("");
          return (
            <Card key={p.id} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={initials} color={p.color || C.primary} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, color: C.dark, fontSize: 14 }}>{p.name}</span>
                    {p.verified && <span style={{ fontSize: 14 }}>✅</span>}
                  </div>
                  <div style={{ fontSize: 12, color: C.muted }}>{p.email}</div>
                </div>
                <Chip label={st.label} bg={st.bg} color={st.color} />
              </div>

              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>Trust Score</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: p.trust_score >= 80 ? C.green : p.trust_score >= 50 ? C.yellow : C.red }}>{p.trust_score}%</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>Provider ID</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>#P-00{p.id}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${C.grayLt}`, paddingTop: 12 }}>
                <Stars note={Math.round(p.rating)} />
                <span style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{p.rating}</span>
                <span style={{ fontSize: 11, color: C.muted }}>({p.reviews} reviews)</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
