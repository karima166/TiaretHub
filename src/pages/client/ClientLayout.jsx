import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Overview from "./Overview";
import Requests from "./Requests";
import Reviews from "./Reviews";
import Messages from "./Messages";
import Profile from "./Profile";

const NAV = [
  { id: "overview", icon: "📊", label: "Overview" },
  { id: "requests", icon: "📬", label: "My Requests", badge: 1 },
  { id: "reviews",  icon: "⭐", label: "My Reviews" },
  { id: "messages", icon: "💬", label: "Messages", badge: 2 },
  { id: "profile",  icon: "👤", label: "Profile" },
];

const SECTIONS = { overview: Overview, requests: Requests, reviews: Reviews, messages: Messages, profile: Profile };

export default function ClientLayout({ user, onLogout, onHome }) {
  const [active, setActive] = useState("overview");
  const Section = SECTIONS[active] || Overview;

  return (
    <DashboardLayout navItems={NAV} active={active} setActive={setActive} user={{ name: user?.name || "Rachid Bensaid", role: "Client", initials: "RB" }} onLogout={onLogout} onHome={onHome}>
      <Section />
    </DashboardLayout>
  );
}
