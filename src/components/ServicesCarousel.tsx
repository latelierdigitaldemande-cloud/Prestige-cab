import { motion } from 'motion/react';
import { LayoutGrid, ArrowUpRight } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface ServicesCarouselProps {
  t: Translation;
}

const ServicesCarousel = ({ t }: ServicesCarouselProps) => {
  const serviceItems = [
    {
      img: "https://www.haimourinternational.com/wp-content/uploads/2025/09/s2.jpg.webp",
      title: t.svc1_title,
      desc: t.svc1_desc
    },
    {
      img: "https://www.haimourinternational.com/wp-content/uploads/2025/09/s3.jpg.webp",
      title: t.svc2_title,
      desc: t.svc2_desc
    },
    {
      img: "https://www.haimourinternational.com/wp-content/uploads/2025/09/luxury-vehicle-provided-for-a-private-airport-tran-2025-03-10-01-51-18-utc.jpg.webp",
      title: t.svc3_title,
      desc: t.svc3_desc
    },
    {
      img: "https://www.haimourinternational.com/wp-content/uploads/2025/09/s1.jpg.webp",
      title: t.svc4_title,
      desc: t.svc4_desc
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary-bg overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="flex-1">
          <SectionHeader
            badgeIcon={LayoutGrid}
            badgeText={t.svc_label.replace('— ', '')}
            title={t.svc_title}
          />
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-text-subtle text-lg font-light max-w-sm leading-relaxed mb-16 md:mb-24"
        >
          {t.svc_sub}
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-nowrap lg:gap-8 lg:overflow-x-auto lg:snap-x lg:snap-mandatory lg:hide-scrollbar pb-20 pt-4 md:gap-8">
          {serviceItems.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-[420px] lg:shrink-0 lg:snap-start bg-tertiary-bg rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-700 group shadow-2xl mb-8 lg:mb-0"
            >
              <div className="aspect-[16/10] overflow-hidden bg-primary-bg relative">
                <img
                  src={service.img}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  alt={service.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tertiary-bg via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-10 md:p-14 flex flex-col h-[300px]">
                <h3 className="text-white text-3xl font-bold mb-6 tracking-tight leading-tight">
                  {service.title}
                </h3>
                <p className="text-text-subtle text-base leading-relaxed mb-10 font-light flex-grow">
                  {service.desc}
                </p>
                <button className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-white group-hover:text-text-muted transition-colors w-full border-t border-white/10 pt-8 mt-auto group/btn">
                  <span>{t.svc_explore}</span>
                  <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
