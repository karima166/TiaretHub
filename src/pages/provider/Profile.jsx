import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import Toggle from "../../components/ui/Toggle";
import Badge from "../../components/ui/Badge";
import { C, F, ACCOUNT_STATUS_CONFIG } from "../../styles/theme";
import { MOCK_PROVIDERS } from "../../data/mockData";

export default function Profile({ user }) {
  const provider = MOCK_PROVIDERS.find(p => p.email === user?.email) || MOCK_PROVIDERS[0];
  const [form, setForm] = useState({
    firstName: provider.first_name,
    lastName: provider.last_name,
    phone: provider.phone,
    bio: provider.bio,
    experienceYears: provider.experience_years,
    city: provider.location?.city || "",
    region: provider.location?.region || "",
    address: provider.location?.address || "",
    isAvailable: provider.is_available,
  });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const handleToggle = (field) => () => setForm({ ...form, [field]: !form[field] });

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: `2px solid ${C.gray}`, fontSize: 13, fontFamily: F.body,
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 6 };

  // Status visual mapping from Enum (PENDING, ACTIVE, SUSPENDED)
  const statusDef = ACCOUNT_STATUS_CONFIG[provider.status] || { label: provider.status, bg: C.grayLt, color: C.dark };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <SectionTitle>Provider Profile</SectionTitle>
        <span style={{ padding: "6px 14px", borderRadius: 20, background: statusDef.bg, color: statusDef.color, fontSize: 12, fontWeight: 800 }}>
          Status: {statusDef.label}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left Column: Personal info & Account Settings */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.primary, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800 }}>
              {(form.firstName || " ")[0]}{(form.lastName || " ")[0]}
            </div>
            <div>
               <Button size="sm" variant="outline">Upload Image</Button>
               <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>(Max 2MB, JPG/PNG format)</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input value={form.firstName} onChange={handleChange("firstName")} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input value={form.lastName} onChange={handleChange("lastName")} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input value={form.phone} onChange={handleChange("phone")} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Experience (Years)</label>
              <input type="number" value={form.experienceYears} onChange={handleChange("experienceYears")} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Professional Bio</label>
            <textarea value={form.bio} onChange={handleChange("bio")} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: C.grayLt, borderRadius: 12, marginBottom: 24 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.dark }}>Available for new Jobs</div>
              <div style={{ fontSize: 11, color: C.muted }}>Toggle your availability on the platform</div>
            </div>
            <Toggle enabled={form.isAvailable} onChange={handleToggle("isAvailable")} />
          </div>

          <Button>Save Provider Data</Button>
        </Card>

        {/* Right Column: Location, Categories & Read-Only Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
             <SectionTitle>Location & Service Area</SectionTitle>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input value={form.city} onChange={handleChange("city")} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Region</label>
                  <input value={form.region} onChange={handleChange("region")} style={inputStyle} />
                </div>
             </div>
             <div>
                <label style={labelStyle}>Address</label>
                <input value={form.address} onChange={handleChange("address")} style={inputStyle} />
             </div>
          </Card>

          <Card>
            <SectionTitle>Service Categories</SectionTitle>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Manage your linked professional categories.</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {provider.categories?.map((c) => (
                <span key={c.id} style={{ padding: "6px 14px", borderRadius: 20, background: C.blueLt, color: C.blue, fontSize: 12, fontWeight: 700 }}>
                  📂 {c.name}
                </span>
              ))}
            </div>
            <Button size="sm" variant="outline">+ Add Category</Button>
          </Card>

          <Card>
             <SectionTitle>Platform Trust & Stats</SectionTitle>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase" }}>Trust Score</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.dark }}>{provider.trust_score}%</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase" }}>Avg Rating</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.dark, display: "flex", alignItems: "center", gap: 4 }}>
                    {provider.rating_average} <span style={{ fontSize: 14, color: C.yellow }}>⭐</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase" }}>Reviews</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.dark }}>{provider.rating_count}</div>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

