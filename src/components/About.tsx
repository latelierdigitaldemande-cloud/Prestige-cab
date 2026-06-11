import React from 'react';
import { ShieldCheck, Star, Clock, Calendar } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface AboutProps {
  t: Translation;
  lang?: string;
}

const About = ({ t }: AboutProps) => {
  return (
    <section id="about" className="relative bg-primary-bg overflow-hidden py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 w-full h-full flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Static Image Left */}
          <div className="relative h-[580px] md:h-[420px] lg:h-[480px] w-full overflow-hidden rounded-3xl bg-tertiary-bg border border-white/10 group shadow-2xl">
            <img
              src="https://www.haimourinternational.com/wp-content/uploads/2025/09/transport-delegation.webp"
              className="absolute inset-0 w-full h-full object-cover opacity-100"
              referrerPolicy="no-referrer"
              alt="Chauffeur service"
            />
          </div>

          {/* Text Details Right */}
          <div className="flex flex-col">
            <SectionHeader
              badgeIcon={ShieldCheck}
              badgeText={t.about_label}
              title={t.about_title}
              className="!mb-8"
            />

            {/* Description */}
            <p 
              className="text-text-muted text-sm md:text-lg leading-relaxed mb-6 md:mb-8 font-light mt-[-1.5rem] md:mt-[-2.5rem]"
              dangerouslySetInnerHTML={{ __html: t.about_desc }}
            />

            {/* Quality Stack */}
            <div className="flex flex-col gap-2.5 text-left">
              
              {/* Accordion Card 1 */}
              <div className="group flex flex-col">
                <div className="flex items-center gap-3.5 w-full text-left pt-2 pb-0.5">
                  <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-700 shadow-xl bg-green-600 text-white">
                    <Star size={14} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-base font-extrabold tracking-tighter text-white">
                    {t.about_feat1_title}
                  </h3>
                </div>
                <div className="pl-11 pb-3 pr-4">
                  <p className="text-text-muted text-xs md:text-sm font-light leading-relaxed max-w-xl">
                    {t.about_feat1_desc}
                  </p>
                </div>
              </div>

              {/* Accordion Card 2 */}
              <div className="group flex flex-col">
                <div className="flex items-center gap-3.5 w-full text-left pt-2 pb-0.5">
                  <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-700 shadow-xl bg-green-600 text-white">
                    <Clock size={14} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-base font-extrabold tracking-tighter text-white">
                    {t.about_feat2_title}
                  </h3>
                </div>
                <div className="pl-11 pb-3 pr-4">
                  <p className="text-text-muted text-xs md:text-sm font-light leading-relaxed max-w-xl">
                    {t.about_feat2_desc}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Callout Conclusion text & Button */}
        <div className="mt-20 md:mt-24 flex flex-col items-center text-center">
          <div className="max-w-xl">
            <p className="text-text-muted text-sm sm:text-base md:text-lg font-light leading-snug mb-12">
              {t.about_callout}
            </p>

            <a
              href="tel:+33662284837"
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-white text-black hover:bg-white/90 rounded-full text-sm md:text-base font-bold transition-all duration-500 shadow-2xl"
            >
              <Calendar size={18} className="text-black" />
              <span>{t.hero_cta1}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
