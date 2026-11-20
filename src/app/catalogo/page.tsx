'use client';

import { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { catalogo1, catalogCategories } from '@/lib/catalogo1';
import { catalogo2 } from '@/lib/catalogo2';
import { catalogo4 } from '@/lib/catalogo4';
import { catalogo5 } from '@/lib/catalogo5';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, MessageCircle, Truck, PackageCheck, Wallet, Wallet as WalletIcon, ChevronRight, ChevronLeft, Zap, Search, X, RefreshCw, Loader2, Eye, KeyRound, Check, ArrowLeftRight, Users, Gem } from 'lucide-react';
import { cn, cleanDescription, calculateCustomerPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { CatalogProduct } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const INITIAL_VISIBLE = 20;
const LOAD_MORE_BATCH = 20;

function CatalogContent() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPricesGlobally, setShowPricesGlobally] = useState(false);
  const [priceMode, setPriceMode] = useState<'customer' | 'wholesale'>('customer');
  const [selectedLargeProduct, setSelectedLargeProduct] = useState<CatalogProduct | null>(null);
  const [consultingProduct, setConsultingProduct] = useState<CatalogProduct | null>(null);
  
  // PIN UI State
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinValue, setPinValue] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unlocked = typeof window !== 'undefined' && sessionStorage.getItem('prices_unlocked') === 'true';
    const globalPrices = typeof window !== 'undefined' && sessionStorage.getItem('show_prices_globally') === 'true';
    const savedMode = typeof window !== 'undefined' && sessionStorage.getItem('catalog_price_mode') as 'customer' | 'wholesale';
    
    setIsUnlocked(unlocked);
    setShowPricesGlobally(globalPrices);
    if (savedMode) setPriceMode(savedMode);
    else if (unlocked) setPriceMode('wholesale');
  }, []);

  const allAvailableItems = useMemo(() => {
    const physicalItems = [...catalogo5, ...catalogo4, ...catalogo1, ...catalogo2];
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
    return activeCategory === 'Todas' 
      ? allAvailableItems 
      : allAvailableItems.filter(p => p.categories.includes(activeCategory));
  }, [activeCategory, searchTerm, allAvailableItems]);

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

  const handleBuyClick = (title: string) => {
    const message = encodeURIComponent(`Hola, quiero comprar o consultar por el producto: ${title}`);
    window.open(`https://api.whatsapp.com/send?phone=573195456391&text=${message}`, '_blank');
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinValue === "2311") {
      setIsUnlocked(true);
      setShowPricesGlobally(true);
      setPriceMode('wholesale');
      setShowPinInput(false);
      sessionStorage.setItem('prices_unlocked', 'true');
      sessionStorage.setItem('show_prices_globally', 'true');
      sessionStorage.setItem('catalog_price_mode', 'wholesale');
      toast({ title: "Precios mayoristas habilitados" });
    } else {
      toast({ variant: "destructive", title: "PIN Incorrecto" });
      setPinValue('');
    }
  };

  const togglePriceMode = () => {
    const newMode = priceMode === 'customer' ? 'wholesale' : 'customer';
    setPriceMode(newMode);
    sessionStorage.setItem('catalog_price_mode', newMode);
    toast({ 
        title: `Modo ${newMode === 'customer' ? 'Cliente' : 'Mayorista'} activado`,
        description: `Ahora viendo precios para ${newMode === 'customer' ? 'el público' : 'distribuidores'}.`
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 font-sans selection:bg-primary/20">
      
      {/* Selector de modo de precio flotante (Solo si está desbloqueado) */}
      {isUnlocked && (
          <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-right-4 duration-500">
              <Card className="bg-white/90 backdrop-blur-md border-2 border-slate-200 shadow-2xl p-3 rounded-2xl flex items-center gap-3">
                  <div className="flex flex-col items-end">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Ver como</span>
                      <span className={cn("text-[10px] font-black uppercase", priceMode === 'customer' ? "text-slate-950" : "text-primary")}>
                          {priceMode === 'customer' ? 'Cliente' : 'Mayorista'}
                      </span>
                  </div>
                  <Switch 
                    checked={priceMode === 'wholesale'} 
                    onCheckedChange={togglePriceMode}
                    className="data-[state=checked]:bg-primary"
                  />
              </Card>
          </div>
      )}

      <header className="container mx-auto px-4 pt-6 md:pt-12">
        <div className="flex justify-center mb-4 px-1">
          <img src="https://media.fredegapro.com/01/catalogo/logoh.png" alt="Logo Fredega" className="h-14 object-contain" />
        </div>

        <div className="max-w-xl mx-auto mb-10 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
          <Input 
            type="text"
            placeholder="¿QUÉ BUSCAS HOY?"
            className="w-full h-16 rounded-3xl border-4 border-slate-100 bg-slate-50 text-slate-950 pl-14 pr-14 font-black uppercase text-sm tracking-widest"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-14 top-1/2 -translate-y-1/2 p-2 bg-slate-200 rounded-full">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="text-center space-y-1 mb-10">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-slate-950">
            NUESTRO <br/><span className="text-primary">CATÁLOGO</span>
          </h1>
          <div className="h-1.5 w-16 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 max-w-4xl mx-auto border-y border-slate-100 py-6">
          <div className="flex flex-col items-center text-center"><Truck className="h-7 w-7 text-emerald-600 mb-2" /><span className="text-[10px] font-black uppercase tracking-tighter text-emerald-600">Envío Gratis</span></div>
          <div className="flex flex-col items-center text-center"><Zap className="h-7 w-7 text-orange-600 fill-orange-600 mb-2 animate-pulse" /><span className="text-[10px] font-black uppercase tracking-tighter text-orange-600">Llega hoy</span></div>
          <div className="flex flex-col items-center text-center"><PackageCheck className="h-7 w-7 text-sky-600 mb-2" /><span className="text-[10px] font-black uppercase tracking-tighter text-sky-600">Pago en casa</span></div>
          <div className="flex flex-col items-center text-center"><Wallet className="h-7 w-7 text-amber-600 mb-2" /><span className="text-[10px] font-black uppercase tracking-tighter text-amber-600">Medios de pago</span></div>
        </div>
      </header>

      <div className="container mx-auto px-4 mb-8 relative">
        <div className="flex items-center relative max-w-5xl mx-auto">
            <button onClick={() => scroll('left')} className="absolute -left-2 md:-left-6 z-30 p-2 bg-white border-2 border-slate-200 rounded-full shadow-lg"><ChevronLeft className="h-4 w-4" /></button>
            <div ref={scrollRef} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide px-8 w-full">
                {catalogCategories && catalogCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                          "px-5 py-2.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                          activeCategory === cat ? "bg-slate-950 text-white border-slate-950 shadow-md" : "bg-white text-slate-700 border-slate-100 hover:border-slate-300"
                      )}
                    >
                      {cat}
                    </button>
                ))}
            </div>
            <button onClick={() => scroll('right')} className="absolute -right-2 md:-right-6 z-30 p-2 bg-white border-2 border-slate-200 rounded-full shadow-lg"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {displayedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden rounded-2xl md:rounded-[2rem] bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-slate-100">
              <div 
                className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" 
                onClick={() => { setSelectedLargeProduct(product); setShowPinInput(false); setPinValue(''); }}
              >
                {product.isVideo ? (
                  <video src={product.mediaUrl} autoPlay muted loop playsInline className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <img src={product.mediaUrl} alt={product.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                )}

                {/* Precio en la miniatura si están activados globalmente */}
                {showPricesGlobally && product.price >= 0 && (
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 animate-in zoom-in-50 duration-300">
                        <Badge className={cn(
                            "px-3 py-1 text-[10px] md:text-sm font-black border shadow-lg rounded-full",
                            priceMode === 'wholesale' ? "bg-primary text-white border-primary/20" : "bg-white text-slate-950 border-slate-200"
                        )}>
                            ${(priceMode === 'wholesale' ? product.price : calculateCustomerPrice(product.price)).toLocaleString('es-CO')}
                        </Badge>
                    </div>
                )}
              </div>
              
              <CardContent className="p-4 md:p-6 space-y-3 flex-grow flex flex-col justify-center items-center text-center">
                <h3 className="text-xs md:text-xl font-black uppercase tracking-tighter leading-tight text-slate-950">
                  {product.title}
                </h3>
                {product.description && (
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                    {cleanDescription(product.description)}
                  </p>
                )}
              </CardContent>

              <CardFooter className="p-4 md:p-6 pt-0">
                <Button 
                  onClick={() => setConsultingProduct(product)}
                  className="w-full h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black uppercase tracking-tighter text-[10px] md:text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Comprar o consultar</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div ref={loadMoreRef} className="h-32 flex items-center justify-center mt-10">
            {visibleCount < filteredProducts.length && (
                <div className="flex flex-col items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                    <Loader2 className="h-6 w-6 animate-spin" /> 
                    <span>Cargando más productos...</span>
                </div>
            )}
        </div>
      </main>

      {/* DIÁLOGO IMAGEN GRANDE */}
      <Dialog open={!!selectedLargeProduct} onOpenChange={(open) => !open && setSelectedLargeProduct(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-3xl p-0 overflow-hidden border-none bg-black/95 backdrop-blur-2xl text-white">
          <div className="relative w-full flex flex-col items-center justify-center">
              <div 
                className="relative w-full aspect-square max-h-[70vh] overflow-hidden cursor-pointer flex items-center justify-center"
                onClick={() => !isUnlocked && setShowPinInput(true)}
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
                        priceMode === 'wholesale' ? "bg-primary text-white" : "bg-white text-black"
                      )}>
                          ${(priceMode === 'wholesale' ? selectedLargeProduct.price : calculateCustomerPrice(selectedLargeProduct.price)).toLocaleString('es-CO')}
                      </div>
                      <p className="text-[10px] font-bold text-center mt-1 uppercase tracking-widest text-white/70">
                        {priceMode === 'wholesale' ? 'Precio Mayorista' : 'Precio Cliente'}
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
                          Toca para ver precio mayorista
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
                  setShowPricesGlobally(true);
                  sessionStorage.setItem('show_prices_globally', 'true');
                  setSelectedLargeProduct(consultingProduct);
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

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><RefreshCw className="animate-spin h-10 w-10 text-slate-900" /></div>}>
      <CatalogContent />
    </Suspense>
  );
}
