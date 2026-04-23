import { useState, useRef } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import { C, F } from "../../styles/theme";
import { MOCK_PROVIDERS } from "../../data/mockData";

export default function Portfolio({ user }) {
  const provider = MOCK_PROVIDERS.find(p => p.email === user?.email) || MOCK_PROVIDERS[0];
  const [photos, setPhotos] = useState(provider.portfolio_images || provider.photos || []);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const triggerUpload = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    
    // Mock upload delay
    await new Promise(r => setTimeout(r, 1500));

    const newPhotos = files.map(file => ({
      image_url: URL.createObjectURL(file),
      uploaded_at: new Date().toISOString(),
      name: file.name
    }));

    setPhotos(prev => [...newPhotos, ...prev]);
    setUploading(false);
    
    // Reset input
    e.target.value = "";
  };

  const removePhoto = (id) => {
    if (window.confirm("Remove this photo from your portfolio?")) {
      setPhotos(prev => prev.filter((_, i) => i !== id));
    }
  };

  return (
    <div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        multiple 
        accept="image/*" 
        style={{ display: "none" }} 
      />

      <SectionTitle action={<Button size="sm" onClick={triggerUpload} disabled={uploading}>{uploading ? "Uploading..." : "+ Upload Photos"}</Button>}>
        Portfolio & Gallery
      </SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
        {/* Upload Card - Enhanced */}
        <Card
          onClick={triggerUpload}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: 240, border: `2px dashed ${uploading ? C.primary : C.gray}`, 
            cursor: uploading ? "wait" : "pointer",
            flexDirection: "column", gap: 12,
            background: uploading ? C.primaryLt : C.white,
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}
          onMouseOver={e => { if(!uploading) { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.background = C.grayLt; } }}
          onMouseOut={e => { if(!uploading) { e.currentTarget.style.borderColor = C.gray; e.currentTarget.style.background = C.white; } }}
        >
          {uploading ? (
            <>
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid ${C.gray}`, borderTopColor: C.primary, animation: "spin 1s linear infinite" }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>Uploading Files...</span>
            </>
          ) : (
            <>
              <div style={{ fontSize: 40 }}>🖼️</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.dark }}>Add New Photos</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Drag & drop or click to browse</div>
              </div>
              <div style={{ padding: "6px 12px", background: C.grayLt, borderRadius: 20, fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>JPG, PNG, WEBP</div>
            </>
          )}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </Card>

        {photos.map((photo, i) => {
          const url = typeof photo === "string" ? photo : photo.image_url;
          const date = photo.uploaded_at ? new Date(photo.uploaded_at).toLocaleDateString() : "Recently uploaded";
          
          return (
            <Card key={i} style={{ padding: 0, overflow: "hidden", border: `1px solid ${C.gray}`, animation: "fadeUp 0.4s ease backwards" }}>
              <div
                style={{
                  height: 180,
                  background: `url(${url}) center/cover`,
                  borderRadius: "12px 12px 0 0",
                  position: "relative"
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", opacity: 0, transition: "opacity 0.3s" }} 
                  onMouseOver={e => e.currentTarget.style.opacity = 1}
                  onMouseOut={e => e.currentTarget.style.opacity = 0}
                />
              </div>
              <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.white }}>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase" }}>Uploaded On</div>
                  <div style={{ fontSize: 13, color: C.dark, fontWeight: 600 }}>{date}</div>
                </div>
                <button 
                  onClick={() => removePhoto(i)}
                  style={{ 
                    padding: "6px 12px", borderRadius: 8, border: "none", 
                    background: "#fff0f0", color: C.red, cursor: "pointer", 
                    fontSize: 12, fontWeight: 700, transition: "all 0.2s" 
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = "#fff"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "#fff0f0"; e.currentTarget.style.color = C.red; }}
                >
                  Delete
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


