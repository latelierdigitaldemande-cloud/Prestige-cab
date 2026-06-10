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
    <section id="services" className="relative min-h-[60vh] flex items-center bg-[#111111] py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 w-full relative z-10">
        <div className="flex flex-col h-full justify-center max-w-3xl">
          <SectionHeader
            badgeIcon={Briefcase}
            badgeText={t.svc_label}
            title={t.svc_title}
            className="!mb-14 md:!mb-20"
            titleClassName="text-[44px] lg:text-[56px]"
          />

          {/* Collapsible Service Stack */}
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
                  className="flex items-center gap-5 w-full text-left focus:outline-none py-4"
                >
                  {/* High-Contrast Icon Pod */}
                  <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-700 shadow-xl ${
                    activeIndex === index ? 'bg-white text-black -rotate-6' : 'bg-white/5 text-white'
                  }`}>
                    <service.icon size={18} strokeWidth={1.5} />
                  </div>

                  <h3 className={`text-xl md:text-2xl font-extrabold tracking-tighter transition-all duration-500 flex-1 text-white ${
                    activeIndex === index ? 'translate-x-1' : ''
                  }`}>
                    {service.title}
                  </h3>

                  {/* Interaction Indicator */}
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
                      <div className="pl-[60px] pb-6 pr-4 flex flex-col gap-5">
                        <p className="text-text-muted text-sm md:text-base font-light leading-relaxed max-w-2xl">
                          {service.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
