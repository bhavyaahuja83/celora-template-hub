import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Smartphone, 
  Globe, 
  Monitor, 
  Tablet, 
  Code, 
  Palette,
  Search,
  Filter,
  TrendingUp,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import TemplateCard from "@/components/TemplateCard";

const Categories = () => {
  const categories = [
    { 
      id: "web", 
      name: "Web Applications", 
      icon: Monitor, 
      count: 5200, 
      color: "bg-blue-100 text-blue-700",
      gradient: "from-blue-500 to-blue-600"
    },
    { 
      id: "mobile", 
      name: "Mobile Apps", 
      icon: Smartphone, 
      count: 3800, 
      color: "bg-green-100 text-green-700",
      gradient: "from-green-500 to-green-600"
    },
    { 
      id: "desktop", 
      name: "Desktop Apps", 
      icon: Tablet, 
      count: 1200, 
      color: "bg-yellow-100 text-yellow-700",
      gradient: "from-yellow-500 to-yellow-600"
    },
    { 
      id: "components", 
      name: "UI Components", 
      icon: Code, 
      count: 2100, 
      color: "bg-red-100 text-red-700",
      gradient: "from-red-500 to-red-600"
    },
    { 
      id: "landing", 
      name: "Landing Pages", 
      icon: Globe, 
      count: 1800, 
      color: "bg-purple-100 text-purple-700",
      gradient: "from-purple-500 to-purple-600"
    },
    { 
      id: "ui-kits", 
      name: "UI Kits", 
      icon: Palette, 
      count: 450, 
      color: "bg-indigo-100 text-indigo-700",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  const templates = [
    {
      id: "1",
      title: "E-commerce Dashboard",
      description: "Complete admin dashboard for online stores",
      price: 3999,
      originalPrice: 5999,
      image: "/api/placeholder/400/300",
      category: "Web",
      rating: 4.8,
      downloads: 1240,
      tags: ["React", "Dashboard", "E-commerce"]
    },
    {
      id: "2", 
      title: "Food Delivery App",
      description: "Modern food delivery mobile app template",
      price: 2999,
      originalPrice: 4999,
      image: "/api/placeholder/400/300",
      category: "Mobile",
      rating: 4.9,
      downloads: 856,
      tags: ["Flutter", "Food", "Delivery"]
    },
    {
      id: "3",
      title: "SaaS Landing Page",
      description: "Conversion-optimized landing page template",
      price: 1999,
      originalPrice: 2999,
      image: "/api/placeholder/400/300", 
      category: "Landing",
      rating: 4.7,
      downloads: 2100,
      tags: ["HTML", "CSS", "SaaS"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Celora
              </h1>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Templates</Link>
                <Link to="/categories" className="text-purple-600 font-medium">Categories</Link>
                <Link to="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">Pricing</Link>
              </nav>
              <div className="flex items-center space-x-3">
                <Link to="/upload">
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
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
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover templates organized by platform and use case. Find exactly what you need for your next project.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-12 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search categories or templates..."
                  className="pl-12 pr-4 py-3 text-lg border-purple-200 focus:border-purple-400 rounded-xl"
                />
              </div>
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 px-6">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-sm">
                        {category.count.toLocaleString()} templates
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Popular
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 group-hover:scale-105 transition-transform">
                      Browse {category.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Trending Templates</h3>
              <p className="text-gray-600">Most popular templates this week</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-600">
                <Clock className="w-4 h-4 mr-2" />
                Recent
              </Button>
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Popular
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay Updated with New Templates
          </h3>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Get notified when we add new templates in your favorite categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-white/90 border-0 text-gray-800"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Subscribe
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

export default Categories;
