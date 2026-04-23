import { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import SectionTitle from "../../components/ui/SectionTitle";
import Button from "../../components/ui/Button";
import Toggle from "../../components/ui/Toggle";
import { C, F } from "../../styles/theme";
import { MOCK_CATEGORIES, MOCK_PROVIDERS } from "../../data/mockData";
import apiClient from "../../api/apiClient";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load from API (our DB), fallback to mock
    apiClient.get("/categories/")
      .then((res) => { 
        const cats = res.data.map(c => ({
          ...c,
          providers_count: MOCK_PROVIDERS.filter(p => p.categories?.some(pc => pc.id === c.id)).length
        }));
        setCategories(cats); 
        setLoading(false); 
      })
      .catch(() => { 
        const cats = MOCK_CATEGORIES.map(c => ({
          ...c,
          providers_count: MOCK_PROVIDERS.filter(p => p.categories?.some(pc => pc.id === c.id)).length
        }));
        setCategories(cats); 
        setLoading(false); 
      });
  }, []);

  const toggleActive = (id) => {
    setCategories((prev) =>
      prev.map((c) => c.id === id ? { ...c, is_active: !c.is_active } : c)
    );
  };

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: C.muted }}>Loading categories...</div>;

  return (
    <div>
      <SectionTitle action={<Button size="sm">+ Add Category</Button>}>
        Category Management
      </SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {categories.map((cat) => (
          <Card key={cat.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: 12,
                background: cat.image_url ? `url(${cat.image_url}) center/cover` : cat.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: cat.image_url ? 0 : 24, flexShrink: 0,
              }}
            >
              {!cat.image_url && cat.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: C.dark, fontSize: 14 }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{cat.providers_count || 0} providers</div>
            </div>
            <Toggle enabled={cat.is_active !== false} onChange={() => toggleActive(cat.id)} />
          </Card>
        ))}
      </div>
    </div>
  );
}
