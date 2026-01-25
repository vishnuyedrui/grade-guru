import { Link } from "react-router-dom";
import { BentoCard } from "./BentoCard";
import { Button } from "@/components/ui/button";
import { Calculator, Calendar, BookOpen, ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react";

export function BentoGrid() {
  return (
    <section className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
        
        {/* Hero Card - Large */}
        <BentoCard 
          variant="navy" 
          className="lg:col-span-7 lg:row-span-2 min-h-[320px] lg:min-h-[420px] flex flex-col justify-between relative overflow-hidden"
          hover={false}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-bento-gold/20 to-transparent rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              Academic Excellence Made Simple
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Your Academic
              <br />
              <span className="text-bento-gold">Journey</span>, Simplified
            </h1>
          </div>
          
          <div className="relative z-10">
            <p className="text-white/70 text-lg mb-6 max-w-md">
              Calculate SGPA/CGPA, track attendance, and access study resources — all in one refined platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-bento-navy hover:bg-white/90 font-semibold rounded-xl px-6">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-6">
                  Try Calculator
                </Button>
              </Link>
            </div>
          </div>
        </BentoCard>

        {/* Calculator Card */}
        <Link to="/calculator" className="lg:col-span-5 contents lg:block">
          <BentoCard className="lg:col-span-5 group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Calculator className="h-7 w-7 text-primary" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-bento-text mb-2">Grade Calculator</h3>
            <p className="text-muted-foreground">
              Calculate your <span className="text-primary font-medium">SGPA & CGPA</span> instantly with our precision calculator.
            </p>
          </BentoCard>
        </Link>

        {/* Stats Card */}
        <BentoCard variant="accent" className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-bento-gold/20 flex items-center justify-center">
              <Users className="h-7 w-7 text-bento-gold" />
            </div>
            <div>
              <p className="text-3xl font-bold text-bento-text">5,000+</p>
              <p className="text-muted-foreground">Students trust JuicyFish</p>
            </div>
          </div>
        </BentoCard>

        {/* Attendance Card */}
        <Link to="/auth" className="lg:col-span-4 contents lg:block">
          <BentoCard className="lg:col-span-4 group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Calendar className="h-7 w-7 text-accent" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-bento-text mb-2">Attendance Tracker</h3>
            <p className="text-muted-foreground">
              Never miss a class. Know exactly <span className="text-accent font-medium">how many you can skip</span>.
            </p>
          </BentoCard>
        </Link>

        {/* Resources Card */}
        <Link to="/auth" className="lg:col-span-4 contents lg:block">
          <BentoCard className="lg:col-span-4 group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-secondary" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-bento-text mb-2">Study Resources</h3>
            <p className="text-muted-foreground">
              Access organized <span className="text-secondary font-medium">notes, videos & papers</span> in one place.
            </p>
          </BentoCard>
        </Link>

        {/* Progress Card */}
        <BentoCard variant="featured" className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
              <TrendingUp className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-bento-text">Track</p>
              <p className="text-muted-foreground">Your academic progress</p>
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
