import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { C, F } from "../styles/theme";

export default function Navbar({ isLoggedIn, logout, currentUser, isDarkBackground = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home",     path: "/" },
    { label: "Browse",   path: "/browse" },
    { label: "About",    path: "/about" },
    { label: "✨ Smart AI", path: "/smart-ai" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Logic for dynamic colors
  const useWhiteText = isDarkBackground && !scrolled && !menuOpen;
  const textColor = useWhiteText ? "#fff" : C.text;
  const logoColor = useWhiteText ? "#fff" : C.dark;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled || menuOpen ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: (scrolled && !isDarkBackground) ? `1px solid ${C.gray}` : "none",
      transition: "all 0.3s",
      padding: "0 5%",
    }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-auth { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", fontFamily: F.heading, fontWeight: 900, fontSize: 24, color: logoColor, transition: "color 0.3s", letterSpacing: "-0.5px" }}>
          Tiaret<span style={{ color: C.primary }}>Hub</span>
        </Link>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 600 }}>
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{ color: textColor, textDecoration: "none", cursor: "pointer", transition: "color 0.3s" }}
              onMouseOver={e => e.target.style.color = C.primary}
              onMouseOut={e => e.target.style.color = textColor}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="desktop-auth" style={{ display: "flex", gap: 10 }}>
          {isLoggedIn ? (
            <>
              <Link 
                to={`/dashboard/${currentUser?.role}`} 
                style={{ textDecoration: "none", fontSize: 14, fontWeight: 700, color: C.primary, display: "flex", alignItems: "center", marginRight: 10 }}
              >
                👤 My Dashboard
              </Link>
              <button onClick={handleLogout} style={{
                padding: "8px 18px", borderRadius: 8,
                border: `2px solid ${useWhiteText ? "rgba(255,255,255,0.3)" : C.gray}`, 
                background: "transparent",
                fontWeight: 700, fontSize: 14, cursor: "pointer", 
                color: textColor, transition: "all 0.3s",
                fontFamily: F.body,
              }}>Log Out</button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate("/auth")} 
                style={{
                  padding: "8px 18px", borderRadius: 8,
                  border: `2px solid ${useWhiteText ? "rgba(255,255,255,0.3)" : C.gray}`, 
                  background: "transparent",
                  fontWeight: 700, fontSize: 14, cursor: "pointer", 
                  color: textColor, transition: "all 0.3s",
                  fontFamily: F.body,
                }}
              >
                Log In
              </button>
              <button 
                onClick={() => navigate("/auth")} 
                style={{
                  padding: "8px 18px", borderRadius: 8, border: "none",
                  background: C.primary, color: "#fff",
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                  fontFamily: F.body,
                  boxShadow: useWhiteText ? `0 4px 14px ${C.primary}55` : "none"
                }}
              >
                Join
              </button>
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none",
            fontSize: 26, cursor: "pointer", color: logoColor, transition: "color 0.3s"
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{ padding: "16px 0 24px", borderTop: `1px solid ${C.gray}`, display: "flex", flexDirection: "column", gap: 4 }}>
         
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setMenuOpen(false)} 
              style={{ padding: "12px 8px", fontWeight: 700, fontSize: 15, cursor: "pointer", color: C.dark, textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
          
          <div style={{ borderTop: `1px solid ${C.grayLt}`, marginTop: 8, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {isLoggedIn ? (
              <>
                <Link 
                  to={`/dashboard/${currentUser?.role}`} 
                  onClick={() => setMenuOpen(false)}
                  style={{ textDecoration: "none", padding: "12px", borderRadius: 10, background: C.primaryLt, textAlign: "center", color: C.primary, fontWeight: 700, fontSize: 14 }}
                >
                  My Dashboard
                </Link>
                <button onClick={handleLogout} style={{
                  padding: "12px", borderRadius: 10, border: `2px solid ${C.gray}`,
                  background: "transparent", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", fontFamily: F.body,
                }}>Log Out</button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => { navigate("/auth"); setMenuOpen(false); }} 
                  style={{
                    padding: "12px", borderRadius: 10, border: `2px solid ${C.gray}`,
                    background: "transparent", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", fontFamily: F.body,
                  }}
                >
                  Log In
                </button>
                <button 
                  onClick={() => { navigate("/auth"); setMenuOpen(false); }} 
                  style={{
                    padding: "12px", borderRadius: 10, border: "none",
                    background: C.primary, color: "#fff", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", fontFamily: F.body,
                  }}
                >
                  Join
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}