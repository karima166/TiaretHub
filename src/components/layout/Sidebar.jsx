import { C, F } from "../../styles/theme";

export default function Sidebar({ items, active, setActive, user, onLogout, collapsed, onToggle }) {
  const w = collapsed ? 68 : 240;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .dash-sidebar { display: none !important; }
          .dash-sidebar.open { display: flex !important; position: fixed; top: 0; left: 0; bottom: 0; z-index: 200; }
          .sidebar-overlay { display: block !important; }
        }
      `}</style>

      <aside
        className="dash-sidebar"
        style={{
          width: w,
          minHeight: "100vh",
          background: C.dark,
          display: "flex",
          flexDirection: "column",
          transition: "width .25s ease",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {/* ── Logo area ── */}
        <div
          style={{
            padding: collapsed ? "20px 10px" : "20px 20px",
            borderBottom: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            minHeight: 68,
          }}
        >
          {!collapsed && (
            <span style={{ fontFamily: F.heading, fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: "-0.5px" }}>
              Tiaret<span style={{ color: C.primary }}>Hub</span>
            </span>
          )}
          <button
            onClick={onToggle}
            style={{
              background: "rgba(255,255,255,.06)",
              border: "none",
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 8,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {collapsed ? "☰" : "✕"}
          </button>
        </div>

        {/* ── Nav items ── */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: collapsed ? "10px 0" : "10px 14px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: 10,
                  border: "none",
                  background: isActive ? "rgba(232,89,12,.15)" : "transparent",
                  color: isActive ? C.primary : "rgba(255,255,255,.55)",
                  cursor: "pointer",
                  fontFamily: F.body,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 14,
                  transition: "all .15s",
                  width: "100%",
                  textAlign: "left",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,.05)";
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 3,
                      borderRadius: 2,
                      background: C.primary,
                    }}
                  />
                )}
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.badge > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: C.primary,
                      color: "#fff",
                      borderRadius: 10,
                      padding: "1px 7px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ── User info ── */}
        {user && (
          <div
            style={{
              padding: collapsed ? "16px 10px" : "16px 20px",
              borderTop: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: collapsed ? "center" : "flex-start",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: C.primary,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              {user.initials || user.name?.[0] || "U"}
            </div>
            {!collapsed && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{user.role}</div>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={onLogout}
                title="Log out"
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,.35)",
                  cursor: "pointer",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                🚪
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
