import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Translation } from '../types';

interface HeroProps {
  t: Translation;
}

const Hero = ({ t }: HeroProps) => {
  return (
    <header id="hero" className="relative h-[100dvh] flex items-end justify-start text-left overflow-hidden bg-primary-bg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
         <img
          src="https://i.ibb.co/20NHrTRz/Image-13-04-2026-00-37.jpg"
          className="w-full h-full object-cover object-[50%_50%] sm:object-[20%_50%] opacity-100"
          referrerPolicy="no-referrer"
          alt="Hero background"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/65 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 w-full flex flex-col items-start pb-12 sm:pb-20 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left w-full"
        >
          {/* Upper Label */}
          <span className="text-[26px] min-[375px]:text-[28px] sm:text-[30px] font-luxury font-bold tracking-normal text-white/70 mb-3 sm:mb-4">
            Global Chauffeur Network
          </span>

          {/* Title */}
          <h1 className="text-[38px] min-[375px]:text-[44px] sm:text-[42px] md:text-[50px] lg:text-[62px] font-display font-bold tracking-tight leading-[1.12] sm:leading-[1.15] mb-6 text-white max-w-4xl px-0 text-left">
            <span className="block sm:inline">{t.hero_title1}</span>{' '}
            <span className="block sm:inline">{t.hero_title2}</span>
          </h1>

          {/* Subtitle - Displayed with identical premium typography as Features description */}
          <p className="text-text-subtle text-[15px] sm:text-[17px] md:text-[19px] font-light leading-relaxed mb-10 max-w-2xl text-left">
            {t.hero_sub}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-center w-full sm:w-auto">
            <a
              href="#reservation"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#d88f13] text-white hover:bg-[#c17f10] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl text-center"
            >
              <Calendar size={14} />
              <span>{t.hero_cta1}</span>
            </a>
            <a
              href="#fleet"
              className="inline-flex items-center justify-center px-10 py-5 bg-black/10 hover:bg-white/10 text-white border border-white/15 hover:border-white/35 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm text-center"
            >
              <span>{t.hero_cta2}</span>
            </a>
          </div>

        </motion.div>
      </div>


    </header>
  );
};

export default Hero;
