import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badgeIcon: LucideIcon;
  badgeText: string;
  title: string | { primary: string; secondary?: string };
  centered?: boolean;
  inverted?: boolean;
  className?: string;
  titleClassName?: string;
}

const SectionHeader = ({ 
  badgeIcon: BadgeIcon, 
  badgeText, 
  title, 
  centered = false, 
  inverted = false,
  className = '',
  titleClassName = ''
}: SectionHeaderProps) => {
  const isStringTitle = typeof title === 'string';

  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'} mb-16 md:mb-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`inline-flex items-center gap-3 mb-8 pl-1.5 pr-4 py-1.5 rounded-full border-2 ${
          inverted ? 'border-black/50 bg-transparent' : 'border-white/50 bg-transparent'
        } shadow-inner w-fit backdrop-blur-sm`}
      >
        <span className={`flex items-center justify-center w-7 h-7 rounded-full ${
          inverted ? 'bg-black text-white' : 'bg-white text-black'
        }`}>
          <BadgeIcon size={14} />
        </span>
        <span className={`${inverted ? 'text-black' : 'text-white'} text-[9px] font-bold uppercase tracking-[0.15em]`}>
          {badgeText}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`font-display ${inverted ? 'text-black' : 'text-white'} ${
          titleClassName || 'text-5xl sm:text-5xl lg:text-6xl'
        } font-bold leading-[1.1] tracking-tight`}
      >
        {isStringTitle ? (
          title
        ) : (
          <>
            {title.primary} {title.secondary && <br className="hidden md:block" />}
            {title.secondary && <span className={inverted ? 'text-black/40' : 'text-white/20'}>{title.secondary}</span>}
          </>
        )}
      </motion.h2>
    </div>
  );
};

export default SectionHeader;
