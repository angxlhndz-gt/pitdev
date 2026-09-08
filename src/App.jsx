import { useEffect, useState } from 'react';
import DigitalCardPage from './components/DigitalCardPage.jsx';
import Layout from './components/Layout.jsx';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { defaultLanguage, getSiteContent, isSupportedLanguage } from './config/site.js';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';

const languageStorageKey = 'pitdev-language';

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  const storedLanguage = window.localStorage.getItem(languageStorageKey);
  return isSupportedLanguage(storedLanguage) ? storedLanguage : defaultLanguage;
};

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const content = getSiteContent(language);
  const location = useLocation();

  useRouteMeta(content, language);
  useScrollToRoute();

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  return (
    <Routes location={location}>
      <Route path="/card/*" element={<DigitalCardPage />} />
      <Route
        element={<Layout content={content} language={language} onLanguageChange={setLanguage} />}
      >
        <Route index element={<HomePage content={content} />} />
        <Route path="/servicios" element={<ServicesPage content={content} />} />
        <Route path="/productos" element={<ProductsPage content={content} />} />
        <Route path="/proyectos" element={<ProjectsPage content={content} />} />
        <Route path="/contacto" element={<ContactPage content={content} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function useRouteMeta(content, language) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/card')) {
      return;
    }

    const routeKeyByPath = {
      '/': 'home',
      '/servicios': 'services',
      '/productos': 'products',
      '/proyectos': 'projects',
      '/contacto': 'contact',
    };
    const routeKey = routeKeyByPath[location.pathname] ?? 'home';
    const meta = content.routeMeta?.[routeKey] ?? content.meta;

    document.documentElement.lang = language;
    document.title = meta.title;

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', meta.description);
  }, [content.meta, content.routeMeta, language, location.pathname]);
}

function useScrollToRoute() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/card')) {
      return;
    }

    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const elementId = location.hash.slice(1);

    window.setTimeout(() => {
      document.getElementById(elementId)?.scrollIntoView({ block: 'start' });
    }, 0);
  }, [location.hash, location.pathname]);
}
