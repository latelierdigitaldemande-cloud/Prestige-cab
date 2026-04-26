import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Plane, MapPin, Camera, Navigation, ArrowUpRight, Plus } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface ServicesProps {
  t: Translation;
}

const Services = ({ t }: ServicesProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const services = [
    {
      id: "01",
      title: t.svc1_title,
      desc: t.svc1_desc,
      icon: Plane,
      image: "https://www.haimourinternational.com/wp-content/uploads/2025/09/s1.jpg.webp",
      tag: "AIRPORT / TRAIN"
    },
    {
      id: "02",
      title: t.svc2_title,
      desc: t.svc2_desc,
      icon: MapPin,
      image: "https://www.haimourinternational.com/wp-content/uploads/2025/09/s2.jpg.webp",
      tag: "CITY / REGION"
    },
    {
      id: "03",
      title: t.svc3_title,
      desc: t.svc3_desc,
      icon: Camera,
      image: "https://www.haimourinternational.com/wp-content/uploads/2025/09/s3.jpg.webp",
      tag: "SIGHTSEEING"
    },
    {
      id: "04",
      title: t.svc4_title,
      desc: t.svc4_desc,
      icon: Briefcase,
      image: "https://www.haimourinternational.com/wp-content/uploads/2025/09/luxury-vehicle-provided-for-a-private-airport-tran-2025-03-10-01-51-18-utc.jpg.webp",
      tag: "BUSINESS"
    }
  ];

  return (
    <section id="services" className="relative min-h-[90vh] flex items-center bg-primary-bg py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Service Exploration */}
          <div className="flex flex-col h-full justify-center">
            <SectionHeader
              badgeIcon={Briefcase}
              badgeText={t.svc_label}
              title={t.svc_title}
              className="!mb-8 md:!mb-10"
              titleClassName="text-3xl sm:text-4xl lg:text-5xl max-w-lg"
            />

            {/* Collapsible Service Stack - Aligned with About Style */}
            <div className="flex flex-col text-left">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`group flex flex-col ${
                    index !== services.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="flex items-center gap-5 w-full text-left focus:outline-none py-3.5"
                  >
                    {/* High-Contrast Icon Pod - Exactly like About */}
                    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-700 shadow-xl ${
                      activeIndex === index ? 'bg-white text-black -rotate-6' : 'bg-white/5 text-white'
                    }`}>
                      <service.icon size={18} strokeWidth={1.5} />
                    </div>

                    <h3 className={`text-base md:text-lg font-extrabold tracking-tighter transition-all duration-500 flex-1 text-white ${
                      activeIndex === index ? 'translate-x-1' : ''
                    }`}>
                      {service.title}
                    </h3>

                    {/* Interaction Indicator - New high-visibility button */}
                    <div className="relative flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeIndex === index 
                          ? 'bg-white text-black rotate-180 scale-110' 
                          : 'bg-white/10 text-white group-hover:bg-white/20 group-hover:scale-105'
                      }`}>
                        <Plus 
                          size={18} 
                          strokeWidth={2.5} 
                          className={`transition-transform duration-500 ${activeIndex === index ? 'rotate-45' : ''}`}
                        />
                      </div>
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-[64px] pb-5 pr-4 flex flex-col gap-5">
                          <p className="text-text-muted text-[13px] md:text-sm font-light leading-relaxed max-w-md">
                            {service.desc}
                          </p>
                          
                          {/* Mobile/Tablet Image Visual */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:hidden w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-lg"
                          >
                            <img 
                              src={service.image} 
                              alt={service.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Pure Immersive Visual (Reduced Size) */}
          <div className="relative hidden lg:block rounded-[2rem] overflow-hidden bg-white/[0.02] aspect-[4/3] max-h-[500px]">
            <AnimatePresence mode="wait">
              {activeIndex !== null ? (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={services[activeIndex].image}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    alt={services[activeIndex].title}
                  />
                  
                  {/* Minimalist Floating Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    {(() => {
                      const Icon = services[activeIndex].icon;
                      return <Icon size={320} strokeWidth={0.3} className="text-white" />;
                    })()}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/[0.02]"
                >
                  <Briefcase size={80} strokeWidth={0.5} className="text-white/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
