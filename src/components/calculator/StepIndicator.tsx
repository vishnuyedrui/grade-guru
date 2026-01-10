import { cn } from "@/lib/utils";
import { Check, BookOpen, Award, Calculator, TrendingUp } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

const steps = [
  { id: 1, name: "Course & WGP", icon: BookOpen },
  { id: 2, name: "Letter Grade", icon: Award },
  { id: 3, name: "SGPA", icon: Calculator },
  { id: 4, name: "CGPA", icon: TrendingUp },
];

export function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    isCompleted
                      ? "bg-accent text-accent-foreground"
                      : isCurrent
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 sm:w-20 h-1 mx-2 rounded-full transition-all duration-300",
                    completedSteps.includes(step.id) ? "bg-accent" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}