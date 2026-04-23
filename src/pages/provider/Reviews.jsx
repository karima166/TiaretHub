import AvisInterface from "../../components/ui/AvisInterface";
import { C, F } from "../../styles/theme";

export default function Reviews({ user }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: F.heading, fontSize: 24, fontWeight: 800, color: C.dark }}>Your Reviews & Reputation</h2>
        <p style={{ color: C.muted, fontSize: 14 }}>Manage your public profile and reply to comments left by your clients.</p>
      </div>

      {/* Integrate the powerful interface specifying the role */}
      <AvisInterface role="prestataire" currentUser={user} />
    </div>
  );
}
