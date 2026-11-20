
'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { catalogo1 } from '@/lib/catalogo1';
import { catalogo2 } from '@/lib/catalogo2';
import { catalogo4 } from '@/lib/catalogo4';
import { catalogo5 } from '@/lib/catalogo5';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Zap, PackageCheck, Wallet, CreditCard, Loader2 } from 'lucide-react';
import { cleanDescription } from '@/lib/utils';

const INITIAL_VISIBLE = 15;
const LOAD_MORE_BATCH = 15;

export default function CataredesPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const allAvailableItems = useMemo(() => {
    const physicalItems = [...catalogo5, ...catalogo4, ...catalogo1, ...catalogo2];
    return physicalItems.sort((a, b) => b.id - a.id);
  }, []);

  const displayedProducts = useMemo(() => {
    return allAvailableItems.slice(0, visibleCount);
  }, [allAvailableItems, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < allAvailableItems.length) {
          setVisibleCount(prev => prev + LOAD_MORE_BATCH);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, allAvailableItems.length]);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 font-sans">
      
      <header className="container mx-auto px-4 pt-6 md:pt-12">
        <div className="flex justify-center mb-8 px-1">
          <img
            src="https://media.fredegapro.com/01/catalogo/logoh.png"
            alt="Logo Fredega"
            className="object-contain w-full max-w-[450px] md:max-w-[320px] transition-all"
          />
        </div>

        <div className="text-center space-y-1 mb-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-slate-950">
            NUESTRO <br/><span className="text-primary">CATÁLOGO</span>
          </h1>
          <div className="h-1.5 w-16 bg-primary mx-auto rounded-full mt-4" />
          <p className="text-slate-950 text-xs md:text-xl font-black uppercase tracking-[0.25em] max-w-xl mx-auto pt-2">
            Producido por Fredy De La Hoz • Calidad Pro
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 max-w-4xl mx-auto border-t border-slate-100 pt-6">
          <div className="flex flex-col items-center text-center group">
            <CreditCard className="h-7 w-7 md:h-9 md:w-9 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-emerald-600">Paga a cuotas o de contado</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">DISPONIBLE AHORA</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center group">
            <Zap className="h-7 w-7 md:h-9 md:w-9 text-orange-600 fill-orange-600 mb-2 group-hover:scale-110 transition-transform animate-pulse" />
            <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-orange-600">Llega hoy</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">ENTREGA INMEDIATA</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center group">
            <PackageCheck className="h-7 w-7 md:h-9 md:w-9 text-sky-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-sky-600">Pago en casa</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">CONTRA ENTREGA</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center group">
            <Wallet className="h-7 w-7 md:h-9 md:w-9 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-amber-600">Medios de pago</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">TODOS DISPONIBLES</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {displayedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden rounded-2xl md:rounded-[2rem] bg-white shadow-sm hover:shadow-md transition-all duration-500 flex flex-col h-full border border-slate-100">
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                {product.isVideo ? (
                  <video
                    src={product.mediaUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={product.mediaUrl}
                    alt={product.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>
              
              <CardContent className="p-3 md:p-6 flex flex-col justify-center items-center text-center flex-grow">
                <h3 className="text-[10px] md:text-lg font-black uppercase tracking-tight leading-tight text-slate-950 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                {product.description && (
                  <p className="mt-2 text-slate-600 text-[8px] md:text-xs font-medium leading-relaxed whitespace-pre-line">
                    {cleanDescription(product.description)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-10">
            {visibleCount < allAvailableItems.length && (
                <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cargando más productos...
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
