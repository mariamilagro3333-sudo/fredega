'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Instagram, Facebook, MessageCircle, Mail, Users, Heart, Download, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect, useRef } from 'react';

const socialLinks = [
  { icon: Youtube, label: 'YouTube/Fredega', href: 'https://youtube.com/fredega' },
  { icon: Instagram, label: '@Fredegapro', href: 'http://instagram.com/fredegapro' },
  { icon: MessageCircle, label: '+57 319 545 6391', href: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quiero%20comunicarme%20con%20Fredega%20Producciones' },
  { icon: Facebook, label: 'Facebook/Fredega', href: 'https://facebook.com/fredega' },
];

const contactInfo = [
    { icon: MessageCircle, text: '+57 319 545 6391', href: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quiero%20comunicarme%20con%20Fredega%20Producciones' },
    { icon: Mail, text: 'contacto@fredegapro.com', href: 'mailto:contacto@fredegapro.com' },
    { icon: Instagram, text: '@fredegapro', href: 'http://instagram.com/fredegapro' }
]

const aboutUsLinks = [
    { label: '¿Quiénes Somos?', href: '/hojadevida' },
    { label: 'Nuestros Trabajos', href: 'http://instagram.com/fredegapro', isExternal: true },
    { label: 'Nuestros Diseños', href: 'http://instagram.com/fredegapro', isExternal: true },
    { label: 'Nuestros Clientes', href: 'http://instagram.com/fredegapro', isExternal: true },
];

const servicesLinks = [
    { label: 'Cursos Personalizados', href: '/servicios#cursos-personalizados-anchor' },
    { label: 'Apps Web y Móviles', href: '/servicios' },
    { label: 'Membresía', href: '/membresia' },
    { label: 'Plantillas Personalizadas', href: '/servicios' },
];


const stats = [
    { icon: Users, end: 1271219, label: 'Visitantes únicos' },
    { icon: Heart, end: 53039, label: 'Suscriptores' },
    { icon: Download, end: 938500, label: 'Descargas' },
    { icon: MessageSquare, end: 353, label: 'Comentarios' },
];

const useInView = (ref: React.RefObject<HTMLElement>) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref]);

    return isInView;
};


const Counter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const totalFrames = Math.round(duration * 60);
            let currentFrame = 0;

            const counter = setInterval(() => {
                currentFrame++;
                const progress = currentFrame / totalFrames;
                const newCount = Math.floor(end * progress);
                setCount(newCount > end ? end : newCount);

                if (currentFrame === totalFrames) {
                    clearInterval(counter);
                    setCount(end);
                }
            }, 1000 / 60);

            return () => clearInterval(counter);
        }
    }, [isInView, end, duration]);
    
    return (
        <span ref={ref}>
            {count.toLocaleString('es-ES')}
        </span>
    );
};


export function Footer() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

  return (
    <footer className="w-full bg-[#020617] text-white border-t border-white/5">
      {/* Top Section */}
      <div className="py-12 px-4 md:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold font-headline uppercase tracking-tighter">Síguenos en todas nuestras plataformas</h2>
            <p className="text-gray-400 font-normal text-lg">y estarás al día cuando se suban nuevas publicaciones, contenidos y tutoriales.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <Button key={link.label} asChild variant="outline" className="justify-start bg-black/40 hover:bg-black/60 text-white border-white/10 rounded-lg h-16">
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="mr-3 h-6 w-6 text-primary" />
                    <span className="text-lg font-normal">{link.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image 
              src="https://media.fredegapro.com/2025/01/Freddy-1.png"
              alt="Fredega"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      
       {/* Stats Section */}
      <div className="bg-black/40 py-16 px-4 border-y border-white/5">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center justify-center space-y-4">
                    <stat.icon className="h-12 w-12 text-primary mb-2" />
                    <p className="text-4xl md:text-7xl font-medium font-headline">
                        <Counter end={stat.end} />
                    </p>
                    <p className="text-lg md:text-xl uppercase font-normal tracking-widest text-gray-400">{stat.label}</p>
                </div>
            ))}
        </div>
      </div>

       {/* Contact and Links Section */}
       <div className="py-20 px-4">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 text-white">
                <div className="flex flex-col items-center sm:items-start lg:col-span-1">
                     <Image 
                        src="https://media.fredegapro.com/2022/05/Logo-Blanco-1.png"
                        alt="Fredega Pro Logo"
                        width={180}
                        height={60}
                        className="object-contain mb-8"
                    />
                    <p className="text-sm text-gray-500 leading-relaxed text-center sm:text-left font-normal">
                        Plataforma líder en recursos para postproducción audiovisual y aprendizaje acelerado.
                    </p>
                </div>
                <div className="space-y-6 text-center sm:text-left">
                    <h3 className="font-semibold text-base uppercase tracking-widest text-primary mb-8">Contáctanos</h3>
                    {contactInfo.map((item) => (
                        <a key={item.text} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-gray-400 hover:text-white transition-colors justify-center sm:justify-start font-normal">
                            <item.icon className="h-6 w-6 flex-shrink-0" />
                            <span className="text-base md:text-lg">{item.text}</span>
                        </a>
                    ))}
                </div>

                 <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-base uppercase tracking-widest text-primary mb-8">Sobre nosotros</h3>
                     {isClient && (
                        <ul className="space-y-4">
                            {aboutUsLinks.map((link) => (
                                <li key={link.label}>
                                    {link.isExternal ? (
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg text-gray-400 hover:text-white transition-colors font-normal">
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link href={link.href} className="text-base md:text-lg text-gray-400 hover:text-white transition-colors font-normal">
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-base uppercase tracking-widest text-primary mb-8">Servicios</h3>
                     {isClient && (
                        <ul className="space-y-4">
                            {servicesLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-base md:text-lg text-gray-400 hover:text-white transition-colors font-normal">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                     )}
                </div>
            </div>
       </div>

      {/* Copyright Section */}
      <div className="bg-black py-8 px-4 border-t border-white/5">
        <div className="container mx-auto text-center text-xs text-gray-600 uppercase font-normal tracking-widest">
            <p>&copy; 2025 Fredega Producciones. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
