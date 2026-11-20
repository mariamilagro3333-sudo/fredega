'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, Gem, Mail, Clock, Info, CheckCircle2, MessageCircle, ExternalLink, Image as ImageIcon, PlayCircle, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TemplateRequestBannerProps {
  className?: string;
}

export function TemplateRequestBanner({ className }: TemplateRequestBannerProps) {
  const { rol, user } = useAuth();
  const [showExclusiveAlert, setShowExclusiveAlert] = useState(false);
  const isMember = rol === 'admin' || rol === 'miembro';

  const whatsappLink = "https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quiero%20solicitar%20una%20o%20varias%20plantillas.";

  const handleRequestClick = () => {
    if (isMember) {
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    } else {
      setShowExclusiveAlert(true);
    }
  };

  return (
    <>
      <div className={cn(
        "relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-6 md:p-8 shadow-xl transition-all hover:shadow-primary/5",
        className
      )}>
        {/* Elementos decorativos de fondo */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center lg:items-start gap-6 text-center md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-inner">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Nuevo Beneficio PRO</span>
                <div className="flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent border border-accent/20">
                  <Clock className="h-3 w-3" />
                  ENTREGA EN 3 DÍAS
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
                ¿No encuentras la plantilla que buscas? <span className="text-primary">¡Pídela aquí!</span>
              </h2>
              <p className="max-w-2xl text-base md:text-lg font-normal leading-relaxed text-gray-400">
                Como miembro PRO, puedes solicitar <span className="text-white font-medium">una o varias plantillas a la vez</span> para After Effects, Premiere o DaVinci. 
                Recíbela en máximo <span className="text-white font-medium">3 días hábiles</span>.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 rounded-xl font-normal uppercase order-2 sm:order-1">
                  Saber más
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-2xl font-bold uppercase tracking-tight">
                    <Info className="h-6 w-6 text-primary" />
                    Instrucciones de Solicitud
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base space-y-6 pt-4">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                        <p><strong>Asegúrate de tener acceso:</strong> Debes haber <Link href="/login" className="text-primary underline">iniciado sesión</Link> y tener una <Link href="/membresia" className="text-primary underline">membresía activa</Link>.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                        <p><strong>Solicita vía WhatsApp:</strong> Presiona el botón "Solicitar ahora" para contactarnos. Puedes pedir <strong>una o varias plantillas</strong> en la misma solicitud.</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                        <p><strong>Proporciona referencias:</strong> En el chat de WhatsApp, envía una <strong>imagen de referencia</strong> o un <strong>enlace de YouTube</strong> de la plantilla que deseas.</p>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-xl border space-y-3">
                      <h4 className="font-bold flex items-center gap-2 text-foreground">
                        <Clock className="h-4 w-4 text-accent" />
                        Tiempos y Entrega
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Plazo de entrega máximo: <strong>3 días hábiles</strong>.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Envío mediante enlace de <strong>Google Drive</strong>.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> <span>Recibirás el enlace por correo electrónico o por el mismo chat de WhatsApp.</span></li>
                      </ul>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-3 pt-6 border-t">
                  <AlertDialogCancel className="font-normal uppercase h-12 rounded-xl mt-0">Cerrar</AlertDialogCancel>
                  <Button onClick={handleRequestClick} size="lg" className="bg-accent hover:bg-accent/90 text-white font-normal uppercase h-12 px-8 rounded-xl shadow-lg">
                    Solicitar ahora
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button onClick={handleRequestClick} size="lg" className="bg-primary hover:bg-primary/90 text-white font-normal uppercase h-12 px-10 rounded-xl shadow-lg transition-all hover:scale-105 order-1 sm:order-2">
              Solicitar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Alerta de Contenido Exclusivo */}
      <AlertDialog open={showExclusiveAlert} onOpenChange={setShowExclusiveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <Gem className="h-12 w-12 text-accent animate-bounce" />
            </div>
            <AlertDialogTitle className="text-center text-2xl font-bold">Herramienta Exclusiva para Miembros</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg pt-2">
              Esta es una herramienta exclusiva para los miembros PRO de Fredega Producciones. 
              ¡Únete ahora para solicitar tus propias plantillas personalizadas y desbloquear miles de recursos!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center flex-col sm:flex-row gap-3 mt-6">
            <AlertDialogCancel className="font-normal uppercase h-12 rounded-xl mt-0">Volver</AlertDialogCancel>
            <Button asChild className="bg-accent hover:bg-accent/90 text-white font-normal uppercase h-12 px-8 rounded-xl shadow-lg">
              <Link href="/membresia">Hazte Miembro Aquí</Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
