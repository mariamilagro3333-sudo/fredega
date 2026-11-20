
export type YouTubeVideo = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  type: 'video' | 'short';
  category: 'After Effects' | 'Adobe Premiere' | 'Inteligencia Artificial' | 'Filmora' | 'Davinci Resolve';
  publishedAt: string; // Formato ISO para ordenamiento
  downloadUrl?: string; // Enlace opcional de descarga
};

export const youtubeVideos: YouTubeVideo[] = [
  {
    id: 12,
    title: 'Efecto rebote con expresiones en After Effects 🫨',
    url: 'https://youtu.be/G9AB4O7E1z4',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/rebote.jpg',
    type: 'video',
    category: 'After Effects',
    publishedAt: '2025-03-26T10:00:00Z',
    downloadUrl: 'https://drive.google.com/file/d/1t-fsekNCgPrbNSx9CSkiORCIO3Un89dl/view?usp=drive_link'
  },
  {
    id: 11,
    title: 'Aplica Nuevas Transicione en Davinci Resolve',
    url: 'https://youtu.be/J3i2bIOxYh0',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/davincitrans.jpg',
    type: 'video',
    category: 'Davinci Resolve',
    publishedAt: '2025-03-08T10:00:00Z'
  },
  {
    id: 10,
    title: 'Anima MAPAS de cine y documental 🗺️',
    url: 'https://youtu.be/26sROPtgCYw',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/mapa3d.jpg',
    type: 'video',
    category: 'After Effects',
    publishedAt: '2025-03-07T10:00:00Z'
  },
  {
    id: 9,
    title: 'Efecto Parallax: Manual vs. IA 🚀',
    url: 'https://youtu.be/kFC3M-4Ca2s',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/parallax.jpg',
    type: 'video',
    category: 'After Effects',
    publishedAt: '2025-03-06T10:00:00Z'
  },
  {
    id: 8,
    title: 'EL TRUCO del Speed Ramp en Davinci (Cámara Lenta) ⚡️',
    url: 'https://youtube.com/shorts/Sq1w7-WTaMU',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/speedramp.jpg',
    type: 'short',
    category: 'Davinci Resolve',
    publishedAt: '2025-03-05T10:00:00Z'
  },
  {
    id: 7,
    title: '¡Crea TRANSICIONES IA con tu propia MARCA! ✨',
    url: 'https://youtu.be/UzpbDmBtV5w',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/transicionesia.jpg',
    type: 'video',
    category: 'Inteligencia Artificial',
    publishedAt: '2025-03-04T10:00:00Z'
  },
  {
    id: 6,
    title: 'Subtítulos animados en Davinci Resolve ⏱️🚀',
    url: 'https://youtu.be/aNWYgzrVjMA',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/subtitudavinci.jpg',
    type: 'video',
    category: 'Davinci Resolve',
    publishedAt: '2025-03-03T10:00:00Z'
  },
  {
    id: 5,
    title: 'El mejor programa de edición semiprofesional 📹',
    url: 'https://youtu.be/tqYAAmaOuMc',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/filmora.jpg',
    type: 'video',
    category: 'Filmora',
    publishedAt: '2025-03-01T10:00:00Z'
  },
  {
    id: 4,
    title: 'Increíble herramienta de Premiere Pro 🪄',
    url: 'https://youtu.be/jD-4xG0XWVs',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/herrpr.jpg',
    type: 'video',
    category: 'Adobe Premiere',
    publishedAt: '2025-02-28T10:00:00Z'
  },
  {
    id: 3,
    title: 'Alejar cámara al espacio con IA 🌌',
    url: 'https://youtu.be/PWzCBrmTfRM',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/zoomout.jpg',
    type: 'video',
    category: 'Inteligencia Artificial',
    publishedAt: '2025-02-27T10:00:00Z'
  },
  {
    id: 2,
    title: 'Rampa de velocidad cinematográfica ⏱️',
    url: 'https://youtu.be/DL2zAyMTFV0',
    thumbnail: 'https://media.fredegapro.com/01/rampa.jpg',
    type: 'video',
    category: 'Adobe Premiere',
    publishedAt: '2025-02-26T10:00:00Z'
  },
  {
    id: 1,
    title: 'Animar logo en neón 💡',
    url: 'https://youtu.be/5OsbIdm1PMk',
    thumbnail: 'https://media.fredegapro.com/01/miniaturas/neon.jpg',
    type: 'video',
    category: 'After Effects',
    publishedAt: '2025-02-25T10:00:00Z'
  }
];
