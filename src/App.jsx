import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import ProviderProfile from "./pages/ProviderProfile";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import MessagesPage from "./pages/MessagesPage";
import AIAssistantPage from "./pages/AIAssistantPage";

// Dashboard Layouts (Restructured)
import AdminLayout from "./pages/admin/AdminLayout";
import ProviderLayout from "./pages/provider/ProviderLayout";
import ClientLayout from "./pages/client/ClientLayout";

// Mock Data / Demo Users
import { DEMO_USERS } from "./data/mockData";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      setIsLoggedIn(true);
      setCurrentUser(found);
      return { success: true, user: found };
    }
    // Fallback for any login (Demo purpose)
    const namePart = email.split("@")[0];
    const fallbackUser = { email, role: "client", first_name: namePart, last_name: "", name: namePart };
    setIsLoggedIn(true);
    setCurrentUser(fallbackUser);
    return { success: true, user: fallbackUser };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} />} />
        <Route path="/browse" element={<BrowsePage isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} />} />
        <Route path="/provider/:id" element={<ProviderProfile isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} />} />
        <Route path="/auth" element={
          isLoggedIn ? (
            <Navigate to={`/dashboard/${currentUser.role}`} replace />
          ) : (
            <AuthPage login={login} />
          )
        } />
        <Route path="/about" element={<AboutPage isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} />} />
        <Route path="/messages" element={<MessagesPage isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} />} />
        <Route path="/smart-ai" element={<AIAssistantPage isLoggedIn={isLoggedIn} logout={logout} currentUser={currentUser} />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard/admin/*" element={
          isLoggedIn && currentUser?.role === "admin" ? (
            <AdminLayout user={currentUser} onLogout={logout} onHome={() => window.location.href = "/"} />
          ) : (
            <Navigate to="/auth" replace />
          )
        } />

        <Route path="/dashboard/provider/*" element={
          isLoggedIn && currentUser?.role === "provider" ? (
            <ProviderLayout user={currentUser} onLogout={logout} onHome={() => window.location.href = "/"} />
          ) : (
            <Navigate to="/auth" replace />
          )
        } />

        <Route path="/dashboard/client/*" element={
          isLoggedIn && currentUser?.role === "client" ? (
            <ClientLayout user={currentUser} onLogout={logout} onHome={() => window.location.href = "/"} />
          ) : (
            <Navigate to="/auth" replace />
          )
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}