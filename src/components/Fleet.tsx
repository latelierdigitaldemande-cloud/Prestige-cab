import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CarFront, User, Briefcase, Navigation } from 'lucide-react';
import { Translation } from '../types';
import SectionHeader from './SectionHeader';

interface FleetProps {
  t: Translation;
}

const Fleet = ({ t }: FleetProps) => {
  const [activeVehicle, setActiveVehicle] = useState(0);

  const vehicles = [
    {
      id: 'vehicle-berline',
      img: "https://mcslimo.fr/wp-content/uploads/2023/04/eclass.png",
      name: t.v1_name,
      class: t.v1_class,
      pax: t.v1_pax,
      bag: t.v1_bag,
      specs: ["PELLETERIE Nappa", "AMBIENT LIGHTING", "WIFI ON BOARD"]
    },
    {
      id: 'vehicle-business',
      img: "https://mcslimo.fr/wp-content/uploads/2023/04/sclass.png",
      name: t.v2_name,
      class: t.v2_class,
      pax: t.v2_pax,
      bag: t.v2_bag,
      specs: ["FIRST CLASS REAR", "CHAUFFEUR PACKAGE", "MASSAGE SEATS"]
    },
    {
      id: 'vehicle-van',
      img: "https://mcslimo.fr/wp-content/uploads/2023/04/vclass.png",
      name: t.v3_name,
      class: t.v3_class,
      pax: t.v3_pax,
      bag: t.v3_bag,
      specs: ["CONFERENCE SEATING", "EXTRA LONG CHASSIS", "COLD DRINKS"]
    }
  ];

  const current = vehicles[activeVehicle];

  return (
    <section id="fleet" className="py-24 md:py-32 bg-primary-bg overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.01]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 w-full relative z-10">
        {/* Compact Header for mobile efficiency */}
        <div className="mb-12 lg:mb-20">
          <SectionHeader
            badgeIcon={CarFront}
            badgeText={t.fleet_label}
            title={{ primary: t.fleet_title1, secondary: t.fleet_title2 }}
            className="!mb-0"
            titleClassName="text-3xl sm:text-3xl lg:text-5xl"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Selector - More compact for mobile */}
          <div className="w-full lg:w-1/4 flex lg:flex-col gap-2 lg:gap-0 border-b lg:border-b-0 lg:border-l border-white/10 pb-4 lg:pb-0 lg:pl-6 order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible no-scrollbar">
            {vehicles.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setActiveVehicle(idx)}
                className={`group relative flex-shrink-0 lg:flex-shrink py-3 px-4 lg:px-0 lg:py-4 text-left transition-all duration-500 ${
                  activeVehicle === idx ? 'text-white' : 'text-white/25 hover:text-white/50'
                }`}
              >
                <motion.div 
                  initial={false}
                  animate={{ height: activeVehicle === idx ? (window.innerWidth >= 1024 ? '100%' : '2px') : '0%' }}
                  className="absolute left-0 bottom-0 lg:bottom-auto lg:top-0 w-full lg:w-[2px] bg-white hidden lg:block"
                />
                
                <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-3 lg:pl-6">
                  <span className="text-[9px] font-mono opacity-40">0{idx + 1}</span>
                  <h4 className="text-xs sm:text-sm lg:text-lg font-display font-medium uppercase tracking-wider whitespace-nowrap">
                    {v.name}
                  </h4>
                </div>
              </button>
            ))}
          </div>

          {/* Immersive Showcase Stage - Now with White Background */}
          <div className="w-full lg:w-3/4 relative flex-1 lg:flex-none min-h-0 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex flex-col"
              >
                {/* The "White Stage" */}
                <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-white rounded-[1.5rem] lg:rounded-[3rem] overflow-hidden flex items-center justify-center p-6 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                  {/* Subtle Gradient Shadow within white area */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200/50 to-transparent pointer-events-none" />
                  
                  <img
                    src={current.img}
                    className="w-full max-w-[90%] h-auto object-contain relative z-10 dr transition-transform duration-[2000ms]"
                    referrerPolicy="no-referrer"
                    alt={current.name}
                  />

                  {/* Floating Class Tag (Over White) */}
                  <div className="absolute top-4 right-6 lg:top-8 lg:right-10">
                    <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">
                      {current.class}
                    </span>
                  </div>

                  {/* Ghost Label in background of white area */}
                  <div className="absolute left-6 bottom-4 lg:left-10 lg:bottom-10 pointer-events-none select-none opacity-[0.03]">
                    <span className="text-[10vw] font-display font-black text-black leading-none">
                      {current.id.split('-')[1]}
                    </span>
                  </div>
                </div>

                {/* Sub-stage info - Compact Row */}
                <div className="mt-4 lg:mt-8 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
                  {/* Stats Row */}
                  <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 lg:p-3 rounded-full bg-white/5 border border-white/10">
                        <User size={14} className="text-white/60" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-xs lg:text-sm font-bold">{current.pax}</span>
                        <span className="text-[8px] text-white/30 uppercase tracking-widest font-bold">PAX</span>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="flex items-center gap-3">
                      <div className="p-2 lg:p-3 rounded-full bg-white/5 border border-white/10">
                        <Briefcase size={14} className="text-white/60" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-xs lg:text-sm font-bold">{current.bag}</span>
                        <span className="text-[8px] text-white/30 uppercase tracking-widest font-bold">LUGGAGE</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button - Scaled down for mobile fit */}
                  <a
                    href="tel:+33662284837"
                    className="flex items-center gap-4 bg-white text-black px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold uppercase text-[8px] lg:text-[10px] tracking-[0.2em] hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    {t.fleet_select}
                    <Navigation size={12} fill="black" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Fleet;
