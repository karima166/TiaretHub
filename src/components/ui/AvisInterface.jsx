import { useState } from "react";
import { MOCK_REVIEWS } from "../../data/mockData";
import { C, F } from "../../styles/theme";

export default function AvisInterface({ role, currentUser }) {
  const [avis, setAvis] = useState(MOCK_REVIEWS);
  const [tab, setTab] = useState("list"); // list, write, mine
  const [filterRating, setFilterRating] = useState(0); // 0 = All

  // Form State
  const [formNotes, setFormNotes] = useState({ g: 0, p: 0, q: 0, r: 0, c: 0 });
  const [formText, setFormText] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Modal State (for provider replies)
  const [modOpen, setModOpen] = useState(false);
  const [modRepId, setModRepId] = useState(null);
  const [modText, setModText] = useState("");

  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const getFilteredAvis = () => {
    let list = avis;
    if (tab === "mine") {
      /* Strict match: only reviews written by the current user */
      const userName = currentUser?.name;
      if (!userName) return [];
      list = list.filter(a => {
        const authorName = a.client || "";
        return authorName.toLowerCase().startsWith(userName.split(" ")[0].toLowerCase());
      });
    } else {
      if (filterRating > 0) list = list.filter(a => a.note === filterRating);
    }
    return list;
  };

  const renderStars = (n, size = 15, color = C.yellow, offColor = C.gray) => {
    return [1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{ fontSize: size, color: i > n ? offColor : color }}>★</span>
    ));
  };

  // --- Dynamic Stats Logic (like index.html loadStats) ---
  const totalAvis = avis.length;
  const noteMoyenne = totalAvis ? (avis.reduce((acc, a) => acc + a.note, 0) / totalAvis).toFixed(1) : "0.0";
  const satisfaction = totalAvis ? Math.round((avis.filter(a => a.note >= 4).length / totalAvis) * 100) : 0;
  
  // Fake Trust Score calculation based on note to simulate the backend
  const trustScore = totalAvis ? Math.min(100, Math.round((noteMoyenne / 5) * 100)) : 0;
  
  // Dynamic Badge colors based on trustScore (like tbadge function)
  const getBadgeStyle = (s) => {
    if(s >= 75) return { bg: "rgba(47, 158, 68, 0.1)", text: C.green, border: C.green, label: "Excellent" };
    if(s >= 50) return { bg: "rgba(52, 152, 219, 0.1)", text: "#2980b9", border: "#93C5FD", label: "Good" };
    return { bg: C.grayLt, text: C.muted, border: C.gray, label: "New" };
  };
  const badge = getBadgeStyle(trustScore);

  // ---- Handlers ----
  const submitAvis = () => {
    if (formNotes.g === 0) return showToast("Overall rating required");
    if (formText.length < 10) return showToast("Comment too short (min. 10 characters)");
    showToast(editingId ? "Review updated!" : "Review published!");
    setFormNotes({ g: 0, p: 0, q: 0, r: 0, c: 0 });
    setFormText("");
    setTab("list");
    setEditingId(null);
  };

  const submitRep = () => {
    if (modText.length < 5) return showToast("Reply too short");
    showToast(modRepId ? "Reply updated" : "Reply published!");
    setModOpen(false);
  };

  const delAvis = (id) => {
    if (window.confirm("Do you want to delete this review?")) {
      setAvis(avis.filter(a => a.id !== id));
      showToast("Review deleted");
    }
  };

  const reactAvis = (_, reaction) => {
     showToast(reaction === "like" ? "You liked this review" : "You disliked this review");
  };

  const delRep = () => {
    if (window.confirm("Delete this reply?")) {
      showToast("Reply deleted");
    }
  };

  const reportAvis = () => {
    showToast("Review reported to moderation");
  };

  const helpful = () => {
    showToast("Helpful vote recorded");
  };

  return (
    <div style={{ position: "relative", zIndex: 10 }}>
        
        {/* PREMIUM PROFILE CARD */}
        {role === "prestataire" && (
          <div style={{ background: C.white, border: `1px solid ${C.gray}`, borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(232, 89, 12, 0.1)", color: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, flexShrink: 0 }}>MP</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: F.heading, color: C.dark }}>
                  {currentUser?.name || `${currentUser?.first_name || ""} ${currentUser?.last_name || ""}`.trim() || "Services Pro"}
                </div>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: badge.bg, border: `1px solid ${badge.border}`, color: badge.text }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: badge.text }}></span> {badge.label}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 4, fontWeight: 500 }}>Your current performance</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
              <div style={{ background: C.grayLt, borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.dark, fontFamily: F.heading }}>{totalAvis}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2, fontWeight: 600, textTransform: "uppercase" }}>Total Reviews</div>
              </div>
              <div style={{ background: C.grayLt, borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.yellow, fontFamily: F.heading }}>{noteMoyenne}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2, fontWeight: 600, textTransform: "uppercase" }}>Overall Rating</div>
              </div>
              <div style={{ background: C.grayLt, borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: badge.text, fontFamily: F.heading }}>{trustScore}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2, fontWeight: 600, textTransform: "uppercase" }}>Trust Score</div>
              </div>
              <div style={{ background: C.grayLt, borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.green, fontFamily: F.heading }}>{satisfaction}%</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2, fontWeight: 600, textTransform: "uppercase" }}>Satisfaction</div>
              </div>
            </div>
            <div style={{ height: 6, background: C.gray, borderRadius: 3, overflow: "hidden", marginTop: 16 }}>
              <div style={{ height: "100%", borderRadius: 3, width: `${trustScore}%`, background: badge.text, transition: "width 0.5s ease, background 0.5s ease" }}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginTop: 4, fontWeight: 600 }}>
              <span>0</span><span>TRUST SCORE</span><span>100</span>
            </div>
          </div>
        )}

        {/* TABS */}
        <div style={{ display: "flex", borderBottom: `2px solid ${C.gray}`, marginBottom: 24, gap: 4 }}>
          {["list", "write", "mine"].map(t => {
            if (role === "prestataire" && t !== "list") return null;
            return (
              <div key={t} onClick={() => setTab(t)} style={{
                padding: "12px 20px", fontSize: 14, cursor: "pointer", color: tab === t ? C.primary : C.muted,
                borderBottom: `3px solid ${tab === t ? C.primary : "transparent"}`, 
                fontWeight: tab === t ? 700 : 500, transition: "all 0.2s", marginBottom: -2
              }}>
                {t === "list" ? (role === "prestataire" ? "All received reviews" : "All reviews") : t === "write" ? "Leave a review" : "My reviews"}
              </div>
            );
          })}
        </div>

        {/* CONTENT */}
        {(tab === "list" || tab === "mine") && (
          <div>
            {role === "prestataire" ? (
              <div style={{ background: "rgba(232, 89, 12, 0.05)", border: `1px solid ${C.primaryLt}`, color: C.primary, borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 13, fontWeight: 500 }}>
                As a <b>professional provider</b>, you can reply to client reviews and manage your reputation. Replies are public and help build trust.
              </div>
            ) : (
              <div style={{ background: "rgba(52, 152, 219, 0.05)", border: "1px solid #93C5FD", color: "#2980b9", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 13, fontWeight: 500 }}>
                Share your experience with the community. Your feedback helps others find reliable professionals.
              </div>
            )}

            {tab === "list" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 800, fontFamily: F.heading, color: C.dark }}>{getFilteredAvis().length} filtered reviews</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[0, 5, 4, 3, 2, 1].map(n => (
                    <button key={n} onClick={() => setFilterRating(n)} style={{
                      padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                      border: `1px solid ${filterRating === n ? C.primary : C.gray}`,
                      background: filterRating === n ? C.primary : C.white,
                      color: filterRating === n ? C.white : C.muted,
                      transition: "all 0.2s"
                    }}>{n === 0 ? "All" : `${n}★`}</button>
                  ))}
                </div>
              </div>
            )}

            {getFilteredAvis().map(a => {
              const userName = currentUser?.name;
              const isMine = role === "demandeur" && userName && a.client?.toLowerCase().startsWith(userName.split(" ")[0].toLowerCase());
              // Mock checking if the provider already replied
              const myRep = (a.reponses || []).find(r => r.is_prestataire === true); 

              return (
                <div key={a.id} style={{ background: C.white, border: `1px solid ${C.gray}`, borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: a.is_anonymous ? C.gray : "rgba(52, 152, 219, 0.1)", color: a.is_anonymous ? C.muted : "#2980b9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>
                        {a.is_anonymous ? "?" : a.client[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>
                          {a.is_anonymous ? "Anonymous User" : a.client}
                          {isMine && <span style={{ fontSize: 10, padding: "3px 8px", background: "rgba(47, 158, 68, 0.1)", color: C.green, borderRadius: 12, marginLeft: 8, fontWeight: 700 }}>My review</span>}
                          {a.is_verified_purchase && <span style={{ fontSize: 10, padding: "3px 8px", background: "rgba(52, 152, 219, 0.1)", color: "#2980b9", borderRadius: 12, marginLeft: 8, fontWeight: 700 }}>Verified Service</span>}
                        </div>
                        <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{new Date(a.date).toLocaleDateString('en-US')} {a.is_edited && "· Edited"}</div>
                        {a.provider && (
                          <div style={{ fontSize: 12, color: C.text, marginTop: 4, display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ padding: "2px 8px", background: C.primaryLt, color: C.primary, borderRadius: 10, fontWeight: 600, fontSize: 11 }}>🔧 {a.provider}</span>
                            {a.service && <span style={{ padding: "2px 8px", background: C.blueLt, color: C.blue, borderRadius: 10, fontWeight: 600, fontSize: 11 }}>{a.service}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 2 }}>{renderStars(a.note)}</div>
                  </div>

                  {/* Criterias */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {a.note_prix && <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: C.grayLt, border: `1px solid ${C.gray}`, color: C.muted, fontWeight: 500 }}>Price: {renderStars(a.note_prix, 10)}</span>}
                    {a.note_qualite && <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: C.grayLt, border: `1px solid ${C.gray}`, color: C.muted, fontWeight: 500 }}>Quality: {renderStars(a.note_qualite, 10)}</span>}
                    {a.note_rapidite && <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: C.grayLt, border: `1px solid ${C.gray}`, color: C.muted, fontWeight: 500 }}>Speed: {renderStars(a.note_rapidite, 10)}</span>}
                    {a.note_communication && <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: C.grayLt, border: `1px solid ${C.gray}`, color: C.muted, fontWeight: 500 }}>Comm: {renderStars(a.note_communication, 10)}</span>}
                  </div>

                  <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7, marginBottom: 16 }}>{a.commentaire}</div>

                  {/* Provider Replies */}
                  {a.reponses?.map(r => (
                    <div key={r.id} style={{ marginTop: 12, padding: "16px", background: "rgba(47, 158, 68, 0.05)", borderRadius: 12, borderLeft: `4px solid ${C.green}` }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: C.green, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{r.prestataire_nom} replied</div>
                      <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.6 }}>{r.contenu}</div>
                    </div>
                  ))}

                  {/* Client Notification of new reply */}
                  {!isMine && role === "demandeur" && a.reponses?.length > 0 && (
                    <div style={{ background: "rgba(52, 152, 219, 0.1)", border: "1px solid #93C5FD", borderRadius: 8, padding: "8px 12px", marginTop: 8, fontSize: 12, color: "#2980b9", fontWeight: 500 }}>
                      The provider replied to your review. Read their reply above.
                    </div>
                  )}

                  {/* ACTIONS BAR */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.gray}` }}>
                    
                    {role === "prestataire" ? (
                      <>
                        {/* Prestataire Actions: Like, Dislike, Reply */}
                        <button onClick={() => reactAvis(a.id, 'like')} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${C.gray}`, background: C.white, color: C.text }}>▲ 0 Like</button>
                        <button onClick={() => reactAvis(a.id, 'dislike')} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${C.gray}`, background: C.white, color: C.text }}>▼ 0 Dislike</button>

                        {!myRep ? (
                          <button onClick={() => { setModOpen(true); }} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${C.gray}`, background: C.white, color: C.text }}>Reply</button>
                        ) : (
                          <>
                            <button onClick={() => { setModRepId(myRep.id); setModText(myRep.contenu); setModOpen(true); }} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid #93C5FD", background: "rgba(52, 152, 219, 0.1)", color: "#2980b9" }}>Edit Reply</button>
                            <button onClick={() => delRep(myRep.id)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid #FCA5A5", background: "rgba(231, 76, 60, 0.1)", color: "#e74c3c" }}>Del. Reply</button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Demandeur Actions: Helpful, Report, Edit, Delete */}
                        {!isMine ? (
                          <>
                            <button onClick={() => helpful(a.id)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${C.gray}`, background: C.white, color: C.muted }}>♥ {a.helpful || 0} Helpful</button>
                            <button onClick={() => reportAvis(a.id)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${C.gray}`, background: C.white, color: C.text }}>Report</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { setEditingId(a.id); setFormText(a.commentaire); setTab("write"); }} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid #93C5FD", background: "rgba(52, 152, 219, 0.1)", color: "#2980b9" }}>Edit review</button>
                            <button onClick={() => delAvis(a.id)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid #FCA5A5", background: "rgba(231, 76, 60, 0.1)", color: "#e74c3c" }}>Delete review</button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            
            {getFilteredAvis().length === 0 && (
              <div style={{ textAlign: "center", padding: 60, color: C.muted, background: C.white, borderRadius: 16, border: `1px dashed ${C.gray}` }}>
                <div style={{ fontSize: 40, marginBottom: 12, color: C.gray }}>⭐</div>
                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: F.heading }}>No reviews to display</div>
                <div style={{ fontSize: 14, marginTop: 4 }}>This space is currently empty.</div>
              </div>
            )}
          </div>
        )}

        {/* WRITE */}
        {tab === "write" && role === "demandeur" && (
          <div style={{ background: C.white, border: `1px solid ${C.gray}`, borderRadius: 16, padding: 30, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
             <h2 style={{ fontFamily: F.heading, fontSize: 24, fontWeight: 800, color: C.dark, marginBottom: 24 }}>Rate your Experience</h2>
             
             <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Overall Rating</div>
             <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
               {[1, 2, 3, 4, 5].map(i => (
                 <span key={i} onClick={() => setFormNotes({...formNotes, g: i})} style={{ fontSize: 32, cursor: "pointer", color: i <= formNotes.g ? C.yellow : C.gray, transition: "color 0.2s" }}>★</span>
               ))}
             </div>
             
             <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Specific Criteria</div>
             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
               {["price", "quality", "speed", "communication"].map(crit => {
                 const key = crit === "quality" ? "q" : crit === "speed" ? "r" : crit[0];
                 return (
                   <div key={crit} style={{ background: C.grayLt, borderRadius: 12, padding: 16, border: `1px solid ${C.gray}` }}>
                     <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 8, textTransform: "capitalize" }}>{crit}</div>
                     <div style={{ display: "flex", gap: 4 }}>
                       {[1,2,3,4,5].map(i => (
                         <span key={i} onClick={() => setFormNotes({...formNotes, [key]: i})} style={{ fontSize: 22, cursor: "pointer", color: i <= formNotes[key] ? C.primary : C.gray, transition: "color 0.2s" }}>★</span>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </div>

             <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Your Testimonial</div>
             <textarea 
               value={formText}
               onChange={e => setFormText(e.target.value)}
               placeholder="Share the details of your experience with this provider (at least 10 characters)..."
               style={{ width: "100%", padding: "16px", border: `2px solid ${C.gray}`, borderRadius: 12, minHeight: 120, fontSize: 15, background: C.white, outline: "none", fontFamily: F.body, transition: "border 0.2s" }}
               onFocus={(e) => e.target.style.borderColor = C.primary}
               onBlur={(e) => e.target.style.borderColor = C.gray}
             />
             <div style={{ fontSize: 12, color: C.muted, textAlign: "right", marginTop: 8, fontWeight: 500 }}>{formText.length} / 2000</div>
             
             <label style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0", fontSize: 14, fontWeight: 500, color: C.dark, cursor: "pointer" }}>
               <input type="checkbox" checked={isAnon} onChange={e => setIsAnon(e.target.checked)} style={{ width: 18, height: 18, accentColor: C.primary }} /> 
               Publish anonymously
             </label>

             <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
               <button onClick={submitAvis} style={{ flex: 1, padding: "14px 24px", borderRadius: 12, border: "none", background: C.primary, color: C.white, cursor: "pointer", fontWeight: 700, fontSize: 15, transition: "background 0.2s" }}>Publish review</button>
               <button onClick={() => { setFormNotes({g:0,p:0,q:0,r:0,c:0}); setFormText(""); setEditingId(null); }} style={{ padding: "14px 24px", borderRadius: 12, border: `2px solid ${C.gray}`, background: C.white, color: C.text, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>Clear</button>
             </div>
          </div>
        )}

      {/* MODAL REPONSE */}
      {modOpen && role === "prestataire" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26, 26, 46, 0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: C.white, borderRadius: 20, padding: 32, width: "100%", maxWidth: 500, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontFamily: F.heading, fontSize: 20, fontWeight: 800, color: C.dark, marginBottom: 16 }}>{modRepId ? "Edit my reply" : "Reply to client"}</h3>
            <p style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>Your reply will be publicly visible to all TiaretHub users.</p>
            <textarea
              value={modText}
              onChange={e => setModText(e.target.value)}
              placeholder="Write your professional reply here..."
              style={{ width: "100%", padding: 16, border: `2px solid ${C.gray}`, borderRadius: 12, minHeight: 140, fontSize: 14, fontFamily: F.body, outline: "none" }}
              onFocus={(e) => e.target.style.borderColor = C.primary}
              onBlur={(e) => e.target.style.borderColor = C.gray}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button onClick={submitRep} style={{ flex: 1, padding: "14px", background: C.primary, color: C.white, border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>{modRepId ? "Edit" : "Publish"}</button>
              <button onClick={() => setModOpen(false)} style={{ padding: "14px 24px", background: C.white, color: C.text, border: `2px solid ${C.gray}`, borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM TOAST */}
      {toastMsg && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: C.dark, color: C.white, padding: "14px 28px", borderRadius: 30, fontSize: 14, fontWeight: 600, zIndex: 999, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", border: `1px solid rgba(255,255,255,0.1)` }}>
          ⚡ {toastMsg}
        </div>
      )}

    </div>
  );
}
