import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { C, F } from "../styles/theme";

export default function AboutPage({ isLoggedIn, logout, currentUser }) {
  return (
    <div style={{ fontFamily: F.body, background: C.grayLt, minHeight: "100vh" }}>


      <Navbar isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} isDarkBackground={true} />

      {/* Header */}
      <section style={{ background: C.dark, padding: "140px 5% 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ color: C.primary, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
            Université Ibn Khaldoun — Tiaret
          </p>
          <h1 style={{ fontFamily: F.heading, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: 8 }}>
            About TiaretHub
          </h1>
          <p style={{ color: "#adb5bd", fontSize: 15 }}>
            A Smart Local Platform for Service Providers in Tiaret, Algeria.
          </p>
        </div>
      </section>

      {/* What is TiaretHub */}
      <section style={{ padding: "60px 5%", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Mission */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px", border: `1px solid ${C.gray}` }}>
            <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 22, marginBottom: 16 }}>
              🎯 Our Mission
            </h2>
            <p style={{ color: C.text, fontSize: 15, lineHeight: 1.8 }}>
              TiaretHub is a smart local services platform built specifically for <strong>Tiaret Wilaya, Algeria</strong>.
              Our goal is to connect skilled service providers — plumbers, electricians, painters, carpenters and more —
              directly with residents who need their services. No middlemen, no fees, no hassle.
            </p>
          </div>

          {/* How it works */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px", border: `1px solid ${C.gray}` }}>
            <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: 22, marginBottom: 24 }}>
              ⚙️ How It Works
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { n: "01", title: "Search a Professional",  desc: "Browse by category or search by name, profession, or skill across Tiaret wilaya." },
                { n: "02", title: "View Profiles",           desc: "Check experience, skills, ratings and read real reviews from residents in Tiaret." },
                { n: "03", title: "Contact Directly",        desc: "Reach out via phone or WhatsApp — no platform fees, no complex booking systems." },
                { n: "04", title: "Leave a Review",          desc: "After the job, rate your experience to help the Tiaret community grow." },
              ].map(step => (
                <div key={step.n} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                    background: C.primary, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: F.heading, fontWeight: 800, fontSize: 14,
                  }}>{step.n}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: C.dark }}>{step.title}</div>
                    <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}