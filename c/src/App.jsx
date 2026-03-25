// App.jsx - Updated with public store routes
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import ProtectedLayout from "@/components/ProtectedLayout";
import Dashboard from "@/pages/Dashboard";
import Sales from "@/pages/Sales";
import Inventory from "@/pages/Inventory";
import Reports from "@/pages/Reports";
import Staff from "@/pages/Staff";
import Settings from "@/pages/Settings";

// Public Store Imports
import PublicStoreLogin from "@/public-store/Login";
import PublicStoreHome from "@/public-store/Home";
import ImportProduct from "@/pages/ImportProduct";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-poppins">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          {/* Public Store Routes */}
          <Route path="/public-store/login" element={<PublicStoreLogin />} />
          <Route path="/public-store/home" element={<PublicStoreHome />} />

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/import" element={<ImportProduct />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/staffs" element={<Staff />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
