
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Github, Mail, User, Phone, CreditCard, MapPin, Building } from "lucide-react";
import { toast } from "sonner";
import { useMockAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSellerRegistration, setIsSellerRegistration] = useState(false);
  const { login, register, registerSeller, isLoading } = useMockAuth();
  const navigate = useNavigate();

  // Form states
  const [loginData, setLoginData] = useState({
    emailOrMobile: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    userType: "buyer", // buyer, seller, undecided
    mobile: "",
    agreeToTerms: false
  });

  const [sellerData, setSellerData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    mobile: "",
    panNumber: "",
    address: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    agreeToTerms: false
  });

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasUpperCase && hasNumber && hasSymbol;
  };

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validatePassword(registerData.password)) {
      toast.error("Password must contain at least one uppercase letter, one number, and one symbol");
      return;
    }

    try {
      await register(
        registerData.email,
        registerData.password,
        registerData.name,
        registerData.userType as 'buyer' | 'seller' | 'undecided',
        registerData.mobile || undefined
      );
      toast.success("Registration successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    }
  };

  const handleSellerRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sellerData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (sellerData.password !== sellerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validatePassword(sellerData.password)) {
      toast.error("Password must contain at least one uppercase letter, one number, and one symbol");
      return;
    }

    try {
      await registerSeller({
        email: sellerData.email,
        password: sellerData.password,
        name: sellerData.name,
        mobile: sellerData.mobile,
        panNumber: sellerData.panNumber,
        address: sellerData.address,
        bankDetails: {
          accountHolderName: sellerData.accountHolderName,
          accountNumber: sellerData.accountNumber,
          ifscCode: sellerData.ifscCode
        }
      });
      toast.success("Seller registration successful! Verification pending.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <Layout className="bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {isLogin ? "Welcome Back" : "Join Celora"}
              </CardTitle>
              <p className="text-gray-600">
                {isLogin ? "Sign in to your account" : "Create your account"}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* OAuth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
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

              {isLogin ? (
                /* Login Form */
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
                    className="w-full bg-purple-600 hover:bg-purple-700"
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
              ) : !isSellerRegistration ? (
                /* Regular Registration Form */
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobile">Mobile Number (Optional)</Label>
                    <Input
                      id="mobile"
                      type="text"
                      placeholder="+91xxxxxxxxxx"
                      value={registerData.mobile}
                      onChange={(e) => setRegisterData({ ...registerData, mobile: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>I want to:</Label>
                    <RadioGroup
                      value={registerData.userType}
                      onValueChange={(value) => setRegisterData({ ...registerData, userType: value })}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buyer" id="buyer" />
                        <Label htmlFor="buyer">Buy templates</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seller" id="seller" />
                        <Label htmlFor="seller">Sell templates (creator)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="undecided" id="undecided" />
                        <Label htmlFor="undecided">I'm not sure yet</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
                    <p className="text-xs text-gray-500 mt-1">
                      Must contain uppercase, number, and symbol
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={registerData.agreeToTerms}
                      onCheckedChange={(checked) => 
                        setRegisterData({ ...registerData, agreeToTerms: checked as boolean })
                      }
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the <Button variant="link" className="h-auto p-0 text-purple-600">Terms & Conditions</Button>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>

                  {registerData.userType === "seller" && (
                    <div className="text-center">
                      <Button 
                        type="button"
                        variant="link" 
                        className="text-purple-600"
                        onClick={() => setIsSellerRegistration(true)}
                      >
                        Complete Seller Registration Instead
                      </Button>
                    </div>
                  )}
                </form>
              ) : (
                /* Seller Registration Form */
                <form onSubmit={handleSellerRegister} className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-600">Seller Registration</h3>
                    <p className="text-sm text-gray-600">Complete verification required for selling</p>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="sellerName">Full Name</Label>
                      <Input
                        id="sellerName"
                        type="text"
                        placeholder="As per PAN card"
                        value={sellerData.name}
                        onChange={(e) => setSellerData({ ...sellerData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="sellerEmail">Email Address</Label>
                      <Input
                        id="sellerEmail"
                        type="email"
                        placeholder="Your email address"
                        value={sellerData.email}
                        onChange={(e) => setSellerData({ ...sellerData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="sellerMobile">Mobile Number</Label>
                      <Input
                        id="sellerMobile"
                        type="text"
                        placeholder="+91xxxxxxxxxx (with country code)"
                        value={sellerData.mobile}
                        onChange={(e) => setSellerData({ ...sellerData, mobile: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* KYC Details */}
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="panNumber"
                          type="text"
                          placeholder="ABCDE1234F"
                          value={sellerData.panNumber}
                          onChange={(e) => setSellerData({ ...sellerData, panNumber: e.target.value.toUpperCase() })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Full Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          type="text"
                          placeholder="Complete address with pincode"
                          value={sellerData.address}
                          onChange={(e) => setSellerData({ ...sellerData, address: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="accountHolderName">Account Holder Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="accountHolderName"
                          type="text"
                          placeholder="As per bank records"
                          value={sellerData.accountHolderName}
                          onChange={(e) => setSellerData({ ...sellerData, accountHolderName: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        type="text"
                        placeholder="Bank account number"
                        value={sellerData.accountNumber}
                        onChange={(e) => setSellerData({ ...sellerData, accountNumber: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="ifscCode"
                          type="text"
                          placeholder="SBIN0001234"
                          value={sellerData.ifscCode}
                          onChange={(e) => setSellerData({ ...sellerData, ifscCode: e.target.value.toUpperCase() })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="sellerPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="sellerPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={sellerData.password}
                          onChange={(e) => setSellerData({ ...sellerData, password: e.target.value })}
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

                    <div>
                      <Label htmlFor="sellerConfirmPassword">Confirm Password</Label>
                      <Input
                        id="sellerConfirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={sellerData.confirmPassword}
                        onChange={(e) => setSellerData({ ...sellerData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sellerAgreeToTerms"
                      checked={sellerData.agreeToTerms}
                      onCheckedChange={(checked) => 
                        setSellerData({ ...sellerData, agreeToTerms: checked as boolean })
                      }
                    />
                    <Label htmlFor="sellerAgreeToTerms" className="text-sm">
                      I agree to the seller terms and provide accurate information
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Complete Seller Registration"}
                  </Button>

                  <div className="text-center">
                    <Button 
                      type="button"
                      variant="link" 
                      className="text-purple-600"
                      onClick={() => setIsSellerRegistration(false)}
                    >
                      Back to Regular Registration
                    </Button>
                  </div>
                </form>
              )}

              {/* Toggle between login and register */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Button
                    variant="link"
                    className="text-purple-600 p-0 h-auto font-semibold"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setIsSellerRegistration(false);
                    }}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
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
