'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Crown, LogIn, MessageCircle, Smartphone } from 'lucide-react';
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

export const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb9ptJvEAKWLbEBGNN10';

interface InscribeContextValue {
  handleInscribe: () => void;
  isMember: boolean;
}

const InscribeContext = createContext<InscribeContextValue>({
  handleInscribe: () => {},
  isMember: false,
});

function openWhatsAppChannel() {
  if (typeof document === 'undefined') return;
  const link = document.createElement('a');
  link.href = WHATSAPP_CHANNEL_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function InscribeProvider({ children }: { children: React.ReactNode }) {
  const { rol, user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isMember = rol === 'miembro' || rol === 'admin';

  const handleInscribe = useCallback(() => {
    if (isMember) {
      openWhatsAppChannel();
      return;
    }
    setIsDialogOpen(true);
  }, [isMember]);

  return (
    <InscribeContext.Provider value={{ handleInscribe, isMember }}>
      {children}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[92vw] sm:max-w-md bg-[#020617] border border-primary/30 text-white rounded-3xl p-6 sm:p-8 shadow-2xl">
          <DialogHeader className="text-center sm:text-center space-y-4 items-center">
            <div className="h-14 w-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_25px_rgba(30,144,255,0.25)]">
              <Crown className="h-7 w-7" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
              Acceso Exclusivo para Miembros
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
              No te puedes inscribir hasta que inicies sesión como miembro. Hazte miembro ahora o inicia sesión para inscribirte.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              asChild
              size="lg"
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-lg"
              onClick={() => setIsDialogOpen(false)}
            >
              <Link href="/membresia">
                <Crown className="mr-2 h-4 w-4" />
                Hazte miembro ahora
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full h-12 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs"
              onClick={() => setIsDialogOpen(false)}
            >
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                {user ? 'Iniciar sesión con otra cuenta' : 'Iniciar sesión'}
              </Link>
            </Button>
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>Si ya eres miembro PRO, inicia sesión con tu cuenta para poder inscribirte.</span>
            </p>
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
            <MessageCircle className="h-4 w-4" />
            <span>Inscribirse · Canal WhatsApp</span>
          </>
        ) : (
          <>
            <span>Inscribirse ahora</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
