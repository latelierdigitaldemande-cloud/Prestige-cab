import { motion } from 'motion/react';
import { Car, Mail, Phone, MapPin, Instagram, Facebook, Globe } from 'lucide-react';
import { Language, Translation } from '../types';

interface FooterProps {
  t: Translation;
  lang: Language;
}

const Footer = ({ t, lang }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-bg pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black">
                <Car size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-display font-extrabold text-lg leading-none tracking-tight">PRESTIGE</span>
                <span className="text-white/60 font-sans font-light text-[10px] tracking-[0.2em] uppercase leading-none mt-1">CAB SERVICE</span>
              </div>
            </div>
            <p className="text-text-muted text-xs leading-relaxed max-w-xs font-light">
              Service de chauffeur privé premium à Paris et en Île-de-France. Excellence, discrétion et ponctualité pour tous vos déplacements.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Facebook size={14} />
              </a>
            </div>
          </div>

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
            © {currentYear} PRESTIGE CAB SERVICE. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-text-muted hover:text-white text-[10px] font-light uppercase tracking-widest transition-colors">Mentions Légales</a>
            <a href="#" className="text-text-muted hover:text-white text-[10px] font-light uppercase tracking-widest transition-colors">Confidentialité</a>
          </div>
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
