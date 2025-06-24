
import { useState, useEffect, createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'starter' | 'pro' | 'team';
  avatar?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: User = {
  id: "user123",
  email: "john@example.com",
  name: "John Doe",
  plan: "free",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  joinedAt: "2024-01-15"
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock authentication hook for development
export const useMockAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading auth state from localStorage
    const simulateAuthCheck = async () => {
      setIsLoading(true);
      
      // Check for stored auth token (mock)
      const storedToken = localStorage.getItem('celora_auth_token');
      
      if (storedToken === 'mock-jwt-token') {
        // Simulate API call to verify token
        setTimeout(() => {
          setUser(mockUser);
          setIsLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    simulateAuthCheck();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API login call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@celora.com' && password === 'demo123') {
          localStorage.setItem('celora_auth_token', 'mock-jwt-token');
          setUser(mockUser);
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('celora_auth_token');
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };
};
