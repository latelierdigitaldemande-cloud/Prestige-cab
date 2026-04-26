import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Plus } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface FleetFAQProps {
  t: Translation;
}

const FleetFAQ = ({ t }: FleetFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t.fleet_faq_q1, a: t.fleet_faq_a1 },
    { q: t.fleet_faq_q2, a: t.fleet_faq_a2 },
    { q: t.fleet_faq_q3, a: t.fleet_faq_a3 },
    { q: t.fleet_faq_q4, a: t.fleet_faq_a4 },
  ];

  return (
    <section id="fleet-faq" className="py-24 md:py-32 relative overflow-hidden bg-tertiary-bg border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader
          badgeIcon={Car}
          badgeText="FAQ"
          title={t.fleet_faq_title}
          centered
        />

        <div className="mt-16 md:mt-24">
          <div className="border-t border-white/10">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group border-b border-white/10"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 md:py-8 flex items-start justify-between text-left transition-colors duration-500 px-4 -mx-4 rounded-xl"
                >
                  <div className="flex flex-col">
                    <h3 className={`text-sm md:text-lg tracking-tight transition-all duration-500 text-white ${
                      openIndex === index ? 'font-bold' : 'font-medium'
                    }`}>
                      {faq.q}
                    </h3>
                  </div>
                  
                  <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    openIndex === index ? 'bg-white border-white text-black rotate-45' : 'bg-white/5 border-white/10 text-white'
                  }`}>
                    <Plus size={14} strokeWidth={1.5} />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="pr-12 pb-8">
                        <motion.p 
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-text-subtle text-xs md:text-base font-light leading-relaxed max-w-2xl"
                        >
                          {faq.a}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetFAQ;
