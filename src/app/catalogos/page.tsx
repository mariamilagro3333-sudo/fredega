'use client';

import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { catalogo1, catalogCategories } from '@/lib/catalogo1';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, MessageCircle, Truck, PackageCheck, Wallet, ChevronRight, ChevronLeft, Zap, Youtube, Instagram, Facebook, Search, X, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CatalogosPage() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    let products = activeCategory === 'Todas' 
      ? [...catalogo1] 
      : catalogo1.filter(p => p.categories.includes(activeCategory));
    
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      products = products.filter(p => 
        p.title.toLowerCase().includes(lowerTerm) || 
        p.categories.some(c => c.toLowerCase().includes(lowerTerm)) ||
        (p.description && p.description.toLowerCase().includes(lowerTerm))
      );
    }
    
    return products.sort((a, b) => b.id - a.id);
  }, [activeCategory, searchTerm]);

  const handleConsultClick = (productTitle: string) => {
    const message = encodeURIComponent(`Hola, deseo comprar o consultar por el producto: ${productTitle}`);
    window.open(`https://api.whatsapp.com/send?phone=573195456391&text=${message}`, '_blank');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/fredega' },
    { icon: Instagram, href: 'http://instagram.com/fredegapro' },
    { icon: Facebook, href: 'https://facebook.com/fredega' },
    { icon: MessageCircle, href: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20vengo%20del%20catálogo%20y%20tengo%20una%20duda.' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-0 font-sans">
      
      <header className="container mx-auto px-4 pt-6 md:pt-12">
        <div className="flex justify-center mb-4 px-1">
          <div className="relative w-full max-w-[450px] md:max-w-[320px] aspect-[3/1]">
            <img
              src="https://media.fredegapro.com/01/catalogo/logoh.png"
              alt="Logo Fredega"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {socialLinks.map((social, idx) => (
            <a 
              key={idx} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-100 rounded-full text-slate-600 hover:text-primary hover:bg-slate-200 transition-all border border-slate-200"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="text-center space-y-1 mb-6">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-slate-950">
            NUESTRO <br/><span className="text-primary">CATÁLOGO</span>
          </h1>
          <div className="h-1.5 w-16 bg-primary mx-auto rounded-full mt-4" />
          <p className="text-slate-950 text-xs md:text-xl font-black uppercase tracking-[0.25em] max-w-xl mx-auto pt-2">
            Tecnología y Hogar • Calidad Pro
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 max-w-4xl mx-auto border-t border-slate-100 pt-4">
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

      <div className="container mx-auto px-4 mb-8 relative">
        <div className="flex items-center relative max-w-5xl mx-auto">
            <button 
                onClick={() => scroll('left')}
                className="absolute -left-2 md:-left-6 z-30 p-2 bg-white border-2 border-slate-200 rounded-full shadow-lg hover:bg-slate-50 transition-all flex items-center justify-center active:scale-90"
                aria-label="Anterior categoría"
            >
                <ChevronLeft className="h-4 w-4 text-slate-900" />
            </button>
            
            <div 
                ref={scrollRef}
                className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide px-8 w-full"
            >
                {catalogCategories.map((cat) => (
                    <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                        "px-5 py-2.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                        activeCategory === cat 
                        ? "bg-slate-950 text-white border-slate-950 shadow-md scale-105" 
                        : "bg-white text-slate-700 border-slate-100 hover:border-slate-300"
                    )}
                    >
                    {cat}
                    </button>
                ))}
            </div>

            <button 
                onClick={() => scroll('right')}
                className="absolute -right-2 md:-right-6 z-30 p-2 bg-white border-2 border-slate-200 rounded-full shadow-lg hover:bg-slate-50 transition-all flex items-center justify-center active:scale-90"
                aria-label="Siguiente categoría"
            >
                <ChevronRight className="h-4 w-4 text-slate-900" />
            </button>
        </div>
      </div>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden rounded-2xl md:rounded-[2rem] bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-slate-100">
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                {product.isVideo ? (
                  <video
                    src={product.mediaUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={product.mediaUrl}
                    alt={product.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-wrap gap-1">
                  {product.categories.map(c => (
                    <Badge key={c} variant="secondary" className="bg-black/80 text-white backdrop-blur-md text-[7px] md:text-[8px] font-black uppercase tracking-widest px-2 py-0.5 shadow-md border-none">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <CardContent className="p-4 md:p-6 space-y-2 flex-grow">
                <h3 className="text-xs md:text-xl font-black uppercase tracking-tighter leading-tight text-slate-950 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                {product.description && (
                  <div className="text-slate-600 text-[9px] md:text-xs font-medium leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-4 md:p-6 pt-0">
                <Button 
                  onClick={() => handleConsultClick(product.title)}
                  className="w-full h-10 md:h-12 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] group-hover:shadow-lg transition-all active:scale-95"
                >
                  <MessageCircle className="mr-2 h-3.5 w-3.5 fill-current" />
                  Comprar o consultar
                  <ChevronRight className="ml-1 h-3 w-3 opacity-50 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center space-y-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <ShoppingCart className="h-16 w-16 mx-auto text-slate-300" />
            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase tracking-tighter">Sin resultados</h3>
              <p className="text-slate-500 text-sm font-medium">No se encontraron productos con "{searchTerm}".</p>
            </div>
            <Button variant="outline" onClick={() => { setActiveCategory('Todas'); setSearchTerm(''); }} className="rounded-full px-8 h-12 uppercase font-black tracking-widest text-[9px] border-2">
              Ver todo el catálogo
            </Button>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {isSearchOpen && (
          <div className="relative animate-in slide-in-from-right-4 fade-in duration-300">
            <Input 
              type="text"
              placeholder="¿Qué buscas?"
              className="w-48 md:w-72 h-14 rounded-full border-2 border-slate-300 bg-white text-slate-950 shadow-2xl pl-6 pr-12 focus-visible:ring-primary focus-visible:border-primary font-bold uppercase text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={cn(
            "p-5 rounded-full shadow-2xl transition-all duration-300 active:scale-90 flex items-center justify-center",
            isSearchOpen ? "bg-red-600 text-white" : "bg-slate-950 text-white"
          )}
          aria-label="Buscar productos"
        >
          {isSearchOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
        </button>
      </div>

      <footer className="w-full bg-black text-white mt-24 text-center py-16 px-4 border-t border-white/5">
        <div className="container mx-auto space-y-10">
            <div className="flex justify-center">
              <div className="relative w-40 h-14">
                <img
                    src="https://media.fredegapro.com/01/catalogo/logoh.png"
                    alt="Fredega Producciones"
                    className="w-full h-full object-contain opacity-80"
                />
              </div>
            </div>

            <div className="flex justify-center gap-6">
            {socialLinks.map((social, idx) => (
                <a 
                key={idx} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-white/5 rounded-xl border border-white/10 text-white/50 hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                <social.icon className="h-6 w-6" />
                </a>
            ))}
            </div>

            <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                © 2026 Catálogo Fredega • Tecnología y Hogar
                </p>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/10">
                Potenciado por Fredega Producciones
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
