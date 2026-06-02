import {
  Bot,
  CalendarClock,
  Code2,
  Globe2,
  Network,
  Radar,
  Sparkles,
  Workflow,
} from 'lucide-react';

export const site = {
  name: 'PitDev',
  tagline: 'Soluciones digitales para negocios locales',
  description:
    'Desarrollamos páginas web, sistemas de agenda, software personalizado, automatización de procesos y auditorías de red para que pequeños negocios se vean más profesionales, se organicen mejor y trabajen con más eficiencia.',
  social: {
    whatsapp: 'https://wa.me/50249638382?text=Hola%2C%20quiero%20cotizar%20un%20proyecto%20con%20PitDev.',
    instagram: 'https://www.instagram.com/pitdev.gt?igsh=YzVhYzNsMnM1Njhr',
    facebook: 'https://www.facebook.com/share/1Kq7zqMpze/?mibextid=wwXIfr',
  },
  navItems: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ],
  terminalLines: [
    'Inicializando soluciones digitales...',
    'Conectando agenda inteligente...',
    'Optimizando procesos...',
    'Revisando infraestructura de red...',
    'Sistema listo para crecer',
  ],
  services: [
    {
      title: 'Páginas web',
      description: 'Sitios modernos para mostrar tu negocio, servicios y contacto.',
      icon: Globe2,
    },
    {
      title: 'Sistemas de agenda',
      description:
        'Agenda de citas conectada a Google Calendar para barberías, clínicas, salones y más.',
      icon: CalendarClock,
    },
    {
      title: 'Software a medida',
      description: 'Herramientas creadas según las necesidades reales de tu negocio.',
      icon: Code2,
    },
    {
      title: 'Automatización',
      description:
        'Procesos más rápidos usando formularios, WhatsApp, correos, calendarios o flujos digitales.',
      icon: Workflow,
    },
    {
      title: 'Auditorías de red',
      description:
        'Revisión de conectividad, infraestructura, seguridad básica y recomendaciones para mejorar tu red.',
      icon: Network,
    },
  ],
  strengths: [
    { label: 'Soluciones prácticas', icon: Sparkles },
    { label: 'Atención directa', icon: Bot },
    { label: 'Adaptación al negocio', icon: Radar },
    { label: 'Enfoque en resultados', icon: Workflow },
  ],
  footerServices:
    'Páginas web • Software personalizado • Sistemas de agenda • Automatización • Auditorías de red',
};

export const getWhatsAppUrl = () => site.social.whatsapp;
