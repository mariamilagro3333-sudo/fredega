'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface IaDemoVideo {
  id: string;
  title: string;
  description: string;
  tag: string;
  videoUrl: string;
}

export const IA_DEMO_VIDEOS: IaDemoVideo[] = [
  {
    id: 'montajes-con-videos',
    title: 'Hacer Montajes con Videos',
    description: 'Realiza montajes visuales y composiciones impactantes con IA.',
    tag: 'Montajes VFX',
    videoUrl: 'https://media.fredegapro.com/01/ia/todo.mp4',
  },
  {
    id: 'publicidad-de-productos',
    title: 'Publicidad de Productos',
    description: 'Crea anuncios y comerciales llamativos de productos con IA.',
    tag: 'Publicidad',
    videoUrl: 'https://media.fredegapro.com/01/ia/bbq.mp4',
  },
  {
    id: 'motion-graphics-informativo',
    title: 'Hacer Motion Graphics Informativo',
    description: 'Crea animaciones informativas dinámicas y profesionales con IA.',
    tag: 'Motion Graphics',
    videoUrl: 'https://media.fredegapro.com/01/ia/ramon.mp4',
  },
  {
    id: 'grafico-presentacion-informativa',
    title: 'Gráfico y Presentación Informativa',
    description: 'Crea gráficos animados y presentaciones informativas con IA.',
    tag: 'Presentación',
    videoUrl: 'https://media.fredegapro.com/01/ia/Tos.mp4',
  },
];

interface IaDemosCarouselProps {
  className?: string;
  variant?: 'default' | 'compact' | 'hero';
  heading?: string;
  subheading?: string;
}

export function IaDemosCarousel({
  className,
  variant = 'default',
  heading = 'Demos: Lo que podrás hacer',
  subheading = 'Toca cualquier video para verlo en grande.',
}: IaDemosCarouselProps) {
  const [selectedDemo, setSelectedDemo] = useState<IaDemoVideo | null>(null);

  const isHero = variant === 'hero';
  const isCompact = variant === 'compact';

  const selectedIndex = selectedDemo
    ? IA_DEMO_VIDEOS.findIndex((d) => d.id === selectedDemo.id)
    : -1;

  const handlePrevDemo = () => {
    if (selectedIndex < 0) return;
    const prevIdx = (selectedIndex - 1 + IA_DEMO_VIDEOS.length) % IA_DEMO_VIDEOS.length;
    setSelectedDemo(IA_DEMO_VIDEOS[prevIdx]);
  };

  const handleNextDemo = () => {
    if (selectedIndex < 0) return;
    const nextIdx = (selectedIndex + 1) % IA_DEMO_VIDEOS.length;
    setSelectedDemo(IA_DEMO_VIDEOS[nextIdx]);
  };

  return (
    <div
      className={cn('w-full', isHero ? 'space-y-3' : 'space-y-4 md:space-y-5', className)}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Cabecera */}
      <div className={cn('space-y-0.5', isHero ? 'text-center sm:text-left' : 'text-left')}>
        {!isHero && (
          <div className="inline-flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ejemplos Reales del Curso</span>
          </div>
        )}
        <h3
          className={cn(
            'font-black uppercase tracking-tight text-white font-headline leading-tight',
            isHero
              ? 'text-xs sm:text-sm tracking-widest text-gray-200'
              : isCompact
              ? 'text-base sm:text-lg md:text-xl'
              : 'text-lg sm:text-xl md:text-2xl'
          )}
        >
          {isHero ? 'Demos de lo que aprenderás' : heading}
        </h3>
        {!isHero && subheading && (
          <p className="text-xs md:text-sm text-gray-400 font-medium">
            {subheading}
          </p>
        )}
      </div>

      {/* Cuadrícula 2x2: dos videos arriba y dos abajo */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
        {IA_DEMO_VIDEOS.map((demo) => (
          <button
            key={demo.id}
            type="button"
            onClick={() => setSelectedDemo(demo)}
            aria-label={`Ver demo: ${demo.title}`}
            className={cn(
              'group/card w-full text-left rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 hover:border-primary/60 transition-all shadow-xl flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isHero ? 'bg-[#070d1f]/85 backdrop-blur-xl' : 'bg-[#070d1f]'
            )}
          >
            {/* Título limpio y legible en móvil y escritorio */}
            <div
              className={cn(
                'px-2.5 py-2 sm:px-4 sm:py-3 border-b border-white/10 min-h-[2.75rem] sm:min-h-0 flex items-center',
                isHero ? 'bg-white/[0.04]' : 'bg-white/[0.03]'
              )}
            >
              <h4 className="text-[11px] sm:text-sm font-bold text-white leading-snug tracking-normal line-clamp-2">
                {demo.title}
              </h4>
            </div>

            {/* Vista previa del video */}
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <video
                src={`${demo.videoUrl}#t=0.5`}
                preload="metadata"
                muted
                playsInline
                onError={(e) => {
                  console.error(`Error cargando vista previa de demo (${demo.videoUrl}):`, e);
                }}
                className="w-full h-full object-cover opacity-85 group-hover/card:opacity-100 group-hover/card:scale-[1.03] transition-all duration-500 pointer-events-none"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/25 to-transparent group-hover/card:via-black/15 transition-colors">
                <span
                  className={cn(
                    'rounded-full bg-primary/95 text-white flex items-center justify-center shadow-[0_0_24px_rgba(30,144,255,0.65)] transition-transform duration-300 group-hover/card:scale-110',
                    isHero ? 'h-9 w-9 sm:h-12 sm:w-12' : 'h-10 w-10 sm:h-14 sm:w-14'
                  )}
                >
                  <Play className={cn('fill-current ml-0.5', isHero ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-4 w-4 sm:h-6 sm:w-6')} />
                </span>
              </div>
            </div>

            {/* Descripción breve (visible en escritorio fuera del Hero) */}
            {!isHero && (
              <div className="hidden sm:block px-4 py-2.5 bg-[#050a18]">
                <p className="text-xs text-gray-400 font-medium leading-snug">
                  {demo.description}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Reproductor Pop-Up Grande */}
      <Dialog open={!!selectedDemo} onOpenChange={(open) => !open && setSelectedDemo(null)}>
        <DialogContent className="max-w-[96vw] sm:max-w-3xl lg:max-w-5xl bg-[#020617] border border-white/15 text-white p-0 overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
          {selectedDemo && (
            <div className="flex flex-col">
              {/* Cabecera limpia del pop-up */}
              <DialogHeader className="px-4 py-3.5 sm:px-6 sm:py-4 pr-12 border-b border-white/10 text-left space-y-1">
                <DialogTitle className="text-sm sm:text-lg font-bold text-white leading-snug">
                  {selectedDemo.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-gray-400 font-normal">
                  {selectedDemo.description}
                </DialogDescription>
              </DialogHeader>

              {/* Video en grande sin recortes (soporta vertical y horizontal) */}
              <div className="relative w-full bg-black flex items-center justify-center">
                <video
                  key={selectedDemo.id}
                  src={selectedDemo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  onError={(e) => {
                    console.error(`Error reproduciendo demo en pop-up (${selectedDemo.videoUrl}):`, e);
                  }}
                  className="w-full max-h-[70vh] sm:max-h-[74vh] object-contain bg-black"
                />
              </div>

              {/* Barra inferior para cambiar rápidamente entre los 4 demos */}
              {IA_DEMO_VIDEOS.length > 1 && (
                <div className="px-4 py-3 sm:px-6 bg-[#050a18] border-t border-white/10 flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePrevDemo}
                    className="h-9 px-3 rounded-xl border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>

                  <span className="text-xs font-semibold text-gray-400">
                    {selectedIndex + 1} / {IA_DEMO_VIDEOS.length}
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleNextDemo}
                    className="h-9 px-3 rounded-xl border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
