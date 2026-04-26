import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Star } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface FeaturesProps {
  t: Translation;
}

const Features = ({ t }: FeaturesProps) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y1 = useTransform(springScroll, [0, 1], [0, -60]);
  const y2 = useTransform(springScroll, [0, 1], [0, -20]);
  const y3 = useTransform(springScroll, [0, 1], [0, 20]);

  const cards = [
    {
      img: "https://images.unsplash.com/photo-1629019878688-f5d58a41b188?auto=format&fit=crop&q=80&w=800",
      title: t.feat1_title,
      desc: t.feat1_desc,
      y: y1
    },
    {
      img: "https://images.unsplash.com/photo-1720731035872-7aa3708996c1?auto=format&fit=crop&q=80&w=800",
      title: t.feat2_title,
      desc: t.feat2_desc,
      y: y2
    },
    {
      img: "https://prestige-transfer-london.com/transfer/mercedes-v-londone_web.jpg",
      title: t.feat3_title,
      desc: t.feat3_desc,
      y: y3
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="py-24 md:py-32 bg-tertiary-bg overflow-hidden border-y border-white/5 relative"
    >
      {/* Discrete Background Effects (Matches Gallery Style) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        {/* Soft Blooms */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-white/[0.015] blur-[180px] rounded-full" />
        
        {/* Large Decorative Icon - Faint & Rotated */}
        <div className="absolute -bottom-32 -right-32 opacity-[0.02] rotate-[15deg] scale-150">
          <Star size={600} strokeWidth={0.3} className="text-white" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16 md:mb-24">
          <SectionHeader
            badgeIcon={Star}
            badgeText={t.feat_label.replace('— ', '')}
            title={{ primary: t.feat_title1, secondary: t.feat_title2 }}
            className="!mb-0"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 lg:pl-10 border-l-0 lg:border-l border-white/10"
          >
            <p className="text-text-subtle text-sm md:text-base font-light leading-relaxed">
              {t.feat_desc}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {[t.feat_spec1, t.feat_spec2].map((spec, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.2em] font-medium">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {cards.map((card, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="group flex flex-col"
            >
              <motion.div 
                style={{ y: card.y }}
                className="aspect-[2/3] md:aspect-[3/5] rounded-3xl overflow-hidden border border-white/10 bg-primary-bg shadow-2xl relative will-change-transform"
              >
                <img
                  src={card.img}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  alt={card.title}
                />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
