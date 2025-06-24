
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Globe, Monitor, Tablet, Code, Palette } from "lucide-react";

const CategoryFilter = () => {
  const categories = [
    { id: "all", name: "All Templates", icon: Globe, count: 12500, color: "bg-purple-100 text-purple-700" },
    { id: "web", name: "Web Apps", icon: Monitor, count: 5200, color: "bg-blue-100 text-blue-700" },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone, count: 3800, color: "bg-green-100 text-green-700" },
    { id: "desktop", name: "Desktop Apps", icon: Tablet, count: 1200, color: "bg-yellow-100 text-yellow-700" },
    { id: "components", name: "Components", icon: Code, count: 2100, color: "bg-red-100 text-red-700" },
    { id: "ui-kits", name: "UI Kits", icon: Palette, count: 450, color: "bg-indigo-100 text-indigo-700" }
  ];

  return (
    <section className="py-8 px-4 bg-white border-b border-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Browse by Category</h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant="outline"
                className="group h-auto flex-col p-6 border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 min-w-[140px]"
              >
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-800 group-hover:text-purple-600 mb-1">
                  {category.name}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {category.count.toLocaleString()}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
