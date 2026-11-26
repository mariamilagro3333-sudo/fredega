'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BrainCircuit,
  Download,
  FileText,
  Play,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useInscribe } from '@/components/inscribe-context';
import { IA_DEMO_VIDEOS } from '@/components/ia-demos-carousel';
import {
  IA_INSTRUCTIONS_PDF_URL,
  IA_NO_PRO_EDITOR_NOTICE,
} from '@/lib/ia-curriculum';

interface IaCourseSpotlightProps {
  variant?: 'hero-strip' | 'sidebar' | 'compact';
  className?: string;
  onNavigate?: () => void;
}

export function IaCourseSpotlight({
  variant = 'hero-strip',
  className,
  onNavigate,
}: IaCourseSpotlightProps) {
  const { handleInscribe, isMember } = useInscribe();
  const previewDemos = IA_DEMO_VIDEOS.slice(0, 2);

  const handlePrimaryClick = () => {
    if (onNavigate) onNavigate();
    handleInscribe();
  };

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'rounded-2xl border border-primary/40 bg-gradient-to-r from-[#07142b] via-[#0b1f42] to-[#07142b] p-4 sm:p-5 text-white shadow-xl space-y-3',
          className
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          <div className="space-y-1.5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-emerald-500 text-black font-black uppercase text-[9px] tracking-widest px-2 py-0.5">
                CURSO DE IA · DISPONIBLE
              </Badge>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Celular, Tablet o PC · Cuenta de Google · CapCut / Filmora
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-white leading-tight">
              Maestría en Inteligencia Artificial y Edición PRO
            </h4>
            <div className="rounded-xl border border-emerald-400/50 bg-emerald-500/15 px-3 py-1.5">
              <p className="text-[11px] font-black text-emerald-200 leading-snug">
                {IA_NO_PRO_EDITOR_NOTICE}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            <Button
              type="button"
              onClick={handlePrimaryClick}
              size="sm"
              className={cn(
                'h-10 px-4 rounded-xl font-black uppercase tracking-wider text-[10px] text-white shadow-lg flex-1 sm:flex-none',
                isMember
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-primary hover:bg-primary/90'
              )}
            >
              {isMember ? (
                <>
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Descargar curso
                </>
              ) : (
                <>
                  Inscribirse
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </>
              )}
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              onClick={onNavigate}
              className="h-10 px-3.5 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-wider text-[10px] flex-1 sm:flex-none"
            >
              <Link href="/ia">Ver demos</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-10 px-3 rounded-xl border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 font-black uppercase tracking-wider text-[10px] flex-1 sm:flex-none"
            >
              <a
                href={IA_INSTRUCTIONS_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-1 h-3.5 w-3.5" />
                PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div
        className={cn(
          'rounded-[1.75rem] border-2 border-primary/45 bg-gradient-to-b from-primary/20 via-[#071226] to-[#040915] p-5 text-white shadow-2xl space-y-4 relative overflow-hidden',
          className
        )}
      >
        <div className="space-y-2.5 text-left">
          <Badge className="bg-emerald-500 text-black font-black uppercase text-[9px] tracking-widest px-2.5 py-0.5">
            ¡CURSO PRINCIPAL · YA DISPONIBLE!
          </Badge>
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight leading-tight text-white">
            Maestría en <span className="text-primary">IA y Edición PRO</span>
          </h3>
          <div className="rounded-xl border border-emerald-400/50 bg-emerald-500/15 px-3 py-2">
            <p className="text-[11px] font-black text-emerald-200 leading-snug">
              {IA_NO_PRO_EDITOR_NOTICE}
            </p>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Solo necesitas celular, tablet o PC, cuenta de Google, cualquier editor básico (CapCut, Filmora u otro) y actitud.
          </p>
        </div>

        {/* Mini vista de los 2 demos principales */}
        <div className="grid grid-cols-2 gap-2">
          {previewDemos.map((demo) => (
            <Link
              key={demo.id}
              href="/ia"
              onClick={onNavigate}
              className="group block rounded-xl overflow-hidden border border-white/15 bg-black hover:border-primary/60 transition-colors"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={demo.thumbnailUrl}
                  alt={demo.title}
                  fill
                  referrerPolicy="no-referrer"
                  sizes="160px"
                  className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="h-7 w-7 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </span>
                </div>
              </div>
              <p className="px-2 py-1.5 text-[10px] font-bold text-gray-200 line-clamp-1">
                {demo.title}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <Button
            type="button"
            onClick={handlePrimaryClick}
            className={cn(
              'w-full h-11 rounded-xl font-black uppercase tracking-widest text-[10px] text-white shadow-xl',
              isMember
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-primary hover:bg-primary/90'
            )}
          >
            {isMember ? (
              <>
                <Download className="mr-2 h-4 w-4" />
                Descargar y realizar curso
              </>
            ) : (
              <>
                Inscribirse ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button
            asChild
            variant="outline"
            onClick={onNavigate}
            className="w-full h-10 rounded-xl border-white/15 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px]"
          >
            <Link href="/ia#temario">Ver Temario y Demos</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full h-10 rounded-xl border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 font-black uppercase tracking-widest text-[10px]"
          >
            <a
              href={IA_INSTRUCTIONS_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Instrucciones PDF
            </a>
          </Button>
        </div>
      </div>
    );
  }

  // Default: 'hero-strip' — bloque destacado a todo lo ancho para encabezados de secciones (Contenidos, Servicios, Búsqueda, etc.)
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border-2 border-primary/40 bg-[#050d1f] p-6 md:p-10 text-white shadow-2xl',
        className
      )}
    >
      <video
        src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/85 to-[#020617]/60" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <Badge className="bg-emerald-500 text-black font-black uppercase tracking-widest text-[10px] px-3 py-1">
              ¡CURSO PRINCIPAL · YA DISPONIBLE PARA DESCARGAR!
            </Badge>
            <Badge
              variant="outline"
              className="border-primary/50 bg-primary/10 text-primary font-black uppercase tracking-widest text-[10px] px-3 py-1"
            >
              <Smartphone className="mr-1.5 h-3.5 w-3.5" />
              Celular, Tablet o PC
            </Badge>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[1.05] text-white font-headline">
            MAESTRÍA EN <span className="text-primary italic">IA Y EDICIÓN PRO</span>
          </h2>

          <div className="rounded-2xl border-2 border-emerald-400/50 bg-emerald-500/15 px-4 py-2.5 max-w-2xl mx-auto lg:mx-0">
            <p className="text-xs sm:text-sm font-black text-emerald-200 leading-snug">
              {IA_NO_PRO_EDITOR_NOTICE}
            </p>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Solo necesitas tu dispositivo (celular, tablet o computador), una cuenta de Google, cualquier editor básico como{' '}
            <span className="text-white font-bold">CapCut, Filmora</span> o cualquier app de edición, y mucha actitud y creatividad.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
            <Button
              type="button"
              onClick={handlePrimaryClick}
              size="lg"
              className={cn(
                'h-12 px-6 md:px-7 rounded-xl font-black uppercase tracking-widest text-[11px] text-white shadow-xl hover:scale-[1.02] transition-all w-full sm:w-auto',
                isMember
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-primary hover:bg-primary/90'
              )}
            >
              {isMember ? (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar y realizar curso
                </>
              ) : (
                <>
                  Inscribirse ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              onClick={onNavigate}
              className="h-12 px-5 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[11px] w-full sm:w-auto"
            >
              <Link href="/ia">
                <BrainCircuit className="mr-2 h-4 w-4 text-primary" />
                Ver demos y temario
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-5 rounded-xl border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 font-black uppercase tracking-widest text-[11px] w-full sm:w-auto"
            >
              <a
                href={IA_INSTRUCTIONS_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 h-4 w-4 text-emerald-300" />
                Instrucciones PDF
              </a>
            </Button>
          </div>
        </div>

        {/* Vista rápida de 2 demos principales */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          {previewDemos.map((demo) => (
            <Link
              key={demo.id}
              href="/ia"
              onClick={onNavigate}
              className="group rounded-2xl overflow-hidden border border-white/15 bg-[#070d1f] hover:border-primary/60 transition-all shadow-xl flex flex-col"
            >
              <div className="px-2.5 py-2 border-b border-white/10 bg-white/[0.03]">
                <p className="text-[10px] sm:text-xs font-bold text-white line-clamp-2 leading-snug">
                  {demo.title}
                </p>
              </div>
              <div className="relative aspect-video w-full bg-black">
                <Image
                  src={demo.thumbnailUrl}
                  alt={demo.title}
                  fill
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 45vw, 240px"
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="h-9 w-9 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
