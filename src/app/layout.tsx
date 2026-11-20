import './globals.css';
import type { Metadata } from 'next';
import { LayoutClientProvider } from '@/components/layout-client-provider';
import Script from 'next/script';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Fredega Producciones',
  description: 'Graphic design and video editing products, templates, and plugins.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting Supabase session in RootLayout:', error);
    }
    session = data?.session ?? null;
  } catch (error) {
    console.error('Error initializing Supabase in RootLayout:', error);
  }
  
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="fb-root"></div>
        <FirebaseClientProvider>
          <LayoutClientProvider serverSession={session}>{children}</LayoutClientProvider>
        </FirebaseClientProvider>
        <Script
            src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v19.0"
            strategy="lazyOnload"
            crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}