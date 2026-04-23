import { useState } from "react";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import { C, F } from "../../styles/theme";
import { MOCK_MESSAGES } from "../../data/mockData";

export default function Messages({ user }) {
  const [selectedChat, setSelectedChat] = useState(MOCK_MESSAGES[0]?.id || null);
  const [newMsg, setNewMsg] = useState("");
  
  // For demo: if we are a provider, swap "me" logic or just show the messages as they are
  const chat = MOCK_MESSAGES.find(c => c.id === selectedChat);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, height: "calc(100vh - 180px)", borderRadius: 16, overflow: "hidden", border: `1px solid ${C.gray}`, background: C.white }}>
      {/* Chat list */}
      <div style={{ background: C.white, borderRight: `1px solid ${C.gray}`, overflowY: "auto" }}>
        <div style={{ padding: "20px 20px 12px", fontWeight: 800, fontFamily: F.heading, fontSize: 16, color: C.dark, borderBottom: `1px solid ${C.gray}55` }}>Messages</div>
        {MOCK_MESSAGES.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedChat(c.id)}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "14px 20px",
              cursor: "pointer",
              background: selectedChat === c.id ? C.primaryLt : "transparent",
              borderLeft: selectedChat === c.id ? `3px solid ${C.primary}` : "3px solid transparent",
              transition: "all 0.2s"
            }}
          >
            <Avatar initials={c.avatar} color={c.color} size={38} fontSize={12} />
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: C.dark }}>{c.from}</span>
                <span style={{ fontSize: 10, color: C.muted }}>{c.time}</span>
              </div>
              <div style={{ fontSize: 12, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.preview}</div>
            </div>
            {c.unread > 0 && (
              <span style={{ background: C.primary, color: "#fff", borderRadius: 10, padding: "2px 7px", fontSize: 10, fontWeight: 700 }}>{c.unread}</span>
            )}
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div style={{ background: "#fcfcfc", display: "flex", flexDirection: "column" }}>
        {chat ? (
          <>
            <div style={{ padding: "16px 24px", background: C.white, borderBottom: `1px solid ${C.gray}`, fontWeight: 800, color: C.dark, fontSize: 15, display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={chat.avatar} color={chat.color} size={32} fontSize={10} />
              {chat.from}
            </div>
            <div style={{ flex: 1, padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {chat.messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "75%", padding: "12px 18px", borderRadius: 18,
                    background: m.from === "me" ? C.primary : C.white,
                    color: m.from === "me" ? "#fff" : C.dark,
                    fontSize: 14, lineHeight: 1.5,
                    boxShadow: m.from === "me" ? "0 4px 12px rgba(232, 89, 12, 0.15)" : "0 2px 6px rgba(0,0,0,0.04)",
                    border: m.from === "me" ? "none" : `1px solid ${C.gray}`,
                    borderBottomRightRadius: m.from === "me" ? 4 : 18,
                    borderBottomLeftRadius: m.from === "me" ? 18 : 4,
                  }}>
                    {m.text}
                    <div style={{ fontSize: 10, opacity: .7, marginTop: 4, textAlign: "right", fontWeight: 600 }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", background: C.white, borderTop: `1px solid ${C.gray}`, display: "flex", gap: 12, alignItems: "center" }}>
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1, padding: "12px 18px", borderRadius: 12,
                  border: `2px solid ${C.gray}`, fontSize: 14, fontFamily: F.body, outline: "none",
                  transition: "all 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = C.primary}
                onBlur={e => e.target.style.borderColor = C.gray}
              />
              <button
                onClick={() => { if(newMsg.trim()) { chat.messages.push({from:"me", text:newMsg, time: "Now"}); setNewMsg(""); } }}
                style={{
                  background: C.primary, color: "#fff", border: "none",
                  borderRadius: 12, padding: "12px 24px", fontWeight: 800,
                  cursor: "pointer", fontSize: 14, fontFamily: F.body,
                  boxShadow: "0 4px 12px rgba(232, 89, 12, 0.2)"
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: 40 }}>💬</span>
            <span style={{ fontWeight: 600 }}>Select a conversation to start chatting</span>
          </div>
        )}
      </div>
    </div>
  );
}

