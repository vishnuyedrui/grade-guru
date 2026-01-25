import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export function CTASection() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <div className="relative rounded-3xl bg-bento-navy overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-bento-gold/20 to-transparent rounded-full blur-2xl" />
        
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 py-16 px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to Simplify Your
            <br />
            <span className="text-bento-gold">Academic Journey?</span>
          </h2>
          <p className="text-white/70 text-lg max-w-lg mx-auto mb-8">
            Join thousands of students who trust JuicyFish for their academic calculations and tracking.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-bento-navy hover:bg-white/90 font-semibold rounded-xl px-8">
                Sign In to Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="/downloads/juicyfish.apk" download="JuicyFish.apk">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8"
              >
                <Download className="mr-2 h-4 w-4" />
                Download App
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
