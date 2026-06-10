import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Briefcase, 
  User, 
  Mail, 
  Phone as PhoneIcon, 
  Car, 
  MessageSquare,
  ShieldCheck,
  Clock3
} from 'lucide-react';
import { Language } from '../types';

interface BookingFormProps {
  lang: Language;
}

type ServiceType = 'transfer' | 'hourly';
type VehicleType = 'luxury' | 'business' | 'van';

const formTranslations = {
  fr: {
    badge: "BOOKING",
    title: "Réservez votre Chauffeur Privé",
    subtitle: "Planifiez votre prise en charge haut de gamme en quelques clics.",
    tab_transfer: "Aller Simple",
    tab_hourly: "Mise à Disposition",
    pickup_label: "Départ",
    pickup_placeholder: "Lieu de prise en charge",
    dropoff_label: "Arrivée",
    dropoff_placeholder: "Destination",
    duration_label: "Durée souhaitée",
    duration_hour: "Heure",
    duration_hours: "Heures",
    date_label: "Date",
    time_label: "Heure",
    vehicle_label: "Type de véhicule",
    pax_label: "Passager(s)",
    luggage_label: "Bagage(s)",
    contact_section: "Vos informations de contact",
    name_label: "Nom & prénom",
    name_placeholder: "Votre nom complet pour l'accueil",
    phone_label: "Numéro de téléphone (WhatsApp)",
    phone_placeholder: "Ex: +33 6 12 34 56 78",
    email_label: "Adresse e-mail",
    email_placeholder: "Ex: contact@email.com",
    notes_label: "Notes ou n° de vol / train (optionnel)",
    notes_placeholder: "Ex: Indiquez votre numéro de vol pour le suivi du retard...",
    summary_title: "Récapitulatif de votre Demande",
    summary_empty: "Veuillez remplir les informations de prise en charge pour voir le récapitulatif.",
    button_whatsapp: "Envoyer ma demande par WhatsApp",
    button_sms: "Envoyer par SMS",
    success_status: "Demande de devis prête ! Cliquez ci-dessous pour confirmer.",
    missing_fields_warning: "Veuillez renseigner les champs requis (*) pour générer la demande.",
    berline_name: "Berline Confort",
    berline_class: "Premium Standard",
    business_name: "Berline Affaires",
    business_class: "Premium VIP",
    van_name: "Luxe Van",
    van_class: "Grand Espace",
    pax_unit: "pers.",
    bag_unit: "bagages",
  },
  en: {
    badge: "BOOKING",
    title: "Book your Private Chauffeur",
    subtitle: "Plan your premium transport in a couple of clicks.",
    tab_transfer: "One-Way",
    tab_hourly: "Hourly",
    pickup_label: "Departure",
    pickup_placeholder: "Pick-up location",
    dropoff_label: "Arrival",
    dropoff_placeholder: "Destination",
    duration_label: "Desired Duration",
    duration_hour: "Hour",
    duration_hours: "Hours",
    date_label: "Date",
    time_label: "Time",
    vehicle_label: "Vehicle type",
    pax_label: "Passenger(s)",
    luggage_label: "Bag(s)",
    contact_section: "Your contact details",
    name_label: "Full name",
    name_placeholder: "Your full name for boarding meetup",
    phone_label: "Phone number (WhatsApp)",
    phone_placeholder: "e.g. +33 6 12 34 56 78",
    email_label: "Email address",
    email_placeholder: "e.g. name@email.com",
    notes_label: "Notes or flight / train number (optional)",
    notes_placeholder: "e.g. Provide your flight number for delay tracking...",
    summary_title: "Request Summary",
    summary_empty: "Fill in the pick-up details to view your request summary.",
    button_whatsapp: "Send My Request via WhatsApp",
    button_sms: "Send via SMS",
    success_status: "Quote request ready! Click below to confirm.",
    missing_fields_warning: "Please fill in all required fields (*) to generate your request.",
    berline_name: "Comfort Sedan",
    berline_class: "Premium Standard",
    business_name: "Business Sedan",
    business_class: "Premium VIP",
    van_name: "Luxury Van",
    van_class: "Large Capacity",
    pax_unit: "pax",
    bag_unit: "bags",
  }
};

const BookingForm = ({ lang }: BookingFormProps) => {
  const s = useMemo(() => formTranslations[lang], [lang]);

  // Form State
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType>('transfer');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [duration, setDuration] = useState('4'); // Default 4 hours for hourly
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicle, setVehicle] = useState<VehicleType>('business');
  const [pax, setPax] = useState('2');
  const [baggage, setBaggage] = useState('2');

  const isStep1Valid = useMemo(() => {
    const commonFields = pickup && date && time;
    if (serviceType === 'transfer') {
      return !!(commonFields && dropoff);
    }
    return !!commonFields;
  }, [serviceType, pickup, dropoff, date, time]);
  
  // Contact State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Dropdown list values
  const durationOptions = ['2', '3', '4', '5', '6', '8', '10', '12', '24'];
  const paxOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const bagOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  // Check if form has mandatory fields
  const isFormValid = useMemo(() => {
    const commonFields = pickup && date && time && name && phone;
    if (serviceType === 'transfer') {
      return commonFields && dropoff;
    }
    return commonFields;
  }, [serviceType, pickup, dropoff, date, time, name, phone]);

  // Construct structured messages
  const messageText = useMemo(() => {
    if (!pickup || !date || !time) return '';

    const typeStr = serviceType === 'transfer' 
      ? (lang === 'fr' ? 'Transfert Simple (Aller simple)' : 'One-Way Transfer')
      : (lang === 'fr' ? `Mise à Disposition (${duration} heures)` : `Hourly Service (${duration} hours)`);

    const destStr = serviceType === 'transfer' 
      ? `📍 *Arrivée* : ${dropoff}`
      : `⏱️ *Durée* : ${duration} ${lang === 'fr' ? 'heures' : 'hours'}`;

    const vehicleName = vehicle === 'luxury' 
      ? (lang === 'fr' ? 'Berline Confort' : 'Comfort Sedan')
      : vehicle === 'business'
      ? (lang === 'fr' ? 'Berline Affaires Classe E' : 'Business Sedan E-Class')
      : (lang === 'fr' ? 'Mercedes Classe V (Van)' : 'Mercedes V-Class (Van)');

    return `*LUXURA CHAUFFEUR - NOUVELLE DEMANDE DE BOOKING*

📌 *Service* : ${typeStr}
🛫 *Prise en charge* : ${pickup}
${destStr}
📅 *Date* : ${date}
⏰ *Heure* : ${time}

🚗 *Véhicule* : ${vehicleName}
👥 *Passagers* : ${pax} ${lang === 'fr' ? 'personne(s)' : 'pax'}
💼 *Bagages* : ${baggage} ${lang === 'fr' ? 'valise(s)' : 'bag(s)'}

👤 *Client* : ${name}
📞 *Téléphone* : ${phone}
✉️ *E-mail* : ${email || 'Non renseigné'}
📝 *Notes / Vol* : ${notes || 'Aucune'}`;
  }, [lang, serviceType, pickup, dropoff, duration, date, time, vehicle, pax, baggage, name, phone, email, notes]);

  // Generate URL links
  const whatsappUrl = useMemo(() => {
    const formattedPhone = "33662284837"; // Business line
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText)}`;
  }, [messageText]);

  const smsUrl = useMemo(() => {
    const formattedPhone = "+33662284837";
    // Using simple format that works on both iOS & Android
    return `sms:${formattedPhone}?&body=${encodeURIComponent(messageText)}`;
  }, [messageText]);

  return (
    <section id="reservation" className="py-20 md:py-32 bg-primary-bg relative border-t border-b border-white/5 overflow-hidden">
      {/* Decorative luxury gradient background glow */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[25rem] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[20rem] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">


        {/* Real Dynamic Booking Card */}
        <div className="max-w-3xl mx-auto relative z-10">
          
          {/* Main Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-[#111113] border border-zinc-800/60 rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative text-white"
          >


            <div className="space-y-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  {/* Elegant Tab Segment Controls */}
                  <div className="relative flex p-1 bg-zinc-950 border border-zinc-800 rounded-2xl mb-10 max-w-md mx-auto sm:mx-0">
                    <button
                      type="button"
                      onClick={() => setServiceType('transfer')}
                      className={`relative z-10 flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-xl duration-500 ${
                        serviceType === 'transfer' ? 'text-zinc-950 font-extrabold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s.tab_transfer}
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('hourly')}
                      className={`relative z-10 flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-xl duration-500 ${
                        serviceType === 'hourly' ? 'text-zinc-950 font-extrabold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s.tab_hourly}
                    </button>

                    {/* Slider highlight */}
                    <motion.div
                      layoutId="activeTabSelection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-y-1 rounded-xl bg-white"
                      style={{
                        width: 'calc(50% - 4px)',
                        left: serviceType === 'transfer' ? '4px' : 'calc(50%)',
                      }}
                    />
                  </div>

                  {/* Step 1: Core Ride Details */}
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Pick up location */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                          <MapPin size={13} className="text-zinc-500" />
                          {s.pickup_label} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          placeholder={s.pickup_placeholder}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white placeholder-zinc-500 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                        />
                      </div>

                      {/* Drop off OR Hours Duration */}
                      {serviceType === 'transfer' ? (
                        <div className="flex flex-col gap-2">
                          <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                            <MapPin size={13} className="text-zinc-500" />
                            {s.dropoff_label} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={dropoff}
                            onChange={(e) => setDropoff(e.target.value)}
                            placeholder={s.dropoff_placeholder}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white placeholder-zinc-500 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                            <Clock3 size={13} className="text-zinc-500" />
                            {s.duration_label} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-white"
                            >
                              {durationOptions.map((hour) => (
                                <option key={hour} value={hour} className="bg-zinc-900 text-white py-2">
                                  {hour} {parseInt(hour) === 1 ? s.duration_hour : s.duration_hours}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-zinc-500">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                      {/* Date selection */}
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                          <Calendar size={13} className="text-zinc-500" />
                          {s.date_label} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white transition-all font-normal focus:outline-none [color-scheme:dark]"
                        />
                      </div>

                      {/* Time selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                          <Clock size={13} className="text-zinc-500" />
                          {s.time_label} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="time"
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white transition-all font-normal focus:outline-none [color-scheme:dark]"
                        />
                      </div>

                      {/* Pax count drop down */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                          <Users size={13} className="text-zinc-500" />
                          {s.pax_label}
                        </label>
                        <div className="relative">
                          <select
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-white"
                          >
                            {paxOptions.map((n) => (
                              <option key={n} value={n} className="bg-zinc-900 text-white">
                                {n}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-zinc-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle selection */}
                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                      <Car size={13} className="text-zinc-500" />
                      {s.vehicle_label}
                    </label>

                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Vehicle 1 */}
                      <button
                        type="button"
                        onClick={() => setVehicle('luxury')}
                        className={`text-left p-5 rounded-2xl border transition-all duration-500 relative flex flex-col justify-between h-36 ${
                          vehicle === 'luxury' 
                            ? 'border-white bg-zinc-950 shadow-md ring-1 ring-white' 
                            : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/80'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-bold text-sm tracking-wide">{s.berline_name}</h4>
                            {vehicle === 'luxury' && (
                              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black">
                                <span className="text-[9px] font-bold">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-zinc-400 text-[10px] font-medium mt-1 tracking-wider uppercase">{s.berline_class}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium mt-4">
                          <span className="flex items-center gap-1"><Users size={12} /> 3</span>
                          <span className="flex items-center gap-1"><Briefcase size={12} /> 2</span>
                        </div>
                      </button>

                      {/* Vehicle 2 */}
                      <button
                        type="button"
                        onClick={() => setVehicle('business')}
                        className={`text-left p-5 rounded-2xl border transition-all duration-500 relative flex flex-col justify-between h-36 ${
                          vehicle === 'business' 
                            ? 'border-white bg-zinc-950 shadow-md ring-1 ring-white' 
                            : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/80'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-bold text-sm tracking-wide">{s.business_name}</h4>
                            {vehicle === 'business' && (
                              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black">
                                <span className="text-[9px] font-bold">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-zinc-400 text-[10px] font-medium mt-1 tracking-wider uppercase">{s.business_class}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium mt-4">
                          <span className="flex items-center gap-1"><Users size={12} /> 3</span>
                          <span className="flex items-center gap-1"><Briefcase size={12} /> 3</span>
                        </div>
                      </button>

                      {/* Vehicle 3 */}
                      <button
                        type="button"
                        onClick={() => setVehicle('van')}
                        className={`text-left p-5 rounded-2xl border transition-all duration-500 relative flex flex-col justify-between h-36 ${
                          vehicle === 'van' 
                            ? 'border-white bg-zinc-950 shadow-md ring-1 ring-white' 
                            : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/80'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-bold text-sm tracking-wide">{s.van_name}</h4>
                            {vehicle === 'van' && (
                              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black">
                                <span className="text-[9px] font-bold">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-zinc-400 text-[10px] font-medium mt-1 tracking-wider uppercase">{s.van_class}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium mt-4">
                          <span className="flex items-center gap-1"><Users size={12} /> 7</span>
                          <span className="flex items-center gap-1"><Briefcase size={12} /> 6</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Luggage count */}
                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                        <Briefcase size={13} className="text-zinc-500" />
                        {s.luggage_label}
                      </label>
                      <div className="relative">
                        <select
                          value={baggage}
                          onChange={(e) => setBaggage(e.target.value)}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-white"
                        >
                          {bagOptions.map((n) => (
                            <option key={n} value={n} className="bg-zinc-900 text-white">
                              {n}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-zinc-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 1 CTA button to proceed */}
                  <div className="flex justify-end pt-6 border-t border-zinc-800 mt-8">
                    <button
                      type="button"
                      onClick={() => {
                        if (isStep1Valid) {
                          setStep(2);
                        }
                      }}
                      disabled={!isStep1Valid}
                      className={`w-full sm:w-auto justify-center px-8 py-4 rounded-xl font-extrabold uppercase text-[11px] tracking-widest flex items-center gap-3 transition-all duration-300 ${
                        isStep1Valid 
                          ? 'bg-white hover:bg-zinc-200 text-black shadow-lg shadow-black/25' 
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      <span>{lang === 'fr' ? 'estime mon trajet' : 'estimate my ride'}</span>
                      <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  {/* Step 2: Contact details */}
                  <div className="space-y-6">
                    <h3 className="text-zinc-100 font-extrabold text-[13px] tracking-wider border-b border-zinc-800 pb-3">
                      {s.contact_section}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                          <User size={13} className="text-zinc-500" />
                          <span>{s.name_label} <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={s.name_placeholder}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white placeholder-zinc-500 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                        />
                      </div>

                      {/* Phone field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                          <PhoneIcon size={13} className="text-zinc-500" />
                          <span>{s.phone_label} <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={s.phone_placeholder}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white placeholder-zinc-500 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-1 gap-6">
                      {/* Email field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                          <Mail size={13} className="text-zinc-500" />
                          <span>{s.email_label}</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={s.email_placeholder}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl px-5 py-3 text-base text-white placeholder-zinc-500 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                        />
                      </div>
                    </div>

                    {/* Notes textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-400 text-[10.5px] font-bold tracking-normal flex items-center gap-2">
                        <MessageSquare size={13} className="text-zinc-500" />
                        <span>{s.notes_label}</span>
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={s.notes_placeholder}
                        className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-700 focus:border-white rounded-xl p-4 text-base text-white placeholder-zinc-500 transition-all font-normal focus:outline-none resize-none focus:ring-1 focus:ring-white"
                      />
                    </div>
                  </div>

                  {/* Step 2 Footer: Navigation links */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-zinc-800 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all text-center flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 fill-current rotate-180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{lang === 'fr' ? 'RETOUR' : 'BACK'}</span>
                    </button>
                    
                    {isFormValid ? (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white border border-[#25D366] font-bold uppercase text-[11px] tracking-widest rounded-xl hover:bg-[#20ba59] hover:border-[#20ba59] transition-all duration-300 shadow-xl text-center"
                        >
                          <MessageSquare size={16} />
                          <span>{s.button_whatsapp}</span>
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center text-rose-400 font-bold text-[10.5px] uppercase tracking-wide gap-1.5 p-3 px-5 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                        <span>⚠️ {lang === 'fr' ? 'Informations requises manquantes (*)' : 'Missing required information (*)'}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
