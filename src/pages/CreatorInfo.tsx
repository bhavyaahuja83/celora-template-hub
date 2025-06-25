
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Upload, DollarSign, Users, TrendingUp } from "lucide-react";

const CreatorInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Earn from Your
            <br />
            Creative Work
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creators earning passive income by selling premium templates on Celora. 
            Keep 65% of every sale and reach a global audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link to="/upload-template">Start Selling Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">65%</div>
              <div className="text-gray-600">Revenue Share</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-gray-600">Monthly Buyers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$2k+</div>
              <div className="text-gray-600">Avg Monthly Earnings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">48h</div>
              <div className="text-gray-600">Review Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>1. Upload Your Template</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Upload your template files, add screenshots, set your price, and write a compelling description.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>2. Get Discovered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our team reviews your template and promotes it to our community of developers and designers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>3. Earn Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receive 65% of every sale with monthly payouts directly to your account. No hidden fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing & Payouts */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Transparent Pricing & Fast Payouts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                    Revenue Split
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>You keep</span>
                    <Badge className="bg-green-100 text-green-800">65%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Platform fee</span>
                    <Badge variant="outline">35%</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    No hidden fees, no setup costs. You only pay when you sell.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                    Payout Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Minimum payout</span>
                    <Badge variant="outline">$50</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Payout frequency</span>
                    <Badge className="bg-blue-100 text-blue-800">Monthly</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Payments processed on the 15th of each month via PayPal or bank transfer.
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Example Earnings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">$29</div>
                  <div className="opacity-90">Template price: $45</div>
                  <div className="text-sm opacity-75">Your earnings per sale</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">$290</div>
                  <div className="opacity-90">10 sales per month</div>
                  <div className="text-sm opacity-75">Monthly income</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">$3,480</div>
                  <div className="opacity-90">Annual potential</div>
                  <div className="text-sm opacity-75">From just one template</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            What You Can Sell
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="font-semibold mb-2">Web Templates</h3>
                <p className="text-sm text-gray-600">React, Vue, HTML/CSS landing pages and web apps</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-semibold mb-2">Mobile Apps</h3>
                <p className="text-sm text-gray-600">Flutter, React Native, and native iOS/Android</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="font-semibold mb-2">UI Kits</h3>
                <p className="text-sm text-gray-600">Component libraries and design systems</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold mb-2">Full Stack</h3>
                <p className="text-sm text-gray-600">Complete applications with backend integration</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of successful creators and start monetizing your design skills today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/upload-template">Upload Your First Template</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700" asChild>
              <Link to="/contact">Contact Sales Team</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CreatorInfo;
