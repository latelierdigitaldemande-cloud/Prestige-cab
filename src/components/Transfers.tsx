import { motion } from 'motion/react';
import { Plane, ArrowUpRight, Mouse, Navigation } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface TransfersProps {
  t: Translation;
}

const Transfers = ({ t }: TransfersProps) => {
  const rates = [
    { id: 'transfer-paris-cdg', icon: Plane, label: 'CDG', from: 'Paris', to: 'CDG', price: '70 €', desc: t.tr_card1_desc, image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=600" },
    { id: 'transfer-cdg-paris', icon: Plane, label: 'CDG', from: 'CDG', to: 'Paris', price: '80 €', desc: t.tr_card2_desc, image: "https://images.unsplash.com/photo-1610636838332-9df7d838563c?auto=format&fit=crop&q=80&w=600" },
    { id: 'transfer-orly-paris', icon: Plane, label: 'ORY', from: 'Orly', to: 'Paris', price: '65 €', desc: t.tr_card3_desc, image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=600" },
    { id: 'transfer-paris-disney', icon: Mouse, label: 'MLV', from: 'Paris', to: 'Disneyland', price: '80 €', desc: t.tr_card4_desc, image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=600" },
  ];

  return (
    <section id="transfers" className="py-24 md:py-32 bg-primary-bg relative overflow-hidden border-t border-white/5">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-15deg] translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <SectionHeader
              badgeIcon={Navigation}
              badgeText={t.tr_label.replace('— ', '')}
              title={t.tr_title}
            />

            <a
              href="tel:+33662284837"
              className="px-10 py-5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-text-muted transition-all duration-500 w-fit shadow-2xl"
            >
              <span>{t.tr_cta}</span>
              <ArrowUpRight size={18} />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {rates.map((rate, index) => (
              <motion.div
                key={rate.id}
                id={rate.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group bg-tertiary-bg border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-700 flex flex-col cursor-pointer active:scale-[0.98] shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={rate.image}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    alt={rate.from}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tertiary-bg/80 to-transparent" />
                  <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/20 flex items-center gap-2">
                    <rate.icon size={12} />
                    {rate.label}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-xl font-bold tracking-tight">
                      {rate.from} → {rate.to}
                    </h3>
                  </div>
                  <p className="text-text-subtle text-sm font-light leading-relaxed mb-6 flex-grow">
                    {rate.desc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-white font-display font-extrabold text-2xl tracking-tighter">
                      {rate.price}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Transfers;
