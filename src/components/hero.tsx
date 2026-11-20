'use client';

import { Button } from './ui/button';
import Link from 'next/link';
import { Rocket, Sparkles, Crown, Smartphone, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';

export function Hero() {
  const { rol } = useAuth();
  const router = useRouter();
  const isMember = rol === 'miembro' || rol === 'admin';
  const whatsappChannel = "https://whatsapp.com/channel/0029Vb9ptJvEAKWLbEBGNN10";

  const handleInscribe = () => {
    if (isMember) {
      window.open(whatsappChannel, '_blank');
    } else {
      router.push('/membresia');
    }
  };

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-black">
      {/* VIDEO PANORÁMICO DE FONDO */}
      <video 
        src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4" 
        autoPlay muted loop playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
      />
      
      {/* GRADIENTE DE SUPERPOSICIÓN */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/40" />

      {/* CONTENIDO PRINCIPAL */}
      <div className="container relative z-10 px-4 text-center space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="flex flex-col items-center gap-3 mb-2 md:mb-4">
          <Badge className="bg-primary text-white font-black px-4 py-1.5 md:px-6 md:py-2 tracking-widest uppercase animate-pulse shadow-[0_0_30px_rgba(30,144,255,0.5)] rounded-full text-[10px] md:text-sm">
             LANZAMIENTO: 25 DE NOVIEMBRE
          </Badge>
          <div className="px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-2 md:gap-3">
             <Smartphone className="h-4 w-4 md:h-5 md:w-5 text-primary" />
             <span className="text-[9px] md:text-xs font-black uppercase tracking-widest text-gray-300">Curso Pro 100% en el Celular</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9] max-w-6xl mx-auto drop-shadow-2xl font-headline">
          MAESTRÍA EN <br/>
          <span className="text-primary italic">IA MÓVIL 2026</span>
        </h1>

        <p className="text-lg md:text-3xl text-gray-200 max-w-4xl mx-auto font-medium leading-tight">
          Crea efectos de cine y animaciones 4K usando solo tu <span className="text-white font-bold underline decoration-primary underline-offset-8">teléfono</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 md:pt-8">
          <Button 
            onClick={handleInscribe}
            size="lg" 
            className="h-16 md:h-20 w-full sm:w-auto px-10 md:px-14 rounded-2xl md:rounded-3xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm md:text-base shadow-[0_20px_50px_rgba(30,144,255,0.3)] hover:scale-105 transition-all"
          >
            {isMember ? "INSCRIBIRSE AHORA" : "INSCRIBIRSE (ACCESO PRO)"}
            <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <Button asChild size="lg" variant="outline" className="h-16 md:h-20 w-full sm:w-auto px-8 md:px-10 rounded-2xl md:rounded-3xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs md:text-sm backdrop-blur-md">
            <Link href="/ia">Ver Temario Móvil</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-12 pt-8 md:pt-16 opacity-60">
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-primary" />
            <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">IA Generativa</span>
          </div>
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <Crown className="h-4 w-4 md:h-6 md:w-6 text-primary" />
            <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">Exclusivo VIP</span>
          </div>
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <Rocket className="h-4 w-4 md:h-6 md:w-6 text-primary" />
            <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">Resultados 4K</span>
          </div>
        </div>
      </div>
    </div>
  );
}