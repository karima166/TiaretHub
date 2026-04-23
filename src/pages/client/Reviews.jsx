import AvisInterface from "../../components/ui/AvisInterface";
import { C, F } from "../../styles/theme";

export default function Reviews({ currentUser }) {
  /* Ensure we always have a valid currentUser for the AvisInterface */
  const user = currentUser || { name: "Rachid B." };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: F.heading, fontSize: 24, fontWeight: 800, color: C.dark }}>My Reviews</h2>
        <p style={{ color: C.muted, fontSize: 14 }}>Manage the reviews you've written for service providers. Edit or delete your reviews at any time.</p>
      </div>

      {/* Integrate the AvisInterface specifying the role as demandeur */}
      <AvisInterface role="demandeur" currentUser={user} />
    </div>
  );
}
