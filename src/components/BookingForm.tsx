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
  Clock3,
  Check
} from 'lucide-react';
import { Language } from '../types';
import SectionHeader from './SectionHeader';

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
    options_label: "Options supplémentaires",
    option_baby_seat: "Siège bébé",
    option_booster_seat: "Réhausseur",
    option_meet_greet: "Gare / Aéroport (Accueil pancarte)",
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
    options_label: "Extra Options",
    option_baby_seat: "Baby seat",
    option_booster_seat: "Booster seat",
    option_meet_greet: "Station / Airport (Meet & Greet)",
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

  // Option States
  const [babySeat, setBabySeat] = useState(false);
  const [boosterSeat, setBoosterSeat] = useState(false);
  const [meetGreet, setMeetGreet] = useState(false);

  const isStep1Valid = true;
  
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
    return !!(name && phone);
  }, [name, phone]);

  // Construct structured messages
  const messageText = useMemo(() => {
    const typeStr = serviceType === 'transfer' 
      ? (lang === 'fr' ? 'Transfert Simple (Aller simple)' : 'One-Way Transfer')
      : (lang === 'fr' ? `Mise à Disposition (${duration} heures)` : `Hourly Service (${duration} hours)`);

    const destStr = serviceType === 'transfer' 
      ? `📍 *Arrivée* : ${dropoff || (lang === 'fr' ? 'Non renseigné' : 'Not provided')}`
      : `⏱️ *Durée* : ${duration} ${lang === 'fr' ? 'heures' : 'hours'}`;

    const vehicleName = vehicle === 'luxury' 
      ? (lang === 'fr' ? 'Berline Confort' : 'Comfort Sedan')
      : vehicle === 'business'
      ? (lang === 'fr' ? 'Berline Affaires Classe E' : 'Business Sedan E-Class')
      : (lang === 'fr' ? 'Mercedes Classe V (Van)' : 'Mercedes V-Class (Van)');

    const selectedBonus: string[] = [];
    if (babySeat) selectedBonus.push(lang === 'fr' ? 'Siège bébé' : 'Baby seat');
    if (boosterSeat) selectedBonus.push(lang === 'fr' ? 'Réhausseur' : 'Booster seat');
    if (meetGreet) selectedBonus.push(lang === 'fr' ? 'Accueil pancarte' : 'Meet & Greet');

    const bonusStr = selectedBonus.length > 0
      ? `\n🛠️ *Options* : ${selectedBonus.join(', ')}`
      : '';

    return `*ELIE CHAUFFEUR - NOUVELLE DEMANDE DE BOOKING*

📌 *Service* : ${typeStr}
🛫 *Prise en charge* : ${pickup || (lang === 'fr' ? 'Non renseigné' : 'Not provided')}
${destStr}
📅 *Date* : ${date || (lang === 'fr' ? 'Non renseigné' : 'Not provided')}
⏰ *Heure* : ${time || (lang === 'fr' ? 'Non renseigné' : 'Not provided')}

🚗 *Véhicule* : ${vehicleName}
👥 *Passagers* : ${pax} ${lang === 'fr' ? 'personne(s)' : 'pax'}
💼 *Bagages* : ${baggage} ${lang === 'fr' ? 'valise(s)' : 'bag(s)'}${bonusStr}

👤 *Client* : ${name || (lang === 'fr' ? 'Non renseigné' : 'Not provided')}
📞 *Téléphone* : ${phone || (lang === 'fr' ? 'Non renseigné' : 'Not provided')}
✉️ *E-mail* : ${email || (lang === 'fr' ? 'Non renseigné' : 'Not provided')}
📝 *Notes / Vol* : ${notes || (lang === 'fr' ? 'Aucune' : 'None')}`;
  }, [lang, serviceType, pickup, dropoff, duration, date, time, vehicle, pax, baggage, babySeat, boosterSeat, meetGreet, name, phone, email, notes]);

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

      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        
        {/* Centered layout on desktop (PC) */}
        <div className="max-w-3xl mx-auto relative z-10">
          
          {/* Main Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-[#111113] border border-zinc-800/60 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative text-white"
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
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.pickup_label} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            placeholder={s.pickup_placeholder}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-5 py-3 text-base text-white placeholder-zinc-100 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                          />
                        </div>
                      </div>

                      {/* Drop off OR Hours Duration */}
                      {serviceType === 'transfer' ? (
                        <div className="flex flex-col gap-2">
                          <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                            {s.dropoff_label} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={dropoff}
                              onChange={(e) => setDropoff(e.target.value)}
                              placeholder={s.dropoff_placeholder}
                              className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-5 py-3 text-base text-white placeholder-zinc-100 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                            {s.duration_label} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Clock3 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                            <select
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-10 py-3 text-base text-white transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-white"
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

                    {/* Vehicle & Passengers selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Vehicle selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.vehicle_label}
                        </label>
                        <div className="relative font-bold">
                          <Car size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <select
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value as VehicleType)}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-10 py-3 text-base text-white transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-white"
                          >
                            <option value="luxury" className="bg-zinc-900 text-white">
                              {s.berline_name} ({s.berline_class}) — Max 3 {s.pax_unit} / 2 {s.bag_unit}
                            </option>
                            <option value="business" className="bg-zinc-900 text-white">
                              {s.business_name} ({s.business_class}) — Max 3 {s.pax_unit} / 3 {s.bag_unit}
                            </option>
                            <option value="van" className="bg-zinc-900 text-white">
                              {s.van_name} ({s.van_class}) — Max 7 {s.pax_unit} / 6 {s.bag_unit}
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-zinc-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Passengers selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.pax_label}
                        </label>
                        <div className="relative">
                          <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <select
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-10 py-3 text-base text-white transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-white"
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

                    {/* Date & Time Group Layout */}
                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                      {/* Date selection */}
                      <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.date_label} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-5 py-3 text-base text-white transition-all font-normal focus:outline-none [color-scheme:dark]"
                          />
                        </div>
                      </div>

                      {/* Time selection */}
                      <div className="col-span-1 flex flex-col gap-2">
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.time_label} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="time"
                            required
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-5 py-3 text-base text-white transition-all font-normal focus:outline-none [color-scheme:dark]"
                          />
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
                  {/* Step 2: Vehicle & Options */}
                  <div className="space-y-6">
                    <h3 className="text-zinc-100 font-extrabold text-[13px] tracking-wider border-b border-zinc-800 pb-3">
                      {lang === 'fr' ? 'VÉHICULE & OPTIONS' : 'VEHICLE & OPTIONS'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Luggage selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.luggage_label}
                        </label>
                        <div className="relative">
                          <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <select
                            value={baggage}
                            onChange={(e) => setBaggage(e.target.value)}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-10 py-3 text-base text-white transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-white"
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

                    {/* Additional Options */}
                    <div className="space-y-4">
                      <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                        {s.options_label}
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Option Baby Seat */}
                        <button
                          type="button"
                          onClick={() => setBabySeat(!babySeat)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-300 ${
                            babySeat 
                              ? 'bg-white text-zinc-950 border-white font-bold' 
                              : 'bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 hover:border-zinc-400 text-zinc-300 transition-all font-normal focus:outline-none'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            babySeat 
                              ? 'border-zinc-950 bg-zinc-950 text-white' 
                              : 'border-zinc-500'
                          }`}>
                            {babySeat && <Check size={11} strokeWidth={3} />}
                          </div>
                          <span className="text-[13.5px]">{s.option_baby_seat}</span>
                        </button>

                        {/* Option Booster Seat */}
                        <button
                          type="button"
                          onClick={() => setBoosterSeat(!boosterSeat)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-300 ${
                            boosterSeat 
                              ? 'bg-white text-zinc-950 border-white font-bold' 
                              : 'bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 hover:border-zinc-400 text-zinc-300 transition-all font-normal focus:outline-none'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            boosterSeat 
                              ? 'border-zinc-950 bg-zinc-950 text-white' 
                              : 'border-zinc-500'
                          }`}>
                            {boosterSeat && <Check size={11} strokeWidth={3} />}
                          </div>
                          <span className="text-[13.5px]">{s.option_booster_seat}</span>
                        </button>

                        {/* Option Meet & Greet */}
                        <button
                          type="button"
                          onClick={() => setMeetGreet(!meetGreet)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-300 ${
                            meetGreet 
                              ? 'bg-white text-zinc-950 border-white font-bold' 
                              : 'bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-white hover:border-white text-zinc-300 transition-all font-normal focus:outline-none'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            meetGreet 
                              ? 'border-zinc-950 bg-zinc-950 text-white' 
                              : 'border-zinc-500'
                          }`}>
                            {meetGreet && <Check size={11} strokeWidth={3} />}
                          </div>
                          <span className="text-[12.5px] leading-tight font-medium">{s.option_meet_greet}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Contact details */}
                  <div className="space-y-6 pt-6 border-t border-zinc-800">
                    <h3 className="text-zinc-100 font-extrabold text-[13px] tracking-wider border-b border-zinc-800 pb-3">
                      {s.contact_section}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Name field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          <span>{s.name_label} <span className="text-red-500">*</span></span>
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={s.name_placeholder}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-5 py-3 text-base text-white placeholder-zinc-100 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                          />
                        </div>
                      </div>

                      {/* Phone field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          <span>{s.phone_label} <span className="text-red-500">*</span></span>
                        </label>
                        <div className="relative">
                          <PhoneIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={s.phone_placeholder}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-5 py-3 text-base text-white placeholder-zinc-100 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          <span>{s.email_label}</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={s.email_placeholder}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-5 py-3 text-base text-white placeholder-zinc-100 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notes textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-400 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                        <span>{s.notes_label}</span>
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-4 top-4 text-zinc-400 pointer-events-none" />
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={s.notes_placeholder}
                          className="w-full bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-950 border border-zinc-500 focus:border-white rounded-xl pl-11 pr-4 pt-3 pb-3 text-base text-white placeholder-zinc-100 transition-all font-normal focus:outline-none resize-none focus:ring-1 focus:ring-white"
                        />
                      </div>
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
