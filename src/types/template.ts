
export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'Web' | 'Flutter' | 'Android' | 'UI Kit';
  rating: number;
  downloads: number;
  tags: string[];
  isPremium: boolean;
  isFree: boolean;
  isTrending: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  fileUrl?: string;
  previewImages?: string[];
}

export interface TemplateFilters {
  category?: string;
  isPremium?: boolean;
  isFree?: boolean;
  isTrending?: boolean;
  searchQuery?: string;
  sortBy?: 'newest' | 'popular' | 'price_low' | 'price_high' | 'rating';
}

export interface PaginatedTemplates {
  templates: Template[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
