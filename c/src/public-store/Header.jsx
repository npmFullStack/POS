// public-store/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, ShoppingBag, Settings } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import shopLogo from "@/assets/images/shop.png"; // Import shop.png

const Header = ({ cartItemCount = 0, onCartClick }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const user = localStorage.getItem("publicStoreUser") || "Cashier";

  const handleLogout = () => {
    localStorage.removeItem("publicStoreAuth");
    localStorage.removeItem("publicStoreUser");
    navigate("/public-store/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/public-store/home" className="flex items-center gap-3">
            <img 
              src={shopLogo} 
              alt="Store" 
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Nors</span>
              <span className="text-xs font-semibold text-gray-500 tracking-wider">POS SYSTEM</span>
            </div>
          </Link>

          {/* Powered by SukiPRO - styled like components/Header */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5">
            <img src={logo} alt="SukiPRO" className="w-5 h-5" />
            <span className="text-xs text-gray-600">
              Powered by <span className="font-bold text-primary">Suki</span>
              <span className="font-bold text-black">PRO</span>
            </span>
          </div>

          {/* Cart Icon and User Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Icon with Badge */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {/* User Menu for Cashier/Staff */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
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
                      <p className="text-sm font-medium text-gray-900">{user}</p>
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

        {/* Mobile Powered by SukiPRO - styled like components/Header */}
        <div className="md:hidden flex items-center justify-center gap-2 py-2 border-t border-gray-100">

          <span className="text-xs text-gray-500">
            Powered by 
                      <img src={logo} alt="SukiPRO" className="w-4 h-4" />
            <span className="font-bold text-primary">Suki</span>
            <span className="font-bold text-black">PRO</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;