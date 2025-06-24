
import { useState, useEffect } from 'react';
import { Template, TemplateFilters, PaginatedTemplates } from '@/types/template';

// Mock template data for development
const mockTemplates: Template[] = [
  {
    id: "1",
    title: "Modern Dashboard UI Kit",
    description: "Complete dashboard interface with 40+ screens, dark/light mode, and responsive design",
    price: 2999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    category: "Web",
    rating: 4.8,
    downloads: 1245,
    tags: ["dashboard", "admin", "react", "tailwind"],
    isPremium: true,
    isFree: false,
    isTrending: true,
    isNew: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    userId: "author1",
    previewImages: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "2",
    title: "E-commerce Mobile App Flutter",
    description: "Complete shopping app with payment integration, product catalog, and user management",
    price: 3999,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    category: "Flutter",
    rating: 4.9,
    downloads: 892,
    tags: ["ecommerce", "flutter", "mobile", "shopping"],
    isPremium: true,
    isFree: false,
    isTrending: true,
    isNew: true,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-22",
    userId: "author2"
  },
  {
    id: "3",
    title: "Portfolio Landing Page",
    description: "Beautiful portfolio template for developers and designers with smooth animations",
    price: 0,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    category: "Web",
    rating: 4.6,
    downloads: 2156,
    tags: ["portfolio", "landing", "animation", "free"],
    isPremium: false,
    isFree: true,
    isTrending: false,
    isNew: false,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    userId: "author3"
  },
  {
    id: "4",
    title: "Android Weather App",
    description: "Modern weather application with location services and 7-day forecast",
    price: 1999,
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
    category: "Android",
    rating: 4.7,
    downloads: 543,
    tags: ["weather", "android", "kotlin", "api"],
    isPremium: true,
    isFree: false,
    isTrending: false,
    isNew: true,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-19",
    userId: "author4"
  },
  {
    id: "5",
    title: "Design System UI Kit",
    description: "Complete design system with 200+ components for Figma and React",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
    category: "UI Kit",
    rating: 4.9,
    downloads: 756,
    tags: ["design-system", "components", "figma", "react"],
    isPremium: true,
    isFree: false,
    isTrending: true,
    isNew: false,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-16",
    userId: "author5"
  },
  {
    id: "6",
    title: "Blog Template Next.js",
    description: "SEO-optimized blog template with markdown support and admin panel",
    price: 0,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    category: "Web",
    rating: 4.5,
    downloads: 1834,
    tags: ["blog", "nextjs", "markdown", "free"],
    isPremium: false,
    isFree: true,
    isTrending: false,
    isNew: false,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-10",
    userId: "author6"
  }
];

export const useTemplates = (filters?: TemplateFilters, page = 1, pageSize = 12) => {
  const [data, setData] = useState<PaginatedTemplates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // TODO: Replace with actual Supabase call
        // const { data, error } = await supabase
        //   .from('templates')
        //   .select('*')
        //   .match(filters)
        //   .order('created_at', { ascending: false })
        //   .range((page - 1) * pageSize, page * pageSize - 1);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filteredTemplates = [...mockTemplates];
        
        // Apply filters
        if (filters?.category && filters.category !== 'all') {
          filteredTemplates = filteredTemplates.filter(t => t.category === filters.category);
        }
        
        if (filters?.isPremium !== undefined) {
          filteredTemplates = filteredTemplates.filter(t => t.isPremium === filters.isPremium);
        }
        
        if (filters?.isFree !== undefined) {
          filteredTemplates = filteredTemplates.filter(t => t.isFree === filters.isFree);
        }
        
        if (filters?.isTrending) {
          filteredTemplates = filteredTemplates.filter(t => t.isTrending);
        }
        
        if (filters?.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          filteredTemplates = filteredTemplates.filter(t => 
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            t.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
        
        // Apply sorting
        if (filters?.sortBy) {
          switch (filters.sortBy) {
            case 'newest':
              filteredTemplates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
              break;
            case 'popular':
              filteredTemplates.sort((a, b) => b.downloads - a.downloads);
              break;
            case 'price_low':
              filteredTemplates.sort((a, b) => a.price - b.price);
              break;
            case 'price_high':
              filteredTemplates.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              filteredTemplates.sort((a, b) => b.rating - a.rating);
              break;
          }
        }
        
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);
        
        setData({
          templates: paginatedTemplates,
          total: filteredTemplates.length,
          page,
          pageSize,
          hasMore: endIndex < filteredTemplates.length
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch templates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [filters, page, pageSize]);

  return { data, isLoading, error };
};

export const useTrendingTemplates = (limit = 6) => {
  return useTemplates({ isTrending: true }, 1, limit);
};

export const useFeaturedTemplates = (limit = 3) => {
  return useTemplates({ sortBy: 'popular' }, 1, limit);
};

// Mock function for uploading templates
export const uploadTemplate = async (templateData: FormData) => {
  // TODO: Replace with Supabase storage + database calls
  console.log('Uploading template...', templateData);
  
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response
  return {
    success: true,
    templateId: 'new-template-' + Date.now(),
    message: 'Template uploaded successfully! It will be reviewed within 24 hours.'
  };
};
