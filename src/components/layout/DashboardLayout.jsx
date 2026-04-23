import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { C, F } from "../../styles/theme";

export default function DashboardLayout({ navItems, active, setActive, user, onLogout, children, title }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ fontFamily: F.body, minHeight: "100vh", background: C.grayLt, display: "flex" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .dash-content-fade { animation: fadeUp .35s ease both; }
        @media (max-width: 768px) {
          .dash-topbar-toggle { display: flex !important; }
        }
      `}</style>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 199 }}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        items={navItems}
        active={active}
        setActive={(id) => { setActive(id); setMobileOpen(false); }}
        user={user}
        onLogout={onLogout}
        collapsed={collapsed}
        onToggle={() => { setCollapsed(!collapsed); setMobileOpen(!mobileOpen); }}
      />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
        {/* Top bar */}
        <header
          style={{
            height: 64,
            background: C.white,
            borderBottom: `1px solid ${C.gray}`,
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            gap: 16,
            flexShrink: 0,
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="dash-topbar-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: C.dark,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ☰
          </button>

          {/* Title */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 20, color: C.dark, margin: 0 }}>
              {title || navItems.find((n) => n.id === active)?.label || "Dashboard"}
            </h1>
          </div>

          {/* Home link */}
          <Link
            to="/"
            style={{
              background: "none",
              border: `2px solid ${C.gray}`,
              borderRadius: 10,
              padding: "6px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              color: C.muted,
              fontFamily: F.body,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center"
            }}
          >
            🏠 Home
          </Link>
        </header>

        {/* Content */}
        <main className="dash-content-fade" style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
