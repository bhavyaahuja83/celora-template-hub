
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
  isUnlimited?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for exploring our platform',
    features: [
      'Full access to all free templates',
      'Browse premium templates',
      'Community access',
      'Basic support',
      'Can purchase premium templates individually'
    ],
    buttonText: 'Get Started',
    popular: false,
    icon: 'Star'
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 500,
    period: 'month',
    description: 'Best for individual developers',
    features: [
      'Access to 4 premium templates per month',
      'All free templates included',
      'Priority support',
      'Early access to new templates',
      'Commercial license included',
      'Advanced filters & search'
    ],
    buttonText: 'Start Free Trial',
    popular: true,
    icon: 'Zap',
    badge: 'Most Popular',
    maxTemplates: 4
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2399,
    period: 'month',
    description: 'Perfect for power users',
    features: [
      'Unlimited premium template downloads',
      'All free templates included',
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
    isUnlimited: true
  },
  {
    id: 'team',
    name: 'Team',
    price: 0,
    period: 'custom',
    description: 'Perfect for development teams',
    features: [
      'Everything in Pro plan',
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
    icon: 'Users'
  }
];
