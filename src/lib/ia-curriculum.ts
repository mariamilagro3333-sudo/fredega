export const IA_MODULE_1_DOWNLOAD_URL =
  'https://drive.google.com/drive/folders/1zl_-itLGGWEpkMLmzjZJLA3tnGkv8EFM';

export const IA_WHATSAPP_CHANNEL_URL =
  'https://whatsapp.com/channel/0029Vb9ptJvEAKWLbEBGNN10';

export const IA_INSTRUCTIONS_PDF_URL =
  'https://media.fredegapro.com/01/ia/instrucciones.pdf';

export const IA_NO_PRO_EDITOR_NOTICE =
  'No necesitas un programa de edición profesional para realizar este curso';

export const MEMBERSHIP_PAYMENT_CONFIG = {
  hotmart: {
    sixMonths: 'https://pay.hotmart.com/N104679990R?off=tbg912ru',
    annual: 'https://pay.hotmart.com/N104679990R?off=x9rxw3oy',
  },
  prices: {
    sixMonths: {
      dollars: '$15 dólares',
      cop: '$40.000 pesos colombianos',
    },
    annual: {
      dollars: '$22 dólares',
      cop: '$60.000 pesos colombianos',
    },
  },
  transfer: {
    methods: 'Nequi, Llave Bre-B o Daviplata',
    number: '319 545 6391',
    holder: 'Fred*** D* L* Gariz****',
  },
  westernUnion: {
    recipientName: 'FREDY AMIR DE LA HOZ GARIZABALO',
    document: 'Cédula de Ciudadanía No. 1042440954',
    country: 'Colombia',
    city: 'Soledad, Atlántico',
  },
  contact: {
    whatsapp:
      'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20activar%20mi%20membres%C3%ADa.%20Adjunto%20mi%20comprobante%20de%20pago.',
    email:
      'mailto:contacto@fredegapro.com?subject=Activaci%C3%B3n%20de%20Membres%C3%ADa%20-%20Comprobante&body=Hola,%20adjunto%20mi%20comprobante%20de%20pago%20para%20activar%20mi%20membres%C3%ADa.',
  },
};

export interface IaCourseRequirement {
  id: 'device' | 'google' | 'software' | 'attitude';
  label: string;
  title: string;
  detail: string;
}

export const IA_COURSE_REQUIREMENTS: IaCourseRequirement[] = [
  {
    id: 'device',
    label: 'Dispositivo',
    title: 'Un celular, una tablet o un computador',
    detail: 'Puedes realizar el curso al 100% desde cualquiera de estos dispositivos.',
  },
  {
    id: 'google',
    label: 'Cuenta',
    title: 'Tener una cuenta de Google',
    detail: 'Solo necesitas una cuenta de Google para acceder a las herramientas y descargas.',
  },
  {
    id: 'software',
    label: 'Programas',
    title: 'Cualquier programa de edición básica',
    detail:
      'Sirve CapCut, Filmora o cualquier editor de video de celular o computador que ya utilices.',
  },
  {
    id: 'attitude',
    label: 'Actitud',
    title: 'Mucha actitud y creatividad',
    detail: 'Ganas de practicar, experimentar y llevar tus videos a un nivel cinematográfico.',
  },
];

export interface IaLesson {
  id: string;
  title: string;
  downloadUrl?: string;
}

export interface IaModule {
  id: string;
  numberLabel: string;
  title: string;
  isAvailableNow?: boolean;
  downloadUrl?: string;
  memberReleaseDate?: string;
  memberReleaseNote?: string;
  lessons: IaLesson[];
}

export const IA_CURRICULUM_MODULES: IaModule[] = [
  {
    id: 'modulo-01',
    numberLabel: 'MÓDULO 01',
    title: 'Módulo 01: Mi primer montaje',
    isAvailableNow: true,
    downloadUrl: IA_MODULE_1_DOWNLOAD_URL,
    lessons: [
      {
        id: 'm1-l1',
        title: '1. Introducción: Lo que se necesita para comenzar.',
        downloadUrl: IA_MODULE_1_DOWNLOAD_URL,
      },
      {
        id: 'm1-l2',
        title: '2. Mi primer montaje: Cambiar y desenfocar el fondo de un video (edición V2V).',
        downloadUrl: IA_MODULE_1_DOWNLOAD_URL,
      },
      {
        id: 'm1-l3',
        title: '3. Mi primera edición: Crear un proyecto y realizar la edición básica en el editor de video.',
        downloadUrl: IA_MODULE_1_DOWNLOAD_URL,
      },
      {
        id: 'm1-l4',
        title: '4. Mejorar voz: Usar la IA para optimizar cualquier audio y lograr que se escuche profesional.',
        downloadUrl: IA_MODULE_1_DOWNLOAD_URL,
      },
      {
        id: 'm1-l5',
        title: '5. Subtítulos animados: Usar la IA para generar subtítulos dinámicos en tendencia.',
        downloadUrl: IA_MODULE_1_DOWNLOAD_URL,
      },
      {
        id: 'm1-bonus',
        title: 'Bonus: Tips para lograr una buena grabación.',
        downloadUrl: IA_MODULE_1_DOWNLOAD_URL,
      },
    ],
  },
  {
    id: 'modulo-02',
    numberLabel: 'MÓDULO 02',
    title: 'Módulo 02: Introducción con el Agente IA — Texto a video con logo de marca',
    isAvailableNow: false,
    memberReleaseDate: 'Viernes 27 de noviembre',
    memberReleaseNote:
      'Fecha de publicación: Viernes 27 de noviembre. Se notificará por el canal de WhatsApp en cuanto esté disponible para descargar.',
    lessons: [
      {
        id: 'm2-l1',
        title: '1. Contextualización del agente IA desde cero para el proyecto.',
      },
      {
        id: 'm2-l2',
        title: '2. Generación de video de texto a video integrando el logo como marca.',
      },
      {
        id: 'm2-l3',
        title: '3. Edición y cierre de la pieza en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-03',
    numberLabel: 'MÓDULO 03',
    title: 'Módulo 03: Motion Graphics — Personaje, storyboard y animación',
    isAvailableNow: false,
    memberReleaseDate: '02 de diciembre',
    memberReleaseNote:
      'Fecha de publicación: 02 de diciembre. Se notificará por el canal de WhatsApp en cuanto esté disponible para descargar.',
    lessons: [
      {
        id: 'm3-l1',
        title: '1. Creación y definición del personaje con IA.',
      },
      {
        id: 'm3-l2',
        title: '2. Armado del storyboard y planificación de escenas.',
      },
      {
        id: 'm3-l3',
        title:
          '3. Generación de los videos y escenas animadas con IA (incluyendo apoyos de voz y música con IA).',
      },
      {
        id: 'm3-l4',
        title: '4. Edición, ritmo y acabado final en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-04',
    numberLabel: 'MÓDULO 04',
    title: 'Módulo 04: Efectos visuales con videos (V2V Avanzado)',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm4-l1',
        title: '1. Prompts detallados y preparación de múltiples imágenes de referencia.',
      },
      {
        id: 'm4-l2',
        title: '2. Generación de efectos visuales avanzados sobre video (V2V) con IA.',
      },
      {
        id: 'm4-l3',
        title: '3. Refuerzo sonoro, musicalización y ajustes de audio y voz con IA.',
      },
      {
        id: 'm4-l4',
        title: '4. Edición e integración final de efectos en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-05',
    numberLabel: 'MÓDULO 05',
    title: 'Módulo 05: Montajes con videos',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm5-l1',
        title: '1. Selección de tomas y planificación del montaje.',
      },
      {
        id: 'm5-l2',
        title: '2. Construcción de escenas y combinación de videos con IA.',
      },
      {
        id: 'm5-l3',
        title: '3. Edición del montaje, ritmo y exportación en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-06',
    numberLabel: 'MÓDULO 06',
    title: 'Módulo 06: Transiciones con IA',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm6-l1',
        title: '1. Concepto de transición y preparación de clips de entrada y salida.',
      },
      {
        id: 'm6-l2',
        title: '2. Generación de transiciones con IA.',
      },
      {
        id: 'm6-l3',
        title: '3. Edición, ajuste de tiempos y remate sonoro en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-07',
    numberLabel: 'MÓDULO 07',
    title: 'Módulo 07: Publicidad de productos (Módulo complejo)',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm7-l1',
        title: '1. Estrategia visual del anuncio, creación de personaje y preparación del producto.',
      },
      {
        id: 'm7-l2',
        title: '2. Cambio de fondo y aplicación de Video a Video (V2V) con IA.',
      },
      {
        id: 'm7-l3',
        title: '3. Animación del producto e integración en escena.',
      },
      {
        id: 'm7-l4',
        title:
          '4. Voz comercial (creación, clonación o cambio de voz con IA) y música generada con IA.',
      },
      {
        id: 'm7-l5',
        title: '5. Subtítulos dinámicos y ajustes finos de audio/visual.',
      },
      {
        id: 'm7-l6',
        title: '6. Edición publicitaria completa, gancho, llamada a la acción y exportación.',
      },
    ],
  },
  {
    id: 'modulo-08',
    numberLabel: 'MÓDULO 08',
    title: 'Módulo 08: Storyboard y filtros con IA',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm8-l1',
        title: '1. Diseño de storyboard para la secuencia.',
      },
      {
        id: 'm8-l2',
        title: '2. Aplicación de filtros y generación de planos con IA.',
      },
      {
        id: 'm8-l3',
        title: '3. Edición y unificación visual en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-09',
    numberLabel: 'MÓDULO 09',
    title: 'Módulo 09: Avatar, consistencia de personajes y videos cinematográficos',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm9-l1',
        title: '1. Creación del avatar y definición del personaje consistente.',
      },
      {
        id: 'm9-l2',
        title: '2. Planificación de tomas y dirección visual con estilo cinematográfico.',
      },
      {
        id: 'm9-l3',
        title:
          '3. Generación de escenas manteniendo la consistencia del personaje en distintos planos.',
      },
      {
        id: 'm9-l4',
        title:
          '4. Voces o narración con IA y banda sonora cinematográfica generada con IA.',
      },
      {
        id: 'm9-l5',
        title: '5. Edición cinematográfica, ritmo, subtítulos y exportación en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-10',
    numberLabel: 'MÓDULO 10',
    title: 'Módulo 10: Herramientas de IA (extender videos, cambiar audios, diálogos y doblaje)',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm10-l1',
        title: '1. Extender videos y dar continuidad a planos con IA.',
      },
      {
        id: 'm10-l2',
        title: '2. Cambiar audios y generar música y ambientación con IA.',
      },
      {
        id: 'm10-l3',
        title:
          '3. Cambiar diálogos y voces (creación, clonación o cambio de voz) con IA.',
      },
      {
        id: 'm10-l4',
        title: '4. Doblar videos a otro idioma cuidando tono, intención y sincronía.',
      },
      {
        id: 'm10-l5',
        title: '5. Edición final, ajuste de subtítulos y exportación en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-11',
    numberLabel: 'MÓDULO 11',
    title: 'Módulo 11: Motion Graphics avanzado (gráficos, infografías y estilo After Effects)',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm11-l1',
        title: '1. Estructura de gráficos e infografías animadas con apoyo de IA.',
      },
      {
        id: 'm11-l2',
        title: '2. Animación, composición visual y movimiento avanzado.',
      },
      {
        id: 'm11-l3',
        title: '3. Locución, música y subtítulos dinámicos.',
      },
      {
        id: 'm11-l4',
        title: '4. Edición avanzada y acabado final en el editor de video.',
      },
    ],
  },
  {
    id: 'modulo-12',
    numberLabel: 'MÓDULO 12',
    title: 'Módulo 12: Dibujos animados cinematográficos',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'm12-l1',
        title: '1. Diseño de personajes y escenas de dibujo animado con enfoque cinematográfico.',
      },
      {
        id: 'm12-l2',
        title: '2. Generación y animación de secuencias con IA.',
      },
      {
        id: 'm12-l3',
        title: '3. Voces, efectos y música acorde a la historia.',
      },
      {
        id: 'm12-l4',
        title: '4. Edición final y exportación de la pieza animada.',
      },
    ],
  },
  {
    id: 'bonus-extra',
    numberLabel: 'BONUS EXTRA',
    title: 'Bonus Extra: Documentos, infografías, PDF y presentaciones con IA',
    isAvailableNow: false,
    memberReleaseNote: 'Las fechas de publicación se estarán anunciando por el canal de WhatsApp.',
    lessons: [
      {
        id: 'bonus-l1',
        title: '1. Creación de infografías a partir de textos, documentos y PDFs con IA.',
      },
      {
        id: 'bonus-l2',
        title: '2. Diseño de presentaciones visuales y documentos con IA.',
      },
      {
        id: 'bonus-l3',
        title: '3. Revisión y exportación del material final.',
      },
    ],
  },
];
