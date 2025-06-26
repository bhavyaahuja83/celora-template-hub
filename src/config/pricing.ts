
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  icon: any;
  badge?: string;
  maxTemplates?: number;
  maxPremiumTemplates?: number;
  isUnlimited?: boolean;
  dailyLimit?: number;
  prioritySupport?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for exploring our platform',
    features: [
      '15 free template downloads per month',
      'Max 4 downloads per day',
      'Browse premium templates',
      'Community access',
      'Basic support'
    ],
    buttonText: 'Get Started',
    popular: false,
    icon: 'Star',
    maxTemplates: 15,
    dailyLimit: 4
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 1249,
    period: 'month',
    description: 'Best for individual developers',
    features: [
      'Unlimited free templates',
      'Access to 3 premium templates per month',
      'Priority support',
      'Early access to new templates',
      'Commercial license included',
      'Advanced filters & search'
    ],
    buttonText: 'Start Free Trial',
    popular: true,
    icon: 'Zap',
    badge: 'Most Popular',
    maxPremiumTemplates: 3,
    isUnlimited: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2499,
    period: 'month',
    description: 'Perfect for power users',
    features: [
      'Unlimited free template downloads',
      'Access to 5 premium templates per month',
      'Priority support',
      'Early access to new templates',
      'Commercial license included',
      'Advanced filters & search',
      'Template customization guide',
      'Exclusive pro-only templates'
    ],
    buttonText: 'Go Pro',
    popular: false,
    icon: 'Crown',
    isUnlimited: true,
    maxPremiumTemplates: 5
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 5999,
    period: 'month',
    description: 'For teams and agencies',
    features: [
      'Unlimited free template downloads',
      'Access to 15 premium templates per month',
      'Priority support',
      'Early access to new templates',
      'Commercial license included',
      'Advanced filters & search',
      'Template customization guide',
      'Exclusive enterprise templates',
      'Team collaboration tools',
      'Custom template requests'
    ],
    buttonText: 'Get Enterprise',
    popular: false,
    icon: 'Users',
    isUnlimited: true,
    maxPremiumTemplates: 15,
    prioritySupport: true
  },
  {
    id: 'team',
    name: 'Team',
    price: 0,
    period: 'custom',
    description: 'Perfect for development teams',
    features: [
      'Everything in Enterprise plan',
      'Team collaboration tools',
      'Custom template requests',
      'Dedicated account manager',
      'API access',
      'White-label licensing',
      'Advanced analytics',
      'Custom integrations'
    ],
    buttonText: 'Contact Sales',
    popular: false,
    icon: 'Building'
  }
];
