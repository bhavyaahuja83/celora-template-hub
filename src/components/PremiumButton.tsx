
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface PremiumButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PremiumButton = ({ 
  children, 
  variant = "primary", 
  size = "default",
  className = "",
  onClick,
  disabled = false
}: PremiumButtonProps) => {
  const baseClasses = "relative overflow-hidden transition-all duration-300 transform hover:scale-105";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800",
    outline: "border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
  };

  return (
    <Button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 hover:opacity-20 transition-opacity duration-300" />
      )}
    </Button>
  );
};

export default PremiumButton;
