import { Link } from "react-router-dom";
import { C, F } from "../styles/theme";

export default function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "48px 5% 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ maxWidth: 260 }}>
            <div style={{ fontFamily: F.heading, fontWeight: 900, fontSize: 24, color: "#fff", marginBottom: 12, letterSpacing: "-0.5px" }}>
              Tiaret<span style={{ color: C.primary }}>Hub</span>
            </div>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
              The trusted local services directory for Tiaret wilaya. Connecting professional service providers with residents across the region.
            </p>
            <div style={{ marginTop: 16, fontSize: 13, color: C.primary, fontWeight: 600 }}>
              📍 Tiaret, Algeria
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Platform", links: [{ l: "Browse Providers", t: "/browse" }, { l: "How It Works", t: "/about" }] },
            { title: "Dashboard", links: [{ l: "My Dashboard", t: "/auth" }, { l: "Join as Provider", t: "/auth?mode=signup" }, { l: "Admin Portal", t: "/dashboard/admin" }] },
            { title: "Explore", links: [{ l: "Search Filters", t: "/browse" }, { l: "Market Stats", t: "/" }, { l: "About Project", t: "/about" }] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>{col.title}</div>
              {col.links.map(link => (
                <div key={link.l} style={{ marginBottom: 10 }}>
                  <Link to={link.t} style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}
                    onMouseOver={e => e.target.style.color = C.primary}
                    onMouseOut={e => e.target.style.color = C.muted}
                  >
                    {link.l}
                  </Link>
                </div>
              ))}
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: 24, textAlign: "center", color: "#374151", fontSize: 13 }}>
          📍 Serving Tiaret Wilaya, Algeria &nbsp;|&nbsp; © 2025 TiaretHub
        </div>
      </div>
    </footer>
  );
}