
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, Eye, Crown, Gift, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Template } from "@/types/template";
import { useState } from "react";
import UpgradeModal from "./UpgradeModal";

interface TemplateCardProps {
  template: Template;
  onPreview?: (template: Template) => void;
}

const TemplateCard = ({ template, onPreview }: TemplateCardProps) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = template.originalPrice 
    ? Math.round(((template.originalPrice - template.price) / template.originalPrice) * 100)
    : 0;

  const handlePurchaseClick = () => {
    if (template.isPremium && !template.isFree) {
      // Check user plan here - for now, show upgrade modal
      setShowUpgradeModal(true);
    } else {
      // Handle free template download or purchase
      console.log('Download/Purchase template:', template.id);
    }
  };

  return (
    <>
      <Card 
        className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-lg overflow-hidden bg-white hover:bg-gradient-to-br hover:from-white hover:to-purple-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img 
            src={template.image} 
            alt={template.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white/90 hover:bg-white backdrop-blur-sm"
                onClick={() => onPreview?.(template)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <div className="flex items-center space-x-2 text-white text-sm font-medium">
                <Download className="w-4 h-4" />
                <span>{template.downloads.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {template.isTrending && (
              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 animate-pulse">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {template.isNew && (
              <Badge className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">
                <Sparkles className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">
                -{discount}%
              </Badge>
            )}
          </div>
          
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            <Badge 
              variant="secondary" 
              className="bg-white/90 text-gray-700 backdrop-blur-sm"
            >
              {template.category}
            </Badge>
            {template.isPremium && !template.isFree && (
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
            {template.isFree && (
              <Badge className="bg-gradient-to-r from-green-500 to-green-600">
                <Gift className="w-3 h-3 mr-1" />
                Free
              </Badge>
            )}
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{template.rating}</span>
              <span className="text-xs text-gray-500">({template.downloads})</span>
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
            {template.isFree ? (
              <span className="text-2xl font-bold text-green-600">Free</span>
            ) : (
              <>
                <span className="text-2xl font-bold text-purple-600">
                  ₹{template.price.toLocaleString()}
                </span>
                {template.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{template.originalPrice.toLocaleString()}
                  </span>
                )}
              </>
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
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              onClick={handlePurchaseClick}
            >
              {template.isFree ? 'Download' : 'Buy Now'}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        templateTitle={template.title}
      />
    </>
  );
};

export default TemplateCard;
