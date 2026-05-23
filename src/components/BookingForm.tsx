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
  CheckCircle,
  HelpCircle,
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
    badge: "RÉSERVATION",
    title: "Réservez votre Chauffeur Privé",
    subtitle: "Planifiez votre prise en charge haut de gamme en quelques clics.",
    tab_transfer: "Aller Simple",
    tab_hourly: "Mise à Disposition",
    pickup_label: "Lieu de Prise en Charge",
    pickup_placeholder: "Ex: Adresse, Paris, Aéroport CDG, Gare du Nord...",
    dropoff_label: "Lieu de Destination",
    dropoff_placeholder: "Ex: Hôtel, Disneyland Paris, Versailles, adresse...",
    duration_label: "Durée souhaitée",
    duration_hour: "Heure",
    duration_hours: "Heures",
    date_label: "Date du Voyage",
    time_label: "Heure de Prise en Charge",
    vehicle_label: "Sélectionnez votre Véhicule",
    pax_label: "Nombre de Passager(s)",
    luggage_label: "Nombre de Bagage(s)",
    contact_section: "Vos Informations de Contact",
    name_label: "Nom & Prénom",
    name_placeholder: "Votre nom complet pour l'accueil",
    phone_label: "Numéro de Téléphone (WhatsApp)",
    phone_placeholder: "Ex: +33 6 12 34 56 78",
    email_label: "Adresse E-mail",
    email_placeholder: "Ex: contact@email.com",
    notes_label: "Notes ou n° de vol / train (Optionnel)",
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
    tab_transfer: "One-Way Transfer",
    tab_hourly: "Hourly Service",
    pickup_label: "Pick-up Location",
    pickup_placeholder: "e.g. Address, Paris, CDG Airport, Gare du Nord...",
    dropoff_label: "Drop-off Location",
    dropoff_placeholder: "e.g. Hotel, Disneyland Paris, Versailles, address...",
    duration_label: "Desired Duration",
    duration_hour: "Hour",
    duration_hours: "Hours",
    date_label: "Journey Date",
    time_label: "Pick-up Time",
    vehicle_label: "Select your Vehicle",
    pax_label: "Number of Passenger(s)",
    luggage_label: "Number of Bag(s)",
    contact_section: "Your Contact Details",
    name_label: "Full Name",
    name_placeholder: "Your full name for boarding meetup",
    phone_label: "Phone Number (WhatsApp)",
    phone_placeholder: "e.g. +33 6 12 34 56 78",
    email_label: "Email Address",
    email_placeholder: "e.g. name@email.com",
    notes_label: "Notes or flight / train number (Optional)",
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
  const [serviceType, setServiceType] = useState<ServiceType>('transfer');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [duration, setDuration] = useState('4'); // Default 4 hours for hourly
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicle, setVehicle] = useState<VehicleType>('business');
  const [pax, setPax] = useState('2');
  const [baggage, setBaggage] = useState('2');
  
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

    return `*ABDI CHAUFFEUR - NOUVELLE DEMANDE DE RÉSERVATION*

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
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-5"
          >
            <ShieldCheck size={12} className="text-white/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">{s.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white font-luxury font-light text-3xl md:text-5xl leading-tight tracking-[0.06em] max-w-2xl"
          >
            {s.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-muted text-sm md:text-base font-light max-w-xl mt-4"
          >
            {s.subtitle}
          </motion.p>
        </div>

        {/* Real Dynamic Booking Card Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-8 bg-[#0d0d0d]/35 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-3xl overflow-hidden relative"
          >
            {/* Elegant Tab Segment Controls */}
            <div className="relative flex p-1 bg-white/[0.03] border border-white/5 rounded-2xl mb-10 max-w-md mx-auto sm:mx-0">
              <button
                onClick={() => setServiceType('transfer')}
                className={`relative z-10 flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-xl duration-500 ${
                  serviceType === 'transfer' ? 'text-black font-extrabold' : 'text-white/60 hover:text-white'
                }`}
              >
                {s.tab_transfer}
              </button>
              <button
                onClick={() => setServiceType('hourly')}
                className={`relative z-10 flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-xl duration-500 ${
                  serviceType === 'hourly' ? 'text-black font-extrabold' : 'text-white/60 hover:text-white'
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

            <div className="space-y-8">
              
              {/* Step 1: Core Ride Details */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pick up location */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                      <MapPin size={13} className="text-white/40" />
                      {s.pickup_label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder={s.pickup_placeholder}
                      className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 transition-all font-light focus:outline-none"
                    />
                  </div>

                  {/* Drop off OR Hours Duration */}
                  {serviceType === 'transfer' ? (
                    <div className="flex flex-col gap-2">
                      <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                        <MapPin size={13} className="text-white/40" />
                        {s.dropoff_label} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        placeholder={s.dropoff_placeholder}
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 transition-all font-light focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                        <Clock3 size={13} className="text-white/40" />
                        {s.duration_label} <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white transition-all font-light focus:outline-none appearance-none"
                        >
                          {durationOptions.map((hour) => (
                            <option key={hour} value={hour} className="bg-primary-bg text-white py-2">
                              {hour} {parseInt(hour) === 1 ? s.duration_hour : s.duration_hours}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-white/40">
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
                    <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                      <Calendar size={13} className="text-white/40" />
                      {s.date_label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white transition-all font-light focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  {/* Time selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                      <Clock size={13} className="text-white/40" />
                      {s.time_label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white transition-all font-light focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  {/* Pax count drop down */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                      <Users size={13} className="text-white/40" />
                      {s.pax_label}
                    </label>
                    <div className="relative">
                      <select
                        value={pax}
                        onChange={(e) => setPax(e.target.value)}
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white transition-all font-light focus:outline-none appearance-none"
                      >
                        {paxOptions.map((n) => (
                          <option key={n} value={n} className="bg-primary-bg text-white">
                            {n}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-white/40">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Luxury Vehicle Select Grid Cards */}
              <div className="space-y-4">
                <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                  <Car size={13} className="text-white/40" />
                  {s.vehicle_label}
                </label>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Vehicle 1 */}
                  <button
                    type="button"
                    onClick={() => setVehicle('luxury')}
                    className={`text-left p-5 rounded-2xl border transition-all duration-500 relative flex flex-col justify-between h-36 ${
                      vehicle === 'luxury' 
                        ? 'border-white bg-white/[0.05] shadow-xl' 
                        : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-medium text-sm tracking-wide">{s.berline_name}</h4>
                        {vehicle === 'luxury' && (
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black">
                            <span className="text-[9px] font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-text-muted text-[10px] font-light mt-1 tracking-wider uppercase">{s.berline_class}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/50 font-light mt-4">
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
                        ? 'border-white bg-white/[0.05] shadow-xl' 
                        : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-medium text-sm tracking-wide">{s.business_name}</h4>
                        {vehicle === 'business' && (
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black">
                            <span className="text-[9px] font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-text-muted text-[10px] font-light mt-1 tracking-wider uppercase">{s.business_class}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/50 font-light mt-4">
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
                        ? 'border-white bg-white/[0.05] shadow-xl' 
                        : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-medium text-sm tracking-wide">{s.van_name}</h4>
                        {vehicle === 'van' && (
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black">
                            <span className="text-[9px] font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-text-muted text-[10px] font-light mt-1 tracking-wider uppercase">{s.van_class}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/50 font-light mt-4">
                      <span className="flex items-center gap-1"><Users size={12} /> 7</span>
                      <span className="flex items-center gap-1"><Briefcase size={12} /> 6</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Luggage Select dropdown to keep form short but fully customized */}
              <div className="grid md:grid-cols-2 gap-6 pt-2 border-t border-white/5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                    <Briefcase size={13} className="text-white/40" />
                    {s.luggage_label}
                  </label>
                  <div className="relative">
                    <select
                      value={baggage}
                      onChange={(e) => setBaggage(e.target.value)}
                      className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white transition-all font-light focus:outline-none appearance-none"
                    >
                      {bagOptions.map((n) => (
                        <option key={n} value={n} className="bg-primary-bg text-white">
                          {n}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-white/40">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Contact details */}
              <div className="pt-6 border-t border-white/5 space-y-6">
                <h3 className="text-white font-medium text-sm tracking-widest uppercase mb-4 text-[#eaeaea]">
                  {s.contact_section}
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                      <User size={13} className="text-white/40" />
                      {s.name_label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={s.name_placeholder}
                      className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 transition-all font-light focus:outline-none"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                      <PhoneIcon size={13} className="text-white/40" />
                      {s.phone_label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={s.phone_placeholder}
                      className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 transition-all font-light focus:outline-none"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase flex items-center gap-2">
                      <Mail size={13} className="text-white/40" />
                      {s.email_label}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={s.email_placeholder}
                      className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 transition-all font-light focus:outline-none"
                    />
                  </div>
                </div>

                {/* Notes textarea */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-[10px] font-bold tracking-[0.14em] uppercase">
                    {s.notes_label}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={s.notes_placeholder}
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-black/50 border border-white/10 focus:border-white/30 rounded-xl p-5 text-sm text-white placeholder-white/20 transition-all font-light focus:outline-none resize-none"
                  />
                </div>
              </div>

            </div>
          </motion.div>

          {/* Sidebar Live Summary and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
          >
            {/* Summary Box */}
            <div className="bg-[#0f0f0f]/50 border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
              <h3 className="text-white font-luxury font-light text-xl tracking-[0.05em] mb-6 flex items-center gap-3">
                <CheckCircle size={18} className="text-white/75" />
                {s.summary_title}
              </h3>

              {!pickup || !date || !time ? (
                <div className="py-8 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center text-white/20">
                    <HelpCircle size={20} />
                  </div>
                  <p className="text-text-muted text-xs font-light max-w-[200px] leading-relaxed">
                    {s.summary_empty}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-light tracking-wide text-white/90">
                  {/* Summary grid */}
                  <div className="space-y-3 pb-4 border-b border-white/5">
                    <div className="flex justify-between items-start">
                      <span className="text-text-muted">{lang === 'fr' ? 'Prestation' : 'Service'} :</span>
                      <span className="text-white font-medium text-right ml-2">
                        {serviceType === 'transfer' ? s.tab_transfer : `${s.tab_hourly} (${duration}h)`}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-text-muted">{s.pickup_label} :</span>
                      <span className="text-white font-medium break-all">{pickup}</span>
                    </div>

                    {serviceType === 'transfer' && dropoff && (
                      <div className="flex flex-col gap-1">
                        <span className="text-text-muted">{s.dropoff_label} :</span>
                        <span className="text-white font-medium break-all">{dropoff}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">{lang === 'fr' ? 'Départ' : 'Date & Time'} :</span>
                      <span className="text-white font-medium text-right">
                        {date} @ {time}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pb-4 border-b border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">{lang === 'fr' ? 'Classe' : 'Vehicle Class'} :</span>
                      <span className="text-white font-medium">
                        {vehicle === 'luxury' && s.berline_name}
                        {vehicle === 'business' && s.business_name}
                        {vehicle === 'van' && s.van_name}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">{s.pax_label} :</span>
                      <span className="text-white font-medium">
                        {pax} {s.pax_unit}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">{s.luggage_label} :</span>
                      <span className="text-white font-medium">
                        {baggage} {s.bag_unit}
                      </span>
                    </div>
                  </div>

                  {name && phone && (
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-text-muted">{lang === 'fr' ? 'Passager' : 'Passenger'} :</span>
                        <span className="text-white font-medium truncate max-w-[150px]">{name}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-text-muted">{lang === 'fr' ? 'Mobile' : 'Phone'} :</span>
                        <span className="text-white font-medium truncate max-w-[150px]">{phone}</span>
                      </div>
                    </div>
                  )}

                  {/* Pricing transparency note common to ultra-prestige chauffeurs */}
                  <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-[10px] text-text-subtle font-light leading-relaxed">
                      {lang === 'fr' 
                        ? '💡 Les tarifs d\'Abdi Chauffeur sont fixes, sans surprise et incluent l\'accueil personnalisé en gare/aéroport avec pancarte.'
                        : '💡 Abdi Chauffeur offers flat, clear rates including professional airport/station welcome with meet-and-greet nameplate.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Action triggers configured as clickable native anchor tags to prevent iframe click errors */}
            <div className="space-y-4">
              {isFormValid ? (
                <>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] rounded-full hover:bg-white/90 transition-all duration-300 shadow-xl"
                  >
                    <MessageSquare size={16} />
                    <span>{s.button_whatsapp}</span>
                  </a>

                  <a
                    href={smsUrl}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold uppercase text-[10px] tracking-[0.2em] rounded-full transition-all duration-300"
                  >
                    <PhoneIcon size={14} />
                    <span>{s.button_sms}</span>
                  </a>

                  <p className="text-[10px] text-zinc-500 font-light text-center leading-relaxed mt-2 uppercase tracking-wide">
                    {s.success_status}
                  </p>
                </>
              ) : (
                <div className="space-y-4">
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white/10 text-white/30 border border-white/5 font-bold uppercase text-[10px] tracking-[0.2em] rounded-full cursor-not-allowed select-none"
                  >
                    <MessageSquare size={16} />
                    <span>{s.button_whatsapp}</span>
                  </button>

                  <p className="text-[10.5px] text-amber-500/80 font-light text-center leading-relaxed max-w-xs mx-auto">
                    ⚠️ {s.missing_fields_warning}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BookingForm;
