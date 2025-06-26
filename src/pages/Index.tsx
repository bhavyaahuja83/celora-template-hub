
import Layout from "@/components/Layout";
import FeaturedSection from "@/components/FeaturedSection";
import CategoryFilter from "@/components/CategoryFilter";
import TemplateCard from "@/components/TemplateCard";
import PlaceholderTemplateCard from "@/components/PlaceholderTemplateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Zap, Award, Users, TrendingUp, Star, Download, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const mockTemplates = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Template ${i + 1}`,
    description: "Professional template for modern projects",
    price: 49 + (i * 10),
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop`,
    category: ["React", "Vue", "Angular"][i % 3],
    downloads: 1000 + (i * 100),
    rating: 4.5 + (i * 0.1),
    timesSaved: 500 + (i * 50)
  }));

  const stats = [
    { icon: Users, label: "Active Users", value: "50K+", color: "text-blue-600" },
    { icon: Download, label: "Downloads", value: "1M+", color: "text-green-600" },
    { icon: Star, label: "Templates", value: "25K+", color: "text-yellow-600" },
    { icon: Award, label: "Creators", value: "5K+", color: "text-purple-600" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-purple-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Premium Templates
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                for Modern Developers
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover thousands of professionally crafted templates to accelerate your projects. 
                Save time, boost productivity, and create stunning applications.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-scale-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search templates, frameworks, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-purple-200 focus:border-purple-500 shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                asChild
              >
                <Link to="/categories">
                  <Zap className="mr-2 h-5 w-5" />
                  Browse Templates
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg rounded-xl hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/auth">
                  Start Selling
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FeaturedSection />
        </div>
      </section>

      {/* Freshly Added Templates */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <Clock className="inline mr-2 h-8 w-8 text-purple-600" />
              Freshly Added
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Latest templates from our community of talented creators
            </p>
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {mockTemplates.map((template, index) => (
              <div 
                key={template.id} 
                className="animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TemplateCard template={template} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="hover:bg-purple-50 hover:border-purple-600 hover:text-purple-600 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/categories">
                View All Templates
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose Celora Templates?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center space-y-4 hover-scale">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Save 40+ Hours</h3>
                <p className="text-purple-100">Skip the boilerplate and focus on what matters</p>
              </div>
              
              <div className="text-center space-y-4 hover-scale">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Boost ROI by 300%</h3>
                <p className="text-purple-100">Deliver projects faster with proven templates</p>
              </div>
              
              <div className="text-center space-y-4 hover-scale">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Professional Quality</h3>
                <p className="text-purple-100">Vetted by experts, loved by developers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
