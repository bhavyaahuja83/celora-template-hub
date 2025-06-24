
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, TrendingUp } from "lucide-react";
import { Template } from "@/types/template";
import { formatPrice } from "@/utils/currency";
import PlaceholderTemplateCard from "./PlaceholderTemplateCard";

interface FeaturedSectionProps {
  templates: Template[];
  isLoading?: boolean;
}

const FeaturedSection = ({ templates, isLoading = false }: FeaturedSectionProps) => {
  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-300 mr-2" />
                <h2 className="text-4xl font-bold text-white">Featured Templates</h2>
              </div>
              <p className="text-purple-200 text-lg">
                Hand-picked premium templates that developers love
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <PlaceholderTemplateCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-300 mr-2" />
              <h2 className="text-4xl font-bold text-white">Featured Templates</h2>
            </div>
            <p className="text-purple-200 text-lg">
              Hand-picked premium templates that developers love
            </p>
          </div>
        </div>
        
        {templates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Featured Templates Yet</h3>
            <p className="text-purple-200">Check back soon for amazing templates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <Card key={template.id} className="group bg-white/95 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{template.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">{template.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                      <Badge className="bg-purple-600 hover:bg-purple-700">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                      #1 Bestseller
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-purple-200 text-purple-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-600">
                        {formatPrice(template.price)}
                      </span>
                      {template.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(template.originalPrice)}
                        </span>
                      )}
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                      Get Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-purple-300 text-white hover:bg-purple-700 bg-transparent" asChild>
            <a href="/categories">View All Featured Templates</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
