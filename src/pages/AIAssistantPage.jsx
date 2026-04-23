import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { C, F } from "../styles/theme";
import heroBg from "../hero.png";

export default function AIAssistantPage({ isLoggedIn, logout, currentUser }) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSearch = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setChat(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    // AI Simulation (English)
    await new Promise(r => setTimeout(r, 1500));

    let aiResponse = "Analyzing your needs... I suggest checking our top plumbing and electrical experts in your area of Tiaret.";
    if (userMsg.toLowerCase().includes("sink") || userMsg.toLowerCase().includes("leak")) {
      aiResponse = "It seems you have a plumbing issue. I recommend Karim Boudiaf, our top-rated expert in Tiaret for water leaks.";
    }

    setChat(prev => [...prev, { role: "assistant", text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div style={{
      fontFamily: F.body,
      background: `linear-gradient(135deg, rgba(10,10,30,0.92) 0%, rgba(15,20,50,0.85) 100%), url(${heroBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      color: "#fff"
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeUp 0.8s ease both; }
        textarea::placeholder { color: #6c757d; }
      `}</style>

      {/* Pass isDarkBackground to Navbar for white text over dark hero */}
      <Navbar isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} isDarkBackground={true} />

      <main style={{ padding: "160px 5% 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 800 }}>

          {/* Badge */}
          <div className="fade-in" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(232, 89, 12, 0.1)", border: "1px solid rgba(232, 89, 12, 0.3)",
            padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 900,
            textTransform: "uppercase", letterSpacing: 1.5, color: "#fff", marginBottom: 32
          }}>
            ✨ Tiaret<span style={{ color: C.primary }}>HUB</span> Smart AI
          </div>

          {/* Headlines (Translated to English) */}
          <h1 className="fade-in" style={{
            fontFamily: F.heading, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800,
            lineHeight: 1.1, marginBottom: 24, maxWidth: 900
          }}>
            Describe your problem,<br />
            <span style={{ color: C.primary }}>the AI handles the rest.</span>
          </h1>

          <p className="fade-in" style={{
            fontSize: 18, color: "#adb5bd", maxWidth: 600, lineHeight: 1.6, marginBottom: 60,
            animationDelay: "0.2s", textAlign: "left"
          }}>
            Our intelligent assistant analyzes your needs to guide you to the right professional in Tiaret.
          </p>

          {/* Search Container */}
          <div className="fade-in" style={{
            width: "100%", maxWidth: 800, background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24,
            padding: 32, backdropFilter: "blur(20px)", boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
            animationDelay: "0.4s"
          }}>
            <div style={{ textAlign: "left", marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 700, color: "#adb5bd", marginBottom: 12, display: "block" }}>
                What is the problem? (Ex: "My sink is leaking", "Power outage"...)
              </label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Write here in your own words..."
                style={{
                  width: "100%", height: 120, outline: "none",
                  background: "rgba(255,255,255,0.03)", borderRadius: 16,
                  padding: 20, color: "#fff", fontSize: 16, fontFamily: F.body,
                  resize: "none", border: "1px solid rgba(255,255,255,0.05)"
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleSearch}
                disabled={loading || !input.trim()}
                style={{
                  padding: "14px 40px", borderRadius: 12, border: "none",
                  background: input.trim() ? C.primary : "#2d2d3a",
                  color: "#fff", fontWeight: 800, fontSize: 15, cursor: input.trim() ? "pointer" : "default",
                  transition: "all 0.3s", boxShadow: input.trim() ? `0 8px 24px ${C.primary}44` : "none"
                }}
              >
                {loading ? "Analyzing..." : "Launch AI ✨"}
              </button>
            </div>
          </div>

          {/* Chat History / Results */}
          {chat.length > 0 && (
            <div style={{ width: "100%", maxWidth: 800, marginTop: 40, display: "flex", flexDirection: "column", gap: 20 }}>
              {chat.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  textAlign: "left", maxWidth: "80%", padding: "16px 24px", borderRadius: 20,
                  background: msg.role === "user" ? "#2d2d3a" : "rgba(232, 89, 12, 0.1)",
                  border: msg.role === "user" ? "1px solid rgba(255,255,255,0.05)" : `1px solid ${C.primary}33`,
                  color: msg.role === "user" ? "#fff" : C.primary,
                  fontWeight: msg.role === "assistant" ? 600 : 400
                }}>
                  {msg.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
