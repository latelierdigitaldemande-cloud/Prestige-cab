import { motion } from 'motion/react';
import { Translation } from '../types';

interface HeroProps {
  t: Translation;
}

const Hero = ({ t }: HeroProps) => {
  return (
    <header id="hero" className="relative h-[65dvh] max-h-[65dvh] min-h-[480px] flex items-end sm:items-center justify-center text-center overflow-hidden bg-primary-bg pb-20 sm:pb-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.ibb.co/d0nZF1YW/Image-13-04-2026-00-37.jpg"
          className="w-full h-full object-cover object-[70%_20%] sm:object-[25%_20%] opacity-85"
          referrerPolicy="no-referrer"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-6 w-full flex flex-col items-center pt-28 sm:pt-32 pb-0 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Title */}
          <h1 className="text-[23px] sm:text-[29px] md:text-[47px] lg:text-[59px] font-luxury font-light uppercase tracking-[0.1em] leading-[1.4] sm:leading-[1.3] mb-10 text-white max-w-4xl px-0">
            <span className="block sm:inline">{t.hero_title1}</span>{' '}
            <span className="block sm:inline">{t.hero_title2}</span>
          </h1>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 group cursor-pointer focus:outline-none"
      >
        <span className="text-text-subtle text-[9px] font-medium tracking-[0.25em] uppercase group-hover:text-white transition-colors duration-300">
          {t.scroll}
        </span>
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ 
              top: ["-50%", "100%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
            className="absolute left-0 right-0 h-4 bg-gradient-to-b from-transparent via-white/90 to-transparent"
          />
        </div>
      </motion.button>
    </header>
  );
};

export default Hero;
