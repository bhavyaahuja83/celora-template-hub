
import { useState, useEffect, createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'buyer' | 'seller' | 'undecided';
  plan: 'free' | 'starter' | 'pro' | 'enterprise' | 'team';
  avatar?: string;
  joinedAt: string;
  mobile?: string;
  isVerified: boolean;
  // Seller specific fields
  panNumber?: string;
  address?: string;
  bankDetails?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };
  isSellerVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (emailOrMobile: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userType: 'buyer' | 'seller' | 'undecided', mobile?: string) => Promise<void>;
  registerSeller: (sellerData: SellerRegistrationData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserPlan: (planId: string) => void;
}

export interface SellerRegistrationData {
  email: string;
  password: string;
  name: string;
  mobile: string;
  panNumber: string;
  address: string;
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: User = {
  id: "user123",
  email: "john@example.com",
  name: "John Doe",
  userType: "seller",
  plan: "free",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  joinedAt: "2024-01-15",
  isVerified: true,
  isSellerVerified: false
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Password validation
const validatePassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= 8 && hasUpperCase && hasNumber && hasSymbol;
};

// Email validation
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Mobile validation (with country code)
const validateMobile = (mobile: string): boolean => {
  return /^\+\d{1,4}\d{10}$/.test(mobile);
};

// Mock authentication hook for development
export const useMockAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading auth state from localStorage
    const simulateAuthCheck = async () => {
      setIsLoading(true);
      
      const storedToken = localStorage.getItem('celora_auth_token');
      const storedUser = localStorage.getItem('celora_user');
      
      if (storedToken && storedUser) {
        setTimeout(() => {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
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

  const login = async (emailOrMobile: string, password: string) => {
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Validate input format
        const isEmail = validateEmail(emailOrMobile);
        const isMobile = validateMobile(emailOrMobile);
        
        if (!isEmail && !isMobile) {
          setIsLoading(false);
          reject(new Error('Please enter a valid email or mobile number with country code'));
          return;
        }
        
        if (!validatePassword(password)) {
          setIsLoading(false);
          reject(new Error('Password must contain at least one uppercase letter, one number, and one symbol'));
          return;
        }

        const loggedInUser = {
          ...mockUser,
          email: isEmail ? emailOrMobile : mockUser.email,
          mobile: isMobile ? emailOrMobile : undefined,
          name: isEmail ? emailOrMobile.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : mockUser.name
        };
        
        localStorage.setItem('celora_auth_token', 'mock-jwt-token');
        localStorage.setItem('celora_user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const register = async (email: string, password: string, name: string, userType: 'buyer' | 'seller' | 'undecided', mobile?: string) => {
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!validateEmail(email)) {
          setIsLoading(false);
          reject(new Error('Please enter a valid email address'));
          return;
        }
        
        if (!validatePassword(password)) {
          setIsLoading(false);
          reject(new Error('Password must contain at least one uppercase letter, one number, and one symbol'));
          return;
        }
        
        if (mobile && !validateMobile(mobile)) {
          setIsLoading(false);
          reject(new Error('Please enter a valid mobile number with country code'));
          return;
        }
        
        if (!name.trim()) {
          setIsLoading(false);
          reject(new Error('Please provide a valid name'));
          return;
        }

        const newUser: User = {
          id: `user_${Date.now()}`,
          email,
          name,
          userType,
          plan: 'free',
          joinedAt: new Date().toISOString(),
          mobile,
          isVerified: false,
          isSellerVerified: userType === 'seller' ? false : undefined
        };
        
        localStorage.setItem('celora_auth_token', 'mock-jwt-token');
        localStorage.setItem('celora_user', JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const registerSeller = async (sellerData: SellerRegistrationData) => {
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Validate all seller data
        if (!validateEmail(sellerData.email)) {
          setIsLoading(false);
          reject(new Error('Please enter a valid email address'));
          return;
        }
        
        if (!validatePassword(sellerData.password)) {
          setIsLoading(false);
          reject(new Error('Password must contain at least one uppercase letter, one number, and one symbol'));
          return;
        }
        
        if (!validateMobile(sellerData.mobile)) {
          setIsLoading(false);
          reject(new Error('Please enter a valid mobile number with country code'));
          return;
        }
        
        // Validate PAN (basic format check)
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(sellerData.panNumber)) {
          setIsLoading(false);
          reject(new Error('Please enter a valid PAN number'));
          return;
        }
        
        // Validate IFSC code
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(sellerData.bankDetails.ifscCode)) {
          setIsLoading(false);
          reject(new Error('Please enter a valid IFSC code'));
          return;
        }

        const newSeller: User = {
          id: `seller_${Date.now()}`,
          email: sellerData.email,
          name: sellerData.name,
          userType: 'seller',
          plan: 'free',
          joinedAt: new Date().toISOString(),
          mobile: sellerData.mobile,
          panNumber: sellerData.panNumber,
          address: sellerData.address,
          bankDetails: sellerData.bankDetails,
          isVerified: false,
          isSellerVerified: false
        };
        
        localStorage.setItem('celora_auth_token', 'mock-jwt-token');
        localStorage.setItem('celora_user', JSON.stringify(newSeller));
        setUser(newSeller);
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  const updateUserPlan = (planId: string) => {
    if (user) {
      const updatedUser = { ...user, plan: planId as User['plan'] };
      setUser(updatedUser);
      localStorage.setItem('celora_user', JSON.stringify(updatedUser));
    }
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
    register,
    registerSeller,
    logout,
    isAuthenticated: !!user,
    updateUserPlan
  };
};
