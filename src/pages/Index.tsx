
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Upload, Star, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import TemplateCard from "@/components/TemplateCard";
import FeaturedSection from "@/components/FeaturedSection";
import CategoryFilter from "@/components/CategoryFilter";

const Index = () => {
  const featuredTemplates = [
    {
      id: "1",
      title: "Modern Dashboard UI Kit",
      description: "Complete dashboard template with 50+ components",
      price: 2999,
      originalPrice: 4999,
      image: "/api/placeholder/400/300",
      category: "Web",
      rating: 4.8,
      downloads: 1240,
      tags: ["React", "Dashboard", "Admin"]
    },
    {
      id: "2", 
      title: "E-commerce Mobile App",
      description: "Beautiful Flutter e-commerce app template",
      price: 3999,
      originalPrice: 5999,
      image: "/api/placeholder/400/300",
      category: "Mobile",
      rating: 4.9,
      downloads: 856,
      tags: ["Flutter", "E-commerce", "Mobile"]
    },
    {
      id: "3",
      title: "Landing Page Collection",
      description: "10 responsive landing pages for startups",
      price: 1999,
      originalPrice: 2999,
      image: "/api/placeholder/400/300", 
      category: "Web",
      rating: 4.7,
      downloads: 2100,
      tags: ["HTML", "CSS", "Landing"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Celora
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Templates</Link>
                <Link to="/categories" className="text-gray-700 hover:text-purple-600 transition-colors">Categories</Link>
                <Link to="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">Pricing</Link>
              </nav>
              <div className="flex items-center space-x-3">
                <Link to="/upload">
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </Link>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
            Premium UI Templates
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover thousands of high-quality templates for web, mobile, and desktop applications. 
            Built by designers, for developers.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search templates, components, or frameworks..."
                className="pl-12 pr-4 py-4 text-lg border-purple-200 focus:border-purple-400 rounded-xl shadow-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-700">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">12,500+</div>
              <div className="text-gray-600">Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">95k+</div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <CategoryFilter />

      {/* Featured Templates */}
      <FeaturedSection templates={featuredTemplates} />

      {/* Template Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-800">Latest Templates</h3>
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
            {/* Additional templates */}
            {[...Array(8)].map((_, i) => (
              <TemplateCard 
                key={`additional-${i}`}
                template={{
                  id: `${i + 4}`,
                  title: `Template ${i + 4}`,
                  description: "Professional template for modern applications",
                  price: 1999 + (i * 500),
                  originalPrice: 2999 + (i * 500),
                  image: "/api/placeholder/400/300",
                  category: i % 2 === 0 ? "Web" : "Mobile",
                  rating: 4.5 + (i * 0.1),
                  downloads: 500 + (i * 100),
                  tags: ["Modern", "Clean", "Professional"]
                }}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-3">
              Load More Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <h3 className="text-xl font-bold">Celora</h3>
              </div>
              <p className="text-gray-400">
                Premium UI templates for modern applications. Built by designers, for developers.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Templates</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Web Templates</a></li>
                <li><a href="#" className="hover:text-white transition">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition">Dashboard UI</a></li>
                <li><a href="#" className="hover:text-white transition">Landing Pages</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Celora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
