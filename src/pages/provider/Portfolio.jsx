import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import { C } from "../../styles/theme";
import { MOCK_PROVIDERS } from "../../data/mockData";

export default function Portfolio() {
  const provider = MOCK_PROVIDERS[0];

  return (
    <div>
      <SectionTitle action={<Button size="sm">+ Upload Photos</Button>}>
        Portfolio & Gallery
      </SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {provider.portfolio_images.map((photo) => {
          const date = new Date(photo.uploaded_at).toLocaleDateString();
          return (
            <Card key={photo.id} style={{ padding: 0, overflow: "hidden" }}>
              <div
                style={{
                  height: 180,
                  background: `url(${photo.image_url}) center/cover`,
                  borderRadius: "12px 12px 0 0",
                }}
              />
              <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{date}</span>
                <button style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
                  Remove
                </button>
              </div>
            </Card>
          );
        })}

        {/* Upload placeholder */}
        <Card
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: 220, border: `2px dashed ${C.gray}`, cursor: "pointer",
            flexDirection: "column", gap: 8,
          }}
        >
          <span style={{ fontSize: 36 }}>📸</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Add Photo</span>
          <span style={{ fontSize: 11, color: C.muted }}>JPG, PNG up to 5MB</span>
        </Card>
      </div>
    </div>
  );
}
