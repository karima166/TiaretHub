import { useState } from "react";
import Avatar from "../../components/ui/Avatar";
import { C, F } from "../../styles/theme";
import { MOCK_MESSAGES } from "../../data/mockData";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(MOCK_MESSAGES[0]?.id || null);
  const [newMsg, setNewMsg] = useState("");
  const chat = MOCK_MESSAGES.find(c => c.id === selectedChat);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, height: "calc(100vh - 160px)", borderRadius: 16, overflow: "hidden", border: `1px solid ${C.gray}` }}>
      <div style={{ background: C.white, borderRight: `1px solid ${C.gray}`, overflowY: "auto" }}>
        <div style={{ padding: "16px 16px 8px", fontWeight: 800, fontFamily: F.heading, fontSize: 16, color: C.dark }}>Messages</div>
        {MOCK_MESSAGES.map((c) => (
          <div key={c.id} onClick={() => setSelectedChat(c.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", background: selectedChat === c.id ? C.primaryLt : "transparent", borderLeft: selectedChat === c.id ? `3px solid ${C.primary}` : "3px solid transparent" }}>
            <Avatar initials={c.avatar} color={c.color} size={38} fontSize={12} />
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: C.dark }}>{c.from}</span>
                <span style={{ fontSize: 10, color: C.muted }}>{c.time}</span>
              </div>
              <div style={{ fontSize: 12, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.preview}</div>
            </div>
            {c.unread > 0 && <span style={{ background: C.primary, color: "#fff", borderRadius: 10, padding: "2px 7px", fontSize: 10, fontWeight: 700 }}>{c.unread}</span>}
          </div>
        ))}
      </div>
      <div style={{ background: C.grayLt, display: "flex", flexDirection: "column" }}>
        {chat ? (
          <>
            <div style={{ padding: "14px 20px", background: C.white, borderBottom: `1px solid ${C.gray}`, fontWeight: 700, color: C.dark, fontSize: 14 }}>{chat.from}</div>
            <div style={{ flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
              {chat.messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "70%", padding: "10px 16px", borderRadius: 14, background: m.from === "me" ? C.primary : C.white, color: m.from === "me" ? "#fff" : C.dark, fontSize: 13, lineHeight: 1.5, boxShadow: m.from === "me" ? "none" : "0 1px 3px rgba(0,0,0,.06)" }}>
                    {m.text}
                    <div style={{ fontSize: 10, opacity: .6, marginTop: 4, textAlign: "right" }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px", background: C.white, borderTop: `1px solid ${C.gray}`, display: "flex", gap: 10 }}>
              <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: "10px 16px", borderRadius: 10, border: `2px solid ${C.gray}`, fontSize: 13, fontFamily: F.body, outline: "none" }} />
              <button style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: F.body }}>Send</button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted }}>Select a conversation</div>
        )}
      </div>
    </div>
  );
}
