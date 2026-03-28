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
  CheckCircle,
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

    const { success, user: userData } = await authService.getCurrentUser();

    if (!success || !userData) {
      navigate("/login");
      return;
    }

    setUser(userData);

    if (userData.profile) {
      const shopsResult = await shopService.getAllUserShops(userData.profile.id);

      if (shopsResult.success) {
        let shops = shopsResult.data || [];
        
        // Get active shop
        const activeResult = await shopService.getActiveShop(userData.profile.id);
        let currentActiveShop = null;
        
        if (activeResult.success && activeResult.data) {
          currentActiveShop = activeResult.data;
          setActiveShop(currentActiveShop);
          
          // Reorder shops: active shop first, then others
          shops = [
            currentActiveShop,
            ...shops.filter(shop => shop.id !== currentActiveShop.id)
          ];
        }
        
        setUserShops(shops);

        if (shops.length === 0) {
          setLoading(false);
          if (location.pathname !== "/no-shop" && location.pathname !== "/create-shop") {
            navigate("/no-shop", { replace: true });
          }
          return;
        }
      }
    }

    setLoading(false);
  }, [navigate, location.pathname]);

  // Listen for shop changes
  useEffect(() => {
    const handleShopChange = () => {
      loadUserData();
    };

    window.addEventListener("shop-changed", handleShopChange);
    
    return () => {
      window.removeEventListener("shop-changed", handleShopChange);
    };
  }, [loadUserData]);

  useEffect(() => {
    loadUserData();
  }, [location.pathname]);

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
    
    // Reorder shops in the dropdown
    setUserShops(prevShops => [
      shop,
      ...prevShops.filter(s => s.id !== shop.id)
    ]);
    
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const hasNoShops = userShops.length === 0;
  const isNoShopPage = location.pathname === "/no-shop" || location.pathname === "/create-shop";

  // Helper function to render nav links (either active links or disabled based on hasNoShops)
  const renderNavLink = (link) => {
    const Icon = link.icon;
    const isDisabled = hasNoShops;

    if (isDisabled) {
      return (
        <li key={link.id}>
          <span
            className={`flex items-center ${
              isSidebarOpen ? "gap-3 px-3" : "justify-center"
            } py-2.5 rounded-lg text-gray-300 cursor-not-allowed select-none`}
            title="Create a shop to access this page"
          >
            <Icon className={`${isSidebarOpen ? "w-5 h-5" : "w-6 h-6"}`} />
            {isSidebarOpen && <span className="text-sm font-medium">{link.name}</span>}
          </span>
        </li>
      );
    }

    return (
      <li key={link.id}>
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `flex items-center ${
              isSidebarOpen ? "gap-3 px-3" : "justify-center"
            } py-2.5 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-primary"
            }`
          }
        >
          <Icon className={`${isSidebarOpen ? "w-5 h-5" : "w-6 h-6"}`} />
          {isSidebarOpen && <span className="text-sm font-medium">{link.name}</span>}
        </NavLink>
      </li>
    );
  };

  // Helper function to render mobile nav links
  const renderMobileNavLink = (link) => {
    const Icon = link.icon;
    const isDisabled = hasNoShops;

    if (isDisabled) {
      return (
        <li key={link.id}>
          <span
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 cursor-not-allowed select-none"
            title="Create a shop to access this page"
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{link.name}</span>
          </span>
        </li>
      );
    }

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
          <span className="text-sm font-medium">{link.name}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <header className="bg-white fixed top-0 left-0 right-0 z-30 border-b border-gray-100">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Desktop sidebar toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate(hasNoShops ? "/no-shop" : "/dashboard")}
            >
              <img src={logo} alt="Suki PRO Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-primary">Suki</span>
              <span className="text-2xl font-bold text-black">PRO</span>
            </div>
          </div>

          {/* Right side actions - Show different based on hasNoShops */}
          {hasNoShops ? (
            // Show message when no shop found
<div className="text-xs font-medium text-gray-500">No Shop Found</div>
          ) : (
            // Show shop dropdown when shops exist
            <div className="relative">
              <button
                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  {activeShop?.shop_image_url ? (
                    <img
                      src={activeShop.shop_image_url}
                      alt={activeShop.name || "Shop"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      <Store className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-32 truncate">
                  {activeShop?.name || "Select Shop"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isShopDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsShopDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Your Shops
                      </p>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {userShops.map((shop) => (
                        <button
                          key={shop.id}
                          onClick={() => handleShopSelect(shop)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            {shop.shop_image_url ? (
                              <img
                                src={shop.shop_image_url}
                                alt={shop.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <Store className="w-3 h-3 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <span className="flex-1 truncate font-medium">{shop.name}</span>
                          {activeShop?.id === shop.id && (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleSwitchShop}
                        className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Store className="w-4 h-4" />
                        Switch Shop
                      </button>
                      <button
                        onClick={handleCreateShop}
                        className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Create New Shop
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
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
            overflowY: "auto",
          }}
        >
          {/* User Profile Section */}
          <div
            className={`p-4 border-b border-gray-100 ${
              !isSidebarOpen && "text-center"
            }`}
          >
            <div
              className={`flex ${
                isSidebarOpen ? "items-center gap-3" : "flex-col items-center"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              {isSidebarOpen && user?.profile && (
                <div className="overflow-hidden flex-1">
                  <p className="font-medium text-gray-900 truncate">
                    {user.profile.first_name} {user.profile.last_name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Shop Display - Sidebar */}
          {!hasNoShops && activeShop && (
            <div
              className={`p-4 border-b border-gray-100 bg-gray-50 ${
                !isSidebarOpen && "flex justify-center"
              }`}
            >
              <div
                className={`flex ${
                  isSidebarOpen ? "items-center gap-3" : "flex-col items-center"
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {activeShop.shop_image_url ? (
                    <img
                      src={activeShop.shop_image_url}
                      alt={activeShop.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      <Store className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
                {isSidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-[0.5rem] text-gray-800 font-semibold uppercase">Active Shop</p>
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {activeShop.name}
                    </p>
                  </div>
                )}
                {!isSidebarOpen && (
                  <div className="mt-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3">
            <ul className="space-y-1">{navLinks.map(renderNavLink)}</ul>
          </nav>

          {/* Logout Button */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-white ${
              !isSidebarOpen && "flex justify-center"
            }`}
          >
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                isSidebarOpen ? "gap-3 px-3" : "justify-center"
              } w-full py-2.5 rounded-lg transition-colors text-red-600 hover:bg-red-50`}
            >
              <LogOut className={`${isSidebarOpen ? "w-5 h-5" : "w-6 h-6"}`} />
              {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
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
            <aside className="md:hidden fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* User Profile */}
              <div className="p-6 pt-16">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {user?.profile?.first_name} {user?.profile?.last_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Active Shop Display - Mobile */}
              {!hasNoShops && activeShop && (
                <div className="px-6 pb-4 border-b border-gray-100">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {activeShop.shop_image_url ? (
                          <img
                            src={activeShop.shop_image_url}
                            alt={activeShop.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10">
                            <Store className="w-5 h-5 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs text-gray-500 font-medium">Active Shop</p>
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {activeShop.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="px-3 pb-4">
                <ul className="space-y-1">{navLinks.map(renderMobileNavLink)}</ul>
              </nav>

              {/* Logout Button */}
              <div className="px-3 pb-6">
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