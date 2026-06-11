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
    { q: t.fleet_faq_q4, a: t.fleet_faq_a4 },
    { q: t.fleet_faq_q5, a: t.fleet_faq_a5 },
  ];

  return (
    <section id="fleet-faq" className="pt-14 pb-16 md:pt-18 md:pb-20 relative overflow-hidden bg-tertiary-bg border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <SectionHeader
          badgeIcon={Car}
          badgeText="FAQ"
          title={t.fleet_faq_title}
          centered
          titleClassName="text-[34px] md:text-[40px] lg:text-[46px]"
          badgeClassName="!pl-1 !pr-3.5 !py-1 !gap-2"
          badgeIconContainerClassName="w-[30px] h-[30px]"
          badgeIconSize={15}
          badgeTextClassName="text-[11px] tracking-[0.16em]"
        />

        <div className="mt-6 md:mt-3">
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group px-6 md:px-8"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 md:py-8 flex items-start justify-between text-left transition-colors duration-500"
                >
                  <div className="flex flex-col">
                    <h3 className={`text-lg md:text-lg tracking-tight transition-all duration-500 text-white ${
                      openIndex === index ? 'font-bold' : 'font-semibold'
                    }`}>
                      {faq.q}
                    </h3>
                  </div>
                  
                  <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white transition-all duration-500 ${
                    openIndex === index ? 'text-white rotate-45' : 'text-white/80'
                  }`}>
                    <Plus size={14} strokeWidth={2.5} />
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
                          className="text-white text-[15px] md:text-[15px] font-medium leading-relaxed max-w-2xl"
                        >
                          {faq.a}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {index < faqs.length - 1 && (
                  <div className="h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetFAQ;
