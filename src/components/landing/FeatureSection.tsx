import { CheckCircle, Zap, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Calculations",
    description: "Get accurate SGPA and CGPA results in seconds with our optimized calculator.",
  },
  {
    icon: CheckCircle,
    title: "Attendance Insights",
    description: "Know exactly how many classes you can miss while staying above the threshold.",
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Your data is protected with modern security practices. No unnecessary tracking.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Access from any device. Download our Android app for on-the-go calculations.",
  },
];

export function FeatureSection() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-primary font-medium mb-2">Why JuicyFish?</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-bento-text tracking-tight">
          Built for Student Success
        </h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className="text-center p-6 rounded-2xl hover:bg-muted/50 transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <feature.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-bento-text mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
