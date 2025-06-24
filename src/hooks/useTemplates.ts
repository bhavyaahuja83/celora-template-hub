
import { useState, useEffect } from 'react';
import { Template, TemplateFilters, PaginatedTemplates } from '@/types/template';

// Mock data for development - replace with actual API calls later
const mockTemplates: Template[] = [
  // This will be empty initially as per requirements
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
        // TODO: Replace with actual Supabase/API call
        // const response = await supabase
        //   .from('templates')
        //   .select('*')
        //   .match(filters)
        //   .order('created_at', { ascending: false })
        //   .range((page - 1) * pageSize, page * pageSize - 1);
        
        // Mock response for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        
        let filteredTemplates = [...mockTemplates];
        
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
