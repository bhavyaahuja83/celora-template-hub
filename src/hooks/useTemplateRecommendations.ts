
import { useState, useEffect } from 'react';
import { Template } from '@/types/template';
import { useMockAuth } from './useAuth';

export const useTemplateRecommendations = (currentTemplateId?: string) => {
  const [recommendations, setRecommendations] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useMockAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate API call for recommendations
      setTimeout(() => {
        // Mock recommendation logic based on user profile and current template
        const mockRecommendations: Template[] = [
          {
            id: "rec1",
            title: "Modern E-commerce Dashboard",
            description: "Complete admin dashboard for e-commerce platforms",
            price: 1299,
            image: "/api/placeholder/400/300",
            category: "Web",
            rating: 4.8,
            downloads: 1240,
            tags: ["React", "Dashboard", "E-commerce"],
            isPremium: true,
            isFree: false,
            isTrending: true,
            isNew: false,
            createdAt: "2024-12-01",
            updatedAt: "2024-12-20",
            userId: "creator1"
          },
          {
            id: "rec2", 
            title: "Flutter Food Delivery App",
            description: "Complete food delivery app with customer and rider apps",
            price: 2499,
            image: "/api/placeholder/400/300",
            category: "Flutter",
            rating: 4.9,
            downloads: 856,
            tags: ["Flutter", "Food", "Delivery", "Mobile"],
            isPremium: true,
            isFree: false,
            isTrending: false,
            isNew: true,
            createdAt: "2024-12-10",
            updatedAt: "2024-12-18",
            userId: "creator2"
          },
          {
            id: "rec3",
            title: "Portfolio Website Template",
            description: "Modern portfolio template for designers and developers",
            price: 0,
            image: "/api/placeholder/400/300", 
            category: "Web",
            rating: 4.6,
            downloads: 2150,
            tags: ["Portfolio", "Web", "Responsive"],
            isPremium: false,
            isFree: true,
            isTrending: false,
            isNew: false,
            createdAt: "2024-11-15",
            updatedAt: "2024-12-01",
            userId: "creator3"
          }
        ];

        // Filter out current template if provided
        const filteredRecommendations = currentTemplateId 
          ? mockRecommendations.filter(t => t.id !== currentTemplateId)
          : mockRecommendations;

        setRecommendations(filteredRecommendations);
        setIsLoading(false);
      }, 800);
    };

    fetchRecommendations();
  }, [currentTemplateId, user]);

  return {
    recommendations,
    isLoading
  };
};

export const useTemplatePerformance = (templateId: string) => {
  const [performance, setPerformance] = useState({
    views: 0,
    downloads: 0,
    rating: 0,
    reviews: 0,
    estimatedTimeSaved: 0,
    estimatedROI: 0,
    usedByCount: 0
  });

  useEffect(() => {
    // Simulate fetching template performance data
    const mockPerformance = {
      views: Math.floor(Math.random() * 5000) + 500,
      downloads: Math.floor(Math.random() * 1000) + 100,
      rating: 4.2 + Math.random() * 0.7,
      reviews: Math.floor(Math.random() * 50) + 10,
      estimatedTimeSaved: Math.floor(Math.random() * 10) + 2,
      estimatedROI: Math.floor(Math.random() * 50000) + 10000,
      usedByCount: Math.floor(Math.random() * 200) + 50
    };

    setPerformance(mockPerformance);
  }, [templateId]);

  return performance;
};
