import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Globe, Car } from 'lucide-react';
import { Language, Translation } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation;
}

const Navbar = ({ lang, setLang, t }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { title: t.nav_services, href: '#services', dropdown: 'services' },
    { title: t.feat_label.replace('— ', ''), href: '#features' },
    { title: t.nav_fleet, href: '#fleet', dropdown: 'fleet' },
    { title: "FAQ", href: '#fleet-faq' },
    { title: t.nav_corporate, href: '#transfers', dropdown: 'transfers' },
    { title: t.nav_contact, href: '#contact' },
  ];

  const dropdowns: Record<string, { label: string; href: string }[]> = {
    services: [
      { label: t.nav_airports, href: '#transfers' },
      { label: t.nav_paris, href: '#services' },
      { label: t.nav_tours, href: '#services' },
      { label: t.nav_business, href: '#business' },
    ],
    fleet: [
      { label: t.fleet_menu_1, href: '#vehicle-berline' },
      { label: t.fleet_menu_2, href: '#vehicle-business' },
      { label: t.fleet_menu_3, href: '#vehicle-van' },
    ],
    transfers: [
      { label: t.transfer_menu_1, href: '#transfer-paris-cdg' },
      { label: t.transfer_menu_2, href: '#transfer-cdg-paris' },
      { label: t.transfer_menu_3, href: '#transfer-orly-paris' },
      { label: t.transfer_menu_4, href: '#transfer-paris-disney' },
    ],
  };

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-300 bg-[#0a0a0a]/15 backdrop-blur-md border border-white/10 rounded-3xl py-3.5 px-6 md:px-10 shadow-2xl shadow-black/30 animate-in fade-in slide-in-from-top-4 duration-500"
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <a href="#" className="flex items-center group">
            <div className="flex flex-col">
              <span className="text-white font-luxury font-light text-xl md:text-3xl leading-none tracking-[0.14em]">ABDI</span>
              <span className="text-white/60 font-sans font-light text-[8px] md:text-[10px] tracking-[0.25em] uppercase leading-none mt-1 md:mt-1.5">CHAUFFEUR</span>
            </div>
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.title}
              className="relative group py-2"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.dropdown)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 cursor-pointer">
                <a
                  href={link.href}
                  className="text-text-muted hover:text-white text-xs font-normal transition-colors uppercase tracking-widest"
                >
                  {link.title}
                </a>
                {link.dropdown && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${activeDropdown === link.dropdown ? 'rotate-180' : ''}`}
                  />
                )}
              </div>

              {/* Dropdown Menu */}
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 min-w-[220px]"
                    >
                      <div className="bg-primary-bg/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
                        {dropdowns[link.dropdown].map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 text-[10px] text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all uppercase tracking-widest"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
          {/* Lang Switcher Desktop */}
          <div className="hidden md:relative md:block" onMouseEnter={() => setLangMenuOpen(true)} onMouseLeave={() => setLangMenuOpen(false)}>
            <button className="flex items-center gap-1.5 bg-transparent border border-white/40 rounded-full px-3 py-1 text-white text-[9px] font-bold tracking-[0.14em] uppercase transition-all hover:bg-white hover:text-black backdrop-blur-sm">
              <Globe size={12} />
              <span>{lang}</span>
              <ChevronDown size={10} className={`transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full pt-2 w-24"
                >
                  <div className="bg-primary-bg/95 backdrop-blur-2xl border border-white/40 rounded-xl p-1 shadow-2xl overflow-hidden">
                    {(['fr', 'en'] as Language[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`w-full text-left px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors rounded-lg ${
                          lang === l ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="tel:+33662284837"
            className="hidden md:block px-6 py-2 border-2 border-white/50 rounded-full text-[10px] font-bold text-white hover:bg-white hover:text-black transition-all duration-500 tracking-[0.1em] uppercase backdrop-blur-sm"
          >
            {t.nav_cta}
          </a>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="px-2.5 py-1 bg-transparent border border-white/40 rounded-full text-white text-[9px] uppercase font-bold backdrop-blur-sm"
            >
              {lang}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="text-white p-1">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-primary-bg z-[100] flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <a href="#" className="flex flex-col">
                <span className="text-white font-luxury font-light text-3xl tracking-[0.14em] uppercase leading-none">ABDI</span>
                <span className="text-white/60 font-sans font-light text-[10px] tracking-[0.25em] uppercase leading-none mt-1.5">CHAUFFEUR</span>
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-1">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-2xl font-normal uppercase tracking-widest border-b border-white/5 pb-4"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <a
              href="tel:+33662284837"
              className="mt-auto w-full py-5 bg-white text-black rounded-full text-center text-sm font-semibold tracking-widest uppercase hover:bg-text-muted transition-colors"
            >
              +33 6 62 28 48 37
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
