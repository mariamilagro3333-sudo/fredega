'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Crown,
  Zap,
  ArrowRight,
  Smartphone,
  TabletSmartphone,
  Laptop,
  Download,
  MessageCircle,
  Calendar,
  Lock,
  BookOpen,
  Mail,
  Sparkles,
  Film,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useInscribe } from '@/components/inscribe-context';
import { IaDemosCarousel } from '@/components/ia-demos-carousel';
import {
  IA_CURRICULUM_MODULES,
  IA_COURSE_REQUIREMENTS,
  IA_MODULE_1_DOWNLOAD_URL,
  IA_WHATSAPP_CHANNEL_URL,
} from '@/lib/ia-curriculum';

export default function IACoursePromoPage() {
  const { handleInscribe, isMember } = useInscribe();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col selection:bg-primary/30">
      {/* HERO SECTION CINEMÁTICO */}
      <section className="relative w-full py-16 md:py-28 overflow-hidden flex items-center justify-center">
        <video
          src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-[#020617]" />

        <div className="container relative z-10 px-4 text-center space-y-5 md:space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex flex-col items-center gap-3">
            <Badge className="bg-emerald-500 text-black font-black px-4 py-1 md:px-5 md:py-1.5 tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] text-[10px] md:text-xs">
              ¡CURSO YA DISPONIBLE PARA DESCARGAR!
            </Badge>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/50 text-primary font-black px-4 py-1 tracking-widest uppercase bg-primary/10 text-[9px] md:text-[10px]"
              >
                <Smartphone className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                <Laptop className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                100% EN TELÉFONO, TABLET U ORDENADOR
              </Badge>
              <Badge className="bg-emerald-600 text-white font-black px-4 py-1 tracking-widest uppercase text-[9px] md:text-[10px]">
                GAMA MEDIA OK
              </Badge>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] max-w-4xl mx-auto font-headline">
            MAESTRÍA EN <span className="text-primary italic">IA Y EDICIÓN PRO</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-snug">
            Logra todos los efectos de los demos realizando el curso{' '}
            <span className="text-white font-bold">100% con tu teléfono, tablet u ordenador</span>.
            Ya disponible para descargar y empezar hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-2 md:pt-3 w-full max-w-xl mx-auto">
            <Button
              onClick={handleInscribe}
              size="lg"
              className={cn(
                'h-14 w-full px-8 md:px-10 rounded-2xl text-white font-black uppercase tracking-widest text-xs md:text-sm shadow-2xl hover:scale-105 transition-all',
                isMember
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                  : 'bg-primary hover:bg-primary/90 shadow-primary/30'
              )}
            >
              {isMember ? (
                <>
                  <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Descargar y realizar curso
                </>
              ) : (
                <>
                  Inscribirse ahora
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </>
              )}
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 w-full px-8 md:px-10 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs md:text-sm backdrop-blur-md"
            >
              <Link href="#temario">
                <BookOpen className="mr-2 h-4 w-4" />
                Ver Temario del Curso
              </Link>
            </Button>
          </div>

          {/* DEMOS DEL CURSO EN CUADRÍCULA APILADA */}
          <div className="max-w-3xl mx-auto w-full pt-4 md:pt-6">
            <IaDemosCarousel variant="hero" />
          </div>
        </div>
      </section>

      {/* DETALLES Y TEMARIO DEL CURSO */}
      <section
        id="detalles"
        className="container mx-auto py-14 md:py-20 px-4 md:px-6 space-y-16 md:space-y-20"
      >
        {/* QUÉ SE NECESITA Y PROGRAMAS PARA EL CURSO */}
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-6">
          <div className="text-center space-y-2">
            <Badge className="bg-primary/20 text-primary border border-primary/30 font-black uppercase tracking-widest text-[10px] px-3.5 py-1">
              REQUISITOS Y PROGRAMAS NECESARIOS
            </Badge>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
              ¿Qué necesitas y qué programas se usan en el curso?
            </h2>
            <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto font-medium">
              No necesitas programas complejos ni equipos costosos: sirve cualquier editor básico de celular o computador como <span className="text-white font-bold">CapCut, Filmora</span> u otro editor.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
            {IA_COURSE_REQUIREMENTS.map((req) => {
              const Icon =
                req.id === 'device'
                  ? Smartphone
                  : req.id === 'google'
                  ? Mail
                  : req.id === 'software'
                  ? Film
                  : Sparkles;
              return (
                <div
                  key={req.id}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {req.label}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-white leading-snug">
                      {req.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {req.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TEMARIO COMPLETO Y DESCARGAS */}
        <div id="temario" className="scroll-mt-24 space-y-8 md:space-y-10">
          <div className="text-center space-y-3">
            <Badge className="bg-primary/20 text-primary border border-primary/30 font-black uppercase tracking-widest text-[10px] md:text-xs px-4 py-1">
              TEMARIO OFICIAL DEL CURSO
            </Badge>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
              MÓDULOS Y <span className="text-primary">LECCIONES</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-medium">
              {isMember
                ? 'Descarga el Módulo 01 completo o lección por lección y únete al Canal de WhatsApp para recibir las próximas entregas.'
                : 'El curso ya está disponible para descargar. Conoce todo lo que aprenderás módulo por módulo.'}
            </p>
          </div>

          {/* BANNER SUPERIOR DE ACCESO DENTRO DEL TEMARIO */}
          {isMember ? (
            <div className="max-w-5xl mx-auto rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-primary/10 to-[#0a1229] p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center lg:text-left">
                  <Badge className="bg-emerald-500 text-black font-black uppercase tracking-widest text-[10px] px-3 py-1">
                    ACCESO MIEMBRO PRO ACTIVO
                  </Badge>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                    ¡Módulo 01 ya disponible para descargar!
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
                    Descarga las lecciones ahora mismo en Google Drive y únete al Canal de WhatsApp para recibir actualizaciones, las demás lecciones y el aviso de publicación del Módulo 02.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest text-[11px] shadow-xl"
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
                    variant="outline"
                    className="h-12 px-6 rounded-xl border-emerald-400/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-white font-black uppercase tracking-widest text-[11px]"
                  >
                    <a
                      href={IA_WHATSAPP_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
                      Unirse al Canal de WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-blue-950/30 to-[#0a1229] p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center lg:text-left">
                  <Badge className="bg-emerald-500 text-black font-black uppercase tracking-widest text-[10px] px-3 py-1">
                    ¡YA DISPONIBLE PARA DESCARGAR!
                  </Badge>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                    El curso de IA ya está disponible para descargar
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
                    Activa tu Membresía PRO o inicia sesión si ya eres miembro para descargar todos los módulos y lecciones del curso.
                  </p>
                </div>
                <Button
                  onClick={handleInscribe}
                  size="lg"
                  className="h-12 px-7 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] shadow-xl w-full lg:w-auto shrink-0"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Inscribirse y Descargar
                </Button>
              </div>
            </div>
          )}

          {/* MÓDULOS 1 Y 2 DESTACADOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {IA_CURRICULUM_MODULES.slice(0, 2).map((module) => (
              <Card
                key={module.id}
                className={cn(
                  'rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col transition-all',
                  module.isAvailableNow
                    ? 'bg-emerald-500/[0.05] border-2 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.1)]'
                    : 'bg-white/5 border border-white/10 hover:bg-white/[0.07]'
                )}
              >
                <CardHeader className="p-6 md:p-7 pb-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-primary/20 text-primary border-none font-black text-[10px]">
                        {module.numberLabel}
                      </Badge>
                      {module.isAvailableNow && (
                        <Badge className="bg-emerald-500 text-black border-none font-black text-[10px] uppercase">
                          Disponible para descargar
                        </Badge>
                      )}
                      {isMember && module.memberReleaseDate && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 font-black text-[10px] uppercase">
                          <Calendar className="mr-1 h-3 w-3" />
                          Publicación: {module.memberReleaseDate}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight">
                    {module.title}
                  </CardTitle>

                  {/* Botón de descarga del módulo completo */}
                  {module.isAvailableNow && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {isMember && module.downloadUrl ? (
                        <>
                          <Button
                            asChild
                            size="sm"
                            className="h-10 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-wider text-[10px] shadow-lg"
                          >
                            <a
                              href={module.downloadUrl}
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
                            className="h-10 px-4 rounded-xl border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-white font-black uppercase tracking-wider text-[10px]"
                          >
                            <a
                              href={IA_WHATSAPP_CHANNEL_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                              Canal de WhatsApp
                            </a>
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={handleInscribe}
                          size="sm"
                          className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-wider text-[10px]"
                        >
                          <Lock className="mr-1.5 h-3.5 w-3.5" />
                          Descargar con Membresía PRO
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Aviso fecha Módulo 02 SOLO para miembros */}
                  {isMember && module.memberReleaseDate && (
                    <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3.5 space-y-2.5">
                      <p className="text-xs text-yellow-200 font-semibold leading-snug">
                        <Calendar className="inline-block mr-1.5 h-3.5 w-3.5 text-yellow-400 -mt-0.5" />
                        Fecha de publicación:{' '}
                        <span className="font-black text-white">{module.memberReleaseDate}</span>.
                        Se notificará por el canal de WhatsApp en cuanto esté listo para descargar.
                      </p>
                      <Button
                        asChild
                        size="sm"
                        className="h-9 px-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-[10px]"
                      >
                        <a
                          href={IA_WHATSAPP_CHANNEL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                          Unirse al Canal de WhatsApp
                        </a>
                      </Button>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-6 md:p-7 pt-0 flex-grow">
                  <ul className="space-y-3">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-3"
                      >
                        <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-200 leading-snug">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        {isMember && lesson.downloadUrl && (
                          <Button
                            asChild
                            size="sm"
                            className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-[10px] shrink-0 self-start sm:self-center"
                          >
                            <a
                              href={lesson.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="mr-1.5 h-3 w-3" />
                              Descargar
                            </a>
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* MÓDULOS 3, 4 Y 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {IA_CURRICULUM_MODULES.slice(2).map((module) => (
              <Card
                key={module.id}
                className="bg-white/5 border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden hover:bg-white/[0.07] transition-all flex flex-col"
              >
                <CardHeader className="p-6 md:p-7 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-primary/20 text-primary border-none font-black text-[9px] md:text-[10px]">
                      {module.numberLabel}
                    </Badge>
                  </div>
                  <CardTitle className="text-base md:text-lg font-black uppercase tracking-tight text-white leading-tight">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0 flex-grow">
                  <ul className="space-y-3 md:space-y-4">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-start gap-3 text-xs md:text-sm text-gray-400 leading-snug"
                      >
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-medium">{lesson.title}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CARACTERÍSTICAS DEL CURSO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-tight">
                COMIENZA HOY <span className="text-primary">TU NUEVA ERA</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 font-normal leading-relaxed">
                Este curso ya está disponible para descargar y fue diseñado para que puedas realizarlo 100% desde tu teléfono, tablet u ordenador, integrando IA avanzada para lograr resultados cinematográficos en 4K.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: Smartphone,
                  title: '100% Teléfono, Tablet u Ordenador',
                  text: 'Realiza todas las clases y proyectos desde el dispositivo que prefieras: celular, tablet o computadora.',
                },
                {
                  icon: TabletSmartphone,
                  title: 'Gama Media OK',
                  text: 'Optimizado para funcionar en dispositivos estándar sin bloqueos.',
                },
                {
                  icon: Zap,
                  title: 'Disponible para Descargar Ahora',
                  text: 'Descarga las lecciones paso a paso y aplícalas inmediatamente en tus propios videos.',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 hover:border-primary/30 transition-colors group"
                >
                  <feature.icon className="h-7 w-7 md:h-8 md:w-8 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-black uppercase text-[11px] md:text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-400 font-medium">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-primary/20 shadow-2xl group">
            <video
              src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
              <div className="p-5 md:p-6 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-white animate-pulse">
                <Smartphone className="h-10 w-10 md:h-12 md:w-12" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <section className="text-center pb-12">
          <Card className="bg-gradient-to-br from-primary/20 to-blue-900/10 border-2 border-primary/30 p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 hidden md:block">
              <Smartphone className="h-64 w-64 text-primary" />
            </div>
            <Badge className="mb-4 md:mb-5 bg-emerald-500 text-black font-black uppercase tracking-widest text-[9px] md:text-xs">
              ¡CURSO YA DISPONIBLE PARA DESCARGAR!
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase mb-4 md:mb-5 text-white leading-tight tracking-tighter max-w-3xl mx-auto">
              TRANSFORMA TU FORMA DE CREAR HOY MISMO
            </h2>
            <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto font-medium leading-snug">
              {isMember
                ? 'Descarga el Módulo 01 ahora y únete al Canal de WhatsApp para recibir actualizaciones y las próximas lecciones y módulos.'
                : 'Realiza el curso 100% desde tu teléfono, tablet u ordenador con tu Membresía PRO. Accede ahora mismo para descargarlo.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isMember ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl bg-emerald-500 text-black hover:bg-emerald-600 font-black uppercase tracking-widest text-[10px] md:text-xs shadow-xl transition-all"
                  >
                    <a
                      href={IA_MODULE_1_DOWNLOAD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Descargar Módulo 01
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] md:text-xs shadow-xl transition-all"
                  >
                    <a
                      href={IA_WHATSAPP_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Unirse al Canal de WhatsApp
                    </a>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleInscribe}
                    size="lg"
                    className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] md:text-xs shadow-xl transition-all"
                  >
                    <Crown className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Inscribirse ahora
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px] md:text-xs shadow-xl transition-all"
                  >
                    <Link href="/membresia">Ver información de la Membresía</Link>
                  </Button>
                </>
              )}
            </div>
          </Card>
        </section>
      </section>
    </div>
  );
}