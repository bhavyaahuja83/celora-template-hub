
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Eye, Heart } from "lucide-react";
import { Template } from "@/types/template";
import { formatPrice } from "@/utils/currency";
import { useState } from "react";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white">
      <div className="relative overflow-hidden">
        <img 
          src={template.image} 
          alt={template.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Button size="sm" variant="secondary" className="backdrop-blur-sm">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>
        </div>
        
        <Badge className={`absolute top-3 left-3 ${
          template.isFree ? 'bg-green-500' : 'bg-purple-500'
        }`}>
          {template.isFree ? 'Free' : 'Premium'}
        </Badge>
        
        {template.isTrending && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-orange-100 text-orange-800 border-orange-200"
          >
            🔥 Trending
          </Badge>
        )}

        {/* Like button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{template.rating}</span>
            <span className="text-xs text-gray-500">({template.downloads})</span>
          </div>
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs">
              {template.category}
            </Badge>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 leading-tight hover:text-purple-600 transition-colors cursor-pointer">
          {template.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0 pb-2">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {template.description}
        </p>
        
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
        
        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Download className="w-3 h-3" />
            <span>{template.downloads}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{Math.floor(template.downloads * 3.2)}k views</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" className="flex-1" size="sm">
            Preview
          </Button>
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700" size="sm">
            {template.isFree ? 'Download' : 'Buy Now'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
