import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { C, F } from "../styles/theme";
import { MOCK_CATEGORIES, SERVICE_TASKS_LIBRARY } from "../data/mockData";

/* ─────────────────────────────────────────────────────────
   AuthPage — Shared features & logic
───────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: "🔍", title: "Find Service Providers", desc: "Search for the best professionals in Tiaret instantly." },
  { icon: "⭐", title: "Verified Reviews",       desc: "Read real reviews from verified clients in your wilaya." },
  { icon: "💬", title: "Direct Communication",   desc: "Communicate directly via phone or internal messages." },
  { icon: "🔒", title: "Secure Platform",        desc: "Your data is protected and never shared with third parties." },
];



function Field({ label, type = "text", value, onChange, placeholder, required }) {
  const [showPw, setShowPw] = useState(false);
  const isPw = type === "password";
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 700, color: C.text, display: "block", marginBottom: 6 }}>
          {label}{required && <span style={{ color: C.primary }}> *</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <input
          type={isPw && showPw ? "text" : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", padding: isPw ? "12px 44px 12px 16px" : "12px 16px",
            borderRadius: 10, border: `2px solid ${C.gray}`,
            fontSize: 14, fontFamily: F.body,
            outline: "none", boxSizing: "border-box", background: C.white,
          }}
          onFocus={e => e.target.style.borderColor = C.primary}
          onBlur={e => e.target.style.borderColor = C.gray}
        />
        {isPw && (
          <button type="button" onClick={() => setShowPw(s => !s)}
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.muted }}>
            {showPw ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}

function SubmitBtn({ loading, label, loadingLabel }) {
  return (
    <button type="submit" disabled={loading}
      style={{
        width: "100%", padding: "14px 0", borderRadius: 10, border: "none",
        background: loading ? "#adb5bd" : C.primary,
        color: C.white, fontWeight: 800, fontSize: 15,
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: F.body, marginTop: 8,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      }}
      onMouseOver={e => { if (!loading) e.currentTarget.style.background = C.primaryDk; }}
      onMouseOut={e => { if (!loading) e.currentTarget.style.background = C.primary; }}>
      {loading 
        ? <><span style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", animation: "spin .8s linear infinite", display: "inline-block" }} />{loadingLabel}</>
        : label}
    </button>
  );
}

function LoginForm({ onForgot, login }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    const result = login(email, password);
    if (result && !result.success) setError("Invalid email or password.");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="client@TiaretHub.dz" required />
      <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" required />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: -4, marginBottom: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: C.text, fontWeight: 500, fontFamily: F.body }}>
          <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} style={{ accentColor: C.primary, width: 16, height: 16 }} />
          Remember me
        </label>
        <button type="button" onClick={onForgot}
          style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: F.body }}>
          Forgot password?
        </button>
      </div>
      {error && <div style={{ background: "#fff0f0", border: `1px solid #fcc`, borderRadius: 8, padding: "10px 14px", color: "#c0392b", fontSize: 13, marginBottom: 16 }}>⚠️ {error}</div>}
      <SubmitBtn loading={loading} label="Log In →" loadingLabel="Signing in..." />
    </form>
  );
}

function RegisterForm({ login }) {
  const [userType, setUserType] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail]         = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bio, setBio]             = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);

  const toggleTask = (task) => {
    setSelectedTasks(prev => {
      const exists = prev.find(t => t.id === task.id);
      if (exists) return prev.filter(t => t.id !== task.id);
      return [...prev, task];
    });
  };

  const tasksToDisplay = selectedCategory ? SERVICE_TASKS_LIBRARY[selectedCategory.id] || [] : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!firstName || !lastName || !email || !phoneNumber || !password) { setError("Please fill in all required fields."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (!agreed) { setError("Please agree to the terms."); return; }
    
    if (userType === "provider" && selectedCategory === null) {
      setError("Please select at least one main service category.");
      return;
    }

    setLoading(true);

    const payload = {
      email,
      phone_number: phoneNumber,
      password,
      confirm_password: confirm,
      first_name: firstName,
      last_name: lastName,
      role: userType === "client" ? "demandeur" : "prestataire",
    };

    if (userType === "provider") {
      payload.category = selectedCategory || "PLOMBERIE";
      payload.bio = bio || "";
      payload.experience_years = parseInt(experienceYears) || 0;
    }
    
    console.log(`[Mock] Payload sent to AUTH_SERVICES:`, payload);
    
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    login(email, password);
  };

  if (!userType) return (
    <div style={{ animation: "fadeUp .35s ease both" }}>
      <p style={{ fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 16, textAlign: "center" }}>I want to...</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { id: "client",   icon: "🔍", title: "Find a Service Provider",  sub: "I'm looking for a professional for a job." },
          { id: "provider", icon: "🔧", title: "Register as Provider",     sub: "I'm a professional and want to offer services." },
        ].map(opt => (
          <div key={opt.id} onClick={() => setUserType(opt.id) }
            style={{ padding: "20px", borderRadius: 14, border: `2px solid ${C.gray}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "all .2s" }}
            onMouseOver={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.background = C.primaryLt; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = C.gray; e.currentTarget.style.background = C.white; }}>
            <div style={{ fontSize: 36 }}>{opt.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 4 }}>{opt.title}</div>
              <div style={{ fontSize: 13, color: C.muted }}>{opt.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ animation: "fadeUp .35s ease both" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button type="button" onClick={() => setUserType(null) }
          style={{ background: "none", border: "none", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F.body }}>
          ← Back
        </button>
      </div>
      
      <div style={{ background: C.grayLt, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 16 }}>
        {userType === "client" ? "👤 Client Registration" : "🛠️ Provider Registration"}
      </div>

      {userType === "provider" && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: C.text, display: "block", marginBottom: 8 }}>
            Main Service (Category) <span style={{ color: C.primary }}>*</span>
          </label>
          <select 
            value={selectedCategory || ""} 
            onChange={e => setSelectedCategory(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 10, border: `2px solid ${C.gray}`,
              fontSize: 14, fontFamily: F.body, outline: "none", boxSizing: "border-box", background: C.white,
              cursor: "pointer", appearance: "none",
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236c757d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px"
            }}
            onFocus={e => e.target.style.borderColor = C.primary}
            onBlur={e => e.target.style.borderColor = C.gray}
          >
            <option value="" disabled>Select your expertise...</option>
            {MOCK_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>
            💡 You will be able to add specific tasks and skills in your dashboard after registration.
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}><Field label="First Name" value={firstName} onChange={setFirstName} placeholder="Karim" required /></div>
        <div style={{ flex: 1 }}><Field label="Last Name" value={lastName} onChange={setLastName} placeholder="Boudiaf" required /></div>
      </div>

      <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
      <Field label="Phone Number" type="tel" value={phoneNumber} onChange={setPhoneNumber} placeholder="0555 12 34 56" required />
      
      {userType === "provider" && (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: C.text, display: "block", marginBottom: 6 }}>
              Bio / Short Description
            </label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell clients about your expertise..."
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10, border: `2px solid ${C.gray}`,
                fontSize: 14, fontFamily: F.body, outline: "none", boxSizing: "border-box", background: C.white,
                minHeight: 80, resize: "vertical"
              }}
              onFocus={e => e.target.style.borderColor = C.primary}
              onBlur={e => e.target.style.borderColor = C.gray}
            />
          </div>
          <Field label="Years of Experience" type="number" value={experienceYears} onChange={setExperienceYears} placeholder="e.g. 5" />
          
          {/* NEW: Task Selection for Providers */}
          {selectedCategory && tasksToDisplay.length > 0 && (
            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: C.text, display: "block", marginBottom: 12 }}>
                Select your specific professional tasks
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tasksToDisplay.map(task => {
                  const isPicked = selectedTasks.some(t => t.id === task.id);
                  return (
                    <div key={task.id} onClick={() => toggleTask(task)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                      border: `2px solid ${isPicked ? C.primary : C.gray}`, borderRadius: 12,
                      background: isPicked ? C.primaryLt : C.white, cursor: "pointer", transition: "all 0.2s"
                    }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${isPicked ? C.primary : C.gray}`, display: "flex", alignItems: "center", justifyContent: "center", background: isPicked ? C.primary : "transparent" }}>
                        {isPicked && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{task.name}</div>
                        <div style={{ fontSize: 11, color: C.muted }}>Recommended Unit Price: {task.defaultPrice} DA</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" required />
      <Field label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat your password" required />
      
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 16, fontSize: 13, color: C.text, lineHeight: 1.5 }}>
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: C.primary, marginTop: 2 }} />
        I agree to the <span style={{ color: C.primary }}>Terms of Use</span>
      </label>

      {error && <div style={{ background: "#fff0f0", border: `1px solid #fcc`, borderRadius: 8, padding: "10px 14px", color: "#c0392b", fontSize: 13, marginBottom: 16 }}>⚠️ {error}</div>}
      
      <SubmitBtn loading={loading} label="Create Account →" loadingLabel="Creating..." />
    </form>
  );
}

function ForgotForm({ onBack }) {
  const [email, setEmail]   = useState("");
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false); setSent(true);
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>📧</div>
      <h3 style={{ color: C.primary, fontWeight: 800, marginBottom: 8 }}>Email sent!</h3>
      <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
        A reset link has been sent to <strong>{email}</strong>.
      </p>
      <button style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, fontSize: 14, cursor: "pointer", textDecoration: "underline" }} onClick={onBack}>← Back to login</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ background: C.primaryLt, borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🔑</div>
        <div style={{ fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 4 }}>Reset Password</div>
        <div style={{ fontSize: 13, color: C.muted }}>Enter your email to receive a reset link.</div>
      </div>
      <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
      <SubmitBtn loading={loading} label="Send Reset Link →" loadingLabel="Sending..." />
    </form>
  );
}

export default function AuthPage({ login, authMode }) {
  const [tab, setTab]             = useState(authMode === "signup" ? "register" : "login");
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div style={{ fontFamily: F.body, minHeight: "100vh", background: C.grayLt }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .auth-split-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 68px); }
        .auth-left-panel { display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; background: linear-gradient(160deg, #1a1a2e 0%, #e8590c 70%, #f07c3a 100%); padding: 60px 50px; }
        @media (max-width: 768px) { .auth-split-grid { grid-template-columns: 1fr; } .auth-left-panel { display: none; } }
      `}</style>

      <Navbar isLoggedIn={false} logout={() => {}} isDarkBackground={true} />

      <div className="auth-split-grid">
        {/* Left Panel */}
        <div className="auth-left-panel">
          <div style={{ position: "absolute", top: -100, right: -100, width: 350, height: 350, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
          <div style={{ position: "absolute", bottom: -80, left: -80, width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>

            
            <h2 style={{ color: C.white, fontSize: " clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, fontFamily: F.heading, marginBottom: 12, lineHeight: 1.2 }}>
              Your Local Service Platform in Tiaret
            </h2>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 16, lineHeight: 1.6, marginBottom: 40, maxWidth: 440 }}>
              Connect with trusted professionals in your wilaya, fast and securely.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ color: C.white, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{f.title}</div>
                    <div style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ background: C.grayLt, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ width: "100%", maxWidth: 460, background: C.white, borderRadius: 24, boxShadow: "0 12px 48px rgba(0,0,0,.12)", padding: "36px 32px", animation: "fadeUp .35s ease both" }}>
            
            {!showForgot && (
              <div style={{ display: "flex", background: C.grayLt, borderRadius: 14, padding: 5, marginBottom: 28, gap: 5 }}>
                {[{ id: "login", label: "Log In" }, { id: "register", label: "Sign Up" }].map(t => (
                  <button key={t.id} onClick={() => { setTab(t.id); setShowForgot(false); }}
                    style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: tab === t.id ? 700 : 600, fontSize: 14, fontFamily: F.body, background: tab === t.id ? C.white : "transparent", color: tab === t.id ? C.dark : C.muted, boxShadow: tab === t.id ? "0 2px 10px rgba(0,0,0,.08)" : "none", transition: "all .2s" }}>
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            <div style={{ marginBottom: 28 }}>
              {showForgot ? (
                <><h2 style={{ fontSize: 24, fontWeight: 800, color: C.dark, marginBottom: 6 }}>Forgot Password</h2><p style={{ color: C.muted, fontSize: 14 }}>We'll help you get back in</p></>
              ) : tab === "login" ? (
                <><h2 style={{ fontSize: 24, fontWeight: 800, color: C.dark, marginBottom: 6 }}>Welcome back 👋</h2><p style={{ color: C.muted, fontSize: 14 }}>Access your TiaretHub account</p></>
              ) : (
                <><h2 style={{ fontSize: 24, fontWeight: 800, color: C.dark, marginBottom: 6 }}>Join TiaretHub</h2><p style={{ color: C.muted, fontSize: 14 }}>Start using the platform today</p></>
              )}
            </div>

            {!showForgot && tab === "login"    && <LoginForm onForgot={() => setShowForgot(true)} login={login} />}
            {!showForgot && tab === "register" && <RegisterForm login={login} />}
            {showForgot                        && <ForgotForm onBack={() => setShowForgot(false)} />}

            {!showForgot && (
              <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: C.muted }}>
                {tab === "login" 
                  ? <>Don't have an account? <span onClick={() => setTab("register")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Sign up today</span></>
                  : <>Already have an account? <span onClick={() => setTab("login")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Log in here</span></>
                }
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}