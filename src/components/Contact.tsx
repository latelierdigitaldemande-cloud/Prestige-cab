import { motion } from 'motion/react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface ContactProps {
  t: Translation;
}

const Contact = ({ t }: ContactProps) => {
  return (
    <section id="contact" className="py-24 md:py-36 bg-tertiary-bg overflow-hidden border-t border-white/5 relative">
      {/* Background Image with Blended Dark Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://i.ibb.co/NgcX39fW/Bolt-Chauffeur-Media-9-c001644222.webp"
          alt="Premium Chauffeur background"
          className="w-full h-full object-cover object-center opacity-45 grayscale-[10%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/20 to-[#0a0a0a]/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl w-full text-center flex flex-col items-center"
        >
          <SectionHeader
            title={t.contact_title}
            centered={true}
            className="!mb-4"
            titleClassName="text-3xl sm:text-3xl lg:text-4xl"
          />
          <p className="text-text-subtle text-sm md:text-base leading-relaxed mb-8 font-light max-w-md text-center">
            {t.contact_desc}
          </p>
          <a
            href="tel:+33662284837"
            className="px-8 py-4 bg-white text-black rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-text-muted transition-all duration-500 inline-block shadow-xl"
          >
            {t.contact_cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
