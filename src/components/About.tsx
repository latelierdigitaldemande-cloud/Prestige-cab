import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, User, Navigation, Clock } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface AboutProps {
  t: Translation;
}

const images = [
  "https://www.haimourinternational.com/wp-content/uploads/2025/09/transport-delegation.webp",
  "https://www.haimourinternational.com/wp-content/uploads/2025/09/transport-delegation.webp",
  "https://www.haimourinternational.com/wp-content/uploads/2025/09/transport-delegation.webp"
];

const About = ({ t }: AboutProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const features = [
    { icon: User, title: t.about_feat1_title, desc: t.about_feat1_desc },
    { icon: Clock, title: t.about_feat2_title, desc: t.about_feat2_desc }
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center bg-primary-bg overflow-hidden py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 w-full h-full flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Carousel - Restored Original Design */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] overflow-hidden rounded-3xl bg-tertiary-bg border border-white/10 group shadow-2xl"
          >
            <img
              key={currentSlide}
              src={images[currentSlide]}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
              referrerPolicy="no-referrer"
              alt="Chauffeur service"
            />

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-primary-bg/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    currentSlide === i ? 'bg-white scale-125' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Text Content - More Compact Interactive Mechanic */}
          <div className="flex flex-col">
            <SectionHeader
              badgeIcon={ShieldCheck}
              badgeText={t.about_label}
              title={t.about_title}
            />

            <p className="text-text-muted text-base md:text-xl leading-relaxed mb-6 md:mb-8 font-light mt-[-2.5rem] md:mt-[-3.5rem]" dangerouslySetInnerHTML={{ __html: t.about_desc }} />

            {/* Collapsible Quality Stack - Scaled down 10% */}
            <div className="flex flex-col gap-3 text-left">
              {features.map((feat, index) => (
                <div 
                  key={index}
                  className="group flex flex-col"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="flex items-center gap-5 w-full text-left focus:outline-none py-3"
                  >
                    {/* High-Contrast Icon Pod - Scaled down */}
                    <div className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-700 shadow-xl ${
                      expandedIndex === index ? 'bg-white text-black -rotate-6' : 'bg-white/5 text-white'
                    }`}>
                      <feat.icon size={20} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className={`text-2xl md:text-xl font-extrabold tracking-tighter transition-all duration-500 ${
                      expandedIndex === index ? 'text-white translate-x-1' : 'text-white/40 group-hover:text-white/70'
                    }`}>
                      {feat.title}
                    </h3>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: expandedIndex === index ? 'auto' : 0,
                      opacity: expandedIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-[64px] pb-5 pr-4">
                      <p className="text-text-muted text-base md:text-lg font-light leading-relaxed max-w-xl">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Callout - Refined & Integrated Conclusion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 flex flex-col items-center text-center"
        >
          {/* Subtle Thematic Reference - No bars */}
          <div className="flex items-center justify-center mb-10 opacity-30">
            <ShieldCheck size={20} className="text-white" />
          </div>

          <div className="max-w-3xl">
            <p 
              className="text-text-muted text-lg md:text-2xl font-light leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: t.about_callout }} 
            />

            <a
              href="tel:+33662284837"
              className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-500 shadow-2xl"
            >
              <Navigation size={18} className="rotate-45" />
              <span>{t.hero_cta1}</span>
            </a>
          </div>

          {/* Minimal space prompt for next section */}
          <div className="mt-20 opacity-10">
            {/* Removed the bar */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
