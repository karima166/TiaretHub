import { STATUS_CONFIG } from "../../styles/theme";

/* Map legacy French status keys to the standard STATUS_CONFIG keys */
const LEGACY_MAP = {
  en_attente: "PENDING",
  en_cours: "IN_PROGRESS",
  terminee: "COMPLETED",
  acceptee: "ACCEPTED",
  annulee: "CANCELLED",
  refusee: "REJECTED",
};

export default function Badge({ statut }) {
  const key = LEGACY_MAP[statut] || statut;
  const s = STATUS_CONFIG[key];
  if (!s) return null;
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 700,
        background: s.bg,
        color: s.color,
        whiteSpace: "nowrap",
      }}
    >
      {s.icon} {s.label}
    </span>
  );
}
