
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for exploring our platform",
      features: [
        "Browse all templates",
        "Download 2 free templates/month",
        "Basic support",
        "Community access"
      ],
      buttonText: "Get Started",
      popular: false,
      icon: Star
    },
    {
      name: "Pro",
      price: 999,
      period: "month",
      description: "Best for individual developers",
      features: [
        "Download 50 templates/month",
        "Priority support",
        "Early access to new templates",
        "Commercial license included",
        "Advanced filters & search",
        "Template customization guide"
      ],
      buttonText: "Start Pro Trial",
      popular: true,
      icon: Zap
    },
    {
      name: "Team",
      price: 2999,
      period: "month",
      description: "Perfect for development teams",
      features: [
        "Unlimited downloads",
        "Team collaboration tools",
        "Custom template requests",
        "Dedicated account manager",
        "API access",
        "White-label licensing",
        "Advanced analytics"
      ],
      buttonText: "Contact Sales",
      popular: false,
      icon: Crown
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Celora
              </h1>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Templates</Link>
                <Link to="/categories" className="text-gray-700 hover:text-purple-600 transition-colors">Categories</Link>
                <Link to="/pricing" className="text-purple-600 font-medium">Pricing</Link>
              </nav>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Start for free and scale as you grow. Get access to thousands of premium templates 
              designed by world-class designers.
            </p>
          </div>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center mb-16 animate-scale-in">
            <div className="bg-purple-100 p-1 rounded-xl">
              <Button variant="ghost" className="rounded-lg bg-white shadow-sm">
                Monthly
              </Button>
              <Button variant="ghost" className="rounded-lg text-gray-600">
                Annual (Save 20%)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={plan.name} 
                  className={`relative transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    plan.popular 
                      ? 'border-2 border-purple-400 shadow-xl animate-fade-in' 
                      : 'border-gray-200 shadow-lg hover:border-purple-200 animate-fade-in'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-1">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700' 
                        : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${
                        plan.popular ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-purple-600">
                        ₹{plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-1">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-3 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                          : 'bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50'
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-600 text-lg">Everything you need to know about our pricing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "What's included in commercial license?",
                answer: "Commercial license allows you to use templates in client projects and commercial applications without attribution."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans if you're not satisfied."
              },
              {
                question: "How does the free plan work?",
                answer: "Free plan gives you 2 template downloads per month and access to our community resources."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-lg">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Celora for their UI template needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-purple-300 text-white hover:bg-purple-700 bg-transparent px-8 py-3">
              View All Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <h3 className="text-xl font-bold">Celora</h3>
              </div>
              <p className="text-gray-400">
                Premium UI templates for modern applications. Built by designers, for developers.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Templates</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Web Templates</a></li>
                <li><a href="#" className="hover:text-white transition">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition">Dashboard UI</a></li>
                <li><a href="#" className="hover:text-white transition">Landing Pages</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Celora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
