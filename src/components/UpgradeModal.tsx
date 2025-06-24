
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, X } from "lucide-react";
import { pricingPlans } from "@/config/pricing";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateTitle?: string;
}

const UpgradeModal = ({ isOpen, onClose, templateTitle }: UpgradeModalProps) => {
  const starterPlan = pricingPlans.find(p => p.id === 'starter');
  const proPlan = pricingPlans.find(p => p.id === 'pro');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upgrade to Access Premium Templates
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="py-6">
          {templateTitle && (
            <div className="text-center mb-6">
              <p className="text-gray-600">
                "{templateTitle}" is a premium template. Choose a plan to access it:
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Starter Plan */}
            {starterPlan && (
              <div className="border-2 border-purple-200 rounded-xl p-6 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{starterPlan.name}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ₹{starterPlan.price}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{starterPlan.description}</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    {starterPlan.buttonText}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Pro Plan */}
            {proPlan && (
              <div className="border-2 border-orange-200 rounded-xl p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{proPlan.name}</h3>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ₹{proPlan.price}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{proPlan.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    {proPlan.buttonText}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              All plans include commercial license and priority support
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
