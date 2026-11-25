export const IA_MODULE_1_DOWNLOAD_URL =
  'https://drive.google.com/drive/folders/1zl_-itLGGWEpkMLmzjZJLA3tnGkv8EFM';

export const IA_WHATSAPP_CHANNEL_URL =
  'https://whatsapp.com/channel/0029Vb9ptJvEAKWLbEBGNN10';

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
    title: 'Módulo 02: Agente IA',
    isAvailableNow: false,
    memberReleaseDate: '26 de noviembre',
    memberReleaseNote:
      'Disponible el 26 de noviembre. Se notificará por el canal de WhatsApp en cuanto esté listo para descargar.',
    lessons: [
      {
        id: 'm2-l6',
        title: '6. Crear un proyecto desde cero con un agente IA: Cómo contextualizar a la IA para desarrollar un proyecto.',
      },
      {
        id: 'm2-l7',
        title: '7. Imágenes de referencia: Selección y uso adecuado.',
      },
      {
        id: 'm2-l8',
        title: '8. Animar imágenes de referencia con agente IA: Técnicas de movimiento y generación.',
      },
      {
        id: 'm2-l9',
        title: '9. Correcciones de imágenes y videos: Ajustes y perfeccionamiento visual.',
      },
      {
        id: 'm2-l10',
        title: '10. Edición avanzada de video: Flujos de trabajo y acabados profesionales.',
      },
    ],
  },
  {
    id: 'modulo-03',
    numberLabel: 'MÓDULO 03',
    title: 'Módulo 03: Efectos Visuales y Personajes',
    isAvailableNow: false,
    lessons: [
      {
        id: 'm3-l1',
        title: 'Humanización de productos: Animación de objetos con rasgos humanos.',
      },
      {
        id: 'm3-l2',
        title: 'El Arte del Clon: Diálogos entre sujetos reales y personajes IA.',
      },
      {
        id: 'm3-l3',
        title: 'Cinematografía de Corto: Producción narrativa con cámaras virtuales.',
      },
      {
        id: 'm3-l4',
        title: 'VFX Pro en Celular: Inserción de partículas y efectos de alto impacto.',
      },
    ],
  },
  {
    id: 'modulo-04',
    numberLabel: 'MÓDULO 04',
    title: 'Módulo 04: Motion Graphics y Viralidad',
    isAvailableNow: false,
    lessons: [
      {
        id: 'm4-l1',
        title: 'Animación de Logos: De marcas planas a Motion Graphics 4K.',
      },
      {
        id: 'm4-l2',
        title: 'Visual Hooks: Creación de contenido viral de alto impacto.',
      },
      {
        id: 'm4-l3',
        title: 'Tipografía Dinámica: Integración de textos pro en tus proyectos.',
      },
    ],
  },
  {
    id: 'modulo-05',
    numberLabel: 'MÓDULO 05',
    title: 'Módulo 05: Acabado 4K Definitivo',
    isAvailableNow: false,
    lessons: [
      {
        id: 'm5-l1',
        title: 'Plantillas para Eventos: Uso de recursos premium directo en tus videos.',
      },
      {
        id: 'm5-l2',
        title: 'Estrategias de Eficiencia: Optimización en dispositivos gama media.',
      },
      {
        id: 'm5-l3',
        title: 'Masterización Final: Acabado 4K, color y exportación profesional.',
      },
    ],
  },
];
