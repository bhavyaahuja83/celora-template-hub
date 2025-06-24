
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryFilter from "@/components/CategoryFilter";
import FeaturedSection from "@/components/FeaturedSection";
import PlaceholderTemplateCard from "@/components/PlaceholderTemplateCard";
import { useFeaturedTemplates, useTrendingTemplates } from "@/hooks/useTemplates";
import { useMockAuth } from "@/hooks/useAuth";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: featuredTemplates, isLoading: featuredLoading } = useFeaturedTemplates(3);
  const { data: trendingTemplates, isLoading: trendingLoading } = useTrendingTemplates(6);
  const { isAuthenticated } = useMockAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // TODO: Navigate to categories page with search query
    window.location.href = `/categories?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Navigation Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Celora
                </h1>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
                <Link to="/categories" className="text-gray-700 hover:text-purple-600 transition-colors">Browse</Link>
                <Link to="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">Pricing</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/upload-template">Upload Template</Link>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/upload-template">Upload Template</Link>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
              Premium Templates
              <br />
              <span className="text-4xl md:text-6xl">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of high-quality templates for web, mobile, and desktop applications. 
              Built by developers, for developers.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-scale-in">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for templates, UI kits, themes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-4 text-lg rounded-full border-2 border-purple-200 focus:border-purple-400 shadow-lg"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-full px-8 bg-purple-600 hover:bg-purple-700 shadow-lg"
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slide-in-right">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-gray-600">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50k+</div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5k+</div>
              <div className="text-gray-600">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <FeaturedSection 
            templates={featuredTemplates?.templates || []}
            isLoading={featuredLoading}
          />
        </div>
      </section>

      {/* Trending Templates */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              🔥 Trending This Week
            </h2>
            <p className="text-xl text-gray-600">
              Most popular templates chosen by our community
            </p>
          </div>

          {trendingLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <PlaceholderTemplateCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingTemplates?.templates.length ? (
                trendingTemplates.templates.map((template) => (
                  <PlaceholderTemplateCard key={template.id} />
                ))
              ) : (
                Array.from({ length: 6 }).map((_, index) => (
                  <PlaceholderTemplateCard key={index} />
                ))
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8" asChild>
              <Link to="/categories">View All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers who trust Celora for their template needs. 
            Start your next project today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <Link to="/categories">Browse Templates</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-purple-700" asChild>
              <Link to="/upload-template">Sell Your Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/licensing" className="hover:text-white transition-colors">Licensing</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Celora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
