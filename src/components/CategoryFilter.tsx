
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All Templates', icon: '🎨' },
  { id: 'Web', label: 'Web Templates', icon: '🌐' },
  { id: 'Flutter', label: 'Flutter Apps', icon: '📱' },
  { id: 'Android', label: 'Android Apps', icon: '🤖' },
  { id: 'UI Kit', label: 'UI Kits', icon: '🎯' }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`px-6 py-3 rounded-full transition-all duration-300 ${
            selectedCategory === category.id 
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg' 
              : 'bg-white hover:bg-purple-50 text-gray-700 border-purple-200 hover:border-purple-400'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="mr-2">{category.icon}</span>
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
