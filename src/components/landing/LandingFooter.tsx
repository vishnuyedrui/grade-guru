import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import teamDino from "@/assets/team-dino.jpg";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50 bg-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="JuicyFish Logo" 
              className="h-10 w-10 rounded-xl"
            />
            <div>
              <p className="font-bold text-bento-navy">JuicyFish</p>
              <p className="text-sm text-muted-foreground">Academic Student Portal</p>
            </div>
          </div>

          {/* Team Attribution */}
          <div className="flex items-center gap-3">
            <img 
              src={teamDino} 
              alt="Team Dino" 
              className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
            />
            <div className="text-sm">
              <p className="text-muted-foreground">Made with 💜 by</p>
              <p className="font-semibold text-bento-text">Team Dino</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/calculator" className="text-muted-foreground hover:text-primary transition-colors">
              Calculator
            </Link>
            <Link to="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">
              Admin
            </Link>
            <a 
              href="/downloads/juicyfish.apk" 
              download="JuicyFish.apk"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Download
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JuicyFish. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
