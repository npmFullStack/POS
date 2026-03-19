import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Info, Tag, Phone, UserPlus } from "lucide-react";
import logo from "@/assets/images/logo.svg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links directly in the component with icons
  const navLinks = [
    { id: 1, name: "Home", path: "/", icon: Home },
    { id: 2, name: "About", path: "/about", icon: Info },
    { id: 3, name: "Pricing", path: "/pricing", icon: Tag },
    { id: 4, name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 font-poppins">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - SVG beside Suki PRO */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Suki PRO Logo" className="w-10 h-10" />
            <span className="text-3xl font-bold">
              <span className="text-primary">Suki</span>
              <span className="text-black">PRO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;

                return (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className={`px-4 py-2 transition-all duration-300 font-medium relative flex items-center gap-1.5
                        ${
                          isActive
                            ? "text-primary after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full"
                            : "text-gray-600 hover:text-primary"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
              {/* CTA Button with UserPlus icon */}
              <li>
                <Link
                  to="/register"
                  className="ml-4 px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button with Lucide icons */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;

                return (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 transition-all duration-300 font-medium relative flex items-center gap-2
                        ${
                          isActive
                            ? "text-primary after:absolute after:bottom-2 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full"
                            : "text-gray-600 hover:text-primary"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
              {/* Mobile CTA Button with UserPlus icon */}
              <li className="pt-2">
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
