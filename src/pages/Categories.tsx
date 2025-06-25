
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Sparkles, TrendingUp, Star } from "lucide-react";
import { Template } from "@/types/template";
import TemplateCard from "@/components/TemplateCard";
import PlaceholderTemplateCard from "@/components/PlaceholderTemplateCard";
import { useTemplates } from "@/hooks/useTemplates";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "price_low" | "price_high" | "rating">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { data, isLoading, error } = useTemplates({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    searchQuery: searchQuery || undefined,
    sortBy
  });

  const categories = [
    { id: "all", name: "All Templates", count: data?.total || 0 },
    { id: "web", name: "Web Templates", count: 45 },
    { id: "flutter", name: "Flutter Apps", count: 32 },
    { id: "android", name: "Android Apps", count: 28 },
    { id: "ui-kit", name: "UI Kits", count: 15 },
    { id: "ios", name: "iOS Apps", count: 22 },
  ];

  const filters = [
    { id: "free", name: "Free", count: 12 },
    { id: "premium", name: "Premium", count: 130 },
    { id: "trending", name: "Trending", count: 8 },
    { id: "new", name: "New", count: 15 },
  ];

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Templates</h1>
              <p className="text-gray-600">Discover amazing templates crafted by talented developers</p>
            </div>
            
            {/* Search & View Toggle */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filters.map((filter) => (
                  <div key={filter.id} className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(filter.id)}
                        onChange={() => handleFilterToggle(filter.id)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{filter.name}</span>
                    </label>
                    <Badge variant="outline">{filter.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sort */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sort By</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {data?.total || 0} Templates Found
                </h2>
                {selectedFilters.length > 0 && (
                  <div className="flex gap-2">
                    {selectedFilters.map((filter) => (
                      <Badge key={filter} variant="secondary" className="capitalize">
                        {filter}
                        <button
                          onClick={() => handleFilterToggle(filter)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Trending
              </Button>
            </div>

            {/* Templates Grid */}
            {isLoading ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {Array.from({ length: 9 }).map((_, index) => (
                  <PlaceholderTemplateCard key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Error Loading Templates</h3>
                <p className="text-gray-500">Unable to fetch templates. Please try again later.</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : !data?.templates || data.templates.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Templates Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery 
                    ? `No templates match "${searchQuery}". Try different keywords or filters.`
                    : "No templates available in this category. Check back soon for new additions!"
                  }
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {data.templates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
