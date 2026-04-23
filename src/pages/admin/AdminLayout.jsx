import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Overview from "./Overview";
import Providers from "./Providers";
import Services from "./Services";
import Requests from "./Requests";
import Reviews from "./Reviews";
import Categories from "./Categories";

const NAV = [
  { id: "overview",   icon: "📊", label: "Overview" },
  { id: "providers",  icon: "🛠️", label: "Providers" },
  { id: "services",   icon: "📋", label: "Services" },
  { id: "requests",   icon: "📬", label: "Requests" },
  { id: "reviews",    icon: "⭐", label: "Reviews" },
  { id: "categories", icon: "🏷️", label: "Categories" },
];

const SECTIONS = { overview: Overview, providers: Providers, services: Services, requests: Requests, reviews: Reviews, categories: Categories };

export default function AdminLayout({ user, onLogout, onHome }) {
  const [active, setActive] = useState("overview");
  const Section = SECTIONS[active] || Overview;

  return (
    <DashboardLayout navItems={NAV} active={active} setActive={setActive} user={{ name: user?.name || "Admin TiaretHub", role: "Administrator", initials: "A" }} onLogout={onLogout} onHome={onHome}>
      <Section currentUser={user} />
    </DashboardLayout>
  );
}
