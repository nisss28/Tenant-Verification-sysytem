import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import TenantRegistration from "./pages/TenantRegistration";
import LandlordRegistration from "./pages/LandlordRegistration";
import LandlordLogin from "./pages/LandlordLogin";
import TenantProfile from "./pages/TenantProfile";
import LandlordProfile from "./pages/LandlordProfile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Login */}
        <Route path="/login" element={<LoginForm />} />

        {/* Tenant Routes */}
        <Route path="/tenant/register" element={<TenantRegistration />} />
        <Route path="/tenant/:id" element={<TenantProfile />} />
        <Route path="/tenant/verify/:id" element={<TenantProfile />} />

        {/* Landlord Routes */}
        <Route path="/landlord-registration" element={<LandlordRegistration />} />
        <Route path="/landlord-login" element={<LandlordLogin />} />
        <Route path="/landlord/:id" element={<LandlordProfile />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}