import type { Product } from '@/types';

export const packs2026: Product[] = [
  {
    id: 22002,
    title: 'Maestría en Edición e Inteligencia Artificial 2026 (Versión Celular)',
    slug: 'maestria-edicion-ia-2026',
    coverImage: 'https://media.fredegapro.com/01/max.jpg',
    videoUrl: 'https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4',
    downloadUrl: '/ia',
    categories: ['after-effects', 'premiere', 'davinci-resolve', 'exclusivos-miembros', 'packs'],
    description: '¡YA DISPONIBLE PARA DESCARGAR! Domina la IA y la edición profesional 100% desde tu teléfono, tablet u ordenador. Optimizado para dispositivos de gama media con resultados reales en 4K.',
    compatibility: 'Celulares Gama Media / Alta (iOS & Android)',
    resolution: '3840 x 2160 (4K Real Móvil)',
    fileSize: 'Curso Masivo enfocado en Celular',
    requiresPlugins: false,
    isExclusive: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: 22001,
    title: 'Pack de 70 plantillas Mundial de Fútbol 2026',
    slug: 'pack-70-plantillas-mundial-futbol-2026',
    coverImage: 'https://media.fredegapro.com/01/miniaturas/mundial.PNG',
    videoUrl: 'https://media.fredegapro.com/01/videos/mundial.mp4',
    downloadLinks: [
      { 
        label: 'Paquete gratuito (07 plantillas)', 
        url: 'https://drive.google.com/file/d/1inRZ9A6vZ9PUqW8W5IPXRu5LRGEdlAww/view?usp=drive_link', 
        isExclusive: false 
      },
      { 
        label: 'Paquete completo (70 plantillas)', 
        url: 'https://drive.google.com/drive/folders/180qdWCM8Jual1zzbjzd1JiWmiZxbXY1N?usp=drive_link', 
        isExclusive: true 
      }
    ],
    categories: ['after-effects', 'premiere', 'davinci-resolve', 'logos', 'intros', 'elementos', 'redes-sociales', 'packs'],
    description: 'Un Pack completo que contiene todo lo relacionado con el evento del Mundial de fútbol 2026, contiene plantillas, títulos, intros, logos, modificadores, estadísticas, banners y todo lo relacionado para una transmisión o videos para un post e incluso para comercios que quieren publicar algo relacionado con el mundial.',
    compatibility: 'After Effects - Premiere - Davinci',
    resolution: '3840 x 2160',
    fileSize: 'Gratuito: 5 Gb | Completo: 32 Gb Dividido en 06 partes',
    requiresPlugins: false,
    isExclusive: true,
    isFeatured: true,
    isHybrid: true
  }
];
