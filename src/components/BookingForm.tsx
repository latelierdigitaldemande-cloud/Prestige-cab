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
  Check,
  Plus,
  Minus
} from 'lucide-react';
import { Language } from '../types';
import SectionHeader from './SectionHeader';

interface BookingFormProps {
  lang: Language;
  isEmbed?: boolean;
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

const BookingForm = ({ lang, isEmbed = false }: BookingFormProps) => {
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
  const [pax, setPax] = useState('');
  const [baggage, setBaggage] = useState('2');

  // Option States
  const [babySeat, setBabySeat] = useState(false);
  const [boosterSeat, setBoosterSeat] = useState(false);
  const [meetGreet, setMeetGreet] = useState(false);
  const [showExtraOptions, setShowExtraOptions] = useState(false);

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
👥 *Passagers* : ${pax ? `${pax} ${lang === 'fr' ? 'personne(s)' : 'pax'}` : (lang === 'fr' ? 'Non spécifié' : 'Not specified')}
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

  const formElement = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="bg-white border border-zinc-200 rounded-xl px-6 sm:px-8 md:px-8 lg:px-8 py-5 sm:py-6 lg:py-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden relative text-zinc-900 w-full"
    >
            <div className="space-y-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  {/* Title "Réserver en ligne" in elegant size */}
                  <div className="text-left mb-6">
                    <h2 className="text-2xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                      {lang === 'fr' ? 'Réserver en ligne' : 'Book Online'}
                    </h2>
                    <div className="h-[2px] w-12 bg-zinc-200 mt-2 rounded" />
                  </div>



                  {/* Step 1: Core Ride Details */}
                  <div className="space-y-6">
                    {/* Stacked Fields sequentially */}
                    <div className="grid grid-cols-1 gap-6">
                      {/* Pick up location */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
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
                            className="w-full h-12 bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-5 text-base text-zinc-900 placeholder-zinc-400 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-zinc-950 flex items-center"
                          />
                        </div>
                      </div>

                      {/* Drop off OR Hours Duration */}
                      {serviceType === 'transfer' ? (
                        <div className="flex flex-col gap-2">
                          <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
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
                              className="w-full h-12 bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-5 text-base text-zinc-900 placeholder-zinc-400 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-zinc-950 flex items-center"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                            {s.duration_label} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Clock3 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                            <select
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="w-full h-12 bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-10 text-base text-zinc-900 transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-zinc-950 flex items-center"
                            >
                              {durationOptions.map((hour) => (
                                <option key={hour} value={hour} className="bg-white text-zinc-900 py-2">
                                  {hour} {parseInt(hour) === 1 ? s.duration_hour : s.duration_hours}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-zinc-400">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Vehicle selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.vehicle_label}
                        </label>
                        <div className="relative font-bold">
                          <Car size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <select
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value as VehicleType)}
                            className="w-full h-12 bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-10 text-base text-zinc-900 transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-zinc-950 flex items-center"
                          >
                            <option value="luxury" className="bg-white text-zinc-900">
                              {s.berline_name} ({s.berline_class}) — Max 3 {s.pax_unit} / 2 {s.bag_unit}
                            </option>
                            <option value="business" className="bg-white text-zinc-900">
                              {s.business_name} ({s.business_class}) — Max 3 {s.pax_unit} / 3 {s.bag_unit}
                            </option>
                            <option value="van" className="bg-white text-zinc-900">
                              {s.van_name} ({s.van_class}) — Max 7 {s.pax_unit} / 6 {s.bag_unit}
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-zinc-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date and Time side-by-side on all screens */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Date selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.date_label} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar size={14} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:scale-110" />
                          <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full h-12 bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-7 sm:pl-11 pr-1.5 sm:pr-4 text-[13px] sm:text-base text-zinc-900 transition-all font-normal focus:outline-none [color-scheme:light] focus:ring-1 focus:ring-zinc-950 flex items-center"
                          />
                        </div>
                      </div>

                      {/* Time selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.time_label} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock size={14} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:scale-110" />
                          <input
                            type="time"
                            required
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full h-12 bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-7 sm:pl-11 pr-1.5 sm:pr-4 text-[13px] sm:text-base text-zinc-900 transition-all font-normal focus:outline-none [color-scheme:light] focus:ring-1 focus:ring-zinc-950 flex items-center"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Additional Options Trigger styled as select-like button */}
                    <div className="flex flex-col gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setShowExtraOptions(!showExtraOptions)}
                        className="w-full h-12 bg-zinc-50 hover:bg-zinc-100 border border-zinc-300 hover:border-zinc-400 rounded-xl px-4 sm:px-5 text-[12.5px] font-bold uppercase tracking-wider transition-all flex items-center justify-between text-zinc-700 hover:text-zinc-900"
                      >
                        <span className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-md border border-zinc-300 flex items-center justify-center bg-zinc-100 text-zinc-700">
                            {showExtraOptions ? <Minus size={11} strokeWidth={3} /> : <Plus size={11} strokeWidth={3} />}
                          </div>
                          <span className="text-[12px] sm:text-[13px] tracking-tight">{lang === 'fr' ? 'Options supplémentaires' : 'Extra Options'}</span>
                        </span>
                        <svg className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${showExtraOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Extra options list (rendered vertically/stacked on all devices) */}
                    {showExtraOptions && (
                      <div className="mt-4 pl-4 py-2 space-y-3.5 flex flex-col border-l-2 border-zinc-200">
                        {/* Option Baby Seat */}
                        <label className="flex items-center gap-3 cursor-pointer select-none py-0.5 group">
                          <input
                            type="checkbox"
                            checked={babySeat}
                            onChange={() => setBabySeat(!babySeat)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                            babySeat 
                              ? 'border-zinc-900 bg-zinc-900 text-white' 
                              : 'border-zinc-300 bg-transparent group-hover:border-zinc-400'
                          }`}>
                            {babySeat && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="text-[13.5px] font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                            {s.option_baby_seat}
                          </span>
                        </label>

                        {/* Option Booster Seat */}
                        <label className="flex items-center gap-3 cursor-pointer select-none py-0.5 group">
                          <input
                            type="checkbox"
                            checked={boosterSeat}
                            onChange={() => setBoosterSeat(!boosterSeat)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                            boosterSeat 
                              ? 'border-zinc-900 bg-zinc-900 text-white' 
                              : 'border-zinc-300 bg-transparent group-hover:border-zinc-400'
                          }`}>
                            {boosterSeat && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="text-[13.5px] font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                            {s.option_booster_seat}
                          </span>
                        </label>

                        {/* Option Meet & Greet */}
                        <label className="flex items-center gap-3 cursor-pointer select-none py-0.5 group">
                          <input
                            type="checkbox"
                            checked={meetGreet}
                            onChange={() => setMeetGreet(!meetGreet)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                            meetGreet 
                              ? 'border-zinc-900 bg-zinc-900 text-white' 
                              : 'border-zinc-300 bg-transparent group-hover:border-zinc-400'
                          }`}>
                            {meetGreet && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="text-[13.5px] font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                            {s.option_meet_greet}
                          </span>
                        </label>
                      </div>
                    )}
                  </div>



                  {/* Step 1 CTA button to proceed */}
                  <div className="flex justify-end pt-5 border-t border-zinc-200 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        if (isStep1Valid) {
                          setStep(2);
                        }
                      }}
                      disabled={!isStep1Valid}
                      className={`w-full sm:w-auto md:px-16 md:py-4 justify-center px-8 py-4 rounded-xl font-extrabold uppercase text-[11px] md:text-xs tracking-widest flex items-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                        isStep1Valid 
                          ? 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-950/10' 
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      <span>{lang === 'fr' ? 'confirmer mon trajet' : 'confirm my ride'}</span>
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
                    <h3 className="text-zinc-900 font-extrabold text-[13px] tracking-wider border-b border-zinc-200 pb-3">
                      {s.contact_section}
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                      {/* Name field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
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
                            className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-5 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-zinc-950"
                          />
                        </div>
                      </div>

                      {/* Phone field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
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
                            className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-5 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-zinc-950"
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          <span>{s.email_label}</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={s.email_placeholder}
                            className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-5 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-all font-normal focus:outline-none focus:ring-1 focus:ring-zinc-950"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notes textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                        <span>{s.notes_label}</span>
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-4 top-4 text-zinc-400 pointer-events-none" />
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={s.notes_placeholder}
                          className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-4 pt-3 pb-3 text-base text-zinc-900 placeholder-zinc-400 transition-all font-normal focus:outline-none resize-none focus:ring-1 focus:ring-zinc-950"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Vehicle & Options */}
                  <div className="space-y-6 pt-6 border-t border-zinc-200">
                    <h3 className="text-zinc-900 font-extrabold text-[13px] tracking-wider border-b border-zinc-200 pb-3">
                      {lang === 'fr' ? 'VÉHICULE & OPTIONS' : 'VEHICLE & OPTIONS'}
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                      {/* Passengers selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.pax_label}
                        </label>
                        <div className="relative">
                          <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <select
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                            required
                            className="w-full h-12 bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-10 text-base text-zinc-900 transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-zinc-950 flex items-center"
                          >
                            <option value="" disabled className="bg-white text-zinc-400">
                              {lang === 'fr' ? 'Sélectionner...' : 'Select...'}
                            </option>
                            {paxOptions.map((n) => (
                              <option key={n} value={n} className="bg-white text-zinc-900">
                                {n}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-zinc-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Luggage selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-zinc-600 text-[12.5px] font-bold tracking-normal flex items-center gap-2">
                          {s.luggage_label}
                        </label>
                        <div className="relative">
                          <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <select
                            value={baggage}
                            onChange={(e) => setBaggage(e.target.value)}
                            className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-300 hover:border-zinc-400/80 focus:border-zinc-950 rounded-xl pl-11 pr-10 py-3 text-base text-zinc-900 transition-all font-normal focus:outline-none appearance-none focus:ring-1 focus:ring-zinc-950"
                          >
                            {bagOptions.map((n) => (
                              <option key={n} value={n} className="bg-white text-zinc-900">
                                {n}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-zinc-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Footer: Navigation links */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 border-t border-zinc-200 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all text-center flex items-center justify-center gap-2"
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
                          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white border border-[#25D366] font-bold uppercase text-[11px] tracking-widest rounded-xl hover:bg-[#20ba59] hover:border-[#20ba59] transition-all duration-300 shadow-xl shadow-[#25D366]/10 text-center"
                        >
                          <MessageSquare size={16} />
                          <span>{s.button_whatsapp}</span>
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center text-rose-600 font-bold text-[10.5px] uppercase tracking-wide gap-1.5 p-3 px-5 bg-rose-50 border border-rose-100 rounded-xl">
                        <span>⚠️ {lang === 'fr' ? 'Informations requises manquantes (*)' : 'Missing required information (*)'}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        );

        if (isEmbed) {
          return (
            <div id="reservation" className="w-full">
              {formElement}
            </div>
          );
        }

        return (
          <section id="reservation" className="py-20 md:py-32 bg-primary-bg relative border-t border-b border-white/5 overflow-hidden">
            {/* Decorative luxury gradient background glow */}
            <div className="absolute top-0 left-1/4 w-[40rem] h-[25rem] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[30rem] h-[20rem] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">
              <div className="max-w-5xl mx-auto relative z-10 w-full">
                {formElement}
              </div>
            </div>
          </section>
        );
      };

export default BookingForm;
