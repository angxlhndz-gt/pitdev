import {
  Bot,
  CalendarClock,
  ChartNoAxesCombined,
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

export const defaultLanguage = 'es';

export const languageOptions = [
  { code: 'es', shortLabel: 'ES', label: 'Español', htmlLang: 'es' },
  { code: 'en', shortLabel: 'EN', label: 'English', htmlLang: 'en' },
];

export const site = {
  name: 'PitDev',
  social: {
    whatsapp: 'https://wa.me/50249638382?text=Hola%2C%20quiero%20cotizar%20un%20proyecto%20con%20PitDev.',
    instagram: 'https://www.instagram.com/pitdev.gt?igsh=YzVhYzNsMnM1Njhr',
    facebook: 'https://www.facebook.com/profile.php?id=61590269683371',
  },
};

const content = {
  es: {
    meta: {
      title: 'PitDev | Soluciones digitales para negocios locales',
      description:
        'PitDev crea páginas web, sistemas de agenda, software personalizado, automatización y auditorías de red para negocios locales.',
    },
    tagline: 'Soluciones digitales para negocios locales',
    description:
      'Desarrollamos páginas web, sistemas de agenda, software personalizado, automatización de procesos y auditorías de red para que pequeños negocios se vean más profesionales, se organicen mejor y trabajen con más eficiencia.',
    navItems: [
      { label: 'Inicio', href: '/' },
      { label: 'Servicios', href: '/servicios' },
      { label: 'Productos Digitales', href: '/productos' },
      { label: 'Proyectos', href: '/proyectos' },
      { label: 'Contacto', href: '/contacto' },
    ],
    navbar: {
      homeAriaLabel: 'Ir al inicio de PitDev',
      logoAlt: 'PitDev Logo',
      quoteButton: 'Cotizar por WhatsApp',
      mobileQuoteButton: 'Cotizar',
      openMenuAriaLabel: 'Abrir menú',
      closeMenuAriaLabel: 'Cerrar menú',
      menuTitle: 'Menú',
    },
    languageSelector: {
      ariaLabel: 'Cambiar idioma',
      menuAriaLabel: 'Seleccionar idioma',
      label: 'Idioma',
    },
    socialLinks: {
      ariaLabel: 'Redes sociales de PitDev',
      emailLabel: 'Correo',
    },
    terminalLines: [
      'Inicializando soluciones digitales...',
      'Conectando agenda inteligente...',
      'Optimizando procesos...',
      'Revisando infraestructura de red...',
      'Sistema listo para crecer',
    ],
    hero: {
      title: 'Tecnología que impulsa tu negocio',
      description:
        'Creamos páginas web, sistemas de agenda, software personalizado, automatización y auditorías de red para negocios que quieren crecer.',
      servicesCta: 'Ver servicios',
      whatsappCta: 'Hablar por WhatsApp',
    },
    routeMeta: {
      home: {
        title: 'PitDev | Soluciones digitales para negocios locales',
        description:
          'PitDev crea páginas web, software a medida, automatización y productos digitales para negocios locales.',
      },
      services: {
        title: 'Servicios | PitDev',
        description:
          'Servicios digitales personalizados de PitDev para páginas web, software a medida, automatización y auditorías de red.',
      },
      products: {
        title: 'Productos Digitales | PitDev',
        description:
          'Soluciones digitales de PitDev para agenda, inventario, CRM y centros educativos.',
      },
      projects: {
        title: 'Proyectos | PitDev',
        description:
          'Clientes y trabajos realizados por PitDev para comunidades, marcas personales y negocios.',
      },
      contact: {
        title: 'Contacto | PitDev',
        description:
          'Contacta a PitDev por WhatsApp, Instagram, Facebook o formulario para cotizar tu proyecto digital.',
      },
    },
    homePage: {
      aboutTitle: 'Sobre PitDev',
      aboutDescription:
        'Creamos soluciones digitales simples y funcionales para que negocios locales se presenten mejor, organicen su operación y atiendan con más eficiencia.',
      servicesEyebrow: 'Servicios',
      servicesTitle: 'Lo esencial para digitalizar tu negocio',
      servicesDescription:
        'Un resumen de las áreas donde ayudamos a negocios locales a mejorar su presencia, procesos y control operativo.',
      servicesCta: 'Ver servicios',
      productsEyebrow: 'Productos digitales',
      productsTitle: 'Soluciones listas para operar mejor',
      productsDescription:
        'Productos pensados para negocios que necesitan orden, seguimiento y herramientas claras sin empezar desde cero.',
      productsCta: 'Ver productos digitales',
    },
    servicesPage: {
      eyebrow: 'Servicios',
      title: 'Servicios',
      description:
        'Soluciones digitales personalizadas para negocios locales que necesitan verse mejor, trabajar con más orden y automatizar procesos clave.',
      details: [
        'Diseñamos sitios rápidos, claros y adaptados a tu marca para que tus clientes entiendan qué ofreces y cómo contactarte.',
        'Creamos herramientas internas según la operación real de tu negocio, desde paneles administrativos hasta flujos de control.',
        'Conectamos formularios, WhatsApp, correos, calendarios y procesos repetitivos para ahorrar tiempo y reducir errores.',
        'Revisamos conectividad, equipos, seguridad básica y estructura de red para detectar mejoras prácticas.',
      ],
      processEyebrow: 'Cómo trabajamos',
      processTitle: 'Un proceso claro desde la idea hasta la entrega',
      processDescription:
        'Trabajamos por etapas para entender el problema, proponer una solución viable y entregar herramientas útiles para el día a día.',
      processSteps: [
        {
          title: 'Diagnóstico',
          description: 'Revisamos la necesidad, el contexto del negocio y los puntos donde la tecnología puede aportar más valor.',
        },
        {
          title: 'Propuesta',
          description: 'Definimos alcance, prioridades, tiempos y una solución alineada al presupuesto y objetivo del negocio.',
        },
        {
          title: 'Desarrollo',
          description: 'Construimos la solución con avances revisables, cuidando experiencia, rendimiento y funcionamiento real.',
        },
        {
          title: 'Entrega y soporte',
          description: 'Publicamos, entregamos accesos y acompañamos los ajustes necesarios para que el uso sea claro.',
        },
      ],
      ctaTitle: '¿Listo para cotizar un servicio?',
      ctaDescription:
        'Cuéntanos qué necesita tu negocio y te ayudamos a aterrizar una solución digital práctica.',
      ctaButton: 'Cotizar un servicio',
    },
    productsPage: {
      eyebrow: 'Productos Digitales',
      title: 'Productos Digitales',
      description:
        'Soluciones digitales listas para adaptar a negocios que necesitan agenda, inventario, seguimiento comercial o gestión educativa.',
      ctaTitle: '¿Quieres ver una solución aplicada a tu negocio?',
      ctaDescription:
        'Podemos revisar tu caso y recomendarte el producto digital más adecuado o una adaptación a medida.',
      ctaButton: 'Solicitar demo o cotización',
    },
    contactPage: {
      eyebrow: 'Contacto',
      title: 'Contacto',
      description:
        'Conversemos sobre tu página web, sistema, automatización o producto digital. Te responderemos con una ruta clara para avanzar.',
    },
    laptop: {
      ariaLabel: 'Laptop premium de PitDev mostrando código',
      status: ['BUILD LISTO', 'SYNC ACTIVA', 'DEPLOY ONLINE'],
      codeLines: [
        { code: 'const pitdev = desplegar({', tone: 'text-white' },
        { code: '  web: "presencia profesional",', tone: 'text-pit-neon' },
        { code: '  agenda: "reservas inteligentes",', tone: 'text-pit-cyan' },
        { code: '  crm: "clientes ordenados",', tone: 'text-pit-mint' },
        { code: '  stock: "inventario claro",', tone: 'text-pit-ink' },
        { code: '  red: "infraestructura estable",', tone: 'text-pit-neon' },
        { code: '});', tone: 'text-white' },
      ],
    },
    servicesSection: {
      eyebrow: 'Servicios',
      title: 'Soluciones digitales para operar mejor',
      description:
        'Herramientas claras, útiles y escalables para negocios que necesitan presencia, control y eficiencia.',
    },
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
    storytelling: {
      eyebrow: 'Del problema a la solución',
      title: 'Menos improvisación. Más control operativo.',
      description:
        'PitDev toma lo que hoy consume tiempo en tu negocio y lo convierte en herramientas digitales simples, medibles y listas para crecer contigo.',
      badge: 'Proceso claro desde diagnóstico hasta entrega',
      stepLabel: 'Paso',
      steps: [
        {
          title: 'Negocio desordenado',
          description: 'Citas, clientes, ventas e inventario dispersos entre mensajes, libretas y hojas de cálculo.',
          icon: Workflow,
        },
        {
          title: 'PitDev automatiza',
          description: 'Convertimos procesos repetitivos en sistemas claros, conectados y adaptados a la operación real.',
          icon: Sparkles,
        },
        {
          title: 'Control, ventas y crecimiento',
          description: 'Tu equipo trabaja con más orden, mejores datos y una presencia digital lista para vender.',
          icon: ChartNoAxesCombined,
        },
      ],
    },
    productsSection: {
      eyebrow: 'Productos',
      title: 'Productos',
      description: 'Soluciones listas para negocios que necesitan orden, control y crecimiento.',
      showMore: 'Ver más',
      showLess: 'Ver menos',
    },
    productMeta: {
      'school-lite': {
        label: 'Educación',
        bullets: ['Admisiones', 'Panel admin', 'Eventos'],
      },
      agenda: {
        label: 'Reservas',
        bullets: ['Calendario', 'WhatsApp', 'Reportes'],
      },
      stock: {
        label: 'Inventario',
        bullets: ['Stock bajo', 'Ventas', 'Caja'],
      },
      'crm-simple': {
        label: 'Comercial',
        bullets: ['Clientes', 'Cotizaciones', 'Tareas'],
      },
    },
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
    projectsSection: {
      eyebrow: 'Proyectos',
      title: 'Clientes y trabajos realizados',
      description:
        'Estos son algunos proyectos web desarrollados por PitDev para comunidades, marcas personales y negocios que buscan tener presencia digital profesional.',
      viewPage: 'Ver página',
    },
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
    projectCta: {
      title: '¿Quieres una página web profesional para tu negocio?',
      description:
        'Creamos sitios modernos, rápidos y adaptados a tu marca para que tus clientes te encuentren, conozcan tus servicios y confíen más en tu negocio.',
      button: 'Cotizar mi página web',
    },
    about: {
      eyebrow: 'Nosotros',
      title: 'Tecnología cercana para negocios reales',
      description:
        'Somos PitDev, una empresa enfocada en crear soluciones digitales simples, funcionales y adaptadas a negocios locales. Nuestro objetivo es que cada cliente tenga herramientas que realmente le ayuden a trabajar mejor, organizarse mejor y verse más profesional.',
    },
    strengths: [
      { label: 'Soluciones prácticas', icon: Sparkles },
      { label: 'Atención directa', icon: Bot },
      { label: 'Adaptación al negocio', icon: Radar },
      { label: 'Enfoque en resultados', icon: Workflow },
    ],
    contact: {
      eyebrow: 'Contacto',
      title: 'Hablemos de tu proyecto',
      description:
        'Cuéntanos qué necesita tu negocio y te ayudamos a encontrar una solución digital adecuada.',
      directTitle: 'Canales directos',
      directDescription:
        'Escríbenos para cotizar una página, revisar una idea de sistema o definir una solución para tu negocio.',
      whatsappButton: 'Escribir por WhatsApp',
      instagramButton: 'Ver Instagram',
      facebookButton: 'Ver Facebook',
      socialEyebrow: 'Redes',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      phoneLabel: 'Teléfono',
      phonePlaceholder: 'Tu número',
      projectTypeLabel: 'Tipo de proyecto',
      projectTypePlaceholder: 'Selecciona una opción',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntanos qué necesitas',
      submitButton: 'Enviar por WhatsApp',
      whatsappNote: 'Se abrirá WhatsApp en una nueva pestaña.',
      whatsappMessageIntro: 'Hola, quiero cotizar un proyecto con PitDev.',
    },
    footerServices: 'Páginas web • Software personalizado • Automatización • Auditorías de red',
    footer: {
      rights: '© 2026 PitDev. Todos los derechos reservados.',
    },
    floatingWhatsApp: {
      ariaLabel: 'Abrir WhatsApp de PitDev',
    },
  },
  en: {
    meta: {
      title: 'PitDev | Digital solutions for local businesses',
      description:
        'PitDev builds websites, scheduling systems, custom software, automation, and network audits for local businesses.',
    },
    tagline: 'Digital solutions for local businesses',
    description:
      'We build websites, scheduling systems, custom software, process automation, and network audits so small businesses look more professional, stay organized, and work more efficiently.',
    navItems: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/servicios' },
      { label: 'Digital Products', href: '/productos' },
      { label: 'Projects', href: '/proyectos' },
      { label: 'Contact', href: '/contacto' },
    ],
    navbar: {
      homeAriaLabel: 'Go to PitDev home',
      logoAlt: 'PitDev Logo',
      quoteButton: 'Quote on WhatsApp',
      mobileQuoteButton: 'Quote',
      openMenuAriaLabel: 'Open menu',
      closeMenuAriaLabel: 'Close menu',
      menuTitle: 'Menu',
    },
    languageSelector: {
      ariaLabel: 'Change language',
      menuAriaLabel: 'Select language',
      label: 'Language',
    },
    socialLinks: {
      ariaLabel: 'PitDev social links',
      emailLabel: 'Email',
    },
    terminalLines: [
      'Initializing digital solutions...',
      'Connecting smart scheduling...',
      'Optimizing processes...',
      'Reviewing network infrastructure...',
      'System ready to grow',
    ],
    hero: {
      title: 'Technology that moves your business forward',
      description:
        'We create websites, scheduling systems, custom software, automation, and network audits for businesses ready to grow.',
      servicesCta: 'View services',
      whatsappCta: 'Talk on WhatsApp',
    },
    routeMeta: {
      home: {
        title: 'PitDev | Digital solutions for local businesses',
        description:
          'PitDev builds websites, custom software, automation, and digital products for local businesses.',
      },
      services: {
        title: 'Services | PitDev',
        description:
          'PitDev digital services for websites, custom software, automation, and network audits.',
      },
      products: {
        title: 'Digital Products | PitDev',
        description:
          'PitDev digital solutions for scheduling, inventory, CRM, and education centers.',
      },
      projects: {
        title: 'Projects | PitDev',
        description:
          'Clients and completed work by PitDev for communities, personal brands, and businesses.',
      },
      contact: {
        title: 'Contact | PitDev',
        description:
          'Contact PitDev through WhatsApp, Instagram, Facebook, or the form to quote your digital project.',
      },
    },
    homePage: {
      aboutTitle: 'About PitDev',
      aboutDescription:
        'We create simple, practical digital solutions so local businesses can present themselves better, organize operations, and serve customers more efficiently.',
      servicesEyebrow: 'Services',
      servicesTitle: 'The essentials to digitize your business',
      servicesDescription:
        'A quick look at the areas where we help local businesses improve presence, processes, and operational control.',
      servicesCta: 'View services',
      productsEyebrow: 'Digital products',
      productsTitle: 'Solutions ready to improve operations',
      productsDescription:
        'Products for businesses that need order, follow-up, and clear tools without starting from zero.',
      productsCta: 'View digital products',
    },
    servicesPage: {
      eyebrow: 'Services',
      title: 'Services',
      description:
        'Custom digital solutions for local businesses that need a stronger presence, cleaner operations, and automation for key processes.',
      details: [
        'We design fast, clear websites tailored to your brand so customers understand what you offer and how to contact you.',
        'We build internal tools around your actual operation, from admin panels to control workflows.',
        'We connect forms, WhatsApp, email, calendars, and repetitive tasks to save time and reduce errors.',
        'We review connectivity, devices, basic security, and network structure to identify practical improvements.',
      ],
      processEyebrow: 'How we work',
      processTitle: 'A clear process from idea to delivery',
      processDescription:
        'We work in stages to understand the problem, propose a viable solution, and deliver tools that are useful in daily operations.',
      processSteps: [
        {
          title: 'Diagnosis',
          description: 'We review the need, business context, and areas where technology can create the most value.',
        },
        {
          title: 'Proposal',
          description: 'We define scope, priorities, timing, and a solution aligned with the business goal and budget.',
        },
        {
          title: 'Development',
          description: 'We build with reviewable progress, caring for experience, performance, and real-world behavior.',
        },
        {
          title: 'Delivery and support',
          description: 'We publish, hand over access, and support the adjustments needed so the solution is clear to use.',
        },
      ],
      ctaTitle: 'Ready to quote a service?',
      ctaDescription:
        'Tell us what your business needs and we will help you shape a practical digital solution.',
      ctaButton: 'Quote a service',
    },
    productsPage: {
      eyebrow: 'Digital Products',
      title: 'Digital Products',
      description:
        'Ready-to-adapt digital solutions for businesses that need scheduling, inventory, sales follow-up, or education management.',
      ctaTitle: 'Want to see a solution applied to your business?',
      ctaDescription:
        'We can review your case and recommend the right digital product or a custom adaptation.',
      ctaButton: 'Request demo or quote',
    },
    contactPage: {
      eyebrow: 'Contact',
      title: 'Contact',
      description:
        'Let’s talk about your website, system, automation, or digital product. We will reply with a clear path forward.',
    },
    laptop: {
      ariaLabel: 'Premium PitDev laptop showing code',
      status: ['BUILD READY', 'SYNC ACTIVE', 'DEPLOY ONLINE'],
      codeLines: [
        { code: 'const pitdev = deploy({', tone: 'text-white' },
        { code: '  web: "professional presence",', tone: 'text-pit-neon' },
        { code: '  booking: "smart scheduling",', tone: 'text-pit-cyan' },
        { code: '  crm: "organized clients",', tone: 'text-pit-mint' },
        { code: '  stock: "clear inventory",', tone: 'text-pit-ink' },
        { code: '  network: "stable infrastructure",', tone: 'text-pit-neon' },
        { code: '});', tone: 'text-white' },
      ],
    },
    servicesSection: {
      eyebrow: 'Services',
      title: 'Digital solutions for better operations',
      description:
        'Clear, practical, and scalable tools for businesses that need presence, control, and efficiency.',
    },
    services: [
      {
        title: 'Websites',
        description: 'Modern sites to present your business, services, and contact channels.',
        icon: Globe2,
      },
      {
        title: 'Custom software',
        description: 'Tools built around the real needs of your business.',
        icon: Code2,
      },
      {
        title: 'Automation',
        description:
          'Faster processes using forms, WhatsApp, email, calendars, and digital workflows.',
        icon: Workflow,
      },
      {
        title: 'Network audits',
        description:
          'Connectivity, infrastructure, basic security, and practical recommendations to improve your network.',
        icon: Network,
      },
    ],
    storytelling: {
      eyebrow: 'From problem to solution',
      title: 'Less improvisation. More operational control.',
      description:
        'PitDev turns the work that consumes your time today into simple, measurable digital tools ready to grow with you.',
      badge: 'A clear process from diagnosis to delivery',
      stepLabel: 'Step',
      steps: [
        {
          title: 'Disorganized business',
          description: 'Appointments, clients, sales, and inventory scattered across messages, notebooks, and spreadsheets.',
          icon: Workflow,
        },
        {
          title: 'PitDev automates',
          description: 'We turn repetitive processes into clear, connected systems tailored to your actual operation.',
          icon: Sparkles,
        },
        {
          title: 'Control, sales, and growth',
          description: 'Your team works with more order, better data, and a digital presence built to sell.',
          icon: ChartNoAxesCombined,
        },
      ],
    },
    productsSection: {
      eyebrow: 'Products',
      title: 'Products',
      description: 'Ready-to-use solutions for businesses that need order, control, and growth.',
      showMore: 'View more',
      showLess: 'View less',
    },
    productMeta: {
      'school-lite': {
        label: 'Education',
        bullets: ['Admissions', 'Admin panel', 'Events'],
      },
      agenda: {
        label: 'Bookings',
        bullets: ['Calendar', 'WhatsApp', 'Reports'],
      },
      stock: {
        label: 'Inventory',
        bullets: ['Low stock', 'Sales', 'Cash register'],
      },
      'crm-simple': {
        label: 'Sales',
        bullets: ['Clients', 'Quotes', 'Tasks'],
      },
    },
    products: [
      {
        id: 'school-lite',
        name: 'PitDev School Lite',
        shortDescription: 'Digital system for small schools and educational centers.',
        detail:
          'PitDev School Lite is designed for small schools and educational institutions that need a stronger digital presence and better organization. It includes an informational website, admission form, lead database, admin panel, news, events, and gallery. It helps improve the school presentation, simplify enrollment, and centralize important information.',
        icon: School,
      },
      {
        id: 'agenda',
        name: 'PitDev Agenda',
        shortDescription: 'Appointment system for service businesses that work with bookings.',
        detail:
          'PitDev Agenda is built for barbershops, clinics, salons, psychologists, dentists, academies, and other businesses that schedule appointments. It includes client management, appointments, services, calendar views, appointment statuses, WhatsApp integration, and basic reports. It helps organize bookings, reduce missed appointments, and give you better control of daily operations.',
        icon: CalendarClock,
      },
      {
        id: 'stock',
        name: 'PitDev Stock',
        shortDescription: 'Inventory and sales system for small businesses.',
        detail:
          'PitDev Stock helps manage products, entries, exits, low stock, sales, cash flow, and reports. It is designed for shops, small retailers, and businesses that need to know what they have, what they sell, and what needs replenishing. It reduces disorder, improves inventory control, and supports better decisions.',
        icon: Package,
      },
      {
        id: 'crm-simple',
        name: 'PitDev CRM Simple',
        shortDescription: 'Client and quote follow-up system.',
        detail:
          'PitDev CRM Simple is focused on service companies. It includes clients, follow-ups, quotes, statuses, tasks, history, and PDF generation. It is useful for small construction companies, technicians, agencies, installers, camera and internet companies, maintenance teams, and similar businesses. It helps follow up with prospects, organize jobs, and maintain stronger commercial control.',
        icon: UsersRound,
      },
    ],
    projectsSection: {
      eyebrow: 'Projects',
      title: 'Clients and completed work',
      description:
        'These are some web projects developed by PitDev for communities, personal brands, and businesses looking for a professional digital presence.',
      viewPage: 'View website',
    },
    projects: [
      {
        title: 'UMES Makers Community',
        type: 'Informational website',
        description:
          'Informational website for a university maker community, focused on showcasing events, featured projects, community information, and official links.',
        href: 'https://umesmakerscommunity.vercel.app/',
        image: '/clientes/umes-makers.png',
        imageAlt: 'Screenshot of the UMES Makers Community website',
      },
      {
        title: 'Arwyng Official',
        type: 'Personal brand / DJ',
        description:
          'Website for a personal brand and DJ, focused on presenting the artist profile, events, music, contact options, and a professional online presence.',
        href: 'https://arwyng-ofifcial.vercel.app/',
        image: '/clientes/arwyng-official.png',
        imageAlt: 'Screenshot of the Arwyng Official website',
      },
    ],
    projectCta: {
      title: 'Need a professional website for your business?',
      description:
        'We create modern, fast websites tailored to your brand so customers can find you, understand your services, and trust your business.',
      button: 'Quote my website',
    },
    about: {
      eyebrow: 'About',
      title: 'Approachable technology for real businesses',
      description:
        'We are PitDev, a company focused on creating simple, functional digital solutions tailored to local businesses. Our goal is for every client to have tools that truly help them work better, stay organized, and look more professional.',
    },
    strengths: [
      { label: 'Practical solutions', icon: Sparkles },
      { label: 'Direct support', icon: Bot },
      { label: 'Business-fit adaptation', icon: Radar },
      { label: 'Results-focused', icon: Workflow },
    ],
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us about your project',
      description:
        'Share what your business needs and we will help you find the right digital solution.',
      directTitle: 'Direct channels',
      directDescription:
        'Message us to quote a website, review a system idea, or define a solution for your business.',
      whatsappButton: 'Write on WhatsApp',
      instagramButton: 'View Instagram',
      facebookButton: 'View Facebook',
      socialEyebrow: 'Social',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      phoneLabel: 'Phone',
      phonePlaceholder: 'Your number',
      projectTypeLabel: 'Project type',
      projectTypePlaceholder: 'Select an option',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us what you need',
      submitButton: 'Send on WhatsApp',
      whatsappNote: 'WhatsApp will open in a new tab.',
      whatsappMessageIntro: 'Hello, I want to quote a project with PitDev.',
    },
    footerServices: 'Websites • Custom software • Automation • Network audits',
    footer: {
      rights: '© 2026 PitDev. All rights reserved.',
    },
    floatingWhatsApp: {
      ariaLabel: 'Open PitDev WhatsApp',
    },
  },
};

export const isSupportedLanguage = (language) =>
  Object.prototype.hasOwnProperty.call(content, language);

export const getSiteContent = (language = defaultLanguage) => {
  const normalizedLanguage = isSupportedLanguage(language) ? language : defaultLanguage;

  return {
    ...content[normalizedLanguage],
    name: site.name,
    social: site.social,
  };
};

export const getWhatsAppUrl = () => site.social.whatsapp;
