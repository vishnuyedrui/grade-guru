import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Calculator, Shield, Download, LogIn } from "lucide-react";
import logo from "@/assets/logo.png";

export function LandingNav() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/calculator", label: "Grade Calculator", icon: Calculator },
    { to: "/admin/login", label: "Admin Login", icon: Shield },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logo} 
            alt="JuicyFish Logo" 
            className="h-9 w-9 rounded-xl transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-xl text-bento-navy tracking-tight">
            JuicyFish
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button 
                variant="ghost" 
                className="text-bento-text hover:text-primary hover:bg-primary/5 font-medium"
              >
                <link.icon className="h-4 w-4 mr-2" />
                {link.label}
              </Button>
            </Link>
          ))}
          
          <a href="/downloads/juicyfish.apk" download="JuicyFish.apk">
            <Button 
              variant="ghost" 
              className="text-bento-text hover:text-primary hover:bg-primary/5 font-medium"
            >
              <Download className="h-4 w-4 mr-2" />
              Download App
            </Button>
          </a>

          <Link to="/auth">
            <Button className="ml-2 bg-bento-navy hover:bg-bento-navy/90 text-white font-medium rounded-xl px-5">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-bento-navy hover:bg-primary/5 rounded-xl" 
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-white border-l border-border/50">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-bento-navy">
                <img src={logo} alt="JuicyFish" className="h-8 w-8 rounded-xl" />
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <link.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-bento-text">{link.label}</span>
                </Link>
              ))}
              
              <a 
                href="/downloads/juicyfish.apk" 
                download="JuicyFish.apk"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Download className="h-5 w-5 text-accent" />
                </div>
                <span className="font-medium text-bento-text">Download App</span>
              </a>
              
              <Link 
                to="/auth" 
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bento-navy text-white mt-2"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <LogIn className="h-5 w-5" />
                </div>
                <span className="font-medium">Sign In</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
