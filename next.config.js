const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {(phase: string) => import('next').NextConfig} */
module.exports = (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  async redirects() {
    return [
      // --- PRODUCTOS ESPECÍFICOS ---
      {
        source: '/product/mapaspremiere',
        destination: '/contenidos?product=transiciones-modernas-premiere',
        permanent: true,
      },
      {
        source: '/product/siluetas',
        destination: '/contenidos?product=siluetas-de-personas-after-effects',
        permanent: true,
      },
      {
        source: '/product/transicionesgraficos',
        destination: '/contenidos?product=transiciones-4k-graficos-esenciales-para-premiere',
        permanent: true,
      },
      {
        source: '/paquete-completo-de-navidad-para-premiere-y-after-effects-vip',
        destination: '/contenidos?q=navidad&product=paquete-completo-navidad-premiere-after-effects',
        permanent: true,
      },
      {
        source: '/product/tranurba',
        destination: '/contenidos?product=transiciones-4k-gratis-urbanos-para-premiere',
        permanent: true,
      },
      {
        source: '/product/ano2024',
        destination: '/contenidos?product=plantilla-ano-nuevo-2024-conteo-gratis-para-after-effects',
        permanent: true,
      },
      {
        source: '/product/tinta',
        destination: '/contenidos?product=tinta-papel-efecto-gratis-para-davinci-resolve',
        permanent: true,
      },
      {
        source: '/product/depth',
        destination: '/contenidos?product=brillo-de-profundidad-premiere',
        permanent: true,
      },
      {
        source: '/product/bodae',
        destination: '/contenidos?product=pack-gratis-de-plantillas-titulos-presentacion-para-bodas-after-effects',
        permanent: true,
      },
      {
        source: '/product/soft-body',
        destination: '/contenidos?product=soft-body-plugin-gratis-para-after-effects',
        permanent: true,
      },
      {
        source: '/product/graficosdavinci',
        destination: '/contenidos?category=davinci-resolve',
        permanent: true,
      },
      {
        source: '/product/comics',
        destination: '/contenidos?product=paquete-de-titulos-gratis-estilo-comics-para-premiere-y-after-effects',
        permanent: true,
      },
      {
        source: '/product/crt',
        destination: '/contenidos?product=presets-gratis-de-television-vieja-o-crt-para-after-effects',
        permanent: true,
      },
      {
        source: '/product/fxfredega',
        destination: '/contenidos?product=efectos-transiciones-sonidos-gratis-para-davinci-resolve-premiere-after-effects',
        permanent: true,
      },
      {
        source: '/product/pack2023',
        destination: '/contenidos?product=pack-de-graficos-esenciales-gratis-transiciones-instalables-en-premiere',
        permanent: true,
      },
      {
        source: '/product/sonidosfx',
        destination: '/contenidos?product=libreria-de-1360-efectos-de-sonidos',
        permanent: true,
      },
      {
        source: '/product/fondos4k',
        destination: '/contenidos?product=140-fondos-4k-mp4-para-graficos-presentaciones',
        permanent: true,
      },
      {
        source: '/product/navidad2022',
        destination: '/contenidos?q=navidad&product=paquete-completo-navidad-premiere-after-effects',
        permanent: true,
      },
      {
        source: '/product/heroes',
        destination: '/contenidos?product=220-efectos-de-superheroes',
        permanent: true,
      },
      {
        source: '/product/hologramas',
        destination: '/contenidos?product=110-hologramas-4k-con-sonidos',
        permanent: true,
      },
      {
        source: '/product/inlogopr',
        destination: '/contenidos?product=intro-logo-moderno-adobe-premiere',
        permanent: true,
      },
      {
        source: '/product/premierecomposer',
        destination: '/contenidos?product=animation-composer-3-plugin-gratis-para-after-effects-premiere',
        permanent: true,
      },
      {
        source: '/product/fuentes',
        destination: '/contenidos?product=810-fuentes-o-tipografias',
        permanent: true,
      },
      {
        source: '/product/botones',
        destination: '/contenidos?product=botones-y-barras-sociales-para-videos',
        permanent: true,
      },
      {
        source: '/product/plantillanav',
        destination: '/contenidos?product=plantilla-de-navidad-fotos',
        permanent: true,
      },
      {
        source: '/product/emoticones',
        destination: '/contenidos?product=transiciones-emoticones-facebook-3d',
        permanent: true,
      },
      {
        source: '/product/inlogo-2',
        destination: '/contenidos?product=intro-logo-elegante-corto-after-effects',
        permanent: true,
      },
      {
        source: '/product/transicionesglitch',
        destination: '/contenidos?product=crear-efectos-y-transiciones-glitch-o-distorsion-en-after-effects',
        permanent: true,
      },
      {
        source: '/product/cumple',
        destination: '/contenidos?product=pack-completo-cumpleanos-4k',
        permanent: true,
      },
      {
        source: '/product/emojis',
        destination: '/contenidos?product=pack-emojis-animados-4k-after-effects',
        permanent: true,
      },
      {
        source: '/product/25titulos',
        destination: '/contenidos?product=25-titulos-after-effects',
        permanent: true,
      },
      {
        source: '/product/443titulos',
        destination: '/contenidos?product=443-escenas-titulos-premiere',
        permanent: true,
      },
      {
        source: '/product/intrologo',
        destination: '/contenidos?product=intro-logo-premiere',
        permanent: true,
      },
      {
        source: '/product/youtube',
        destination: '/contenidos?product=graficos-esenciales-youtube-premiere',
        permanent: true,
      },
      {
        source: '/product/titulosultimos',
        destination: '/contenidos?product=ultimos-220-titulos-4k-premiere',
        permanent: true,
      },
      {
        source: '/product/20escenas',
        destination: '/contenidos?product=20-escenas-titulos-premiere',
        permanent: true,
      },
      {
        source: '/product/packnavidad',
        destination: '/contenidos?q=navidad&product=paquete-completo-navidad-premiere-after-effects',
        permanent: true,
      },
      {
        source: '/product/nuestra-historia-para-premiere',
        destination: '/contenidos?product=nuestra-historia-fotos-romanticas-bodas-premiere',
        permanent: true,
      },
      {
        source: '/product/packluces700',
        destination: '/contenidos?product=pack-completo-luces-480-premiere-after-effects',
        permanent: true,
      },
      {
        source: '/product/pack-de-increibles-particulas-para-premiere-y-after-effects',
        destination: '/contenidos?product=pack-de-increibles-particulas-para-premiere-y-after-effects',
        permanent: true,
      },
      {
        source: '/product/kitboda',
        destination: '/contenidos?product=kit-presets-transiciones-plantilla-bodas-premiere',
        permanent: true,
      },
      {
        source: '/product/plantillaboda',
        destination: '/contenidos?product=plantilla-bodas-premiere',
        permanent: true,
      },
      {
        source: '/product/1000-presets-de-colorizacion-lutmaster-para-premiere',
        destination: '/contenidos?product=1000-presets-colorizacion-lutmaster-premiere',
        permanent: true,
      },
      {
        source: '/product/plantilla-de-cumpleanos-para-ninos',
        destination: '/contenidos?product=plantilla-cumpleanos-ninos',
        permanent: true,
      },
      {
        source: '/product/intro-fotos-premiere',
        destination: '/contenidos?product=intro-fotos-premiere',
        permanent: true,
      },
      {
        source: '/product/concurso-musical-tv-show-plantilla',
        destination: '/contenidos?product=concurso-musical-tv-show-plantilla',
        permanent: true,
      },

      // --- REDIRECCIONES DINÁMICAS Y GENERALES ---
      {
        source: '/product/:slug',
        destination: '/contenidos?product=:slug',
        permanent: true,
      },
      {
        source: '/product-category/:slug',
        destination: '/contenidos?category=:slug',
        permanent: true,
      },
      {
        source: '/cursos/:slug',
        destination: '/cursos?entry=:slug',
        permanent: true,
      },
      {
        source: '/membership',
        destination: '/membresia',
        permanent: true,
      },
      {
        source: '/vip',
        destination: '/membresia',
        permanent: true,
      },
      {
        source: '/membresia-vip',
        destination: '/membresia',
        permanent: true,
      },
      {
        source: '/pro',
        destination: '/descargapro',
        permanent: true,
      },
      {
        source: '/beneficios',
        destination: '/descargapro',
        permanent: true,
      },
      {
        source: '/cuenta',
        destination: '/account',
        permanent: true,
      },
      {
        source: '/ae2024',
        destination: '/cursoae',
        permanent: true,
      },
      {
        source: '/premiere2023',
        destination: '/cursopremiere',
        permanent: true,
      },
      {
        source: '/illustrator:num(\\d*)',
        destination: '/cursos?course=ai',
        permanent: true,
      },
      {
        source: '/vfx:num(\\d*)',
        destination: '/cursos?course=mocha',
        permanent: true,
      },
      {
        source: '/tracking:num(\\d*)',
        destination: '/cursos?course=mocha',
        permanent: true,
      },
      {
        source: '/parallax:num(\\d*)',
        destination: '/cursos?course=parallax',
        permanent: true,
      },
      {
        source: '/cinema:num(\\d*)',
        destination: '/cursos?course=parallax',
        permanent: true,
      }
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'media.fredegapro.com' },
      { protocol: 'https', hostname: 's3.envato.com' },
      { protocol: 'https', hostname: 'previews.customer.envatousercontent.com' },
      { protocol: 'https', hostname: 'elements-resized.envatousercontent.com' },
      { protocol: 'https', hostname: 'freevideoeffect.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'i9.ytimg.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'motionarray.imgix.net' },
      { protocol: 'https', hostname: 'cms-public-artifacts.motionarray.com' },
      { protocol: 'https', hostname: '**.motionarray.com' },
    ],
  }
});
