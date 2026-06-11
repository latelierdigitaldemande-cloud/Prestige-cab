/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { translations } from './translations';
import { Language } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Fleet from './components/Fleet';
import FleetFAQ from './components/FleetFAQ';
import WhatsAppCTA from './components/WhatsAppCTA';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('prestigeCabLang');
    return (saved as Language) || 'fr';
  });

  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    localStorage.setItem('prestigeCabLang', lang);
    document.documentElement.lang = lang;
    document.title = t.meta_title;
  }, [lang, t.meta_title]);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
  };

  return (
    <div className="min-h-screen bg-primary-bg overflow-x-hidden">
      <Navbar lang={lang} setLang={handleSetLang} t={t} />
      <main>
        <Hero t={t} />
        <Services t={t} lang={lang} />
        <Features t={t} />
        <Fleet t={t} />
        <FleetFAQ t={t} />
      </main>
      <WhatsAppCTA t={t} lang={lang} setLang={handleSetLang} />
    </div>
  );
}
