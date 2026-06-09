import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Translation } from '../types';

interface HeroProps {
  t: Translation;
}

const Hero = ({ t }: HeroProps) => {
  return (
    <header id="hero" className="relative min-h-[100dvh] flex items-start justify-start text-left overflow-hidden bg-primary-bg">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 w-full flex flex-col items-start pt-[380px] min-[375px]:pt-[400px] sm:pt-[320px] md:pt-[300px] pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left w-full"
        >
          {/* Upper Label */}
          <span className="text-[10px] min-[375px]:text-[12px] sm:text-[14px] font-sans font-medium tracking-[0.22em] sm:tracking-[0.25em] text-white/70 uppercase mb-3 sm:mb-4">
            GLOBAL CHAUFFEUR NETWORK
          </span>

          {/* Title */}
          <h1 className="text-[36px] min-[375px]:text-[42px] sm:text-[42px] md:text-[50px] lg:text-[62px] font-luxury font-bold tracking-normal leading-[1.15] sm:leading-[1.2] mb-6 sm:mb-5 md:mb-6 text-white max-w-4xl px-0 text-left">
            <span className="block sm:inline">{t.hero_title1}</span>{' '}
            <span className="block sm:inline">{t.hero_title2}</span>
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-start sm:items-center mt-6 sm:mt-5 md:mt-6 w-full sm:w-auto">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 sm:min-w-[200px] min-w-[180px] px-6 sm:px-8 py-3.5 sm:py-[18px] bg-[#d88f13] text-white hover:bg-[#c17f10] rounded-full text-[14px] sm:text-[15px] font-black tracking-normal uppercase transition-all duration-300 shadow-lg"
            >
              <Calendar size={18} />
              <span>BOOK NOW</span>
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center sm:min-w-[200px] min-w-[180px] px-6 sm:px-8 py-3.5 sm:py-[18px] bg-white text-black hover:bg-white/90 rounded-full text-[14px] sm:text-[15px] font-black tracking-normal uppercase transition-all duration-300 shadow-lg"
            >
              INSTANT QUOTE
            </a>
          </div>

        </motion.div>
      </div>


    </header>
  );
};

export default Hero;
