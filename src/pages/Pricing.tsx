
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap, Crown, Users, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useMockAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { isAuthenticated, user, updateUserPlan } = useMockAuth();
  const { toast } = useToast();

  const plans = [
    {
      id: "free",
      name: "Free",
      icon: Star,
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for exploring our platform",
      features: [
        "15 free template downloads per month",
        "Max 4 downloads per day",
        "Browse premium templates",
        "Community support",
        "Can purchase premium templates individually"
      ],
      limitations: [
        "Limited downloads",
        "No premium templates included",
        "Basic support only"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      id: "starter",
      name: "Starter",
      icon: Zap,
      monthlyPrice: 1249,
      annualPrice: 12490, // ~16% discount (2 months free)
      description: "Best for individual developers",
      features: [
        "Unlimited free template downloads",
        "3 premium templates per month",
        "Priority support",
        "Early access to new templates",
        "Commercial license included",
        "Advanced filters & search"
      ],
      limitations: [],
      cta: "Start Premium",
      popular: true
    },
    {
      id: "pro",
      name: "Pro",
      icon: Crown,
      monthlyPrice: 2499,
      annualPrice: 24990, // ~16% discount (2 months free)
      description: "Perfect for power users",
      features: [
        "Unlimited free template downloads",
        "5 premium templates per month",
        "Priority support",
        "Early access to new templates",
        "Commercial license included",
        "Advanced filters & search",
        "Template customization guide",
        "Exclusive pro-only templates"
      ],
      limitations: [],
      cta: "Go Pro",
      popular: false
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Users,
      monthlyPrice: 5999,
      annualPrice: 59990, // ~16% discount (2 months free)
      description: "For teams and agencies",
      features: [
        "Unlimited free template downloads",
        "15 premium templates per month",
        "Priority support",
        "Early access to new templates",
        "Commercial license included",
        "Advanced filters & search",
        "Template customization guide",
        "Exclusive enterprise templates",
        "Team collaboration tools",
        "Custom template requests"
      ],
      limitations: [],
      cta: "Get Enterprise",
      popular: false
    },
    {
      id: "team",
      name: "Team",
      icon: Building,
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for development teams",
      features: [
        "Everything in Enterprise plan",
        "Team collaboration tools",
        "Custom template requests", 
        "Dedicated account manager",
        "API access",
        "White-label licensing",
        "Advanced analytics",
        "Custom integrations"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      isCustom: true
    }
  ];

  const handleSubscribe = (planId: string, price: number) => {
    if (planId === "team") {
      // Open contact modal or redirect to contact page
      toast({
        title: "Contact Sales",
        description: "Our team will get in touch with you for custom pricing.",
      });
      return;
    }

    if (planId === "free") {
      if (isAuthenticated) {
        updateUserPlan("free");
        toast({
          title: "Plan Updated",
          description: "You're now on the Free plan!",
        });
      } else {
        toast({
          title: "Authentication Required",
          description: "Please log in to select a plan.",
          variant: "destructive"
        });
      }
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive"
      });
      return;
    }

    // For paid plans, simulate subscription process
    updateUserPlan(planId);
    toast({
      title: "Subscription Started!",
      description: `Welcome to ${plans.find(p => p.id === planId)?.name} plan! Payment integration coming soon.`,
    });
  };

  const getDiscountPercentage = () => {
    // Calculate average discount for annual plans (excluding free and custom plans)
    const paidPlans = plans.filter(plan => plan.monthlyPrice > 0 && !plan.isCustom);
    if (paidPlans.length === 0) return 0;
    
    const totalMonthlyAnnual = paidPlans.reduce((sum, plan) => sum + plan.monthlyPrice * 12, 0);
    const totalAnnual = paidPlans.reduce((sum, plan) => sum + plan.annualPrice, 0);
    
    if (totalMonthlyAnnual === 0) return 0;
    
    const discount = ((totalMonthlyAnnual - totalAnnual) / totalMonthlyAnnual) * 100;
    return Math.round(discount);
  };

  const getCurrentPlan = (planId: string) => {
    return user?.plan === planId;
  };

  return (
    <Layout className="bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Access thousands of premium templates with flexible pricing that scales with your needs
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && getDiscountPercentage() > 0 && (
              <Badge className="bg-green-100 text-green-800 ml-2">
                Save {getDiscountPercentage()}%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const monthlyPrice = isAnnual && plan.annualPrice > 0 ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice;
            const isCurrentPlan = getCurrentPlan(plan.id);
            const showPrice = !plan.isCustom;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative ${
                  plan.popular 
                    ? 'border-purple-500 border-2 shadow-xl scale-105' 
                    : isCurrentPlan
                    ? 'border-green-500 border-2 shadow-lg'
                    : 'border-gray-200 shadow-lg'
                } ${plan.id === 'team' ? 'lg:col-span-1' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white px-4 py-1">
                      Current Plan
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                    plan.popular ? 'bg-purple-100' : isCurrentPlan ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      plan.popular ? 'text-purple-600' : isCurrentPlan ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <CardTitle className="text-xl xl:text-2xl">{plan.name}</CardTitle>
                  
                  {showPrice && (
                    <div className="mt-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-2xl xl:text-3xl font-bold">
                          ₹{monthlyPrice.toLocaleString()}
                        </span>
                        <span className="text-gray-500 ml-2 text-sm">/month</span>
                      </div>
                      {isAnnual && monthlyPrice > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Billed annually (₹{price.toLocaleString()})
                        </div>
                      )}
                    </div>
                  )}
                  
                  {plan.isCustom && (
                    <div className="mt-4">
                      <div className="text-2xl xl:text-3xl font-bold text-purple-600">
                        Custom
                      </div>
                      <div className="text-sm text-gray-500">Contact for pricing</div>
                    </div>
                  )}
                  
                  <p className="text-gray-600 mt-4 text-sm">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-xs xl:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : isCurrentPlan
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    onClick={() => handleSubscribe(plan.id, price)}
                    disabled={isCurrentPlan && plan.id !== 'team'}
                  >
                    {isCurrentPlan && plan.id !== 'team' ? 'Current Plan' : plan.cta}
                  </Button>
                  
                  {!isAuthenticated && (
                    <p className="text-xs text-center text-gray-500">
                      <Link to="/auth" className="text-purple-600 hover:underline">
                        Sign up
                      </Link> to get started
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's included in the license?</h3>
              <p className="text-gray-600 text-sm">
                All plans include a standard license for personal and commercial use. Higher plans include extended licensing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm">
                We offer a 30-day money-back guarantee for all paid plans. No questions asked.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does the download limit work?</h3>
              <p className="text-gray-600 text-sm">
                Free users get 15 downloads per month (max 4 per day). Paid plans include unlimited free templates plus premium access.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers and designers using our premium templates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/categories">Browse Templates</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700" asChild>
              <Link to="/auth">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
