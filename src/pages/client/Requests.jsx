import { useState } from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import { C, F } from "../../styles/theme";
import { MOCK_REQUESTS, MOCK_PROVIDERS, MOCK_CATEGORIES, COMMUNES_TIARET } from "../../data/mockData";

export default function Requests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS.filter(r => r.client?.startsWith("Rachid")));
  const [isNrwOpen, setIsNrwOpen] = useState(false);
  const [summaryReq, setSummaryReq] = useState(null);

  /* ── New Request Workflow (inline multi-step) ── */
  const [nrStep, setNrStep] = useState(1);
  const [nrCategory, setNrCategory] = useState(null);
  const [nrProvider, setNrProvider] = useState(null);
  const [nrTasks, setNrTasks] = useState([]);   // [{name, price, qty}]
  const [nrCommune, setNrCommune] = useState(COMMUNES_TIARET[0].name);
  const [nrAddress, setNrAddress] = useState("");
  const [nrDate, setNrDate] = useState("");
  const [nrDesc, setNrDesc] = useState("");
  const [nrNego, setNrNego] = useState(false);
  const [nrNegoBudget, setNrNegoBudget] = useState("");
  const [nrNegoMsg, setNrNegoMsg] = useState("");

  const providersForCat = nrCategory ? MOCK_PROVIDERS.filter(p => p.categories?.some(c => c.name?.toLowerCase() === nrCategory.toLowerCase())) : [];
  const tasksForProvider = nrProvider?.services
    ?.filter(s => s.title?.toLowerCase() === nrCategory?.toLowerCase())
    ?.flatMap(s => (s.tasks || []).map(t => ({ ...t, service_id: s.id, parent_service: s.title }))) || [];
  const totalAmount = nrTasks.reduce((sum, t) => sum + t.price * t.qty, 0);

  const toggleTask = (task) => {
    setNrTasks(prev => {
      const exists = prev.find(t => t.id === task.id);
      if (exists) return prev.filter(t => t.id !== task.id);
      return [...prev, { id: task.id, name: task.name, price: parseInt(task.price) || 0, qty: 1 }];
    });
  };

  const updateQty = (name, delta) => {
    setNrTasks(prev => prev.map(t => t.name === name ? { ...t, qty: Math.max(1, t.qty + delta) } : t));
  };

  const resetNrw = () => {
    setNrStep(1); setNrCategory(null); setNrProvider(null); setNrTasks([]);
    setNrCommune(COMMUNES_TIARET[0].name); setNrAddress(""); setNrDate(""); setNrDesc("");
    setNrNego(false); setNrNegoBudget(""); setNrNegoMsg(""); setIsNrwOpen(false);
  };

  const submitRequest = () => {
    const newReq = {
      id: Date.now(),
      reference: "REQ-" + Math.random().toString(36).substr(2, 8).toUpperCase(),
      titre: `${nrCategory} - ${nrTasks.map(t => t.name).join(", ")}`,
      client: "Rachid B.",
      provider: nrProvider?.name || null,
      status: "PENDING",
      date: new Date().toISOString().slice(0, 10),
      total_amount: totalAmount,
      category: nrCategory,
      description: nrDesc,
      address: nrAddress,
      desired_date: nrDate,
      service_id: nrProvider?.services?.[0]?.id,
      tasks: nrTasks.map(t => ({ id: t.id, name: t.name, price: t.price, qty: t.qty })),
      negotiation: nrNego ? { proposed_budget: Number(nrNegoBudget), message: nrNegoMsg, status: "PENDING" } : null,
    };
    setRequests(prev => [newReq, ...prev]);
    resetNrw();
  };

  const handleCancel = (id) => {
    if (window.confirm("Cancel this request?")) {
      setRequests(prev => prev.map(r => r.id === id ? { ...r, statut: "annulee" } : r));
    }
  };

  const inputStyle = { width: "100%", padding: 14, borderRadius: 12, border: `2px solid ${C.gray}`, fontSize: 14, fontFamily: F.body, outline: "none" };
  const stepLabel = { fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 6, display: "block" };

  return (
    <div>
      <SectionTitle action={<Button size="sm" onClick={() => { resetNrw(); setIsNrwOpen(true); }}>+ New Request</Button>}>
        My Requests Tracking
      </SectionTitle>

      {/* ── Existing Requests ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {requests.map((r) => (
          <Card key={r.id} style={{ display: "flex", flexWrap: "wrap", gap: 20, padding: "20px 24px" }}>
            <div style={{ flex: 1, minWidth: 250 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ fontWeight: 800, color: C.dark, fontSize: 16 }}>{r.titre}</div>
                <Badge statut={r.status} />
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>Provider: <strong>{r.provider || "Awaiting..."}</strong> · {r.category}</div>
              <div style={{ fontSize: 14, color: C.text, marginBottom: 12, lineHeight: 1.5 }}>{r.description}</div>

              {/* Task List */}
              {r.tasks && r.tasks.length > 0 && (
                <div style={{ background: C.grayLt, borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Included Tasks</div>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: C.dark }}>
                    {r.tasks.map((t, idx) => (
                      <li key={idx} style={{ marginBottom: 4 }}><b>{t.qty || t.quantity}x</b> {t.name} <span style={{ color: C.muted }}>(Unit: {t.price || t.unit_price} DA)</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Negotiation Block */}
              {r.negotiation && (
                <div style={{ background: "rgba(25,113,194,0.05)", borderLeft: `4px solid ${C.primary}`, padding: "12px 16px", borderRadius: "0 12px 12px 0", marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.primary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Your Negotiation</div>
                  <div style={{ fontSize: 13, color: C.dark, fontStyle: "italic", marginBottom: 8 }}>"{r.negotiation.message}"</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Proposed Budget: <span style={{ color: C.primary }}>{r.negotiation.proposed_budget} DA</span></div>
                </div>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 12, color: C.muted }}>
                <span>📍 {r.address || r.localisation}</span>
                <span>📅 Date: {r.desired_date || r.date_prevue}</span>
              </div>
            </div>

            <div style={{ textAlign: "right", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", minWidth: 140 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.muted }}>Total Amount</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.dark }}>{r.total_amount} <span style={{ fontSize: 14 }}>DA</span></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                <Button size="sm" variant="outline" onClick={() => setSummaryReq(r)}>View Summary</Button>
                {!["COMPLETED", "CANCELLED", "REJECTED"].includes(r.status) && (
                  <button onClick={() => handleCancel(r.id)} style={{ padding: "8px 16px", background: C.redLt, border: `1px solid ${C.red}44`, borderRadius: 8, color: C.red, fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}>✕ Cancel Request</button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── NEW REQUEST WORKFLOW MODAL ── */}
      {isNrwOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,23,42,0.75)", backdropFilter: "blur(4px)", padding: 20 }}>
          <div style={{ background: C.white, width: "100%", maxWidth: 650, borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            
            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.grayLt}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.dark, color: C.white }}>
              <div>
                <h2 style={{ fontFamily: F.heading, fontSize: 20, fontWeight: 800, margin: 0 }}>New Service Request</h2>
                <div style={{ fontSize: 13, opacity: .8, marginTop: 4 }}>Step {nrStep} of 5</div>
              </div>
              <button onClick={resetNrw} style={{ background: "rgba(255,255,255,.2)", border: "none", width: 32, height: 32, borderRadius: "50%", color: C.white, cursor: "pointer", fontWeight: 700 }}>✕</button>
            </div>

            {/* Progress */}
            <div style={{ display: "flex", width: "100%", height: 4, background: C.grayLt }}>
              <div style={{ width: `${(nrStep / 5) * 100}%`, background: C.primary, transition: "width 0.3s ease" }}></div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "32px 32px 16px 32px" }}>

              {/* Step 1: Category */}
              {nrStep === 1 && (
                <div>
                  <h3 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Step 1: Choose Category</h3>
                  <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>What kind of service do you need?</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {MOCK_CATEGORIES.map(cat => {
                      const isSelected = nrCategory === cat.name;
                      return (
                        <div key={cat.id} onClick={() => setNrCategory(cat.name)} style={{ 
                          display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", 
                          border: `2px solid ${isSelected ? C.primary : C.gray}`, borderRadius: 16, cursor: "pointer", 
                          background: isSelected ? C.primaryLt : C.white, transition: "all 0.2s" 
                        }}>
                          <span style={{ fontSize: 24 }}>{cat.icon}</span>
                          <div style={{ fontWeight: 700, fontSize: 14, color: isSelected ? C.primary : C.dark }}>{cat.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Provider + Tasks */}
              {nrStep === 2 && (
                <div>
                  <h3 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Step 2: Select Provider & Tasks</h3>
                  <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Choose a provider in <strong>{nrCategory}</strong> and select tasks.</p>

                  {/* Provider selector */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={stepLabel}>Provider</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {providersForCat.map(p => {
                        const isPicked = nrProvider?.id === p.id;
                        return (
                          <div key={p.id} onClick={() => { setNrProvider(p); setNrTasks([]); }} style={{
                            display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                            border: `2px solid ${isPicked ? C.primary : C.gray}`, borderRadius: 14, cursor: "pointer",
                            background: isPicked ? C.primaryLt : C.white, transition: "all .2s"
                          }}>
                            <div style={{ width: 42, height: 42, borderRadius: "50%", background: p.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{p.initials}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, fontSize: 14, color: C.dark }}>{p.name}</div>
                              <div style={{ fontSize: 12, color: C.muted }}>★ {p.rating_average} · {p.rating_count} reviews · {p.location?.city}</div>
                            </div>
                            <div style={{ fontWeight: 800, color: C.primary, fontSize: 14 }}>{p.services?.[0]?.price} DA</div>
                          </div>
                        );
                      })}
                      {providersForCat.length === 0 && (
                        <div style={{ padding: 24, textAlign: "center", color: C.muted, background: C.grayLt, borderRadius: 12 }}>No providers in this category yet.</div>
                      )}
                    </div>
                  </div>

                  {/* Tasks */}
                  {nrProvider && (
                    <>
                      <label style={stepLabel}>Select Tasks</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {tasksForProvider.map((task) => {
                          const isSelected = nrTasks.some(t => t.id === task.id);
                          return (
                            <div key={task.id} onClick={() => toggleTask(task)} style={{
                              display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px",
                              border: `2px solid ${isSelected ? C.green : C.gray}`, borderRadius: 12, cursor: "pointer",
                              background: isSelected ? C.greenLt : C.white, transition: "all .2s"
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${isSelected ? C.green : C.gray}`, display: "flex", alignItems: "center", justifyContent: "center", background: isSelected ? C.green : "transparent" }}>
                                  {isSelected && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 700, fontSize: 14, color: C.dark }}>{task.name}</div>
                                  <div style={{ fontSize: 11, color: C.muted }}>{task.duration}h · {task.description}</div>
                                </div>
                              </div>
                              <div style={{ fontWeight: 800, color: C.dark, fontSize: 16 }}>{task.price} DA</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Location & Details */}
              {nrStep === 3 && (
                <div>
                  <h3 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Step 3: Location & Details</h3>
                  <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Where and when should the work take place?</p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={stepLabel}>Commune (Tiaret Wilaya)</label>
                      <select value={nrCommune} onChange={e => setNrCommune(e.target.value)} style={{ ...inputStyle, background: C.white }}>
                        {COMMUNES_TIARET.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={stepLabel}>Desired Date</label>
                      <input type="date" value={nrDate} onChange={e => setNrDate(e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={stepLabel}>Specific Address</label>
                    <input type="text" placeholder="e.g. Rue des Roses, Cité 500" value={nrAddress} onChange={e => setNrAddress(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={stepLabel}>Job Description</label>
                    <textarea placeholder="Describe the problem..." value={nrDesc} onChange={e => setNrDesc(e.target.value)} style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} />
                  </div>
                </div>
              )}

              {/* Step 4: Quantities & Pricing */}
              {nrStep === 4 && (
                <div>
                  <h3 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Step 4: Quantities & Pricing</h3>
                  <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Adjust quantities and optionally negotiate.</p>

                  <div style={{ background: C.grayLt, borderRadius: 16, padding: "16px 20px", marginBottom: 24, border: `1px solid ${C.gray}` }}>
                    {nrTasks.map((t, idx) => (
                      <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: idx < nrTasks.length - 1 ? `1px dashed ${C.gray}` : "none" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: C.dark }}>{t.name}</div>
                          <div style={{ fontSize: 12, color: C.muted }}>Unit: {t.price} DA</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, background: C.white, borderRadius: 20, padding: "4px 12px", border: `1px solid ${C.gray}` }}>
                            <button onClick={() => updateQty(t.name, -1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: C.muted, fontWeight: 800 }}>-</button>
                            <span style={{ fontWeight: 700, fontSize: 14, width: 20, textAlign: "center" }}>{t.qty}</span>
                            <button onClick={() => updateQty(t.name, 1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: C.dark, fontWeight: 800 }}>+</button>
                          </div>
                          <div style={{ fontWeight: 800, color: C.dark, width: 80, textAlign: "right" }}>{t.price * t.qty} DA</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 16, borderTop: `2px solid ${C.gray}` }}>
                      <span style={{ fontWeight: 800, fontSize: 16, color: C.dark }}>Calculated Total</span>
                      <span style={{ fontWeight: 800, fontSize: 24, color: C.primary }}>{totalAmount} DA</span>
                    </div>
                  </div>

                  {/* Negotiation Toggle */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <input type="checkbox" id="negoToggle" checked={nrNego} onChange={e => setNrNego(e.target.checked)} style={{ width: 18, height: 18, accentColor: C.primary }} />
                    <label htmlFor="negoToggle" style={{ fontWeight: 700, fontSize: 14, color: C.dark, cursor: "pointer" }}>I want to negotiate the price</label>
                  </div>
                  {nrNego && (
                    <div style={{ background: C.blueLt, padding: "20px", borderRadius: 16, border: `1px solid ${C.blue}44` }}>
                      <div style={{ marginBottom: 12 }}>
                        <label style={stepLabel}>Your Proposed Budget (DA)</label>
                        <input type="number" value={nrNegoBudget} onChange={e => setNrNegoBudget(e.target.value)} placeholder="e.g. 5000" style={inputStyle} />
                      </div>
                      <div>
                        <label style={stepLabel}>Message to Provider</label>
                        <textarea value={nrNegoMsg} onChange={e => setNrNegoMsg(e.target.value)} placeholder="Explain why..." style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Review & Confirm */}
              {nrStep === 5 && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.greenLt, color: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px auto" }}>📝</div>
                    <h3 style={{ fontFamily: F.heading, fontSize: 22, fontWeight: 800, color: C.dark }}>Review Your Request</h3>
                  </div>

                  <div style={{ background: C.grayLt, borderRadius: 16, padding: "20px 24px", marginBottom: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      {[
                        ["Category", nrCategory],
                        ["Provider", nrProvider?.name],
                        ["Location", `${nrCommune}, ${nrAddress}`],
                        ["Date", nrDate],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.muted }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{val || "—"}</div>
                        </div>
                      ))}
                    </div>
                    {nrDesc && <div style={{ marginTop: 16, fontSize: 14, color: C.text, fontStyle: "italic" }}>"{nrDesc}"</div>}
                  </div>

                  <div style={{ background: C.grayLt, borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
                    {nrTasks.map((t, idx) => (
                      <div key={t.name} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: idx < nrTasks.length - 1 ? `1px dashed ${C.gray}` : "none" }}>
                        <span style={{ fontSize: 14, color: C.dark }}>{t.qty}x {t.name}</span>
                        <span style={{ fontWeight: 700, color: C.dark }}>{t.price * t.qty} DA</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: `2px solid ${C.gray}` }}>
                      <span style={{ fontWeight: 800, color: C.dark }}>Total</span>
                      <span style={{ fontWeight: 800, fontSize: 20, color: C.primary }}>{totalAmount} DA</span>
                    </div>
                  </div>

                  {nrNego && (
                    <div style={{ background: C.blueLt, borderLeft: `4px solid ${C.blue}`, padding: "12px 16px", borderRadius: "0 12px 12px 0" }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, textTransform: "uppercase", marginBottom: 4 }}>Negotiation</div>
                      <div style={{ fontSize: 14, color: C.dark }}>Proposed: <strong>{nrNegoBudget} DA</strong></div>
                      {nrNegoMsg && <div style={{ fontSize: 13, color: C.muted, fontStyle: "italic" }}>"{nrNegoMsg}"</div>}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div style={{ padding: "16px 32px", borderTop: `1px solid ${C.grayLt}`, display: "flex", justifyContent: "space-between", background: C.white }}>
              {nrStep > 1 ? (
                <Button variant="outline" onClick={() => setNrStep(s => s - 1)}>← Back</Button>
              ) : <div></div>}
              
              {nrStep < 5 ? (
                <Button variant="primary" onClick={() => {
                  if (nrStep === 1 && !nrCategory) return alert("Select a category.");
                  if (nrStep === 2 && (!nrProvider || nrTasks.length === 0)) return alert("Select a provider and at least one task.");
                  if (nrStep === 3 && (!nrAddress || !nrDate)) return alert("Fill address and date.");
                  setNrStep(s => s + 1);
                }}>Next Step →</Button>
              ) : (
                <Button variant="primary" onClick={submitRequest} style={{ padding: "0 32px", background: C.green }}>Send Request ✓</Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Summary Modal ── */}
      {summaryReq && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,23,42,0.75)", backdropFilter: "blur(4px)", padding: 20 }}>
          <div style={{ background: C.white, width: "100%", maxWidth: 500, borderRadius: 24, padding: 32, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <h2 style={{ fontFamily: F.heading, fontSize: 22, fontWeight: 800, color: C.dark, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Request Summary
              <Badge statut={summaryReq.statut} />
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <div style={{ background: C.grayLt, padding: 16, borderRadius: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.muted }}>Client</div><div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{summaryReq.client}</div></div>
                  <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.muted }}>Provider</div><div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{summaryReq.provider || "N/A"}</div></div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Location & Date</div>
                <div style={{ fontSize: 14, color: C.dark }}>{summaryReq.localisation} — {summaryReq.date_prevue}</div>
              </div>
              {summaryReq.tasks && summaryReq.tasks.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Tasks</div>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, color: C.dark }}>
                    {summaryReq.tasks.map((t, idx) => (
                      <li key={idx}><b>{t.quantity}x</b> {t.name} ({t.unit_price} DA)</li>
                    ))}
                  </ul>
                </div>
              )}
              {summaryReq.negotiation && (
                <div style={{ background: C.blueLt, borderLeft: `4px solid ${C.blue}`, padding: "12px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.blue, marginBottom: 4 }}>Negotiation</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Proposed: {summaryReq.negotiation.proposed_budget} DA</div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: C.grayLt, borderRadius: 12, marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Final Total</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.dark }}>{summaryReq.total_amount || summaryReq.price}</div>
            </div>

            <Button style={{ width: "100%" }} onClick={() => setSummaryReq(null)}>Close Summary</Button>
          </div>
        </div>
      )}
    </div>
  );
}
