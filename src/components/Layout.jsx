import { Outlet } from 'react-router-dom';
import FloatingWhatsApp from './FloatingWhatsApp.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({ content, language, onLanguageChange }) {
  return (
    <div className="min-h-screen overflow-hidden bg-pit-black text-white">
      <Navbar content={content} language={language} onLanguageChange={onLanguageChange} />
      <main>
        <Outlet />
      </main>
      <Footer content={content} />
      <FloatingWhatsApp content={content} />
    </div>
  );
}
