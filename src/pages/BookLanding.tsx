import { BookScroll } from "@/components/book/BookScroll";

const BookLanding = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a1a1a" }}>
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
        <a href="/" className="text-white/80 font-bold text-lg tracking-tight hover:text-white transition-colors">
          JuicyFish
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white/50 hover:text-white text-sm tracking-wide transition-colors">About</a>
          <a href="#" className="text-white/50 hover:text-white text-sm tracking-wide transition-colors">Process</a>
          <a href="#" className="text-white/50 hover:text-white text-sm tracking-wide transition-colors">Contact</a>
        </nav>
        <button className="px-6 py-2 border border-white/20 text-white/80 text-sm font-medium rounded-full hover:bg-white/10 transition-colors">
          Pre-order
        </button>
      </header>

      {/* Main Scroll Animation */}
      <BookScroll />

      {/* Footer Section */}
      <footer 
        className="relative py-24 px-6 md:px-12"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-white/90 tracking-tight mb-4">JuicyFish</h3>
              <p className="text-white/50 leading-relaxed max-w-xs">
                A premium book designed for those who appreciate the art of physical media.
              </p>
            </div>

            {/* Links */}
            <div className="md:text-center">
              <h4 className="text-white/40 text-sm uppercase tracking-widest mb-4">Explore</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">The Story</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Materials</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Craftsmanship</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Pre-order</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:text-right">
              <h4 className="text-white/40 text-sm uppercase tracking-widest mb-4">Connect</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">© 2024 JuicyFish. All rights reserved.</p>
            <p className="text-white/30 text-sm">Designed with intention.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookLanding;
