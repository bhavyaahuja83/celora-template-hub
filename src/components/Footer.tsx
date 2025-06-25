
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Celora
              </h3>
            </Link>
            <p className="text-gray-400">
              The premier marketplace for premium templates and UI components.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Templates</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/categories?category=Web" className="hover:text-white transition-colors">Web Templates</Link></li>
              <li><Link to="/categories?category=Flutter" className="hover:text-white transition-colors">Flutter Apps</Link></li>
              <li><Link to="/categories?category=Android" className="hover:text-white transition-colors">Android Apps</Link></li>
              <li><Link to="/categories?category=UI Kit" className="hover:text-white transition-colors">UI Kits</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/creator-info" className="hover:text-white transition-colors">Sell Templates</Link></li>
            </ul>
          </div>
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
