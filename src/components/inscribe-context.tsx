'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Download,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { IA_WHATSAPP_CHANNEL_URL } from '@/lib/ia-curriculum';

export const WHATSAPP_CHANNEL_URL = IA_WHATSAPP_CHANNEL_URL;

interface InscribeContextValue {
  handleInscribe: () => void;
  isMember: boolean;
}

const InscribeContext = createContext<InscribeContextValue>({
  handleInscribe: () => {},
  isMember: false,
});

const MEMBERSHIP_BENEFITS = [
  'Curso completo de IA ya disponible para descargar',
  'Miles de plantillas exclusivas y Súper Packs en Google Drive',
  'Más de 100 recursos nuevos cada mes y actualizaciones constantes',
  'Cursos sin publicidad y asesoría directa',
];

export function InscribeProvider({ children }: { children: React.ReactNode }) {
  const { rol, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isMember = rol === 'miembro' || rol === 'admin';

  const handleInscribe = useCallback(() => {
    if (isMember) {
      if (pathname === '/ia') {
        const syllabusEl = document.getElementById('temario');
        if (syllabusEl) {
          syllabusEl.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      router.push('/ia#temario');
      return;
    }
    setIsDialogOpen(true);
  }, [isMember, pathname, router]);

  return (
    <InscribeContext.Provider value={{ handleInscribe, isMember }}>
      {children}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[94vw] sm:max-w-lg bg-[#020617] border border-primary/30 text-white rounded-3xl p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center sm:text-center space-y-3 items-center">
            <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_25px_rgba(30,144,255,0.25)]">
              <Crown className="h-6 w-6" />
            </div>
            <DialogTitle className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-tight">
              Regístrate y Hazte Miembro PRO
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              El curso de IA ya está disponible para descargar. Para inscribirte y acceder a los módulos, regístrate y activa tu Membresía PRO o inicia sesión si ya eres miembro.
            </DialogDescription>
          </DialogHeader>

          {/* Resumen claro de precios y beneficios de la Membresía PRO */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 space-y-3.5 mt-2">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Plan 6 Meses
                </p>
                <p className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  $15 <span className="text-[10px] font-bold text-primary">USD</span>
                </p>
              </div>
              <div className="rounded-xl border border-primary/50 bg-primary/10 p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Plan 12 Meses
                </p>
                <p className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  $22 <span className="text-[10px] font-bold text-primary">USD</span>
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary">
                ¿A qué tienes acceso con tu Membresía PRO?
              </p>
              <ul className="space-y-1.5">
                {MEMBERSHIP_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-xs text-gray-200 leading-snug">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Button
              asChild
              size="lg"
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] shadow-lg"
              onClick={() => setIsDialogOpen(false)}
            >
              <Link href="/membresia">
                <Crown className="mr-2 h-4 w-4" />
                Ver toda la información de la Membresía
              </Link>
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {!user && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full h-11 rounded-xl border-primary/40 bg-primary/10 hover:bg-primary/20 text-white font-black uppercase tracking-widest text-[11px]"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registrarse
                  </Link>
                </Button>
              )}

              <Button
                asChild
                size="lg"
                variant="outline"
                className={cn(
                  'w-full h-11 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[11px]',
                  user && 'sm:col-span-2'
                )}
                onClick={() => setIsDialogOpen(false)}
              >
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  {user ? 'Iniciar sesión con otra cuenta' : 'Iniciar sesión'}
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </InscribeContext.Provider>
  );
}

export function useInscribe() {
  return useContext(InscribeContext);
}

export function MobileInscribeBar() {
  const { handleInscribe, isMember } = useInscribe();

  return (
    <>
      {/* Barra fija inferior en móviles */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#020617]/95 backdrop-blur-xl border-t border-primary/30 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.65)]">
        <Button
          onClick={handleInscribe}
          size="lg"
          className={cn(
            'w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs text-white shadow-xl flex items-center justify-center gap-2',
            isMember
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
              : 'bg-primary hover:bg-primary/90 shadow-primary/30'
          )}
        >
          {isMember ? (
            <>
              <Download className="h-4 w-4" />
              <span>Descargar y realizar curso</span>
            </>
          ) : (
            <>
              <span>Inscribirse ahora</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Botón flotante en escritorio en toda la web */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleInscribe}
          size="lg"
          className={cn(
            'h-12 px-6 rounded-full font-black uppercase tracking-widest text-xs text-white shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border border-white/15',
            isMember
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/35'
              : 'bg-primary hover:bg-primary/90 shadow-primary/40'
          )}
        >
          {isMember ? (
            <>
              <Download className="h-4 w-4" />
              <span>Descargar y realizar curso</span>
            </>
          ) : (
            <>
              <Crown className="h-4 w-4" />
              <span>Inscribirse ahora</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </>
  );
}
