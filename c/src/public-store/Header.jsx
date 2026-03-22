// public-store/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, ShoppingBag, Settings, Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import shopLogo from "@/assets/images/shop.png";

const Header = ({ cartItemCount = 0, onCartClick }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const user = localStorage.getItem("publicStoreUser") || "Cashier";

  const handleLogout = () => {
    localStorage.removeItem("publicStoreAuth");
    localStorage.removeItem("publicStoreUser");
    navigate("/public-store/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Brand */}
          <Link to="/public-store/home" className="flex items-center gap-2 sm:gap-3">
            <img 
              src={shopLogo} 
              alt="Store" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-gray-900">Nors</span>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wider hidden sm:block">POS SYSTEM</span>
            </div>
          </Link>

          {/* Powered by SukiPRO - Desktop */}
          <div className="hidden md:flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5">
            <img src={logo} alt="SukiPRO" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs text-gray-600">
              Powered by <span className="font-bold text-primary">Suki</span>
              <span className="font-bold text-black">PRO</span>
            </span>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Icon with Badge */}
            <button
              onClick={onCartClick}
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-primary transition-colors touch-manipulation"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] sm:text-xs rounded-full min-w-[16px] sm:min-w-[20px] h-4 sm:h-5 flex items-center justify-center px-1">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:text-primary transition-colors touch-manipulation"
              aria-label="Menu"
            >
              {showMobileMenu ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* User Menu - Desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="User menu"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user}</p>
                      <p className="text-xs text-gray-500">Cashier / Staff</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {showMobileMenu && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            <div className="fixed top-14 sm:top-16 left-0 right-0 bg-white shadow-lg z-40 md:hidden animate-slide-down">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user}</p>
                    <p className="text-xs text-gray-500">Cashier / Staff</p>
                  </div>
                </div>
                
                {/* Powered by SukiPRO - Mobile */}
                <div className="flex items-center justify-center gap-2 py-2 border-t border-gray-100 mt-2">
                  <img src={logo} alt="SukiPRO" className="w-4 h-4" />
                  <span className="text-xs text-gray-500">
                    Powered by <span className="font-bold text-primary">Suki</span>
                    <span className="font-bold text-black">PRO</span>
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full mt-3 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Mobile Powered by SukiPRO - Bottom Bar (optional) */}
        <div className="md:hidden flex items-center justify-center gap-1 py-1.5 border-t border-gray-100">
          <img src={logo} alt="SukiPRO" className="w-3 h-3" />
          <span className="text-[10px] text-gray-500">
            Powered by <span className="font-bold text-primary">Suki</span>
            <span className="font-bold text-black">PRO</span>
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;