import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface ContactProps {
  t: Translation;
}

const Contact = ({ t }: ContactProps) => {
  const contactInfo = [
    {
      icon: Mail,
      label: "monsiteparis@gmail.com",
      href: "mailto:monsiteparis@gmail.com"
    },
    {
      icon: Phone,
      label: "(+33) 6 62 28 48 37",
      href: "tel:+33662284837"
    },
    {
      icon: MapPin,
      label: "Paris, Île-de-France",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-40 bg-tertiary-bg overflow-hidden border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-contact-bg p-12 md:p-20 rounded-[3rem] border border-white/5 shadow-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-colors duration-1000" />
            
            <SectionHeader
              badgeIcon={Send}
              badgeText="CONTACT"
              title={t.contact_title}
            />
            <p className="text-text-subtle text-base md:text-lg leading-relaxed mb-16 font-light mt-[-2rem]">
              {t.contact_desc}
            </p>
            <a
              href="tel:+33662284837"
              className="px-12 py-5 bg-white text-black rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-text-muted transition-all duration-500 inline-block shadow-2xl"
            >
              {t.contact_cta}
            </a>
          </motion.div>
          
          <div className="space-y-12 lg:pl-12">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-8 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-transparent border-2 border-white/50 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-700 shadow-xl group-hover:scale-110 backdrop-blur-sm">
                  <info.icon size={28} />
                </div>
                <span className="text-text-muted text-lg md:text-xl font-light group-hover:text-white transition-colors tracking-tight">
                  {info.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Graphic */}
      <div className="absolute bottom-0 right-0 text-[20rem] font-display font-black text-white/[0.02] select-none z-0 translate-y-1/3 translate-x-1/4 pointer-events-none">
        PARIS
      </div>
    </section>
  );
};

export default Contact;
