import React from "react";
import { Link } from "react-router-dom";
import { Heart, Github, Facebook } from "lucide-react";
import logo from "@/assets/images/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white font-poppins">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <img src={logo} alt="Suki PRO Logo" className="w-10 h-10" />
              <span className="text-3xl font-bold">
                <span className="text-primary">Suki</span>
                <span className="text-white">PRO</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md text-sm">
              Empowering professionals with cutting-edge solutions to streamline
              their workflow and boost productivity.
            </p>
          </div>

          {/* Developer Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-medium mb-2 text-white">Developed by NorDev</h3>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <a
                href="https://github.com/npmFullStack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://www.facebook.com/itsmenorway"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-sm">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Bar */}
        <div className="text-center">
          <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
            <span>© {currentYear} SukiPRO. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by NorDev</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;