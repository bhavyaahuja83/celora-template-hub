
import { useQuery } from "@tanstack/react-query";
import { Template, TemplateFilters, PaginatedTemplates } from "@/types/template";

// Mock templates data with proper structure
const mockTemplates: Template[] = [
  {
    id: "1",
    title: "Modern E-commerce Dashboard",
    description: "A comprehensive dashboard template for e-commerce platforms with analytics, inventory management, and user interfaces.",
    price: 2999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    category: "Web",
    rating: 4.8,
    downloads: 1250,
    tags: ["dashboard", "ecommerce", "analytics", "admin"],
    isPremium: true,
    isFree: false,
    isTrending: true,
    isNew: false,
    createdAt: "2024-12-20T10:00:00Z",
    updatedAt: "2024-12-20T10:00:00Z",
    userId: "user1",
    previewImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "2",
    title: "Flutter Food Delivery App",
    description: "Complete food delivery app built with Flutter. Includes user app, delivery partner app, and restaurant dashboard.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    category: "Flutter",
    rating: 4.9,
    downloads: 850,
    tags: ["food", "delivery", "mobile", "flutter"],
    isPremium: true,
    isFree: false,
    isTrending: true,
    isNew: true,
    createdAt: "2024-12-22T14:30:00Z",
    updatedAt: "2024-12-22T14:30:00Z",
    userId: "user2"
  },
  {
    id: "3",
    title: "Creative Portfolio Website",
    description: "Stunning portfolio template for designers, photographers, and creative professionals. Fully responsive and customizable.",
    price: 0,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    category: "Web",
    rating: 4.6,
    downloads: 2100,
    tags: ["portfolio", "creative", "photography", "design"],
    isPremium: false,
    isFree: true,
    isTrending: false,
    isNew: false,
    createdAt: "2024-12-18T09:15:00Z",
    updatedAt: "2024-12-18T09:15:00Z",
    userId: "user3"
  },
  {
    id: "4",
    title: "Android Chat Application",
    description: "Feature-rich chat application for Android with real-time messaging, media sharing, and group conversations.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    category: "Android",
    rating: 4.7,
    downloads: 680,
    tags: ["chat", "messaging", "android", "realtime"],
    isPremium: true,
    isFree: false,
    isTrending: false,
    isNew: true,
    createdAt: "2024-12-21T16:45:00Z",
    updatedAt: "2024-12-21T16:45:00Z",
    userId: "user4"
  },
  {
    id: "5",
    title: "Material Design UI Kit",
    description: "Comprehensive UI kit with 100+ components following Material Design guidelines. Perfect for any project.",
    price: 1999,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
    category: "UI Kit",
    rating: 4.9,
    downloads: 1580,
    tags: ["ui kit", "material design", "components", "design system"],
    isPremium: true,
    isFree: false,
    isTrending: true,
    isNew: false,
    createdAt: "2024-12-19T11:20:00Z",
    updatedAt: "2024-12-19T11:20:00Z",
    userId: "user5"
  },
  {
    id: "6",
    title: "Startup Landing Page",
    description: "High-converting landing page template for startups and SaaS companies. Includes pricing, testimonials, and CTAs.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    category: "Web",
    rating: 4.5,
    downloads: 920,
    tags: ["landing page", "startup", "saas", "conversion"],
    isPremium: true,
    isFree: false,
    isTrending: false,
    isNew: false,
    createdAt: "2024-12-17T13:10:00Z",
    updatedAt: "2024-12-17T13:10:00Z",
    userId: "user6"
  }
];

// Mock API function
const fetchTemplates = async (filters: TemplateFilters = {}): Promise<PaginatedTemplates> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let filteredTemplates = [...mockTemplates];

  // Apply category filter
  if (filters.category && filters.category !== "all") {
    filteredTemplates = filteredTemplates.filter(
      template => template.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  // Apply search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredTemplates = filteredTemplates.filter(template =>
      template.title.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply premium/free filter
  if (filters.isPremium !== undefined) {
    filteredTemplates = filteredTemplates.filter(template => template.isPremium === filters.isPremium);
  }
  if (filters.isFree !== undefined) {
    filteredTemplates = filteredTemplates.filter(template => template.isFree === filters.isFree);
  }

  // Apply trending filter
  if (filters.isTrending) {
    filteredTemplates = filteredTemplates.filter(template => template.isTrending);
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "newest":
        filteredTemplates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "popular":
        filteredTemplates.sort((a, b) => b.downloads - a.downloads);
        break;
      case "rating":
        filteredTemplates.sort((a, b) => b.rating - a.rating);
        break;
      case "price_low":
        filteredTemplates.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filteredTemplates.sort((a, b) => b.price - a.price);
        break;
    }
  }

  return {
    templates: filteredTemplates,
    total: filteredTemplates.length,
    page: 1,
    pageSize: filteredTemplates.length,
    hasMore: false
  };
};

export const useTemplates = (filters: TemplateFilters = {}) => {
  return useQuery({
    queryKey: ["templates", filters],
    queryFn: () => fetchTemplates(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedTemplates = (limit: number = 6) => {
  return useQuery({
    queryKey: ["templates", "featured", limit],
    queryFn: async () => {
      const result = await fetchTemplates({ isTrending: true });
      return {
        ...result,
        templates: result.templates.slice(0, limit)
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTrendingTemplates = (limit: number = 8) => {
  return useQuery({
    queryKey: ["templates", "trending", limit],
    queryFn: async () => {
      const result = await fetchTemplates({ isTrending: true });
      return {
        ...result,
        templates: result.templates.slice(0, limit)
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
