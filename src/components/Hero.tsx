import { motion } from 'motion/react';
import { Phone, ArrowUpRight, Star, MousePointer2, ChevronDown } from 'lucide-react';
import { Translation } from '../types';

interface HeroProps {
  t: Translation;
}

const Hero = ({ t }: HeroProps) => {
  return (
    <header id="hero" className="relative min-h-[100vh] flex items-center justify-center text-center overflow-hidden bg-primary-bg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://a.storyblok.com/f/312129/4096x2731/cee1283139/chauffeur_1.jpg/m/2560x0/filters:format(webp)"
          className="w-full h-full object-cover object-[25%_20%] opacity-40 xl:opacity-50"
          referrerPolicy="no-referrer"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/40 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center pt-32 pb-24 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-transparent border-2 border-white/50 px-5 py-2 rounded-full mb-10 backdrop-blur-sm shadow-xl">
            <Star size={14} className="text-white fill-white" />
            <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">{t.hero_badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-white text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase leading-[1.05] mb-10 tracking-tight">
            {t.hero_title1} <br />
            <span className="text-text-muted">{t.hero_title2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-text-muted text-base sm:text-lg md:text-xl font-light mb-14 max-w-xl mx-auto leading-relaxed">
            {t.hero_sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-20">
            <a
              href="tel:+33662284837"
              className="px-10 py-5 bg-white text-black rounded-full text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-3 hover:bg-text-muted transition-all duration-300 w-full sm:w-auto justify-center shadow-2xl"
            >
              <Phone size={18} />
              <span>{t.hero_cta1}</span>
            </a>
            <a
              href="#transfers"
              className="px-10 py-5 bg-transparent border-2 border-white/50 text-white rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3 w-full sm:w-auto justify-center backdrop-blur-sm"
            >
              <span>{t.hero_cta2}</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Google Reviews Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4 bg-tertiary-bg/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1.5 shadow-inner">
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                className="w-full h-full object-contain"
                alt="Google"
              />
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white text-xs font-bold leading-none">5.0 / 5</span>
                <span className="text-text-subtle text-[10px] font-bold tracking-[0.1em] uppercase leading-none">{t.hero_reviews}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 group cursor-pointer"
      >
        <span className="text-text-subtle text-[10px] font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">{t.scroll}</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/80 to-transparent" />
        </div>
      </motion.button>
    </header>
  );
};

export default Hero;
