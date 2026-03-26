import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingPage from "@/pages/LoadingPage";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Sales = lazy(() => import("@/pages/Sales"));
const Inventory = lazy(() => import("@/pages/Inventory"));
const Reports = lazy(() => import("@/pages/Reports"));
const Staff = lazy(() => import("@/pages/Staff"));
const Settings = lazy(() => import("@/pages/Settings"));
const SwitchShop = lazy(() => import("@/pages/SwitchShop"));
const ImportProduct = lazy(() => import("@/pages/ImportProduct"));
const CreateShop = lazy(() => import("@/pages/CreateShop"));
const NoShop = lazy(() => import("@/pages/NoShop"));

// Lazy load public store components
const PublicStoreLogin = lazy(() => import("@/public-store/Login"));
const PublicStoreHome = lazy(() => import("@/public-store/Home"));

// Layout components
import ProtectedLayout from "@/components/ProtectedLayout";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-poppins">
        <Suspense fallback={<LoadingPage />}>
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
              <Route path="/switch-shop" element={<SwitchShop />} />
              <Route path="/create-shop" element={<CreateShop />} />
                            <Route path="/no-shop" element={<NoShop />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
