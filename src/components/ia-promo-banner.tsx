'use client';

import { useState, useEffect, Suspense } from 'react';
import { Sparkles, BrainCircuit, Play, Rocket, Globe, Film, Zap, Crown, ArrowRight, Info, CheckCircle2, MessageCircle, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/auth-context';

const curriculumDetails = [
  { 
    title: "MÓDULO 01: EL PROYECTO INICIAL EN CELULAR", 
    topics: ["Edición 100% Móvil con CapCut y Filmora", "Ingeniería de Sonido desde el Teléfono", "Configuración de Entorno de Trabajo Móvil", "Uso de IA desde el Navegador del Celular"],
    icon: Rocket
  },
  { 
    title: "MÓDULO 02: CREACIÓN DE MUNDOS IA", 
    topics: ["Diseño de Escenarios Realistas con Celular", "Transformación Visual y Proporción Móvil", "Relighting Digital sin Computadora", "Consistencia Visual de Personajes"],
    icon: Globe
  },
  { 
    title: "MÓDULO 03: EFECTOS VISUALES MÓVILES", 
    topics: ["Humanización de Objetos en Apps de IA", "El Arte del Clon desde el Teléfono", "Cinematografía de Corto con tu Móvil", "VFX Estilo Hollywood sin PC"],
    icon: Sparkles
  },
  { 
    title: "MÓDULO 04: MOTION GRAPHICS EN MANO", 
    topics: ["Animación de Logos 4K con el Celular", "Visual Hooks para Redes Sociales", "Tipografía Dinámica Móvil"],
    icon: Zap
  },
  { 
    title: "MÓDULO 05: ACABADO 4K DEFINITIVO", 
    topics: ["Plantillas Dinámicas para Eventos", "Estrategias de Eficiencia en Gama Media", "Colorimetría y Exportación 4K desde el Móvil"],
    icon: Film
  }
];

function IaPromoBannerContent({ className }: { className?: string }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { rol } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isMember = rol === 'miembro' || rol === 'admin';
  const isCursosPage = pathname === '/cursos';
  const whatsappChannel = "https://whatsapp.com/channel/0029Vb9ptJvEAKWLbEBGNN10";

  useEffect(() => {
    if (isCursosPage && searchParams.get('show-ia-details') === 'true') {
      setIsDetailsOpen(true);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('show-ia-details');
      const newUrl = `${pathname}${newParams.toString() ? '?' + newParams.toString() : ''}#ia-promo-banner`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [isCursosPage, searchParams, pathname]);

  const handleDetailsClick = () => {
    if (isCursosPage) {
      setIsDetailsOpen(true);
    } else {
      router.push('/cursos?show-ia-details=true#ia-promo-banner');
    }
  };

  const handleInscribe = () => {
    if (isMember) {
      window.open(whatsappChannel, '_blank');
    } else {
      router.push('/membresia');
    }
  };

  return (
    <div 
      id="ia-promo-banner"
      className={cn(
        "w-full overflow-hidden border-y border-white/5 bg-[#020617] py-16 md:py-32 relative group",
        className
      )}
    >
      <video 
        src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4" 
        autoPlay muted loop playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
          
          <div className="flex-1 space-y-8 md:space-y-12 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 mb-2">
              <Badge className="bg-[#EAB308] text-black px-3 py-1 md:px-4 md:py-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-none rounded-full animate-pulse">
                LANZAMIENTO: 25 NOVIEMBRE
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary px-3 py-1 md:px-4 md:py-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-primary/5 rounded-full">
                100% EN CELULAR
              </Badge>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[1.05] font-headline max-w-3xl mx-auto lg:mx-0">
                MAESTRÍA EN <br/>
                <span className="text-primary italic">IA Y EDICIÓN MÓVIL</span>
              </h2>
            </div>
            
            <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto lg:mx-0">
              <p className="text-base md:text-xl text-gray-400 font-medium leading-relaxed">
                Logra resultados cinematográficos sin usar una PC. Clases enfocadas en movilidad absoluta para editores de la nueva era.
              </p>
              <p className="text-lg md:text-2xl text-white font-black uppercase tracking-tight pt-2">
                ¡Exclusivo Miembros PRO!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 pt-6 md:pt-10">
              <Button onClick={handleInscribe} size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-14 md:h-16 font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl transition-all hover:scale-105 w-full sm:w-auto">
                INSCRIBIRSE AL CURSO MÓVIL <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-gray-300 hover:text-white h-12 md:h-16 px-6 font-black uppercase tracking-widest text-[10px] md:text-xs w-full sm:w-auto"
                onClick={handleDetailsClick}
              >
                VER TEMARIO CELULAR <Play className="h-3 w-3 ml-2 md:ml-3 fill-current" />
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-[3rem] blur-3xl animate-pulse" />
              <div className="relative w-56 h-56 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center rounded-[3.5rem] shadow-[0_20px_50px_rgba(30,144,255,0.4)] border border-white/20 transform hover:scale-105 transition-transform duration-500">
                <Smartphone className="h-28 w-28 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-5xl bg-[#020617] border-white/10 text-white p-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
          <div className="h-24 md:h-32 w-full bg-gradient-to-r from-primary/30 to-blue-900/30 flex items-center justify-center border-b border-white/5">
             <Smartphone className="h-10 w-10 md:h-16 md:w-16 text-primary animate-pulse" />
          </div>

          <div className="p-6 md:p-12 space-y-6 md:space-y-8 max-h-[70vh] overflow-y-auto">
            <DialogHeader className="text-left space-y-3 md:space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge className="w-fit bg-yellow-500 text-black font-black uppercase text-[9px] md:text-xs tracking-widest px-2 py-0.5">ESTRENO 25 NOV</Badge>
                <Badge className="w-fit bg-emerald-600 text-white font-black uppercase text-[9px] md:text-xs tracking-widest px-2 py-0.5">GAMA MEDIA OK</Badge>
              </div>
              <DialogTitle className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-white">
                CURSO PRO <br/> <span className="text-primary italic">EDICIÓN IA DESDE EL CELULAR</span>
              </DialogTitle>
              <DialogDescription className="text-base md:text-xl text-gray-400 font-medium leading-relaxed">
                Domina las herramientas de IA y edición cinematográfica directamente en tu teléfono. Sin necesidad de PC.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {curriculumDetails.map((item, idx) => (
                    <div key={idx} className="p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 flex flex-col gap-3 md:gap-4 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 md:h-6 md:w-6 text-primary shrink-0" />
                            <h4 className="font-black uppercase text-[10px] md:text-xs tracking-tight leading-tight">{item.title}</h4>
                        </div>
                        <ul className="space-y-2">
                            {item.topics.map((topic, ti) => (
                                <li key={ti} className="text-gray-400 text-[10px] md:text-[11px] font-bold uppercase leading-tight flex items-start gap-2">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{topic}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="bg-primary/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border-2 border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                <div className="space-y-1 text-center md:text-left">
                    <p className="text-primary font-black uppercase tracking-widest text-[10px] md:text-xs">EL MIÉRCOLES COMIENZA TODO</p>
                    <h5 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">LANZAMIENTO: 25 DE NOVIEMBRE</h5>
                    <p className="text-gray-400 text-xs md:text-sm font-medium">Los miembros PRO tendrán acceso inmediato al material.</p>
                </div>
                <Button onClick={handleInscribe} size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase px-8 md:px-10 h-14 md:h-14 rounded-xl md:rounded-2xl shadow-xl text-[10px] md:text-xs">
                    Inscribirme Ahora
                </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function IaPromoBanner(props: { className?: string }) {
  return (
    <Suspense fallback={<div className="w-full h-48 bg-[#0a0f1e] animate-pulse" />}>
      <IaPromoBannerContent {...props} />
    </Suspense>
  );
}