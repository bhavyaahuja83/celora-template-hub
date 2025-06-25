
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
      const storedUser = localStorage.getItem('celora_user');
      
      if (storedToken && storedUser) {
        // Simulate API call to verify token
        setTimeout(() => {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            // If stored user data is invalid, clear it
            localStorage.removeItem('celora_auth_token');
            localStorage.removeItem('celora_user');
          }
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
        // For development, accept any valid email/password combination
        if (email.includes('@') && password.length >= 8) {
          const loggedInUser = {
            ...mockUser,
            email: email,
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          };
          
          localStorage.setItem('celora_auth_token', 'mock-jwt-token');
          localStorage.setItem('celora_user', JSON.stringify(loggedInUser));
          setUser(loggedInUser);
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Please enter a valid email and password (min 8 characters)'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('celora_auth_token');
    localStorage.removeItem('celora_user');
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
