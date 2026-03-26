import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
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
  Users,
  X,
  Plus,
} from "lucide-react";
import { authService } from "@/services/auth.service";
import { shopService } from "@/services/shop.service";
import logo from "@/assets/images/logo.svg";

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeShop, setActiveShop] = useState(null);
  const [userShops, setUserShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { id: 2, name: "Sales", path: "/sales", icon: ShoppingCart },
    { id: 3, name: "Inventory", path: "/inventory", icon: Package },
    { id: 4, name: "Staff", path: "/staffs", icon: Users },
    { id: 5, name: "Reports", path: "/reports", icon: BarChart3 },
    { id: 6, name: "Settings", path: "/settings", icon: Settings },
  ];

  const loadUserData = useCallback(async () => {
    setLoading(true);
    console.log("Loading user data...");

    const {
      success,
      user: userData,
      error,
    } = await authService.getCurrentUser();

    if (success && userData) {
      console.log("User loaded:", userData);
      setUser(userData);

      if (userData.profile) {
        console.log("Loading shops for user:", userData.profile.id);

        // Load all user shops
        const shopsResult = await shopService.getAllUserShops(
          userData.profile.id,
        );
        console.log("Shops result:", shopsResult);

        if (shopsResult.success) {
          console.log("Shops data:", shopsResult.data);
          setUserShops(shopsResult.data);

          // Load active shop
          const activeResult = await shopService.getActiveShop(
            userData.profile.id,
          );
          console.log("Active shop result:", activeResult);

          if (activeResult.success && activeResult.data) {
            console.log("Setting active shop:", activeResult.data);
            setActiveShop(activeResult.data);
          } else if (activeResult.success && !activeResult.data) {
            console.log("No active shop found");
            setActiveShop(null);
          }
        } else {
          console.error("Failed to load shops:", shopsResult.error);
        }
      }
    } else if (error) {
      console.error("Failed to load user:", error);
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    loadUserData();

    // Listen for shop-related events
    const handleShopCreated = () => {
      console.log("Shop created event received, reloading data...");
      loadUserData();
    };

    const handleShopUpdated = () => {
      console.log("Shop updated event received, reloading data...");
      loadUserData();
    };

    const handleShopDeleted = () => {
      console.log("Shop deleted event received, reloading data...");
      loadUserData();
    };

    const handleShopChanged = () => {
      console.log("Shop changed event received, reloading data...");
      loadUserData();
    };

    // Add event listeners
    window.addEventListener("shop-created", handleShopCreated);
    window.addEventListener("shop-updated", handleShopUpdated);
    window.addEventListener("shop-deleted", handleShopDeleted);
    window.addEventListener("shop-changed", handleShopChanged);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("shop-created", handleShopCreated);
      window.removeEventListener("shop-updated", handleShopUpdated);
      window.removeEventListener("shop-deleted", handleShopDeleted);
      window.removeEventListener("shop-changed", handleShopChanged);
    };
  }, [loadUserData]);

  // Reload data when navigation state indicates refresh
  useEffect(() => {
    if (location.state?.refresh) {
      console.log("Refresh requested from navigation state");
      loadUserData();
      // Clear the state to prevent infinite refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, loadUserData]);

  const handleLogout = async () => {
    const { success } = await authService.signOut();
    if (success) {
      localStorage.removeItem("activeShopId");
      navigate("/login");
    }
  };

  const handleSwitchShop = () => {
    setIsShopDropdownOpen(false);
    navigate("/switch-shop");
  };

  const handleCreateShop = () => {
    setIsShopDropdownOpen(false);
    navigate("/create-shop");
  };

  const handleShopSelect = async (shop) => {
    shopService.setActiveShop(shop.id);
    setActiveShop(shop);
    setIsShopDropdownOpen(false);
    // Reload page data
    await loadUserData();
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <header className="bg-white fixed top-0 left-0 right-0 z-30">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                setIsMobileMenuOpen(false);
              }}
              className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <img src={logo} alt="Suki PRO Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-primary">Suki</span>
              <span className="text-2xl font-bold text-black">PRO</span>
            </div>
          </div>

          {/* Shop Dropdown OR Create Shop Button */}
          <div className="relative">
            {activeShop ? (
              <>
                <button
                  onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 relative">
                    <img
                      src={
                        activeShop.shop_image_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(activeShop.name.charAt(0))}&background=FF0800&color=fff`
                      }
                      alt={activeShop.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeShop.name.charAt(0))}&background=FF0800&color=fff`;
                      }}
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <span className="font-medium text-gray-700 hidden sm:block max-w-[150px] truncate">
                    {activeShop.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Shop Dropdown Menu */}
                {isShopDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Your Shops ({userShops.length})
                      </p>
                    </div>
                    {userShops.length > 0 ? (
                      <div className="max-h-64 overflow-y-auto">
                        {userShops.map((shop) => (
                          <button
                            key={shop.id}
                            onClick={() => handleShopSelect(shop)}
                            className={`w-full px-4 py-2 font-semibold text-left text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                              activeShop?.id === shop.id
                                ? "bg-gray-50 text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                              <img
                                src={
                                  shop.shop_image_url ||
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(shop.name.charAt(0))}&background=FF0800&color=fff&size=24`
                                }
                                alt={shop.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(shop.name.charAt(0))}&background=FF0800&color=fff&size=24`;
                                }}
                              />
                            </div>
                            <span className="flex-1 truncate">{shop.name}</span>
                            {activeShop?.id === shop.id && (
                              <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        No shops yet
                      </div>
                    )}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <NavLink
                        to="/switch-shop"
                        className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Store className="w-4 h-4" />
                        Switch Shop
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Create Shop Button (when no active shop)
              <button
                onClick={handleCreateShop}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium text-sm">Create Shop</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar - Desktop */}
        <aside
          className={`hidden md:block bg-white border-r border-gray-100 transition-all duration-300 ${
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
          <div
            className={`p-4 border-b border-gray-100 ${!isSidebarOpen && "text-center"}`}
          >
            <div
              className={`flex ${isSidebarOpen ? "items-center gap-3" : "flex-col items-center"}`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              {isSidebarOpen && user?.profile && (
                <div className="overflow-hidden">
                  <p className="font-medium text-gray-900 truncate">
                    {user.profile.first_name} {user.profile.last_name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              )}
            </div>
            {isSidebarOpen && activeShop && (
              <div className="mt-3 text-xs p-2 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="font-medium text-gray-700">Active Shop:</span>
                <span className="text-primary font-medium flex items-center gap-1">
                  <span className="truncate max-w-[100px]">
                    {activeShop.name}
                  </span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </span>
              </div>
            )}
            {isSidebarOpen && !activeShop && userShops.length === 0 && (
              <div className="mt-3 text-xs p-2 bg-blue-50 rounded-lg">
                <p className="text-primary font-medium mb-1">No shops yet</p>
                <p className="text-primary text-xs">
                  Click <span className="font-semibold">"Create Shop"</span> to
                  get started
                </p>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isDisabled = !activeShop && link.path !== "/dashboard";
                return (
                  <li key={link.id}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center ${isSidebarOpen ? "gap-3 px-3" : "justify-center"} py-2.5 rounded-lg transition-colors ${
                          isActive && !isDisabled
                            ? "bg-primary text-white"
                            : isDisabled
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                        }`
                      }
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault();
                        }
                      }}
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

          {/* Logout Button - Desktop Sidebar */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 ${!isSidebarOpen && "flex justify-center"}`}
          >
            <button
              onClick={handleLogout}
              className={`flex items-center ${isSidebarOpen ? "gap-3 px-3" : "justify-center"} w-full py-2.5 rounded-lg transition-colors text-red-600 hover:bg-red-50`}
            >
              <LogOut className={`${isSidebarOpen ? "w-5 h-5" : "w-6 h-6"}`} />
              {isSidebarOpen && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside className="md:hidden fixed top-0 right-0 bottom-0 w-80 bg-white z-50 overflow-y-auto shadow-xl">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-6 pt-16">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user?.profile?.first_name} {user?.profile?.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                {activeShop && (
                  <div className="mt-4 text-sm bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-gray-700">
                      Active Shop:
                    </span>
                    <span className="text-primary font-medium flex items-center gap-2">
                      <span className="truncate max-w-[150px]">
                        {activeShop.name}
                      </span>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </span>
                  </div>
                )}
                {!activeShop && userShops.length === 0 && (
                  <div className="mt-4 text-sm bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-700 font-medium">No active shop</p>
                    <p className="text-blue-600 text-xs mt-1">
                      Create a shop to start managing your business
                    </p>
                  </div>
                )}
              </div>

              <nav className="px-3 pb-4">
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isDisabled =
                      !activeShop && link.path !== "/dashboard";
                    return (
                      <li key={link.id}>
                        <NavLink
                          to={link.path}
                          onClick={() => {
                            if (!isDisabled) {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                              isActive && !isDisabled
                                ? "bg-primary text-white"
                                : isDisabled
                                  ? "text-gray-300 cursor-not-allowed"
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

              {/* Create Shop Button in Mobile Menu */}
              {!activeShop && userShops.length === 0 && (
                <div className="px-3 pb-4">
                  <button
                    onClick={() => {
                      handleCreateShop();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Create Your First Shop</span>
                  </button>
                </div>
              )}

              {/* Logout Button in Mobile Menu */}
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

        {/* Main Content */}
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
