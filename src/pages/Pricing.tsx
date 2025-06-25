
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useMockAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { isAuthenticated } = useMockAuth();
  const { toast } = useToast();

  const plans = [
    {
      name: "Free",
      icon: Star,
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for trying out our platform",
      features: [
        "5 template downloads per month",
        "Basic templates only",
        "Community support",
        "Standard license"
      ],
      limitations: [
        "No premium templates",
        "Limited downloads",
        "No priority support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Premium",
      icon: Zap,
      monthlyPrice: 999,
      annualPrice: 9990, // 2 months free
      description: "Best for individuals and small teams",
      features: [
        "50 template downloads per month",
        "Access to all templates",
        "Priority support",
        "Extended license",
        "Early access to new templates",
        "Exclusive premium content"
      ],
      limitations: [],
      cta: "Start Premium",
      popular: true
    },
    {
      name: "Unlimited",
      icon: Crown,
      monthlyPrice: 1999,
      annualPrice: 19990, // 2 months free
      description: "For agencies and power users",
      features: [
        "Unlimited downloads",
        "All templates + UI kits",
        "24/7 priority support",
        "Commercial license",
        "Custom template requests",
        "White-label licensing",
        "Team collaboration tools",
        "Analytics dashboard"
      ],
      limitations: [],
      cta: "Go Unlimited",
      popular: false
    }
  ];

  const handleSubscribe = (planName: string, price: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Coming Soon!",
      description: `${planName} plan subscription will be available soon. We'll notify you when it's ready.`,
    });
  };

  const getDiscountPercentage = () => {
    // Calculate average discount for annual plans
    const monthlyTotal = plans.reduce((sum, plan) => sum + plan.monthlyPrice * 12, 0);
    const annualTotal = plans.reduce((sum, plan) => sum + plan.annualPrice, 0);
    const discount = ((monthlyTotal - annualTotal) / monthlyTotal) * 100;
    return Math.round(discount);
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
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 ml-2">
                Save {getDiscountPercentage()}%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const monthlyPrice = isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice;
            
            return (
              <Card 
                key={plan.name} 
                className={`relative ${
                  plan.popular 
                    ? 'border-purple-500 border-2 shadow-xl scale-105' 
                    : 'border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                    plan.popular ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      plan.popular ? 'text-purple-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">₹{monthlyPrice.toLocaleString()}</span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    {isAnnual && monthlyPrice > 0 && (
                      <div className="text-sm text-gray-500 mt-1">
                        Billed annually (₹{price.toLocaleString()})
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mt-4">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    onClick={() => handleSubscribe(plan.name, price)}
                  >
                    {plan.cta}
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
                All plans include a standard license for personal and commercial use. Unlimited plans include extended licensing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm">
                We offer a 30-day money-back guarantee for all paid plans. No questions asked.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Are there any hidden fees?</h3>
              <p className="text-gray-600 text-sm">
                No hidden fees. The price you see is what you pay. Cancel anytime without penalties.
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
