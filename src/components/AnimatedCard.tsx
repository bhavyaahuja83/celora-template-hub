
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-in" | "scale-in" | "slide-in";
}

const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0, 
  animation = "fade-in" 
}: AnimatedCardProps) => {
  return (
    <Card 
      className={`${animation} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </Card>
  );
};

export default AnimatedCard;
