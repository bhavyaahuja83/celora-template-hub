
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMockAuth } from "@/hooks/useAuth";

const Footer = () => {
  const { isAuthenticated, user } = useMockAuth();
  const isSeller = isAuthenticated && user?.userType === 'seller';

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Sell Your Templates CTA - Show for everyone who's not already a seller */}
        {(!isAuthenticated || (isAuthenticated && user?.userType !== 'seller')) && (
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to Start Selling?
            </h3>
            <p className="text-purple-100 mb-6">
              Upload your templates and earn 65% on every sale
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/auth">
                <span className="text-purple-600 font-semibold">Sell Your Templates</span>
              </Link>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h3 className="text-xl font-bold">Celora</h3>
            </div>
            <p className="text-gray-400 mb-4">
              The world's largest marketplace for premium development templates.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/categories" className="hover:text-white transition-colors">Browse Templates</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/creator-info" className="hover:text-white transition-colors">Sell Templates</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Celora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
