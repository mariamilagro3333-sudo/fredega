'use client';

import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (el?: HTMLElement) => void;
      };
    };
  }
}

export function FacebookComments({ href }: { href: string }) {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;

    const tryParse = () => {
      if (window.FB && window.FB.XFBML && containerRef.current) {
        try {
          // Pequeño retraso para asegurar que el DOM del modal esté estable
          setTimeout(() => {
            if (containerRef.current) {
              window.FB?.XFBML.parse(containerRef.current);
            }
          }, 500);
          return true;
        } catch (e) {
          console.error("Facebook XFBML parse error:", e);
        }
      }
      return false;
    };

    // Lógica de reintento agresivo (cada 1 segundo durante 10 segundos)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const success = tryParse();
      if (success || attempts > 10) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isClient, href]);

  if (!isClient) {
    return <div className="h-32 w-full animate-pulse bg-muted rounded-lg" />; 
  }

  // Aseguramos que la URL sea absoluta y esté limpia
  const absoluteUrl = href.startsWith('http') ? href : `https://fredegapro.com${href}`;

  return (
    <div 
      className="w-full min-h-[300px] p-4 bg-white rounded-lg shadow-sm overflow-hidden"
      key={absoluteUrl} 
    >
      <div
        ref={containerRef}
        className="fb-comments"
        data-href={absoluteUrl}
        data-width="100%"
        data-numposts="10"
        data-order-by="time"
        data-colorscheme="light"
      ></div>
    </div>
  );
}
