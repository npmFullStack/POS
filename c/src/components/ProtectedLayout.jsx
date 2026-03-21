import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  ChevronDown,
  LogOut,
  Store,
  User,
  X,
} from "lucide-react";
import shopImage from "@/assets/images/shop.png";
import logo from "@/assets/images/logo.svg";

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const navLinks = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { id: 2, name: "My Shop", path: "/shop", icon: Store },
    { id: 3, name: "Sales", path: "/sales", icon: ShoppingCart },
    { id: 4, name: "Inventory", path: "/inventory", icon: Package },
    { id: 5, name: "Reports", path: "/reports", icon: BarChart3 },
    { id: 6, name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header - Completely solid with no transparency effects */}
      <header className="bg-white fixed top-0 left-0 right-0 z-30">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Menu Toggle Button - Desktop */}
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                setIsMobileMenuOpen(false);
              }}
              className="hidden md:block p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Suki PRO Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-primary">Suki</span>
              <span className="text-2xl font-bold text-black">PRO</span>
            </div>
          </div>

          {/* Shop Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 relative">
                <img
                  src={shopImage}
                  alt="Nors"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://ui-avatars.com/api/?name=Nors&background=FF0800&color=fff";
                  }}
                />
                {/* Green active indicator */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <span className="font-medium text-gray-700 hidden sm:block">
                Nors
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Shop Dropdown Menu */}
            {isShopDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-50">
                <button
                  onClick={() => setIsShopDropdownOpen(false)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  Switch Shop
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar - Desktop */}
        <aside
          className={`hidden md:block bg-white transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
          style={{
            height: "calc(100vh - 64px)",
            position: "fixed",
            top: "64px",
            left: 0,
          }}
        >
          {/* User Info */}
          <div className={`p-4 ${!isSidebarOpen && "text-center"}`}>
            <div
              className={`flex ${isSidebarOpen ? "items-center gap-3" : "flex-col items-center"}`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              {isSidebarOpen && (
                <div className="overflow-hidden">
                  <p className="font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              )}
            </div>
            {isSidebarOpen && (
              <div className="mt-3 text-xs p-2 rounded-lg flex items-center gap-2 bg-white/50">
                <span className="font-medium text-gray-700">Active Shop:</span>
                <span className="text-primary font-medium flex items-center gap-1">
                  {/* Shop image in sidebar */}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={shopImage}
                        alt="Nors"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://ui-avatars.com/api/?name=Nors&background=FF0800&color=fff&size=16";
                        }}
                      />
                    </div>
                    Nors
                  </div>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.id}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center ${isSidebarOpen ? "gap-3 px-3" : "justify-center"} py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-white hover:text-primary"
                        }`
                      }
                    >
                      <Icon
                        className={`${isSidebarOpen ? "w-5 h-5" : "w-6 h-6"}`}
                      />
                      {isSidebarOpen && (
                        <span className="text-sm font-medium">{link.name}</span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Mobile Sidebar - Full Height Drawer with Animation */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay with fade animation */}
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 animate-in fade-in duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer - Slide in from right animation */}
            <aside className="md:hidden fixed top-0 right-0 bottom-0 w-80 bg-white z-50 overflow-y-auto animate-in slide-in-from-right duration-300 ease-out shadow-xl">
              {/* X icon at top right */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* User Info - with padding top to account for X icon */}
              <div className="p-6 pt-16">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="mt-4 text-sm bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    Active Shop:
                  </span>
                  <span className="text-primary font-medium flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={shopImage}
                          alt="Nors"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://ui-avatars.com/api/?name=Nors&background=FF0800&color=fff&size=20";
                          }}
                        />
                      </div>
                      Nors
                    </div>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="px-3 pb-4">
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.id}>
                        <NavLink
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                              isActive
                                ? "bg-primary text-white"
                                : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                            }`
                          }
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            {link.name}
                          </span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Logout button at bottom */}
              <div className="px-3 pb-6 mt-auto">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content - Adjust margin based on sidebar state */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;