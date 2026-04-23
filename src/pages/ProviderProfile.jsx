import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MOCK_PROVIDERS, MOCK_REVIEWS } from "../data/mockData";
import { C, F } from "../styles/theme";

export default function ProviderProfile({ isLoggedIn, logout, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const provider = MOCK_PROVIDERS.find(p => p.id === parseInt(id)) || MOCK_PROVIDERS[0];
  const reviews = MOCK_REVIEWS.filter(r => r.provider === provider.name);
  
  const [activeTab, setActiveTab] = useState("about");

  const tabs = ["about", "services", "portfolio", "reviews", "location"];

  return (
    <div style={{ fontFamily: F.body, background: C.grayLt, minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} isDarkBackground={true} />

      {/* ── HEADER ── */}
      <section style={{ background: `linear-gradient(135deg, ${C.dark}, #2d3561)`, padding: "140px 5% 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          <button onClick={() => navigate("/browse")} style={{
            background: "none", border: "1px solid #ffffff22", color: "#adb5bd",
            padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13,
            fontWeight: 600, marginBottom: 28, fontFamily: F.body,
          }}>← Back to Browse</button>

          <div style={{ display: "flex", gap: 28, alignItems: "flex-start", paddingBottom: 32, flexWrap: "wrap" }}>

            {/* Avatar */}
            <div style={{
              width: 100, height: 100, borderRadius: "50%", flexShrink: 0,
              background: C.primaryLt, color: C.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 32, border: "4px solid #ffffff22",
            }}>{provider.initials}</div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                <h1 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 26, color: "#fff" }}>{provider.name}</h1>
                {provider.is_verified && <span title="Verified Professional" style={{ cursor: "help" }}>✅</span>}
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                  background: provider.is_available ? C.greenLt : C.yellowLt,
                  color: provider.is_available ? C.green : C.yellowDk,
                }}>{provider.is_available ? "🟢 Available" : "🔴 Busy"}</span>
              </div>

              <div style={{ color: C.primary, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                {provider.categories?.[0]?.name || "Professional Service"}
              </div>

              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 13, color: "#adb5bd" }}>
                <span>📍 {provider.location?.city}</span>
                <span>⏳ {provider.experience_years} years exp.</span>
                <span>📧 {provider.email}</span>
              </div>
            </div>

            {/* Contact buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 180 }}>
              {isLoggedIn ? (
                <>
                  <a href={`tel:${provider.phone}`} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "12px 20px", borderRadius: 10, border: "2px solid #fff",
                    background: "transparent", color: "#fff", fontWeight: 700, fontSize: 14,
                    textDecoration: "none",
                  }}>📞 Call Now</a>
                  <a href={`https://wa.me/${provider.phone.replace(/\D/g, '')}?text=Hello ${encodeURIComponent(provider.name)}, I found you on TiaretHub...`}
                    target="_blank" rel="noreferrer" style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "12px 20px", borderRadius: 10, border: "none",
                      background: "#25d366", color: "#fff", fontWeight: 700, fontSize: 14,
                      textDecoration: "none",
                    }}>💬 WhatsApp</a>
                </>
              ) : (
                <div style={{ background: "#ffffff11", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>🔒</div>
                  <div style={{ color: "#adb5bd", fontSize: 13, marginBottom: 12 }}>Log in to contact</div>
                  <button onClick={() => navigate("/auth")} style={{
                    width: "100%", padding: "10px 0", borderRadius: 8, border: "none",
                    background: C.primary, color: "#fff", fontWeight: 700, fontSize: 13,
                    cursor: "pointer", fontFamily: F.body,
                  }}>Log In</button>
                </div>
              )}
            </div>
          </div>

          {/* Performance bar */}
          <div style={{ display: "flex", gap: 0, borderTop: "1px solid #ffffff11", paddingTop: 20, paddingBottom: 20, flexWrap: "wrap" }}>
            {[
              { label: "Rating",        value: `${provider.rating_average} ⭐` },
              { label: "Reviews",       value: provider.rating_count },
              { label: "Experience",    value: `${provider.experience_years}y` },
              { label: "Trust Score",   value: `${provider.trust_score}%` },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, minWidth: 100, textAlign: "center", padding: "8px 0",
                borderRight: i < 3 ? "1px solid #ffffff11" : "none",
              }}>
                <div style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 18, color: "#fff" }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "#6c757d", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, borderTop: "1px solid #ffffff11" }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "14px 20px", background: "none", border: "none",
                borderBottom: activeTab === tab ? `3px solid ${C.primary}` : "3px solid transparent",
                color: activeTab === tab ? "#fff" : "#6c757d",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                textTransform: "capitalize", fontFamily: F.body,
                transition: "all 0.2s",
              }}>{tab}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 5%" }}>

        {/* ── ABOUT TAB ── */}
        {activeTab === "about" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "28px", border: `1px solid ${C.gray}` }}>
              <h3 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 18, marginBottom: 14 }}>About</h3>
              <p style={{ color: C.text, fontSize: 15, lineHeight: 1.8 }}>{provider.bio}</p>
            </div>
          </div>
        )}

        {/* ── SERVICES TAB ── */}
        {activeTab === "services" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "28px", border: `1px solid ${C.gray}` }}>
              <h3 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 18, marginBottom: 20 }}>💰 Available Services</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {provider.services?.map(service => (
                  <div key={service.id} style={{
                    padding: "20px", borderRadius: 12, background: C.grayLt, border: `1px solid ${C.gray}`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ fontWeight: 800, fontSize: 17, color: C.dark }}>{service.title}</div>
                      <div style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 18, color: C.primary }}>{service.price} DA</div>
                    </div>
                    <p style={{ fontSize: 14, color: C.muted, marginBottom: 14 }}>{service.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {service.tasks?.map(task => (
                        <span key={task.id} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 4, background: "#fff", border: `1px solid ${C.gray}`, color: C.text }}>
                          {task.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PORTFOLIO TAB ── */}
        {activeTab === "portfolio" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px", border: `1px solid ${C.gray}` }}>
            <h3 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 18, marginBottom: 20 }}>📸 Portfolio Photos</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {provider.photos?.map((photo, i) => (
                <div key={i} style={{ borderRadius: 14, overflow: "hidden", height: 200, background: C.grayLt }}>
                  <img src={photo} alt={`Work ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REVIEWS TAB ── */}
        {activeTab === "reviews" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "28px", border: `1px solid ${C.gray}`, display: "flex", alignItems: "center", gap: 32 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 52, color: C.dark }}>{provider.rating_average}</div>
                <div style={{ color: C.yellow, fontSize: 22 }}>{"★".repeat(Math.round(provider.rating_average))}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{provider.rating_count} reviews</div>
              </div>
            </div>

            {reviews.map((review, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "24px", border: `1px solid ${C.gray}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.dark, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                      {review.client[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.dark }}>{review.client}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{review.service}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: C.yellow }}>{"★".repeat(review.note)}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{review.date}</div>
                  </div>
                </div>
                <p style={{ color: C.text, fontSize: 14, lineHeight: 1.7 }}>{review.commentaire}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── LOCATION TAB ── */}
        {activeTab === "location" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px", border: `1px solid ${C.gray}` }}>
            <h3 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 18, marginBottom: 20 }}>📍 Location Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: "16px", borderRadius: 12, background: C.grayLt, border: `1px solid ${C.gray}` }}>
                <div style={{ fontWeight: 700, color: C.dark, marginBottom: 4 }}>City</div>
                <div style={{ fontSize: 15 }}>{provider.location?.city}</div>
              </div>
              <div style={{ padding: "16px", borderRadius: 12, background: C.grayLt, border: `1px solid ${C.gray}` }}>
                <div style={{ fontWeight: 700, color: C.dark, marginBottom: 4 }}>Region / Area</div>
                <div style={{ fontSize: 15 }}>{provider.location?.region}</div>
              </div>
              <div style={{ padding: "16px", borderRadius: 12, background: C.grayLt, border: `1px solid ${C.gray}` }}>
                <div style={{ fontWeight: 700, color: C.dark, marginBottom: 4 }}>Full Address</div>
                <div style={{ fontSize: 15 }}>{provider.location?.address}</div>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
