import { motion } from 'motion/react';
import { ShieldCheck, Navigation } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface AboutProps {
  t: Translation;
}

const aboutImage = "https://i.ibb.co/jZVCPQRm/Bolt-Chauffeur-Media-5-cd0f32217c.webp";

const About = ({ t }: AboutProps) => {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-primary-bg border-b border-white/5 overflow-hidden flex items-center min-h-[80vh] md:min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 w-full h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content - More Compact Interactive Mechanic */}
          <div className="flex flex-col order-2 lg:order-1">
            <SectionHeader
              badgeIcon={ShieldCheck}
              badgeText={t.about_label}
              title={t.about_title}
              titleClassName="text-[44px] lg:text-[56px]"
              className="!mb-6 md:!mb-8"
            />

            <p className="text-text-subtle text-[15px] md:text-[17px] font-light leading-relaxed mb-6 md:mb-8" dangerouslySetInnerHTML={{ __html: t.about_desc }} />

            {/* Mobile/Tablet Callout - Positioned above the image in stacked grid */}
            <div className="lg:hidden mt-4 mb-10 flex flex-col items-center text-center">
              <p 
                className="text-text-subtle text-[15px] md:text-[17px] font-light leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: t.about_callout }} 
              />
              <a
                href="tel:+33662284837"
                className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black hover:bg-white/90 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl"
              >
                <Navigation size={16} className="rotate-45" />
                <span>{t.hero_cta1}</span>
              </a>
            </div>
          </div>

          {/* Single Static Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative aspect-[4/4.32] md:aspect-[3/4.8] lg:aspect-[4/3.6] overflow-hidden rounded-3xl bg-tertiary-bg border border-white/10 group shadow-2xl order-1 lg:order-2"
          >
            <img
              src={aboutImage}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] ease-[0.16, 1, 0.3, 1]"
              referrerPolicy="no-referrer"
              alt="Chauffeur service"
            />
          </motion.div>
        </div>

        {/* About Callout - Refined & Integrated Conclusion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 hidden lg:flex flex-col items-center text-center"
        >
          {/* Subtle Thematic Reference - No bars */}
          <div className="flex items-center justify-center mb-10 opacity-30">
            <ShieldCheck size={20} className="text-white" />
          </div>

          <div className="max-w-3xl">
            <p 
              className="text-text-subtle text-[15px] md:text-[17px] font-light leading-relaxed mb-16"
              dangerouslySetInnerHTML={{ __html: t.about_callout }} 
            />

            <a
              href="tel:+33662284837"
              className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black hover:bg-white/90 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl"
            >
              <Navigation size={18} className="rotate-45" />
              <span>{t.hero_cta1}</span>
            </a>
          </div>

          {/* Minimal space prompt for next section */}
          <div className="mt-20 opacity-10">
            {/* Removed the bar */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
