import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "featured" | "accent" | "navy";
  hover?: boolean;
}

export function BentoCard({ 
  children, 
  className, 
  variant = "default",
  hover = true 
}: BentoCardProps) {
  const variants = {
    default: "bg-white",
    featured: "bg-gradient-to-br from-primary/5 to-primary/10",
    accent: "bg-gradient-to-br from-bento-gold/10 to-bento-gold/20",
    navy: "bg-bento-navy text-white",
  };

  return (
    <div 
      className={cn(
        "rounded-3xl p-6 lg:p-8 border border-border/50 shadow-sm transition-all duration-300",
        variants[variant],
        hover && "hover:shadow-lg hover:scale-[1.01] hover:border-primary/20",
        className
      )}
    >
      {children}
    </div>
  );
}
