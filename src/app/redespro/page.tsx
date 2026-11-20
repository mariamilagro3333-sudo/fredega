'use client';

import { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { catalogo1 } from '@/lib/catalogo1';
import { catalogo2 } from '@/lib/catalogo2';
import { catalogo4 } from '@/lib/catalogo4';
import { Truck, Search, X, Globe, Star, RefreshCw, Loader2, MessageCircle, Eye, Gem, KeyRound, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn, cleanDescription, calculateCustomerPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { CatalogProduct } from '@/types';

const INITIAL_VISIBLE = 10;
const LOAD_MORE_BATCH = 10;

function RedesProContent() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedLargeProduct, setSelectedLargeProduct] = useState<CatalogProduct | null>(null);
  const [showPriceMode, setShowPriceMode] = useState<'customer' | 'wholesale'>('customer');
  const [consultingProduct, setConsultingProduct] = useState<CatalogProduct | null>(null);

  // PIN UI State
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinValue, setPinValue] = useState('');

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unlocked = typeof window !== 'undefined' && sessionStorage.getItem('prices_unlocked') === 'true';
    setIsUnlocked(unlocked);
  }, []);

  const allAvailableItems = useMemo(() => {
    const physicalItems = [...catalogo4, ...catalogo1, ...catalogo2];
    return physicalItems.sort((a, b) => b.id - a.id);
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term !== '') {
      return allAvailableItems.filter(p => 
        p.title.toLowerCase().includes(term) || 
        (p.description && p.description.toLowerCase().includes(term)) ||
        p.categories.some(c => c.toLowerCase().includes(term))
      );
    }
    return allAvailableItems;
  }, [searchTerm, allAvailableItems]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length) {
          setVisibleCount(prev => prev + LOAD_MORE_BATCH);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredProducts.length]);

  const handleImageInteraction = () => {
    if (isUnlocked || showPriceMode === 'wholesale') return;
    setShowPinInput(true);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinValue === "2311") {
      setIsUnlocked(true);
      setShowPriceMode('wholesale');
      setShowPinInput(false);
      sessionStorage.setItem('prices_unlocked', 'true');
      toast({ title: "Precios mayoristas habilitados" });
    } else {
      toast({ variant: "destructive", title: "PIN Incorrecto" });
      setPinValue('');
    }
  };

  const handleBuyClick = (title: string) => {
    const message = encodeURIComponent(`Hola, quiero comprar o consultar por el producto: ${title}`);
    window.open(`https://api.whatsapp.com/send?phone=573195456391&text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-primary/30">
      
      <header className="bg-[#020617] border-b border-white/10 p-4">
        <div className="container mx-auto max-w-md space-y-4">
          <div className="flex justify-center">
            <img src="https://media.fredegapro.com/01/catalogo/logoh.png" alt="Logo Fredega" className="h-10 object-contain" />
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input 
              type="text"
              placeholder="¿QUÉ BUSCAS HOY?"
              className="h-12 pl-10 pr-10 bg-white/5 border-white/10 rounded-xl font-bold uppercase text-xs tracking-widest"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-md px-4 py-6">
        <div className="space-y-16">
          {displayedProducts.map((product) => (
            <div key={product.id} className="space-y-12">
              
              {/* VERSIÓN 1: IDENTIDAD */}
              <div className="relative aspect-[9/16] w-full bg-[#0a0f1e] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col group">
                <div className="absolute inset-0 z-0">
                  {product.isVideo ? (
                    <video src={product.mediaUrl} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                  ) : (
                    <img src={product.mediaUrl} alt={product.title} className="h-full w-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>
                <div className="absolute top-6 left-6 z-20">
                  <div className="bg-primary/90 backdrop-blur-md text-white font-black px-4 py-1.5 rounded-full text-[9px] uppercase tracking-wider shadow-xl flex items-center gap-2 border border-white/20">
                      <Truck className="h-3 w-3" /> ENVÍO GRATIS B/QUILLA Y SOLEDAD
                  </div>
                </div>
                <div className="relative mt-auto z-10 p-6 flex justify-center">
                  <div className="bg-[#020617]/85 backdrop-blur-md px-8 py-3 rounded-full border-2 border-white/10 text-center shadow-2xl">
                    <h3 className="text-sm md:text-base font-black uppercase tracking-widest text-white leading-tight">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* VERSIÓN 2: VENTA */}
              <div className="relative aspect-[9/16] w-full bg-[#0a0f1e] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col group">
                <div className="absolute inset-0 z-0">
                  {product.isVideo ? (
                    <video src={product.mediaUrl} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                  ) : (
                    <img src={product.mediaUrl} alt={product.title} className="h-full w-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>
                <div className="absolute top-6 left-6 right-6 z-20 flex flex-col gap-2">
                  <div className="self-start bg-black/60 backdrop-blur-md text-white font-bold px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border border-white/10 shadow-lg">
                      <Globe className="h-3.5 w-3.5 inline mr-2 text-primary" /> VER TODO EL CATÁLOGO EN FREDEGAPRO.COM
                  </div>
                </div>
                <div className="relative mt-auto z-10 p-6 md:p-8 space-y-3 flex flex-col items-center">
                  <Button 
                    onClick={() => setConsultingProduct(product)}
                    className="w-full h-14 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Comprar o consultar
                  </Button>
                  <div className="bg-primary/20 backdrop-blur-md p-3 rounded-2xl border border-primary/30 flex flex-col items-center justify-center text-center">
                      <p className="text-primary font-black text-[9px] uppercase tracking-widest flex items-center gap-2">
                          <Star className="h-3 w-3 fill-current" /> AL PRECIO MÁS BAJO DEL MERCADO
                      </p>
                  </div>
                </div>
              </div>

              {/* VERSIÓN 3: LIMPIA (TRIGGER PIN) */}
              <div 
                className="relative aspect-[9/16] w-full bg-[#0a0f1e] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 cursor-pointer"
                onClick={() => { setSelectedLargeProduct(product); setShowPriceMode('customer'); setShowPinInput(false); setPinValue(''); }}
              >
                {product.isVideo ? (
                  <video src={product.mediaUrl} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                ) : (
                  <img src={product.mediaUrl} alt={product.title} className="h-full w-full object-cover" />
                )}
              </div>

            </div>
          ))}
        </div>

        <div ref={loadMoreRef} className="h-32 flex items-center justify-center mt-10">
            {visibleCount < filteredProducts.length && (
                <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                    <Loader2 className="h-4 w-4 animate-spin" /> Cargando más resultados...
                </div>
            )}
        </div>
      </main>

      {/* DIÁLOGO IMAGEN GRANDE */}
      <Dialog open={!!selectedLargeProduct} onOpenChange={(open) => !open && setSelectedLargeProduct(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-3xl p-0 overflow-hidden border-none bg-black/95 backdrop-blur-2xl text-white">
          <div className="relative w-full flex flex-col items-center justify-center">
              <div 
                className="relative w-full aspect-[9/16] max-h-[70vh] overflow-hidden cursor-pointer flex items-center justify-center"
                onClick={handleImageInteraction}
              >
                {selectedLargeProduct?.isVideo ? (
                  <video src={selectedLargeProduct.mediaUrl} autoPlay muted loop playsInline className="max-w-full max-h-full object-contain" />
                ) : (
                  <img src={selectedLargeProduct?.mediaUrl} alt={selectedLargeProduct?.title} className="max-w-full max-h-full object-contain" />
                )}
                
                {selectedLargeProduct && selectedLargeProduct.price >= 0 && (
                   <div className="absolute top-6 right-6 z-20">
                      <div className={cn(
                        "font-black px-6 py-2 rounded-full text-xl shadow-2xl border border-white/20 transition-all animate-in fade-in zoom-in duration-300",
                        showPriceMode === 'wholesale' || isUnlocked ? "bg-primary text-white" : "bg-white text-black"
                      )}>
                          {showPriceMode === 'wholesale' || isUnlocked
                            ? `$${selectedLargeProduct.price.toLocaleString()}` 
                            : `$${calculateCustomerPrice(selectedLargeProduct.price).toLocaleString()}`
                          }
                      </div>
                      <p className="text-[10px] font-bold text-center mt-1 uppercase tracking-widest text-white/70">
                        {showPriceMode === 'wholesale' || isUnlocked ? 'Precio Mayorista' : 'Precio Cliente'}
                      </p>
                   </div>
                )}
              </div>
              <div className="p-8 text-center w-full space-y-4 bg-black/50 border-t border-white/10">
                  <h3 className="font-black uppercase text-xl md:text-2xl tracking-tighter leading-none text-white">
                    {selectedLargeProduct?.title}
                  </h3>
                  
                  {showPinInput && !isUnlocked ? (
                    <form onSubmit={handlePinSubmit} className="max-w-xs mx-auto space-y-4 animate-in slide-in-from-top-4 duration-300">
                        <div className="relative">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                                type="password" 
                                placeholder="Ingresar PIN" 
                                className="bg-white/10 border-white/20 h-12 pl-12 text-center font-black tracking-widest"
                                value={pinValue}
                                onChange={(e) => setPinValue(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 rounded-xl bg-primary text-white font-black uppercase text-xs">
                            <Check className="mr-2 h-4 w-4" /> Validar PIN
                        </Button>
                    </form>
                  ) : (
                    !isUnlocked && (
                        <p className="text-white/60 font-black uppercase text-[10px] tracking-[0.3em] animate-pulse cursor-pointer" onClick={() => setShowPinInput(true)}>
                          Toca de nuevo para ver precio mayorista
                        </p>
                    )
                  )}

                  <div className="pt-4">
                    <Button 
                      onClick={() => selectedLargeProduct && handleBuyClick(selectedLargeProduct.title)}
                      className="w-full h-14 rounded-xl bg-white text-black hover:bg-gray-200 font-black uppercase tracking-tighter text-sm flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Consultar por WhatsApp</span>
                    </Button>
                  </div>
              </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIÁLOGO CONSULTA OPCIONES */}
      <Dialog open={!!consultingProduct} onOpenChange={(open) => !open && setConsultingProduct(null)}>
        <DialogContent className="max-w-sm bg-white text-slate-950 p-6 rounded-3xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-black uppercase">¿Qué desea hacer?</DialogTitle>
            <DialogDescription className="text-sm">Selecciona una opción para el producto: <br/><strong>{consultingProduct?.title}</strong></DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 pt-6">
            <Button 
              className="h-16 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-200 font-black uppercase text-xs"
              onClick={() => {
                if (consultingProduct) {
                  setSelectedLargeProduct(consultingProduct);
                  setShowPriceMode('customer');
                  setShowPinInput(false);
                  setPinValue('');
                  setConsultingProduct(null);
                }
              }}
            >
              <Eye className="mr-2 h-5 w-5" />
              Conocer el precio
            </Button>
            <Button 
              className="h-16 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-black uppercase text-xs"
              onClick={() => {
                if (consultingProduct) {
                  handleBuyClick(consultingProduct.title);
                  setConsultingProduct(null);
                }
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Comprar vía WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function RedesProPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#020617]"><RefreshCw className="animate-spin h-10 w-10 text-primary" /></div>}>
      <RedesProContent />
    </Suspense>
  );
}
