
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Eye, Upload } from "lucide-react";

const PlaceholderTemplateCard = () => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white animate-pulse">
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <Upload className="w-12 h-12 text-gray-400" />
        </div>
        
        <Badge className="absolute top-3 left-3 bg-gray-300">
          <div className="w-12 h-3 bg-gray-400 rounded"></div>
        </Badge>
        
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-gray-300"
        >
          <div className="w-8 h-3 bg-gray-400 rounded"></div>
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="w-8 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="flex gap-1">
            <Badge variant="outline" className="bg-gray-200 border-gray-300">
              <div className="w-12 h-3 bg-gray-300 rounded"></div>
            </Badge>
          </div>
        </div>
        <div className="h-5 bg-gray-300 rounded mb-2"></div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-2">
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" className="flex-1 bg-gray-200 border-gray-300" disabled>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </Button>
          <Button className="flex-1 bg-gray-300" disabled>
            <div className="w-12 h-4 bg-gray-400 rounded"></div>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlaceholderTemplateCard;
