
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp, Crown, Gift } from "lucide-react";
import { TemplateFilters } from "@/types/template";

interface TemplateFiltersProps {
  filters: TemplateFilters;
  onFiltersChange: (filters: TemplateFilters) => void;
  templateCount?: number;
}

const TemplateFiltersComponent = ({ filters, onFiltersChange, templateCount = 0 }: TemplateFiltersProps) => {
  const categories = [
    { id: 'all', name: 'All Templates', count: templateCount },
    { id: 'Web', name: 'Web Templates', count: 0 },
    { id: 'Flutter', name: 'Flutter Templates', count: 0 },
    { id: 'Android', name: 'Android Templates', count: 0 },
    { id: 'UI Kit', name: 'UI Kits', count: 0 }
  ];

  const handleFilterChange = (key: keyof TemplateFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search templates, frameworks, or tags..."
          className="pl-10 pr-4 py-3 border-purple-200 focus:border-purple-400 rounded-xl"
          value={filters.searchQuery || ''}
          onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant={filters.isTrending ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('isTrending', !filters.isTrending)}
          className="gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Trending
        </Button>
        <Button
          variant={filters.isPremium === true ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('isPremium', filters.isPremium === true ? undefined : true)}
          className="gap-2"
        >
          <Crown className="w-4 h-4" />
          Premium
        </Button>
        <Button
          variant={filters.isFree === true ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('isFree', filters.isFree === true ? undefined : true)}
          className="gap-2"
        >
          <Gift className="w-4 h-4" />
          Free
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filters.category === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('category', category.id === 'all' ? undefined : category.id)}
              className="gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <Select value={filters.sortBy || 'newest'} onValueChange={(value) => handleFilterChange('sortBy', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TemplateFiltersComponent;
