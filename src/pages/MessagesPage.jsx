import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { C, F } from "../styles/theme";

const CONVERSATIONS = [
  { id: 1, name: "Sara M.",    last: "Are you still available this weekend?", time: "10:32 AM", unread: 2, avatar: "SM", online: true },
  { id: 2, name: "Rachid B.",  last: "Thank you, great job!", time: "Yesterday", unread: 0, avatar: "RB", online: false },
  { id: 3, name: "Omar T.",    last: "How much would it cost?", time: "Monday", unread: 1, avatar: "OT", online: true },
  { id: 4, name: "Nadia K.",   last: "Can you come tomorrow morning?", time: "Sunday", unread: 0, avatar: "NK", online: false },
];

const DUMMY_CHAT = [
  { from: "them", text: "Hi! Are you available this weekend for a plumbing job?", time: "10:15 AM" },
  { from: "me",   text: "Hello! Yes I'm available Saturday afternoon. What's the issue?", time: "10:20 AM" },
  { from: "them", text: "I have a leaking pipe under the kitchen sink.", time: "10:22 AM" },
  { from: "me",   text: "No problem, I can fix that. It usually takes about 1 hour.", time: "10:25 AM" },
  { from: "them", text: "Are you still available this weekend?", time: "10:32 AM" },
];

export default function MessagesPage({ isLoggedIn, logout, currentUser }) {
  const [activeConv, setActiveConv] = useState(CONVERSATIONS[0]);
  const [newMsg, setNewMsg] = useState("");
  const [chat, setChat] = useState(DUMMY_CHAT);
  const navigate = useNavigate();

  if (!isLoggedIn) {
     return (
       <div style={{ fontFamily: F.body, background: C.grayLt, minHeight: "100vh" }}>
         <Navbar isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} isDarkBackground={true} />
         <section style={{ background: `linear-gradient(135deg, ${C.dark}, #2d3561)`, padding: "140px 5% 80px", textAlign: "center" }}>
           <div style={{ fontSize: 64, marginBottom: 24 }}>🔒</div>
           <h1 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.6rem)", color: "#fff", marginBottom: 12 }}>Secure Messages</h1>
           <p style={{ color: "#adb5bd", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>Log in to view your messages and chat with professional service providers in Tiaret.</p>
         </section>
         <div style={{ textAlign: "center", padding: "80px 5%" }}>
           <button onClick={() => navigate("/auth")} style={{
             padding: "16px 48px", borderRadius: 14, border: "none",
             background: C.primary, color: "#fff", fontWeight: 800, fontSize: 16,
             cursor: "pointer", fontFamily: F.body, boxShadow: `0 10px 25px ${C.primary}44`
           }}>Log In to Continue</button>
         </div>
         <Footer />
       </div>
     );
  }

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setChat(prev => [...prev, { from: "me", text: newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMsg("");
  };

  return (
    <div style={{ fontFamily: F.body, background: "#f1f3f5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} isDarkBackground={true} />

      <section style={{ background: `linear-gradient(135deg, ${C.dark}, #2d3561)`, padding: "140px 5% 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <div>
            <h1 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.6rem)", color: "#fff", marginBottom: 8 }}>Secure Messaging</h1>
            <p style={{ color: "#adb5bd", fontSize: 14 }}>Real-time communication with platform professionals.</p>
          </div>
          <button 
            onClick={() => navigate(`/dashboard/${currentUser?.role}`)}
            style={{ padding: "12px 24px", borderRadius: 12, border: `1px solid ${C.primary}66`, background: "rgba(232, 89, 12, 0.1)", color: C.primary, fontWeight: 700, fontSize: 14, cursor: "pointer", backdropFilter: "blur(8px)" }}
          >
            ← My Full Dashboard
          </button>
        </div>
      </section>

      <main style={{ flex: 1, padding: "32px 5%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 1100, display: "flex", gap: 24, height: "calc(100vh - 350px)", minHeight: 600 }}>
          
          {/* Sidebar List */}
          <aside style={{ width: 340, flexShrink: 0, background: "#fff", borderRadius: 24, border: `1px solid ${C.gray}`, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div style={{ padding: "24px 28px", borderBottom: `1px solid ${C.gray}`, fontWeight: 800, fontSize: 16, color: C.dark, background: "#fff", display: "flex", justifyContent: "space-between" }}>
              <span>Conversations</span>
              <span style={{ fontSize: 18 }}>💬</span>
            </div>
            <div style={{ overflowY: "auto", flex: 1, padding: 12 }}>
              {CONVERSATIONS.map(conv => (
                <div key={conv.id} onClick={() => setActiveConv(conv)} style={{
                  padding: "16px 20px", borderRadius: 18, cursor: "pointer", transition: "all 0.25s",
                  background: activeConv.id === conv.id ? C.primaryLt : "transparent",
                  display: "flex", alignItems: "center", gap: 14, marginBottom: 8,
                  border: `1px solid ${activeConv.id === conv.id ? C.primary + "33" : "transparent"}`
                }}>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 16, flexShrink: 0,
                      background: activeConv.id === conv.id ? C.primary : C.dark, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 14, transition: "0.3s"
                    }}>{conv.avatar}</div>
                    {conv.online && <div style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: "50%", background: C.green, border: "2px solid #fff" }}></div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ fontWeight: 800, fontSize: 14, color: C.dark }}>{conv.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{conv.time}</div>
                    </div>
                    <div style={{ fontSize: 13, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{conv.last}</div>
                  </div>
                  {conv.unread > 0 && (
                    <div style={{ background: C.primary, color: "#fff", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 800 }}>
                      {conv.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Chat Interface */}
          <div style={{ flex: 1, background: "#fff", borderRadius: 24, border: `1px solid ${C.gray}`, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
            {/* Header */}
            <header style={{ padding: "18px 28px", borderBottom: `1px solid ${C.gray}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fcfcfc" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: C.dark, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{activeConv.avatar}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: C.dark }}>{activeConv.name}</div>
                  <div style={{ fontSize: 12, color: C.green, fontWeight: 700 }}>● {activeConv.online ? "Online" : "Away"}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={{ width: 40, height: 40, borderRadius: 12, border: "none", background: C.grayLt, color: C.dark, cursor: "pointer", fontSize: 18 }}>📞</button>
                <button style={{ width: 40, height: 40, borderRadius: 12, border: "none", background: C.grayLt, color: C.dark, cursor: "pointer", fontSize: 18 }}>ℹ️</button>
              </div>
            </header>

            {/* Content Inbox */}
            <div style={{ flex: 1, overflowY: "auto", padding: "30px", display: "flex", flexDirection: "column", gap: 20, background: "#fafafa" }}>
              {chat.map((msg, i) => {
                const isMe = msg.from === "me";
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "70%", padding: "14px 20px", borderRadius: 20, fontSize: 15, lineHeight: 1.6,
                      background: isMe ? C.primary : C.white,
                      color: isMe ? "#fff" : C.dark,
                      boxShadow: isMe ? `0 8px 20px ${C.primary}33` : "0 4px 15px rgba(0,0,0,.04)",
                      borderBottomRightRadius: isMe ? 4 : 20,
                      borderBottomLeftRadius: isMe ? 20 : 4,
                      position: "relative"
                    }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 6, fontWeight: 600 }}>{msg.time}</div>
                  </div>
                );
              })}
            </div>

            {/* Input Composer */}
            <footer style={{ padding: "20px 28px", borderTop: `1px solid ${C.gray}`, display: "flex", gap: 14, background: "#fff", alignItems: "center" }}>
              <button style={{ width: 44, height: 44, borderRadius: 14, border: `1px solid ${C.gray}`, background: "none", fontSize: 20, cursor: "pointer" }}>📎</button>
              <div style={{ flex: 1, position: "relative" }}>
                <input
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Draft your message here..."
                  style={{ width: "100%", padding: "14px 20px", borderRadius: 16, border: `2px solid ${C.gray}`, fontSize: 14, fontFamily: F.body, outline: "none", transition: "0.2s" }}
                  onFocus={e => e.target.style.borderColor = C.primary}
                  onBlur={e => e.target.style.borderColor = C.gray}
                />
              </div>
              <button onClick={sendMessage} style={{
                padding: "14px 32px", borderRadius: 16, border: "none",
                background: C.primary, color: "#fff", fontWeight: 800, fontSize: 14,
                cursor: "pointer", fontFamily: F.body, boxShadow: `0 8px 16px ${C.primary}33`
              }}>Send</button>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}