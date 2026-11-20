
import type { CatalogProduct } from '@/types';

const BASE_URL = "https://media.fredegapro.com/01/catalogo/";
const getMediaUrl = (filename: string) => `${BASE_URL}${filename.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29')}`;

export const catalogo5: CatalogProduct[] = [
  { 
    id: 301, 
    title: 'Picatodo eléctrico', 
    description: '🥕 Pica verduras, frutas, ajo, cebolla y mucho más en segundos. 💚 Diseño moderno, práctico y fácil de usar. 🔋 Recargable y portátil. 🧼 Fácil de limpiar y desmontar. 👌 Perfecto para ahorrar tiempo al cocinar.', 
    mediaUrl: getMediaUrl('WhatsApp Video 2026-07-22 at 3.35.24 PM.mp4'), 
    isVideo: true, 
    price: 25000, 
    categories: ['Cocina', 'Hogar'] 
  },
  { 
    id: 302, 
    title: 'Cepillo Magic Brush', 
    description: '✅ Ideal para baños y duchas, lavamanos, cocina y fregaderos, azulejos y superficies difíciles.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-22 at 3.35.22 PM.jpeg'), 
    isVideo: false, 
    price: 20000, 
    categories: ['Hogar', 'Belleza'] 
  },
  { 
    id: 303, 
    title: 'Panel Pro LED 880', 
    description: 'Iluminación profesional para fotografía y video.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-22 at 11.04.14 AM.jpeg'), 
    isVideo: false, 
    price: 115000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 304, 
    title: 'Papel tapiz adhesivo', 
    description: '✅TIPO FOAMY, RESISTENTE Y DURADERO ✅RESISTENTE AL AGUA ✅FÁCIL DE LIMPIAR ✅FÁCIL DE INSTALAR ✅DURADERO. 2 DISEÑOS DISPONIBLES.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-17 at 5.07.12 PM.jpeg'), 
    isVideo: false, 
    price: 30000, 
    categories: ['Hogar'] 
  },
  { 
    id: 305, 
    title: 'Botellón térmico 50 onzas', 
    description: 'COLORES DISPONIBLES: 💙AZUL, 🩷ROSADO, 💚VERDE MILITAR, 🤍BLANCO, 🖤NEGRO.', 
    mediaUrl: getMediaUrl('WhatsApp Video 2026-07-17 at 2.15.50 PM.mp4'), 
    isVideo: true, 
    price: 45000, 
    categories: ['Accesorios', 'Hogar'] 
  },
  { 
    id: 306, 
    title: 'Panel LED M15', 
    description: '💡 Iluminación LED de alta intensidad. 🌈 Múltiples niveles de brillo y temperatura de color. 🔋 Batería recargable de larga duración. 📱 Compatible con celulares, cámaras. 📸 Ideal para fotografía, videos, transmisiones en vivo. 🎒 Diseño compacto y ligero. 🔌 Recarga USB.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-17 at 11.31.38 AM.jpeg'), 
    isVideo: false, 
    price: 45000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 307, 
    title: 'Game Stick Lite 4K', 
    description: '✨ +10.000 juegos clásicos. 🕹️ 2 controles inalámbricos. 📺 Compatible con TV por HDMI. ⚡ Calidad 4K HD. 🎯 Fácil de instalar. 👾 Emuladores retro integrados. 🔋 Controles cómodos. 🎁 Ideal para niños y adultos.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-16 at 10.27.32 AM.jpeg'), 
    isVideo: false, 
    price: 55000, 
    categories: ['Juguetes', 'Tecnología'] 
  },
  { 
    id: 308, 
    title: 'Consola Game Stick M15 Plus', 
    description: 'Control M15 Plus inalámbrico 2.4G. ✨ Conexión rápida. 🎮 Doble joystick de alta precisión. ⚡ Respuesta inmediata. 🔋 Batería recargable. 📺 Compatible con TV, PC y emuladores. 🎯 Fácil de usar.', 
    mediaUrl: getMediaUrl('WhatsApp Video 2026-07-21 at 9.47.35 PM.mp4'), 
    isVideo: true, 
    price: 75000, 
    categories: ['Juguetes', 'Tecnología'] 
  },
  { 
    id: 309, 
    title: 'Power Bank Harvic PB-610 (20000 mAh)', 
    description: 'Precio de liquidación. Alta capacidad para múltiples cargas.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-16 at 9.33.21 AM.jpeg'), 
    isVideo: false, 
    price: 55000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 310, 
    title: 'Mouse inalámbrico', 
    description: 'Diseño ergonómico y conexión estable.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 4.10.20 PM.jpeg'), 
    isVideo: false, 
    price: 15000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 311, 
    title: 'Mouse Optical SJ100', 
    description: 'Precisión óptica para el día a día.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 4.09.23 PM.jpeg'), 
    isVideo: false, 
    price: 12000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 312, 
    title: 'Mouse Gamer GT RC980', 
    description: '🎮 Conexión inalámbrica 2.4 GHz. 🔋 Recargable por USB. 🖱️ Modo dual. 💡 Iluminación LED RGB. ⚙️ Diseño ergonómico. 🎯 Ideal para gaming y oficina.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 3.03.12 PM.jpeg'), 
    isVideo: false, 
    price: 30000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 313, 
    title: 'Mouse Gamer Harvic MCB-427', 
    description: '🔌 USB Plug & Play. 💡 LED RGB. 🎮 Diseño gamer ergonómico. ⚙️ Alta precisión. 💻 Compatible con Windows, Mac. 📏 Cable duradero.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 3.01.01 PM.jpeg'), 
    isVideo: false, 
    price: 10000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 314, 
    title: 'Mouse Gamer Yelandar X7', 
    description: '🔌 USB. 📏 Cable 1.8m. 🎯 Sensor óptico alta precisión. 💡 Luces LED. 🎮 Diseño ergonómico. ⚙️ Botones respuesta rápida. 💻 Compatible PC y portátil.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 2.59.50 PM.jpeg'), 
    isVideo: false, 
    price: 23000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 315, 
    title: 'Termo 30 onzas', 
    description: 'Mantiene tus bebidas a la temperatura ideal.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 10.46.08 AM.jpeg'), 
    isVideo: false, 
    price: 35000, 
    categories: ['Accesorios', 'Hogar'] 
  },
  { 
    id: 316, 
    title: 'Power Bank Harvick PBM-635', 
    description: 'Carga confiable en un diseño compacto.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 1.32.51 PM.jpeg'), 
    isVideo: false, 
    price: 53000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 317, 
    title: 'Power Bank Kinotec KN-08', 
    description: '🔋 Capacidad: 10.000 mAh. ⚡ Carga rápida PD 22.5W. 🔌 Cables Tipo C y Lightning integrados. 📊 Pantalla digital. 📱 Compatible múltiples dispositivos. 🎒 Diseño elegante.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 1.29.07 PM.jpeg'), 
    isVideo: false, 
    price: 45000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 318, 
    title: 'Power Bank FiveMax 101', 
    description: '🔋 10.000 mAh. ⚡ Carga rápida 22.5W. 🔌 5 salidas. 🔋 Cables integrados (Tipo C y Lightning). 📊 Pantalla digital. 📱 Compatible Android/iPhone. 🎒 Fácil de transportar.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 1.35.52 PM.jpeg'), 
    isVideo: false, 
    price: 45000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 319, 
    title: 'Power Bank Mark Boss PB-151 (Magnético)', 
    description: '🔋 10.000 mAh. ⚡ Carga rápida 22.5W. 🧲 Carga inalámbrica magnética. 📱 Compatible Android/iPhone. 🔌 Entrada/salida USB-C. 📊 Indicador de batería. 🎒 Diseño compacto.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 1.34.31 PM.jpeg'), 
    isVideo: false, 
    price: 65000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 320, 
    title: 'Termo Just Relax 650ml', 
    description: 'Diseño elegante para hidratación diaria.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-15 at 2.06.38 PM.jpeg'), 
    isVideo: false, 
    price: 28000, 
    categories: ['Accesorios', 'Hogar'] 
  },
  { 
    id: 321, 
    title: 'Silicon Airfryer', 
    description: 'Molde de silicona resistente para freidora de aire. Precio unitario $10.000 o 3 unidades por $24.000.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-14 at 11.09.22 AM.jpeg'), 
    isVideo: false, 
    price: 10000, 
    categories: ['Cocina', 'Hogar'] 
  },
  { 
    id: 322, 
    title: 'Termo licuadora', 
    description: 'Licúa y transporta tus batidos en el mismo envase.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-14 at 10.57.09 AM.jpeg'), 
    isVideo: false, 
    price: 47000, 
    categories: ['Cocina', 'Tecnología'] 
  },
  { 
    id: 323, 
    title: 'Sillón inflable + puff para pies', 
    description: '🛋️ Incluye puff inflable para mayor comodidad y descanso. 💨 Fácil de inflar y desinflar. 🎒 Ligero, portátil y fácil de almacenar. 🏠 Perfecto para sala, habitación, terraza, piscina o camping. 🧵 Material resistente, suave al tacto y de larga duración.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-23 at 9.55.55 AM.jpeg'), 
    isVideo: false, 
    price: 65000, 
    categories: ['Hogar'] 
  },
  { 
    id: 324, 
    title: 'Pulidora inalámbrica mini 12V', 
    description: '2 baterías recargables, 2 discos, cargador. PRECIO DE BODEGA.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-23 at 9.53.26 AM.jpeg'), 
    isVideo: false, 
    price: 70000, 
    categories: ['Hogar'] 
  },
  { 
    id: 325, 
    title: 'Protector de puerta', 
    description: 'Práctico protector para evitar golpes y ruidos.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-23 at 9.53.24 AM.jpeg'), 
    isVideo: false, 
    price: 10000, 
    categories: ['Hogar'] 
  },
  { 
    id: 326, 
    title: 'Ventilador portátil (enfriador de aire evaporado)', 
    description: '✅RECARGABLE ✅3 VELOCIDADES ✅ENFRIADOR DE AIRE EVAPORADO. ¡Mantente fresco y cómodo en cualquier lugar!', 
    mediaUrl: getMediaUrl('WhatsApp Video 2026-07-23 at 9.53.25 AM.mp4'), 
    isVideo: true, 
    price: 30000, 
    categories: ['Hogar', 'Tecnología'] 
  },
  { 
    id: 327, 
    title: 'Audífonos Bluetooth Ultrapods Pro', 
    description: '', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-29 at 12.55.11 PM.jpeg'), 
    isVideo: false, 
    price: 25000, 
    categories: ['Tecnología'] 
  },
  { 
    id: 328, 
    title: 'Termo Stanley 40 onzas', 
    description: 'COLORES DISPONIBLES EN LA FOTO. APROVECHEN QUE SE ACABAN🔥🔥', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-28 at 2.43.38 PM.jpeg'), 
    isVideo: false, 
    price: 45000, 
    categories: ['Accesorios', 'Hogar'] 
  },
  { 
    id: 329, 
    title: 'Strap acordonado para celulares', 
    description: '', 
    mediaUrl: getMediaUrl('WhatsApp Video 2026-07-28 at 10.11.16 AM.mp4'), 
    isVideo: true, 
    price: 12000, 
    categories: ['Accesorios'] 
  },
  { 
    id: 330, 
    title: 'Linterna Recargable Nano-Tec', 
    description: '✅ Zoom ajustable de largo alcance. ✅ Luz LED de alta potencia (2W). ✅ Recargable por USB Tipo C. ✅ 3 modos de iluminación. ✅ Diseño compacto y fácil de transportar. ✅ Alcance de iluminación de hasta 1000 metros*.', 
    mediaUrl: getMediaUrl('WhatsApp Image 2026-07-28 at 10.10.09 AM.jpeg'), 
    isVideo: false, 
    price: 10000, 
    categories: ['Hogar', 'Accesorios'] 
  }
];
