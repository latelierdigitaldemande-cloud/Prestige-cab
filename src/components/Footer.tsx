import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Language, Translation } from '../types';

interface FooterProps {
  t: Translation;
  lang: Language;
}

const Footer = ({ t, lang }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-bg pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Navigation */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Navigation</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#services" className="text-text-muted hover:text-white text-xs font-light transition-colors uppercase tracking-widest">Services</a></li>
              <li><a href="#about" className="text-text-muted hover:text-white text-xs font-light transition-colors uppercase tracking-widest">À Propos</a></li>
              <li><a href="#fleet" className="text-text-muted hover:text-white text-xs font-light transition-colors uppercase tracking-widest">Flotte</a></li>
              <li><a href="#transfers" className="text-text-muted hover:text-white text-xs font-light transition-colors uppercase tracking-widest">Transferts</a></li>
            </ul>
          </div>

          {/* Services Quick */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Aéroports & Gares</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#transfer-paris-cdg" className="text-text-muted hover:text-white text-xs font-light transition-colors">Paris → CDG</a></li>
              <li><a href="#transfer-cdg-paris" className="text-text-muted hover:text-white text-xs font-light transition-colors">CDG → Paris</a></li>
              <li><a href="#transfer-orly-paris" className="text-text-muted hover:text-white text-xs font-light transition-colors">Orly → Paris</a></li>
              <li><a href="#transfer-paris-disney" className="text-text-muted hover:text-white text-xs font-light transition-colors">Disneyland Paris</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Légal</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#cgu" className="text-text-muted hover:text-white text-xs font-light transition-colors uppercase tracking-widest">CGU</a></li>
              <li><a href="#privacy" className="text-text-muted hover:text-white text-xs font-light transition-colors uppercase tracking-widest">Confidentialité</a></li>
              <li><a href="#cookies" className="text-text-muted hover:text-white text-xs font-light transition-colors uppercase tracking-widest">Cookies</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Contact</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Phone size={14} />
                </div>
                <a href="tel:+33662284837" className="text-white text-xs font-medium tracking-tight hover:text-text-muted transition-colors">
                  (+33) 6 62 28 48 37
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Mail size={14} />
                </div>
                <a href="mailto:monsiteparis@gmail.com" className="text-white text-xs font-medium tracking-tight hover:text-text-muted transition-colors">
                  monsiteparis@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <MapPin size={14} />
                </div>
                <span className="text-white text-xs font-medium tracking-tight">
                  Paris, France
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-muted text-[10px] font-light uppercase tracking-widest">
            © {currentYear} LUXURA CHAUFFEUR. TOUS DROITS RÉSERVÉS.
          </p>
        </div>
      </div>

      {/* Decorative Paris Label */}
      <div className="absolute bottom-[-5rem] left-1/2 -translate-x-1/2 text-[15rem] font-display font-black text-white/[0.01] pointer-events-none select-none">
        PARIS
      </div>
    </footer>
  );
};

export default Footer;
