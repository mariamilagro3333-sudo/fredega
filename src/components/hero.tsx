'use client';

import { Button } from './ui/button';
import Link from 'next/link';
import { Rocket, Sparkles, Crown, Smartphone, ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { useInscribe } from './inscribe-context';

export function Hero() {
  const { handleInscribe, isMember } = useInscribe();

  return (
    <div className="relative w-full h-[78vh] md:h-[82vh] overflow-hidden flex items-center justify-center bg-black">
      {/* VIDEO PANORÁMICO DE FONDO */}
      <video 
        src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4" 
        autoPlay muted loop playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
      />
      
      {/* GRADIENTE DE SUPERPOSICIÓN */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/40" />

      {/* CONTENIDO PRINCIPAL */}
      <div className="container relative z-10 px-4 text-center space-y-5 md:space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="flex flex-col items-center gap-2.5 mb-2">
          <Badge className="bg-primary text-white font-black px-4 py-1 md:px-5 md:py-1.5 tracking-widest uppercase animate-pulse shadow-[0_0_30px_rgba(30,144,255,0.5)] rounded-full text-[10px] md:text-xs">
             LANZAMIENTO: 25 DE NOVIEMBRE
          </Badge>
          <div className="px-4 py-1.5 md:px-5 md:py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-2">
             <Smartphone className="h-4 w-4 text-primary" />
             <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-gray-300">Curso Pro 100% en el Celular</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] max-w-4xl mx-auto drop-shadow-2xl font-headline">
          MAESTRÍA EN <br/>
          <span className="text-primary italic">IA MÓVIL 2026</span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-snug">
          Crea efectos de cine y animaciones 4K usando solo tu <span className="text-white font-bold underline decoration-primary underline-offset-4">teléfono</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-4 md:pt-5">
          <Button 
            onClick={handleInscribe}
            size="lg" 
            className="h-14 w-full sm:w-auto px-8 md:px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs md:text-sm shadow-[0_20px_50px_rgba(30,144,255,0.3)] hover:scale-105 transition-all"
          >
            {isMember ? "INSCRIBIRSE AHORA" : "INSCRIBIRSE (ACCESO PRO)"}
            <ArrowRight className="ml-2.5 h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 w-full sm:w-auto px-7 md:px-8 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs backdrop-blur-md">
            <Link href="/ia">Ver Temario Móvil</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-5 md:gap-10 pt-6 md:pt-10 opacity-60">
          <div className="flex flex-col items-center gap-1 md:gap-1.5">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">IA Generativa</span>
          </div>
          <div className="flex flex-col items-center gap-1 md:gap-1.5">
            <Crown className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">Exclusivo VIP</span>
          </div>
          <div className="flex flex-col items-center gap-1 md:gap-1.5">
            <Rocket className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">Resultados 4K</span>
          </div>
        </div>
      </div>
    </div>
  );
}