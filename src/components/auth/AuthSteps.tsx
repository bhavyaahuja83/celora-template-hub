
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, User, Phone, CreditCard, MapPin, Building, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useMockAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  data: any;
  setData: (data: any) => void;
}

const countryCodes = [
  { code: "+91", country: "IN" },
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+86", country: "CN" },
  { code: "+81", country: "JP" },
];

// Step 1: Basic Info
const BasicInfoStep = ({ onNext, data, setData }: StepProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => {
    if (!data.email || !data.password || !data.name || !data.mobile) {
      toast.error("Please fill in all fields");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600">Create Your Account</h2>
        <p className="text-gray-600">Let's get started with your basic information</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={data.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <div className="flex gap-2 mt-1">
            <Select
              value={data.countryCode || "+91"}
              onValueChange={(value) => setData({ ...data, countryCode: value })}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((item) => (
                  <SelectItem key={item.code} value={item.code}>
                    {item.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter mobile number"
              value={data.mobile || ""}
              onChange={(e) => setData({ ...data, mobile: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={data.password || ""}
              onChange={(e) => setData({ ...data, password: e.target.value })}
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

        <Button onClick={handleNext} className="w-full bg-purple-600 hover:bg-purple-700">
          Continue
        </Button>
      </div>
    </div>
  );
};

// Step 2: User Type Selection
const UserTypeStep = ({ onNext, onBack, data, setData }: StepProps) => {
  const handleNext = () => {
    if (!data.userType) {
      toast.error("Please select your account type");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600">What brings you here?</h2>
        <p className="text-gray-600">Choose your account type to get started</p>
      </div>

      <RadioGroup
        value={data.userType}
        onValueChange={(value) => setData({ ...data, userType: value })}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
          <RadioGroupItem value="buyer" id="buyer" />
          <div className="flex-1">
            <Label htmlFor="buyer" className="text-lg font-medium cursor-pointer">Buy Templates</Label>
            <p className="text-gray-500 text-sm">Access premium templates for your projects</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
          <RadioGroupItem value="seller" id="seller" />
          <div className="flex-1">
            <Label htmlFor="seller" className="text-lg font-medium cursor-pointer">Sell Templates</Label>
            <p className="text-gray-500 text-sm">Upload and sell your templates to earn money</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
          <RadioGroupItem value="undecided" id="undecided" />
          <div className="flex-1">
            <Label htmlFor="undecided" className="text-lg font-medium cursor-pointer">Not Sure Yet</Label>
            <p className="text-gray-500 text-sm">Explore first, decide later</p>
          </div>
        </div>
      </RadioGroup>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-purple-600 hover:bg-purple-700">
          Continue
        </Button>
      </div>
    </div>
  );
};

// Step 3: PAN Card (for sellers)
const PANCardStep = ({ onNext, onBack, data, setData }: StepProps) => {
  const [panImage, setPanImage] = useState<File | null>(null);

  const handleNext = () => {
    if (!data.panNumber || !panImage) {
      toast.error("Please provide PAN number and upload PAN card image");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600">PAN Card Verification</h2>
        <p className="text-gray-600">Required for seller account verification</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="panNumber">PAN Number</Label>
          <div className="relative mt-1">
            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="panNumber"
              type="text"
              placeholder="ABCDE1234F"
              value={data.panNumber || ""}
              onChange={(e) => setData({ ...data, panNumber: e.target.value.toUpperCase() })}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="panImage">Upload PAN Card Image</Label>
          <Input
            id="panImage"
            type="file"
            accept="image/*"
            onChange={(e) => setPanImage(e.target.files?.[0] || null)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-purple-600 hover:bg-purple-700">
          Continue
        </Button>
      </div>
    </div>
  );
};

// Step 4: Bank Details (for sellers)
const BankDetailsStep = ({ onNext, onBack, data, setData }: StepProps) => {
  const handleNext = () => {
    if (!data.accountHolderName || !data.accountNumber || !data.ifscCode || !data.address) {
      toast.error("Please fill in all bank details");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600">Bank Details</h2>
        <p className="text-gray-600">For secure payments and withdrawals</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="accountHolderName">Account Holder Name</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="accountHolderName"
              type="text"
              placeholder="As per bank records"
              value={data.accountHolderName || ""}
              onChange={(e) => setData({ ...data, accountHolderName: e.target.value })}
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
            value={data.accountNumber || ""}
            onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <div className="relative mt-1">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="ifscCode"
              type="text"
              placeholder="SBIN0001234"
              value={data.ifscCode || ""}
              onChange={(e) => setData({ ...data, ifscCode: e.target.value.toUpperCase() })}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Full Address</Label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="address"
              type="text"
              placeholder="Complete address with pincode"
              value={data.address || ""}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-purple-600 hover:bg-purple-700">
          Continue
        </Button>
      </div>
    </div>
  );
};

// Step 5: Verification Pending
const VerificationPendingStep = ({ data }: { data: any }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-purple-600">Verification Under Review</h2>
        <p className="text-gray-600 mt-2">
          Thank you for registering as a seller! Our team is reviewing your KYC documents.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          You'll receive an email notification once verification is complete (usually within 24-48 hours).
        </p>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-semibold text-purple-600">What's Next?</h4>
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>• Browse templates on the marketplace</li>
          <li>• Prepare your first template for upload</li>
          <li>• Join our community forum</li>
        </ul>
      </div>

      <Button onClick={() => navigate("/")} className="w-full bg-purple-600 hover:bg-purple-700">
        Go to Homepage
      </Button>
    </div>
  );
};

export { BasicInfoStep, UserTypeStep, PANCardStep, BankDetailsStep, VerificationPendingStep };
