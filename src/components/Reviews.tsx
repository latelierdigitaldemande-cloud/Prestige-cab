import { motion } from 'motion/react';
import { Users, Star } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface ReviewsProps {
  t: Translation;
}

const Reviews = ({ t }: ReviewsProps) => {
  const reviews = [
    {
      initials: "CN",
      name: "C N-S",
      quote: t.rev1_quote,
      delay: 0
    },
    {
      initials: "GS",
      name: "Gabriele Schindeler",
      quote: t.rev2_quote,
      delay: 0.2
    },
    {
      initials: "MA",
      name: "Mohamed Ali Bedoui",
      quote: t.rev3_quote,
      delay: 0.4
    }
  ];

  return (
    <section id="reviews" className="py-24 md:py-32 bg-secondary-bg overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
        <SectionHeader
          badgeIcon={Users}
          badgeText={t.rev_label.replace('— ', '')}
          title={t.rev_title}
          centered
        />

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: rev.delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="bg-card-bg p-10 md:p-14 rounded-[3rem] border border-white/5 flex flex-col group hover:border-white/20 transition-all duration-700 shadow-xl"
            >
              <div className="flex items-center gap-1 mb-10 transition-transform duration-500 group-hover:scale-105">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed mb-12 font-light italic flex-grow">
                {rev.quote}
              </p>
              <div className="flex items-center gap-6 mt-auto">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white transition-all duration-700 group-hover:bg-white group-hover:text-black shadow-lg">
                  {rev.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-base font-bold block tracking-tight">{rev.name}</span>
                  <span className="text-text-subtle text-[10px] uppercase font-bold tracking-[0.1em] mt-1">{t.rev_month}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
