import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Overview from "./Overview";
import Requests from "./Requests";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Reviews from "./Reviews";
import Messages from "./Messages";
import Profile from "./Profile";

const NAV = [
  { id: "overview",     icon: "📊", label: "Overview" },
  { id: "requests",     icon: "📬", label: "Requests", badge: 3 },
  { id: "services",     icon: "🛠️", label: "My Services" },
  { id: "portfolio",    icon: "📸", label: "Portfolio" },
  { id: "reviews",      icon: "⭐", label: "Reviews" },
  { id: "messages",     icon: "💬", label: "Messages", badge: 5 },
  { id: "profile",      icon: "👤", label: "Profile" },
];

const SECTIONS = { overview: Overview, requests: Requests, services: Services, portfolio: Portfolio, reviews: Reviews, messages: Messages, profile: Profile };

export default function ProviderLayout({ user, onLogout, onHome }) {
  const [active, setActive] = useState("overview");
  const Section = SECTIONS[active] || Overview;

  const displayName = user?.name || "Karim Boudiaf";
  const initials = user?.initials || displayName.split(" ").map(n => n[0]).join("");

  return (
    <DashboardLayout navItems={NAV} active={active} setActive={setActive} user={{ name: displayName, role: "Service Provider", initials }} onLogout={onLogout} onHome={onHome}>
      <Section />
    </DashboardLayout>
  );
}
