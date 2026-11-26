'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  ArrowRight,
  Crown,
  Download,
  FileText,
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
import {
  IA_INSTRUCTIONS_PDF_URL,
  IA_WHATSAPP_CHANNEL_URL,
  MEMBERSHIP_PAYMENT_CONFIG,
} from '@/lib/ia-curriculum';

export const WHATSAPP_CHANNEL_URL = IA_WHATSAPP_CHANNEL_URL;

const FLOATING_HIDDEN_ROUTES = ['/membresia', '/pagos', '/renovar'];

interface InscribeContextValue {
  handleInscribe: () => void;
  isMember: boolean;
  isLoggedIn: boolean;
}

const InscribeContext = createContext<InscribeContextValue>({
  handleInscribe: () => {},
  isMember: false,
  isLoggedIn: false,
});

export function InscribeProvider({ children }: { children: React.ReactNode }) {
  const { rol, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isMember = rol === 'miembro' || rol === 'admin';
  const isLoggedIn = !!user;

  const handleInscribe = useCallback(() => {
    if (isMember) {
      if (pathname === '/ia') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      router.push('/ia');
      return;
    }
    setIsDialogOpen(true);
  }, [isMember, pathname, router]);

  return (
    <InscribeContext.Provider value={{ handleInscribe, isMember, isLoggedIn }}>
      {children}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-md max-h-[86dvh] overflow-y-auto overflow-x-hidden flex flex-col gap-4 bg-[#020617] border border-primary/35 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
          <DialogHeader className="text-center sm:text-center space-y-2 items-center pt-3 sm:pt-0 pr-5 sm:pr-0">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_25px_rgba(30,144,255,0.25)]">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <DialogTitle className="text-base sm:text-xl font-black uppercase tracking-tight text-white leading-tight">
              Se necesita una membresía para acceder al curso
            </DialogTitle>
            <DialogDescription className="sr-only">
              Precios de la Membresía PRO en dólares y pesos colombianos y botones para registrarse o comprar la membresía.
            </DialogDescription>
          </DialogHeader>

          {/* Precios inmediatos en dólares y pesos colombianos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-w-0">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Plan 6 Meses
              </p>
              <p className="text-base sm:text-lg font-black text-white mt-0.5 leading-tight">
                {MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.dollars}
              </p>
              <p className="text-xs font-bold text-primary mt-0.5 leading-tight">
                {MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.cop}
              </p>
            </div>
            <div className="rounded-xl border border-primary/50 bg-primary/10 p-3.5 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                Plan 1 Año
              </p>
              <p className="text-base sm:text-lg font-black text-white mt-0.5 leading-tight">
                {MEMBERSHIP_PAYMENT_CONFIG.prices.annual.dollars}
              </p>
              <p className="text-xs font-bold text-emerald-400 mt-0.5 leading-tight">
                {MEMBERSHIP_PAYMENT_CONFIG.prices.annual.cop}
              </p>
            </div>
          </div>

          {/* Botones inmediatos */}
          <div className="flex flex-col gap-2 min-w-0">
            {!user ? (
              <Button
                asChild
                size="lg"
                className="w-full h-auto min-h-11 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-wider text-xs whitespace-normal text-center leading-snug shadow-lg"
                onClick={() => setIsDialogOpen(false)}
              >
                <Link href="/signup" className="flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4 shrink-0" />
                  <span>Inscribirse y Registrarse Ahora</span>
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="w-full h-auto min-h-11 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-wider text-xs whitespace-normal text-center leading-snug shadow-lg"
                onClick={() => setIsDialogOpen(false)}
              >
                <Link href="/membresia" className="flex items-center justify-center gap-2">
                  <Crown className="h-4 w-4 shrink-0" />
                  <span>Comprar Membresía</span>
                </Link>
              </Button>
            )}

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full h-auto min-h-10 py-2 px-3 rounded-xl border-primary/40 bg-primary/10 hover:bg-primary/20 text-white font-black uppercase tracking-wider text-[11px] whitespace-normal text-center leading-snug"
              onClick={() => setIsDialogOpen(false)}
            >
              <Link href="/membresia" className="flex items-center justify-center gap-2">
                <Crown className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span>Ver precios y medios de pago</span>
              </Link>
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full h-auto min-h-10 py-2 px-3 rounded-xl border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 font-bold uppercase tracking-wider text-[10px] whitespace-normal text-center leading-snug"
              >
                <a
                  href={IA_INSTRUCTIONS_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0" />
                  <span>Instrucciones PDF</span>
                </a>
              </Button>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full h-auto min-h-10 py-2 px-3 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-[10px] whitespace-normal text-center leading-snug"
                onClick={() => setIsDialogOpen(false)}
              >
                <Link href="/login" className="flex items-center justify-center gap-1.5">
                  <LogIn className="h-3.5 w-3.5 shrink-0" />
                  <span>{user ? 'Cambiar de cuenta' : 'Ya tengo cuenta'}</span>
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
  const { handleInscribe, isMember, isLoggedIn } = useInscribe();
  const pathname = usePathname();
  const router = useRouter();

  // Quitar botón flotante en páginas de membresía/compras, y en /ia cuando ya es miembro
  if (FLOATING_HIDDEN_ROUTES.includes(pathname)) {
    return null;
  }
  if (isMember && pathname === '/ia') {
    return null;
  }

  const handleFloatingClick = () => {
    if (isMember) {
      router.push('/ia');
      return;
    }
    if (isLoggedIn) {
      router.push('/membresia');
      return;
    }
    handleInscribe();
  };

  return (
    <>
      {/* Barra fija inferior en móviles */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#020617]/95 backdrop-blur-xl border-t border-primary/30 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.65)]">
        <Button
          onClick={handleFloatingClick}
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
              <span>Descargar curso</span>
            </>
          ) : isLoggedIn ? (
            <>
              <Crown className="h-4 w-4" />
              <span>Comprar membresía</span>
            </>
          ) : (
            <>
              <span>Inscribirse ahora</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Botón flotante en escritorio */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleFloatingClick}
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
              <span>Descargar curso</span>
            </>
          ) : isLoggedIn ? (
            <>
              <Crown className="h-4 w-4" />
              <span>Comprar membresía</span>
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
