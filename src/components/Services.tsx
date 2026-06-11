import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Plane, MapPin, Camera, Navigation, ArrowUpRight, Plus, Clock } from 'lucide-react';
import { Translation, Language } from '../types';
import SectionHeader from './SectionHeader';
import BookingForm from './BookingForm';

interface ServicesProps {
  t: Translation;
  lang: Language;
}

const Services = ({ t, lang }: ServicesProps) => {
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
      icon: Clock,
      image: "https://www.haimourinternational.com/wp-content/uploads/2025/09/s3.jpg.webp",
      tag: "HOURLY"
    },
    {
      id: "04",
      title: t.svc4_title,
      desc: t.svc4_desc,
      icon: Navigation,
      image: "https://www.haimourinternational.com/wp-content/uploads/2025/09/luxury-vehicle-provided-for-a-private-airport-tran-2025-03-10-01-51-18-utc.jpg.webp",
      tag: "LONG DISTANCE"
    }
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-black border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 w-full relative z-10">
        
        {/* Modern 2-column grid layout for desktop, single stacked layout for mobile/tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Services Header and Services Stack */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center">
            <SectionHeader
              badgeIcon={Briefcase}
              badgeText={t.svc_label}
              title={t.svc_title}
              className="!mb-10 md:!mb-14 text-left"
              titleClassName="text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.15]"
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
                    className="flex items-center justify-between w-full text-left focus:outline-none py-6"
                  >
                    <h3 className={`text-[18px] md:text-xl font-display font-semibold tracking-tight transition-all duration-500 flex-1 text-white ${
                      activeIndex === index ? 'translate-x-1' : 'group-hover:translate-x-1'
                    }`}>
                      {service.title}
                    </h3>

                    {/* Interaction Indicator */}
                    <div className="relative flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeIndex === index 
                          ? 'bg-white text-black rotate-180 scale-110' 
                          : 'bg-white/5 text-white border border-white/10 group-hover:bg-white/10 group-hover:scale-105'
                      }`}>
                        <Plus 
                          size={18} 
                          strokeWidth={2} 
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
                        <div className="pb-8 pr-4 flex flex-col gap-5">
                          <p className="text-zinc-300 text-[15px] md:text-[17px] font-light leading-relaxed max-w-2xl">
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

          {/* Right Column: Dynamic Form Container that stacks below on small screens and sticks on desktop */}
          <div className="lg:col-span-7 xl:col-span-6 w-full lg:sticky lg:top-28">
            <BookingForm lang={lang} isEmbed={true} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;
