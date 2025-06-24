
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="text-8xl font-bold text-purple-200 mb-4">404</div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-600">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/categories">
                <Search className="w-4 h-4 mr-2" />
                Browse Templates
              </Link>
            </Button>
          </div>

          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link to="/pricing" className="hover:text-purple-600 transition-colors">Pricing</Link>
            <Link to="/categories" className="hover:text-purple-600 transition-colors">Categories</Link>
            <Link to="/upload-template" className="hover:text-purple-600 transition-colors">Upload</Link>
            <Link to="/dashboard" className="hover:text-purple-600 transition-colors">Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
