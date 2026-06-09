import {
  Bot,
  CalendarClock,
  Code2,
  Globe2,
  Network,
  Package,
  Radar,
  School,
  Sparkles,
  UsersRound,
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
    { label: 'Productos', href: '#productos' },
    { label: 'Proyectos', href: '#proyectos' },
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
  products: [
    {
      id: 'school-lite',
      name: 'PitDev School Lite',
      shortDescription: 'Sistema digital para colegios pequeños y centros educativos.',
      detail:
        'PitDev School Lite es una solución pensada para colegios pequeños o instituciones educativas que necesitan presencia digital y una mejor organización. Incluye página informativa, formulario de admisión, base de datos de interesados, panel administrativo, noticias, eventos y galería. Sirve para mejorar la presentación del colegio, facilitar el proceso de inscripción y centralizar información importante.',
      icon: School,
    },
    {
      id: 'agenda',
      name: 'PitDev Agenda',
      shortDescription: 'Sistema de citas para negocios que trabajan con reservas.',
      detail:
        'PitDev Agenda está diseñado para barberías, clínicas, salones, psicólogos, dentistas, academias y otros negocios que agendan citas. Incluye control de clientes, citas, servicios, calendario, estados de cita, integración con WhatsApp y reportes básicos. Sirve para ordenar mejor las reservas, evitar citas perdidas y tener más control del día a día.',
      icon: CalendarClock,
    },
    {
      id: 'stock',
      name: 'PitDev Stock',
      shortDescription: 'Sistema de inventario y ventas para negocios pequeños.',
      detail:
        'PitDev Stock ayuda a controlar productos, entradas, salidas, stock bajo, ventas, caja y reportes. Está pensado para tiendas, pequeños comercios y negocios que necesitan saber qué tienen, qué venden y qué les hace falta. Sirve para reducir desorden, mejorar el control del inventario y apoyar la toma de decisiones.',
      icon: Package,
    },
    {
      id: 'crm-simple',
      name: 'PitDev CRM Simple',
      shortDescription: 'Sistema para seguimiento de clientes y cotizaciones.',
      detail:
        'PitDev CRM Simple está enfocado en empresas de servicios. Incluye clientes, seguimiento, cotizaciones, estados, tareas, historial y generación de PDF. Es útil para constructoras pequeñas, técnicos, agencias, instaladores, empresas de cámaras, internet, mantenimiento y negocios similares. Sirve para dar seguimiento a prospectos, organizar trabajos y mantener un mejor control comercial.',
      icon: UsersRound,
    },
  ],
  projects: [
    {
      title: 'UMES Makers Community',
      type: 'Página web informativa',
      description:
        'Página web informativa para una comunidad universitaria maker, enfocada en mostrar eventos, proyectos destacados, información de la comunidad y enlaces oficiales.',
      href: 'https://umesmakerscommunity.vercel.app/',
      image: '/clientes/umes-makers.png',
      imageAlt: 'Captura de la página web UMES Makers Community',
    },
    {
      title: 'Arwyng Official',
      type: 'Marca personal / DJ',
      description:
        'Página web para marca personal/DJ, enfocada en mostrar perfil artístico, eventos, música, contacto y presencia profesional en línea.',
      href: 'https://arwyng-ofifcial.vercel.app/',
      image: '/clientes/arwyng-official.png',
      imageAlt: 'Captura de la página web Arwyng Official',
    },
  ],
  strengths: [
    { label: 'Soluciones prácticas', icon: Sparkles },
    { label: 'Atención directa', icon: Bot },
    { label: 'Adaptación al negocio', icon: Radar },
    { label: 'Enfoque en resultados', icon: Workflow },
  ],
  footerServices: 'Páginas web • Software personalizado • Automatización • Auditorías de red',
};

export const getWhatsAppUrl = () => site.social.whatsapp;
