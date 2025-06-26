
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Users, Star, Download, Code, Palette, Smartphone, Clock, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryFilter from "@/components/CategoryFilter";
import FeaturedSection from "@/components/FeaturedSection";
import TemplateCard from "@/components/TemplateCard";
import { useFeaturedTemplates, useTrendingTemplates } from "@/hooks/useTemplates";
import Layout from "@/components/Layout";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: featuredTemplates, isLoading: featuredLoading } = useFeaturedTemplates(3);
  const { data: trendingTemplates, isLoading: trendingLoading } = useTrendingTemplates(6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    window.location.href = `/categories?search=${encodeURIComponent(searchQuery)}`;
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      content: "Celora saved me weeks of development time. The templates are incredibly well-designed and easy to customize.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Alex Rodriguez", 
      role: "Flutter Developer",
      content: "As a seller, I've earned over ₹50,000 in just 3 months. The platform is amazing for creators!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      role: "Startup Founder", 
      content: "Found the perfect e-commerce template that helped us launch our MVP in just 2 weeks.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Browse Templates",
      description: "Explore thousands of high-quality templates across web, mobile, and desktop platforms",
      icon: <Search className="w-8 h-8 text-purple-600" />
    },
    {
      step: 2,
      title: "Purchase & Download",
      description: "Buy templates instantly with secure payments and download immediately",
      icon: <Download className="w-8 h-8 text-purple-600" />
    },
    {
      step: 3,
      title: "Customize & Launch",
      description: "Edit the template to match your brand and launch your project quickly",
      icon: <Code className="w-8 h-8 text-purple-600" />
    }
  ];

  const roiStats = [
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      label: "Average Time Saved",
      value: "40+ hours",
      description: "Per project implementation"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      label: "Average Cost Saved",
      value: "₹25,000+",
      description: "Compared to custom development"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      label: "Quality Guarantee",
      value: "100%",
      description: "Professional-grade templates"
    }
  ];

  return (
    <Layout className="bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
              Premium Templates
              <br />
              <span className="text-4xl md:text-6xl">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in-right">
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
                className="rounded-full px-8 bg-purple-600 hover:bg-purple-700 shadow-lg hover:scale-105 transition-transform"
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slide-in-right">
            <div className="text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-gray-600">Templates</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-purple-600 mb-2">50k+</div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-purple-600 mb-2">5k+</div>
              <div className="text-gray-600">Developers</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Stats Section */}
      <section className="py-16 px-4 bg-white/70">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose Celora?</h2>
            <p className="text-xl text-gray-600">Save time, money, and effort with our premium templates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {roiStats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="font-medium text-gray-700 mb-1">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            ))}
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
            <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-in">
              🔥 Trending This Week
            </h2>
            <p className="text-xl text-gray-600 animate-slide-in-right">
              Most popular templates chosen by our community
            </p>
          </div>

          {trendingLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingTemplates?.templates && trendingTemplates.templates.length > 0 ? (
                trendingTemplates.templates.map((template, index) => (
                  <div key={template.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <TemplateCard template={template} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No Trending Templates Yet</h3>
                  <p className="text-gray-600">Check back soon for the hottest templates!</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8 hover:scale-105 transition-transform" asChild>
              <Link to="/categories">View All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-in">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-in-right">
              Get started with premium templates in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-sm text-purple-600 font-medium mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-in">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 animate-slide-in-right">
              Join thousands of satisfied developers and designers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Celora</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're building the world's largest marketplace for premium development templates. 
              Our mission is to help developers ship faster while empowering creators to monetize their skills.
            </p>
            <Button size="lg" variant="outline" className="hover:scale-105 transition-transform" asChild>
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-slide-in-right">
            Join thousands of developers who trust Celora for their template needs. 
            Start your next project today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" variant="secondary" className="px-8 hover:scale-105 transition-transform" asChild>
              <Link to="/categories">Browse Templates</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-purple-700 hover:scale-105 transition-all" asChild>
              <Link to="/creator-info">Sell Your Templates</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
