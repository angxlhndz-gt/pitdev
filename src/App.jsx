import { useEffect, useState } from 'react';
import About from './components/About.jsx';
import Clients from './components/Clients.jsx';
import Contact from './components/Contact.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Products from './components/Products.jsx';
import Services from './components/Services.jsx';
import Storytelling from './components/Storytelling.jsx';
import { defaultLanguage, getSiteContent, isSupportedLanguage } from './config/site.js';
import useScrollAnimations from './hooks/useScrollAnimations.js';

const languageStorageKey = 'pitdev-language';

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  const storedLanguage = window.localStorage.getItem(languageStorageKey);
  return isSupportedLanguage(storedLanguage) ? storedLanguage : defaultLanguage;
};

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const content = getSiteContent(language);

  useScrollAnimations();

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.meta.title;
    window.localStorage.setItem(languageStorageKey, language);

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', content.meta.description);
  }, [content.meta.description, content.meta.title, language]);

  return (
    <main className="min-h-screen overflow-hidden bg-pit-black text-white">
      <Navbar content={content} language={language} onLanguageChange={setLanguage} />
      <Hero content={content} />
      <Services content={content} />
      <Storytelling content={content} />
      <Products content={content} />
      <Clients content={content} />
      <About content={content} />
      <Contact content={content} />
      <Footer content={content} />
      <FloatingWhatsApp content={content} />
    </main>
  );
}
