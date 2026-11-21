'use client';

import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { Footer } from '@/components/footer';
import { usePathname } from 'next/navigation';
import { Spinner } from './ui/spinner';
import type { Session } from '@supabase/supabase-js';
import { RegionalProvider } from './regional-context';
import { InscribeProvider, MobileInscribeBar } from './inscribe-context';

const ISOLATED_PAGES = [
  '/catalogo',
  '/catalogos',
  '/cataredes',
  '/cataredes2',
  '/redespro',
  '/markepro',
  '/productos',
  '/base',
  '/hojadevida2'
];

const HIDDEN_MOBILE_CTA_PAGES = [
  '/login',
  '/signup',
  '/recuperar',
  '/account',
  '/admin',
  '/admin/correos',
  '/pagos',
  '/cumbia',
  '/auth/action',
  '/aprobada',
  '/espera',
  '/exclusividad',
  '/nocup',
  '/numero',
  '/mesa'
];

function MainContent({ children }: { children: React.ReactNode }) {
    const { loading, user } = useAuth();
    const pathname = usePathname();
    
    // Lista de rutas operativas que no heredan Header/Footer (páginas aisladas tipo App)
    const isIsolatedPage = ISOLATED_PAGES.includes(pathname);
    
    if (loading && !user && !isIsolatedPage) {
        return (
            <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
                <Spinner className="h-10 w-10 text-primary" />
            </div>
        )
    }

    return (
        <main className="flex-1">{children}</main>
    );
}

export function LayoutClientProvider({
  children,
  serverSession
}: Readonly<{
  children: React.ReactNode;
  serverSession: Session | null;
}>) {
  const pathname = usePathname();
  const isIsolatedPage = ISOLATED_PAGES.includes(pathname);
  const showMobileInscribeBar = !isIsolatedPage && !HIDDEN_MOBILE_CTA_PAGES.includes(pathname);

  return (
      <AuthProvider serverSession={serverSession}>
          <RegionalProvider>
              <InscribeProvider>
                  <div className={`flex min-h-screen flex-col ${showMobileInscribeBar ? 'pb-20 md:pb-0' : ''}`}>
                    {!isIsolatedPage && <Header />}
                    <MainContent>
                        {children}
                    </MainContent>
                    {!isIsolatedPage && <Footer />}
                  </div>
                  {showMobileInscribeBar && <MobileInscribeBar />}
                  <Toaster />
              </InscribeProvider>
          </RegionalProvider>
      </AuthProvider>
  );
}
