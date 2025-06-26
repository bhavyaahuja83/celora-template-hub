
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useMockAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useMockAuth();
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Browse" },
    { href: "/pricing", label: "Pricing" },
    { href: "/tools", label: "Tools" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ];

  // Check if user is a seller - show seller-specific buttons only for sellers
  const isSeller = isAuthenticated && user?.userType === 'seller';

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Celora
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors ${
                  isActivePath(link.href)
                    ? "text-purple-600 font-medium"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isSeller && (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/upload-template">Sell Templates</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                  </>
                )}
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="text-gray-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/creator-info">Become a Seller</Link>
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors ${
                    isActivePath(link.href)
                      ? "text-purple-600 font-medium"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    {isSeller && (
                      <>
                        <Button variant="outline" asChild className="w-full">
                          <Link to="/upload-template" onClick={() => setIsMobileMenuOpen(false)}>
                            Sell Templates
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                          <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                            Dashboard
                          </Link>
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-gray-600"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/creator-info" onClick={() => setIsMobileMenuOpen(false)}>
                        Become a Seller
                      </Link>
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 w-full" asChild>
                      <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
