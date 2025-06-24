
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Download, 
  Eye, 
  Heart, 
  Share2, 
  ShoppingCart, 
  User, 
  Calendar,
  Code,
  Palette,
  Monitor,
  Smartphone,
  Check
} from "lucide-react";
import { toast } from "sonner";

const TemplateDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock template data - in real app, this would come from API
  const template = {
    id: id || "1",
    title: "Modern Dashboard UI Kit",
    description: "A comprehensive dashboard template with 50+ components, perfect for admin panels, analytics dashboards, and data visualization applications. Built with modern React patterns and fully responsive design.",
    longDescription: "This premium dashboard template provides everything you need to build professional admin interfaces. It includes a complete component library, multiple layout options, and extensive customization possibilities. The template follows modern design principles and includes dark/light mode support, advanced charts, and interactive components.",
    price: 2999,
    originalPrice: 4999,
    category: "Web Applications",
    rating: 4.8,
    reviewCount: 245,
    downloads: 1240,
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600", 
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    tags: ["React", "Dashboard", "Admin", "TypeScript", "Tailwind", "Responsive"],
    features: [
      "50+ Premium Components",
      "Dark & Light Mode",
      "Fully Responsive Design", 
      "TypeScript Support",
      "Advanced Charts & Graphs",
      "Authentication Pages",
      "Form Components",
      "Data Tables",
      "Clean Code Structure",
      "Documentation Included"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "React Router"],
    author: {
      name: "Design Studio Pro",
      avatar: "/api/placeholder/40/40",
      rating: 4.9,
      templates: 23
    },
    createdAt: "2024-12-15",
    lastUpdated: "2024-12-20"
  };

  const handlePurchase = () => {
    toast.success("Redirecting to payment...");
    // Here you would integrate with Razorpay or your payment system
  };

  const handleFavorite = () => {
    toast.success("Added to favorites!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

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
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleFavorite}>
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="relative">
                <img 
                  src={template.images[currentImageIndex]} 
                  alt={template.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                  {template.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-12 rounded border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-white shadow-lg' 
                          : 'border-white/50 hover:border-white'
                      }`}
                    >
                      <img 
                        src={template.images[index]} 
                        alt=""
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Template Info */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-purple-100 text-purple-700">{template.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{template.rating}</span>
                        <span className="text-gray-500">({template.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold mb-2">{template.title}</CardTitle>
                    <p className="text-gray-600 text-lg">{template.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">by {template.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{template.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Updated {template.lastUpdated}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {template.longDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-purple-200 text-purple-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tech" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-3">
                      {template.technologies.map((tech, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
                          <Code className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardContent className="pt-6">
                    <div className="text-center py-12 text-gray-500">
                      <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Reviews coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="shadow-lg border-0 sticky top-24">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-purple-600">
                      ₹{template.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{template.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Badge className="bg-red-100 text-red-700">
                    Save ₹{(template.originalPrice - template.price).toLocaleString()}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handlePurchase}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-3"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                  
                  <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                    <Eye className="w-4 h-4 mr-2" />
                    Live Preview
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">License</span>
                    <span className="font-medium">Commercial Use</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Support</span>
                    <span className="font-medium">6 Months</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Updates</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Card */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={template.author.avatar} 
                    alt={template.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{template.author.name}</h4>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{template.author.rating}</span>
                      <span>•</span>
                      <span>{template.author.templates} templates</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
