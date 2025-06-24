
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  downloads: number;
  tags: string[];
}

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const discount = template.originalPrice 
    ? Math.round(((template.originalPrice - template.price) / template.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white">
      <div className="relative overflow-hidden">
        <img 
          src={template.image} 
          alt={template.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <div className="flex items-center space-x-2 text-white text-sm">
              <Download className="w-4 h-4" />
              <span>{template.downloads.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            -{discount}%
          </Badge>
        )}
        
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-white/90 text-gray-700"
        >
          {template.category}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{template.rating}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-600">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-purple-600 transition-colors">
          {template.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 pb-2">
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {template.description}
        </p>
        
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-purple-600">
            ₹{template.price.toLocaleString()}
          </span>
          {template.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{template.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Link to={`/templates/${template.id}`} className="flex-1">
            <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
              View Details
            </Button>
          </Link>
          <Button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
