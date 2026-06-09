import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Language, Translation } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation;
}

const Navbar = ({ lang, setLang, t }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: t.nav_home, href: '#' },
    { title: t.nav_services, href: '#services' },
    { title: t.nav_fleet, href: '#fleet' },
    { title: t.nav_contact, href: '#contact' },
  ];

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-start px-4 max-w-7xl mx-auto pointer-events-none">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl relative">
        <nav
          className="pointer-events-auto w-full transition-all duration-300 bg-black/15 backdrop-blur-lg border border-white/10 py-4 sm:py-5 px-6 rounded-3xl shadow-2xl"
        >
          <div className="flex items-center justify-between w-full mx-auto">
            {/* Logo */}
            <div className="flex-1 flex justify-start">
              <a href="#" className="flex items-center group">
                <div className="flex flex-col">
                  <span className="text-white/60 font-sans font-light text-[11px] tracking-[0.25em] uppercase leading-none mb-1">CHAUFFEUR</span>
                  <span className="text-white font-luxury font-semibold text-[27px] leading-none tracking-[0.14em]">LUXURA</span>
                </div>
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex-1 flex justify-end items-center gap-3">
              {/* CTA Book Now */}
              <a
                href="tel:+33662284837"
                className="px-4 py-2 bg-white text-black hover:bg-white/90 rounded-full text-[11px] font-black transition-all duration-500 tracking-normal uppercase shadow-md"
              >
                {t.nav_cta}
              </a>

              {/* Hamburger Menu trigger */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-1 hover:text-white/80 transition-colors">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Menu Overlay - Elegant absolute glassmorphic dropdown sibling to avoid nested backdrop-filter clash */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-[115%] left-0 right-0 border border-white/15 rounded-3xl py-12 px-6 sm:py-16 sm:px-8 flex flex-col gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] pointer-events-auto z-50"
              style={{
                backgroundColor: 'rgba(8, 8, 8, 0.8)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
              }}
            >
              <div className="flex flex-col gap-7">
                {navLinks.map((link, index) => {
                  const isLast = index === navLinks.length - 1;
                  return (
                    <a
                      key={link.title}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-white/90 text-[28px] sm:text-[32px] font-luxury font-semibold tracking-[0.01em] hover:text-white hover:scale-[1.02] active:scale-95 transition-all block text-center ${
                        isLast ? 'border-b border-white/5 pb-4' : ''
                      }`}
                    >
                      {link.title}
                    </a>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-center items-center gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/85 hover:text-white rounded-full transition-all duration-350 border border-white/10 hover:border-white/25 active:scale-95"
                  aria-label="Instagram"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/85 hover:text-white rounded-full transition-all duration-350 border border-white/10 hover:border-white/25 active:scale-95"
                  aria-label="Facebook"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/85 hover:text-white rounded-full transition-all duration-350 border border-white/10 hover:border-white/25 active:scale-95"
                  aria-label="LinkedIn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
