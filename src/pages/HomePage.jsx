import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useData from "../hooks/useData";
import heroBg from "../hero.png";
import { C, F } from "../styles/theme";

export default function HomePage({ isLoggedIn, logout, currentUser }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Purely dynamic fetching from BD (No mock fallbacks)
  const { data: categories, loading: loadingCats } = useData("/api/categories");
  const { data: stats, loading: loadingStats } = useData("/api/platform/stats");
  const { data: content, loading: loadingContent } = useData("/api/platform/content");

  const isLoading = loadingCats || loadingStats || loadingContent;

  if (isLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.dark, color: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #333", borderTopColor: C.primary, animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
          <p style={{ fontWeight: 600 }}>Loading TiaretHub...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // If data fails to load (and no fallback), we show an error or empty state
  if (!content || !categories || !stats) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.grayLt }}>
        <div style={{ textAlign: "center", padding: 40, background: "#fff", borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: C.red }}>Backend Connection Error</h2>
          <p style={{ color: C.muted, marginTop: 12 }}>Could not reach the database. Please ensure your backend is running.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: "12px 24px", background: C.primary, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer" }}>Retry Connection</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: F.body, background: C.grayLt, color: C.dark }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: #adb5bd; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease both; }
        @media (max-width: 768px) {
          .hero-stats { display: none !important; }
        }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} isDarkBackground={true} />

      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(135deg, rgba(10,10,30,0.85) 0%, rgba(15,20,50,0.8) 100%), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        padding: "120px 5% 100px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 720, position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <div className="fade-up" style={{ display: "inline-block", background: `${C.primary}22`, border: `1px solid ${C.primary}55`, color: "#ff8c42", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            📍 Tiaret's Local Services Platform
          </div>

          {/* Headline */}
          <h1 className="fade-up" style={{ fontFamily: F.heading, fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            {content.hero_title}<br />
            <span style={{ color: C.primary }}>{content.hero_subtitle}</span>
          </h1>

          {/* Subheadline */}
          <p className="fade-up" style={{ fontSize: 18, color: "#adb5bd", lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
            {content.hero_description}
          </p>

          {/* Search bar */}
          <div className="fade-up" style={{ display: "flex", gap: 10, maxWidth: 540 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='Search a professional in Tiaret...'
                style={{
                  width: "100%", padding: "16px 16px 16px 48px",
                  borderRadius: 12, border: "2px solid #2d3561",
                  background: "#ffffff10", color: "#fff",
                  fontSize: 15, outline: "none",
                  fontFamily: F.body,
                }}
              />
            </div>
            <button
              onClick={() => navigate(search.trim() ? `/browse?q=${encodeURIComponent(search)}` : "/browse")}
              style={{
                padding: "16px 28px", borderRadius: 12, border: "none",
                background: C.primary, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer",
                fontFamily: F.body,
              }}>
              Search
            </button>
          </div>

          {/* Quick tags */}
          <div className="fade-up" style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
            {categories.slice(0, 6).map(cat => (
              <button key={cat.id} onClick={() => navigate(`/browse?category=${encodeURIComponent(cat.name)}`)} style={{
                padding: "5px 14px", borderRadius: 20,
                border: "1px solid #2d3561", background: "transparent",
                color: "#adb5bd", fontSize: 13, cursor: "pointer",
                fontFamily: F.body,
              }}>
                {cat.icon || "🔧"} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ position: "absolute", right: "5%", bottom: 50, display: "flex", gap: 40 }}>
          {[
            [stats.total_providers || 0, "Providers"], 
            [stats.total_categories || 0, "Categories"]
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: F.heading, fontSize: 28, fontWeight: 800, color: "#fff" }}>{n}</div>
              <div style={{ fontSize: 12, color: "#6c757d", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: C.primary, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>What do you need?</p>
          <h2 style={{ fontFamily: F.heading, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, marginBottom: 16 }}>Services</h2>
          <p style={{ color: C.muted, fontSize: 15, marginBottom: 48 }}>Pick a category to find the right professional for your job in Tiaret.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {categories.map(cat => (
              <div
                key={cat.id || cat.name}
                onClick={() => navigate(`/browse?category=${encodeURIComponent(cat.name)}`)}
                style={{
                  borderRadius: 20, overflow: "hidden",
                  background: cat.color || C.dark, cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 16px #0000001a",
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${cat.color || C.dark}55`; }}
                onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px #0000001a"; }}
              >
                <div style={{ padding: "20px 20px 12px" }}>
                  <div style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 18, color: "#fff" }}>
                    {cat.name}
                  </div>
                </div>

                <div style={{ margin: "0 12px 12px", borderRadius: 14, overflow: "hidden", height: 140, background: "#ffffff15" }}>
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                    onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:52px">${cat.icon || "🔧"}</div>`; }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={() => navigate("/browse")} style={{
              padding: "14px 36px", borderRadius: 12,
              border: `2px solid ${C.primary}`, background: "transparent",
              color: C.primary, fontWeight: 700, fontSize: 15,
              cursor: "pointer", fontFamily: F.body,
            }}>
              Browse All Providers →
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 5%", background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDk})`, textAlign: "center" }}>
        <h2 style={{ fontFamily: F.heading, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, color: "#fff", marginBottom: 16 }}>
          {content.cta_title}
        </h2>
        <p style={{ color: "#ffffff99", fontSize: 17, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
          {content.cta_description}
        </p>
        <button
          onClick={() => navigate("/auth")}
          style={{
            padding: "16px 40px", borderRadius: 12, border: "2px solid #fff",
            background: "transparent", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer",
            fontFamily: F.body, transition: "all 0.2s",
          }}
          onMouseOver={e => { e.target.style.background = "#fff"; e.target.style.color = C.primary; }}
          onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = "#fff"; }}
        >
          Create Free Profile →
        </button>
      </section>

      <Footer />
    </div>
  );
}