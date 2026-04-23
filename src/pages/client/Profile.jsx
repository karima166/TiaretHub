import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import { C, F } from "../../styles/theme";

import { COMMUNES_TIARET } from "../../data/mockData";

export default function Profile() {
  /* Aligned with Demandeur model: first_name, last_name, phone, location_id */
  const [form, setForm] = useState({
    first_name: "Rachid",
    last_name: "Bensaid",
    email: "client@TiaretHub.dz",
    phone: "+213 555 12 34 56",
    commune_id: 1,
    address: "Hay Salam, Rue des Roses",
  });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: `2px solid ${C.gray}`, fontSize: 14, fontFamily: F.body,
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 6 };

  const handleImageUpload = () => {
    alert("Profile image selected for upload (PATCH /demandeurs/{id}/profile-image)");
  };

  const handleSave = () => {
    alert(`Profile saved!\n\nPayload:\n${JSON.stringify({
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      commune_id: Number(form.commune_id),
      address: form.address,
    }, null, 2)}`);
  };

  const communeName = COMMUNES_TIARET.find(c => c.id === Number(form.commune_id))?.name || "—";

  return (
    <div>
      <SectionTitle>My Profile</SectionTitle>

      <Card style={{ maxWidth: 600 }}>
        {/* Profile Image Section */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid ${C.grayLt}` }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.primaryLt, border: `3px solid ${C.primary}`, color: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900 }}>
            {form.first_name[0]}{form.last_name[0]}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: C.dark, fontSize: 18, marginBottom: 4 }}>{form.first_name} {form.last_name}</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>📍 {communeName}, Tiaret</div>
            <div style={{ display: "flex", gap: 12 }}>
              <label style={{ cursor: "pointer", background: C.primaryLt, color: C.primary, padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: `1px solid ${C.primary}44` }}>
                Upload New Image
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
              </label>
              <button style={{ background: "none", border: "none", color: C.muted, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Remove</button>
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>JPG, GIF or PNG. Max size of 2MB.</div>
          </div>
        </div>

        {/* Profile Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>First Name</label>
            <input value={form.first_name} onChange={handleChange("first_name")} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input value={form.last_name} onChange={handleChange("last_name")} style={inputStyle} />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Email</label>
          <input value={form.email} disabled style={{ ...inputStyle, background: C.grayLt, color: C.muted, cursor: "not-allowed" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Phone</label>
          <input value={form.phone} onChange={handleChange("phone")} style={inputStyle} placeholder="+213 ..." />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>Commune (Tiaret Wilaya)</label>
            <select value={form.commune_id} onChange={handleChange("commune_id")} style={{ ...inputStyle, background: C.white }}>
              {COMMUNES_TIARET.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Address</label>
            <input value={form.address} onChange={handleChange("address")} style={inputStyle} placeholder="Hay, Rue..." />
          </div>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </Card>
    </div>
  );
}
