'use client';

import { useState, useEffect, Suspense } from 'react';
import {
  Sparkles,
  Play,
  Rocket,
  Globe,
  Film,
  Zap,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Smartphone,
  Download,
  Calendar,
  Lock,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useInscribe } from './inscribe-context';
import { IaDemosCarousel } from './ia-demos-carousel';
import {
  IA_CURRICULUM_MODULES,
  IA_COURSE_REQUIREMENTS,
  IA_MODULE_1_DOWNLOAD_URL,
  IA_WHATSAPP_CHANNEL_URL,
} from '@/lib/ia-curriculum';

const moduleIcons = [Rocket, Globe, Sparkles, Zap, Film];

function IaPromoBannerContent({ className }: { className?: string }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { handleInscribe, isMember } = useInscribe();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isCursosPage = pathname === '/cursos';

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
      router.push('/ia#temario');
    }
  };

  const handleInscribeFromModal = () => {
    setIsDetailsOpen(false);
    handleInscribe();
  };

  return (
    <div
      id="ia-promo-banner"
      className={cn(
        'w-full overflow-hidden border-y border-white/5 bg-[#020617] py-16 md:py-32 relative group',
        className
      )}
    >
      <video
        src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 mb-2">
              <Badge className="bg-emerald-500 text-black px-3 py-1 md:px-4 md:py-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-none rounded-full">
                ¡YA DISPONIBLE PARA DESCARGAR!
              </Badge>
              <Badge
                variant="outline"
                className="border-primary/50 text-primary px-3 py-1 md:px-4 md:py-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-primary/5 rounded-full"
              >
                100% TELÉFONO, TABLET U ORDENADOR
              </Badge>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-[1.05] font-headline max-w-3xl mx-auto lg:mx-0">
                MAESTRÍA EN <br />
                <span className="text-primary italic">IA Y EDICIÓN PRO</span>
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto lg:mx-0">
              <p className="text-sm md:text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                Logra resultados cinematográficos realizando el curso 100% con tu teléfono, tablet u ordenador. Clases prácticas ya disponibles para descargar.
              </p>
              <p className="text-base md:text-lg text-white font-black uppercase tracking-tight pt-1">
                ¡Exclusivo Miembros PRO!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5 pt-2 md:pt-4">
              <Button
                onClick={handleInscribe}
                size="lg"
                className={cn(
                  'text-white rounded-xl px-8 h-12 md:h-14 font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl transition-all hover:scale-105 w-full sm:w-auto',
                  isMember
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-primary hover:bg-primary/90'
                )}
              >
                {isMember ? (
                  <>
                    <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    DESCARGAR Y REALIZAR CURSO
                  </>
                ) : (
                  <>
                    INSCRIBIRSE AL CURSO IA
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-gray-300 hover:text-white h-12 md:h-14 px-6 font-black uppercase tracking-widest text-[10px] md:text-xs w-full sm:w-auto"
                onClick={handleDetailsClick}
              >
                VER TEMARIO COMPLETO <Play className="h-3 w-3 ml-2 md:ml-3 fill-current" />
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

        <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-white/10">
          <IaDemosCarousel variant="compact" />
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
                <Badge className="w-fit bg-emerald-500 text-black font-black uppercase text-[9px] md:text-xs tracking-widest px-2.5 py-0.5">
                  ¡YA DISPONIBLE PARA DESCARGAR!
                </Badge>
                <Badge className="w-fit bg-primary/20 text-primary border border-primary/30 font-black uppercase text-[9px] md:text-xs tracking-widest px-2.5 py-0.5">
                  TELÉFONO, TABLET U ORDENADOR
                </Badge>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight text-white">
                CURSO PRO <br /> <span className="text-primary italic">EDICIÓN CON IA 2026</span>
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base text-gray-400 font-medium leading-relaxed">
                Domina las herramientas de IA y edición cinematográfica realizando el curso 100% con tu teléfono, tablet u ordenador.
              </DialogDescription>
            </DialogHeader>

            <IaDemosCarousel variant="compact" />

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 space-y-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary">
                ¿Qué necesitas y qué programas se usan para el curso?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {IA_COURSE_REQUIREMENTS.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-gray-200"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white leading-snug">{req.title}</p>
                      <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{req.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {IA_CURRICULUM_MODULES.map((module, idx) => {
                const ModuleIcon = moduleIcons[idx] || Sparkles;
                return (
                  <div
                    key={module.id}
                    className={cn(
                      'p-5 md:p-6 rounded-2xl md:rounded-3xl border flex flex-col gap-3.5 transition-colors',
                      module.isAvailableNow
                        ? 'bg-emerald-500/[0.06] border-emerald-500/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <ModuleIcon className="h-5 w-5 text-primary shrink-0" />
                        <h4 className="font-black uppercase text-xs md:text-sm tracking-tight leading-tight text-white">
                          {module.title}
                        </h4>
                      </div>
                    </div>

                    {isMember && module.memberReleaseDate && (
                      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-[11px] text-yellow-200 font-semibold">
                        <Calendar className="inline-block mr-1.5 h-3.5 w-3.5 text-yellow-400 -mt-0.5" />
                        Publicación: <span className="font-black text-white">{module.memberReleaseDate}</span> (se notificará por el canal de WhatsApp).
                      </div>
                    )}

                    <ul className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="text-gray-300 text-xs font-medium leading-snug flex items-start justify-between gap-2"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{lesson.title}</span>
                          </div>
                          {isMember && lesson.downloadUrl && (
                            <a
                              href={lesson.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 inline-flex items-center gap-1 rounded-md bg-emerald-600 hover:bg-emerald-700 px-2 py-1 text-[10px] font-black uppercase text-white"
                            >
                              <Download className="h-3 w-3" />
                              Descargar
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>

                    {module.isAvailableNow && (
                      <div className="pt-1 flex flex-wrap gap-2">
                        {isMember ? (
                          <>
                            <Button
                              asChild
                              size="sm"
                              className="h-9 px-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase text-[10px]"
                            >
                              <a
                                href={IA_MODULE_1_DOWNLOAD_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                                Descargar Módulo 01
                              </a>
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="h-9 px-3.5 rounded-lg border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-white font-black uppercase text-[10px]"
                            >
                              <a
                                href={IA_WHATSAPP_CHANNEL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageCircle className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                                Canal WhatsApp
                              </a>
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={handleInscribeFromModal}
                            size="sm"
                            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px]"
                          >
                            <Lock className="mr-1.5 h-3.5 w-3.5" />
                            Descargar con Membresía PRO
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-primary/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border-2 border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="space-y-1 text-center md:text-left">
                <p className="text-emerald-400 font-black uppercase tracking-widest text-[10px] md:text-xs">
                  ¡CURSO YA DISPONIBLE PARA DESCARGAR!
                </p>
                <h5 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">
                  {isMember
                    ? 'DESCARGA EL MÓDULO 01 Y ÚNETE AL CANAL DE WHATSAPP'
                    : 'ACTIVA TU MEMBRESÍA PRO PARA DESCARGAR EL CURSO'}
                </h5>
                <p className="text-gray-400 text-xs md:text-sm font-medium">
                  Realízalo 100% desde tu teléfono, tablet u ordenador.
                </p>
              </div>
              {isMember ? (
                <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase px-6 h-12 rounded-xl shadow-xl text-[10px] md:text-xs"
                  >
                    <a
                      href={IA_MODULE_1_DOWNLOAD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Módulo 01
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-black uppercase px-6 h-12 rounded-xl shadow-xl text-[10px] md:text-xs"
                  >
                    <a
                      href={IA_WHATSAPP_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Canal WhatsApp
                    </a>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleInscribeFromModal}
                  size="lg"
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase px-8 md:px-10 h-12 rounded-xl md:rounded-2xl shadow-xl text-[10px] md:text-xs"
                >
                  Inscribirme Ahora
                </Button>
              )}
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