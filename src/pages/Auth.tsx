
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { toast } from "sonner";
import { useMockAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { BasicInfoStep, UserTypeStep, PANCardStep, BankDetailsStep, VerificationPendingStep } from "@/components/auth/AuthSteps";

interface FormData {
  email?: string;
  password?: string;
  name?: string;
  mobile?: string;
  countryCode?: string;
  userType?: 'buyer' | 'seller' | 'undecided';
  panNumber?: string;
  address?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const { login, register, registerSeller, isLoading } = useMockAuth();
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    emailOrMobile: "",
    password: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.emailOrMobile || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(loginData.emailOrMobile, loginData.password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleStepComplete = async () => {
    // If buyer, just register normally
    if (formData.userType === "buyer" || formData.userType === "undecided") {
      try {
        await register(
          formData.email!,
          formData.password!,
          formData.name!,
          formData.userType as 'buyer' | 'seller' | 'undecided',
          formData.countryCode! + formData.mobile!
        );
        toast.success("Registration successful!");
        navigate("/");
      } catch (error: any) {
        toast.error(error.message || "Registration failed");
      }
    } else {
      // For sellers, register with full KYC data
      try {
        await registerSeller({
          email: formData.email!,
          password: formData.password!,
          name: formData.name!,
          mobile: formData.countryCode! + formData.mobile!,
          panNumber: formData.panNumber!,
          address: formData.address!,
          bankDetails: {
            accountHolderName: formData.accountHolderName!,
            accountNumber: formData.accountNumber!,
            ifscCode: formData.ifscCode!
          }
        });
        setCurrentStep(5); // Show verification pending step
      } catch (error: any) {
        toast.error(error.message || "Registration failed");
      }
    }
  };

  const handleNext = () => {
    if (formData.userType === "seller") {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleStepComplete();
      }
    } else {
      handleStepComplete();
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return <BasicInfoStep onNext={handleNext} data={formData} setData={setFormData} />;
    } else if (currentStep === 2) {
      return <UserTypeStep onNext={handleNext} onBack={handleBack} data={formData} setData={setFormData} />;
    } else if (currentStep === 3 && formData.userType === "seller") {
      return <PANCardStep onNext={handleNext} onBack={handleBack} data={formData} setData={setFormData} />;
    } else if (currentStep === 4 && formData.userType === "seller") {
      return <BankDetailsStep onNext={handleNext} onBack={handleBack} data={formData} setData={setFormData} />;
    } else if (currentStep === 5) {
      return <VerificationPendingStep data={formData} />;
    }
  };

  return (
    <Layout className="bg-gradient-to-br from-purple-50 via-white to-purple-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 animate-scale-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {isLogin ? "Welcome Back" : "Join Celora"}
              </CardTitle>
              <p className="text-gray-600">
                {isLogin ? "Sign in to your account" : "Create your account"}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {isLogin ? (
                <>
                  {/* OAuth Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full hover-scale">
                      <Mail className="w-4 h-4 mr-2" />
                      Google
                    </Button>
                    <Button variant="outline" className="w-full hover-scale">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="emailOrMobile">Email or Mobile Number</Label>
                      <Input
                        id="emailOrMobile"
                        type="text"
                        placeholder="Enter email or mobile with country code"
                        value={loginData.emailOrMobile}
                        onChange={(e) => setLoginData({ ...loginData, emailOrMobile: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                    <div className="text-center">
                      <Button variant="link" className="text-purple-600">
                        Forgot your password?
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  {/* Step Progress Indicator */}
                  {currentStep < 5 && (
                    <div className="flex justify-center mb-6">
                      <div className="flex space-x-2">
                        {[1, 2, ...(formData.userType === "seller" ? [3, 4] : [])].map((step) => (
                          <div
                            key={step}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              step <= currentStep ? "bg-purple-600" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Render current step */}
                  {renderStep()}
                </>
              )}

              {/* Toggle between login and register */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Button
                    variant="link"
                    className="text-purple-600 p-0 h-auto font-semibold hover:underline"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setCurrentStep(1);
                      setFormData({});
                    }}
                  >
                    {isLogin ? "Register" : "Sign in"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
