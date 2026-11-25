
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { ProductCard } from '@/components/product-card';
import { ProductDetailDialog } from '@/components/product-detail-dialog';
import { categories } from '@/lib/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Download, Gem, HardDrive, Star, RefreshCw, Calendar, Lock, Play, Crown, CheckCircle2, Rocket, ArrowRight, Info, BrainCircuit, Laptop, X } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { IaPromoBanner } from '@/components/ia-promo-banner';
import { IaCourseSpotlight } from '@/components/ia-course-spotlight';
import { allProducts, getSmartShuffledProducts } from '@/lib/all-content';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { SuperPackPortal, superPacksData } from '@/components/super-pack-portal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const INITIAL_VISIBLE = 24;

const programsList = [
    { name: "After Effects 2026", url: "https://drive.google.com/file/d/1ampFR7hu6Zho-GlQHFnqk4oRPeZbswxv/view?usp=drive_link", isNew: true },
    { name: "Adobe Premiere Pro 2026", url: "https://drive.google.com/file/d/1RUsAGvdnOKhOj96ov0oZPjTi1D94Qq9Z/view?usp=drive_link", isNew: true },
    { name: "Davinci Resolve Studio 20.3.2", url: "https://drive.google.com/file/d/153C00LmJvWYeqTTgSPeFxIi36sM_dau8/view?usp=drive_link", isNew: true },
    { name: "Filmora 14", url: "https://drive.google.com/file/d/1x7oHJwkgTWZGYHPtf5lRCN5z4sQQODjS/view?usp=drive_link", isNew: true },
    { name: "Adobe Photoshop 2026", url: "https://drive.google.com/file/d/1gURrjRyyhNZakF5i2KIqJOS7Z_sW9hFJ/view?usp=drive_link", isNew: true },
    { name: "Adobe Audition 2026", url: "https://www.mediafire.com/file/k0o7kba0ocby8dz/AdAu26.zip/file", isNew: true },
    { name: "Illustrator", url: "https://drive.google.com/file/d/132LGJJmnkKNHU9J-ZD-yW5B6aPMCk1qG/view" },
    { name: "Media Encoder 2026", url: "https://drive.google.com/file/d/1495cSbV1aLlCaZkEtTiWVySdokSzNFZQ/view?usp=drive_link", isNew: true },
    { name: "Davinci Studio 20", url: "https://drive.google.com/file/d/1yipCPbKWs6w9QAZESc-NikJKxCa8sfdx/view?usp=drive_link" },
    { name: "Blender 3D", url: "https://www.blender.org/download/" },
];

function ContenidosPageContent() {
  const { rol, user } = useAuth();
  const isMember = rol === 'admin' || rol === 'miembro';
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sortOrder, setSortOrder] = useState<'recent' | 'featured' | 'random'>('featured');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [lastUpdateDate, setLastUpdateDate] = useState<string>('');
  const [shuffledProducts, setShuffledProducts] = useState<any[]>([]);
  const [showProgramsDialog, setShowProgramsDialog] = useState(false);

  useEffect(() => {
    setLastUpdateDate(format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es }));
    setShuffledProducts(getSmartShuffledProducts(allProducts));
  }, []);

  useEffect(() => {
    const productSlug = searchParams.get('product');
    if (productSlug) {
      const product = allProducts.find(p => p.slug === productSlug);
      if (product) setSelectedProduct(product);
    }
  }, [searchParams]);

  const activeSuperPack = useMemo(() => {
      return superPacksData.find(p => p.id === activeCategory);
  }, [activeCategory]);

  const filteredAndSortedProducts = useMemo(() => {
    const baseList = sortOrder === 'recent' ? allProducts.sort((a, b) => b.id - a.id) : shuffledProducts;

    let result = baseList.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || (product.categories as string[]).includes(activeCategory);
      const isNotAiCourse = product.slug !== 'maestria-edicion-ia-2026';
      return matchesSearch && matchesCategory && isNotAiCourse;
    });

    if (sortOrder === 'featured') {
      result = result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [searchTerm, activeCategory, sortOrder, shuffledProducts]);

  const displayedProducts = filteredAndSortedProducts.slice(0, visibleCount);

  const handleProductClick = (product: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('product', product.slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (category: string) => {
    setVisibleCount(INITIAL_VISIBLE);
    setActiveCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') params.delete('category');
    else params.set('category', category);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setTimeout(() => {
        const element = document.getElementById('descarga-seccion');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const handleProgramDownload = (url: string | null) => {
    if (!isMember) {
        setShowProgramsDialog(false);
        return;
    }
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <div className="container mx-auto py-8 md:py-10 px-4 md:px-6 flex-grow space-y-12">
        {/* CENTRO PRINCIPAL: CURSO DE INTELIGENCIA ARTIFICIAL */}
        <section aria-label="Curso principal de Inteligencia Artificial">
          <IaCourseSpotlight variant="hero-strip" />
        </section>
        
        {/* SUPER PACK SECTION AT TOP */}
        <section id="portal-recursos" className="w-full space-y-8 scroll-mt-28">
            <SuperPackPortal 
                activeCategory={activeCategory} 
                onCategorySelect={handleCategoryChange}
                showTitle={true}
            />

            {(activeSuperPack || activeCategory === 'all') && (
                <div id="descarga-seccion" className="scroll-mt-28 relative w-full rounded-[2.5rem] overflow-hidden border-2 border-primary/20 shadow-2xl animate-in zoom-in-95 duration-500">
                    <video 
                        src="https://media.fredegapro.com/01/catalogo/PANORAMICO.mp4" 
                        autoPlay muted loop playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                    
                    <div className="relative p-8 md:p-16 flex flex-col items-center text-center space-y-6">
                        <div className="flex flex-col items-center gap-2 mb-2">
                             {isMember && (
                                <Badge className="bg-emerald-600 text-white font-black px-6 py-1 text-[11px] tracking-widest uppercase animate-in slide-in-from-top-4 duration-700">
                                    ¡HOLA MIEMBRO, BIENVENIDO!
                                </Badge>
                             )}
                            <Badge className="bg-primary text-primary-foreground font-black px-6 py-1 text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(30,144,255,0.3)]">
                                {activeCategory === 'all' ? "ACCESO MASIVO" : "CONTENIDO PREMIUM"}
                            </Badge>
                        </div>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight max-w-4xl">
                            {activeCategory === 'all' ? "MILES DE RECURSOS EN DRIVE" : `SUPER PACK DE ${activeSuperPack?.name}`}
                        </h3>
                        <p className="text-base md:text-lg text-gray-200 font-medium max-w-2xl">
                            {activeCategory === 'all' 
                                ? "Descarga toda nuestra biblioteca masiva organizada en carpetas de Google Drive para Premiere, After Effects y DaVinci."
                                : "Este es un contenido premium que contiene miles de recursos profesionales para esta categoría."}
                        </p>

                        {isMember ? (
                            <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform">
                                <Link href={activeCategory === 'all' ? "#portal-recursos" : (activeSuperPack?.url || "#")} target={activeCategory === 'all' ? undefined : "_blank"}>
                                    <Download className="mr-3 h-6 w-6" /> {activeCategory === 'all' ? "DESCARGAR TODO EL CONTENIDO" : "DESCARGAR CON GOOGLE DRIVE"}
                                </Link>
                            </Button>
                        ) : (
                            <div className="flex flex-col items-center gap-6">
                                <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform">
                                    <Link href="/membresia">
                                        <Crown className="mr-3 h-6 w-6" /> HAZTE MIEMBRO PARA DESCARGAR CON GOOGLE DRIVE
                                    </Link>
                                </Button>
                                {activeCategory !== 'all' && (
                                    <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 max-w-2xl">
                                        <Info className="h-5 w-5 text-primary shrink-0" />
                                        <p className="text-sm md:text-base font-bold text-gray-300 uppercase tracking-tight leading-snug">
                                            Tranquilo, si no eres miembro puedes descargar nuestro contenido gratuito que hacen parte de la categoría gratis abajo.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>

        {/* PROGRAM DOWNLOADS BANNER (HORIZONTAL) */}
        <section id="programas-seccion" className="scroll-mt-24">
            <Card className="p-8 rounded-[2.5rem] border-2 border-white/5 bg-white/5 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary/30 transition-all duration-500">
                <div className="flex items-center gap-6">
                    <div className="p-5 rounded-3xl bg-primary/20 text-primary shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Laptop className="h-10 w-10" />
                    </div>
                    <div className="space-y-1">
                        <Badge className="bg-primary/20 text-primary font-black uppercase text-[10px] tracking-widest px-3">ESTÁNDAR 2026</Badge>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter">Descargar Programas de Edición</h2>
                        <p className="text-gray-400 font-medium text-sm">Obtén los instaladores de After Effects, Premiere, DaVinci y más.</p>
                    </div>
                </div>

                <AlertDialog open={showProgramsDialog} onOpenChange={setShowProgramsDialog}>
                    <AlertDialogTrigger asChild>
                        <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest text-sm shadow-xl transition-all">
                            {isMember ? "Abrir Descargas" : "Ver Programas"}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#020617] border-white/10 rounded-3xl p-8 max-w-2xl shadow-2xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black uppercase flex items-center gap-3 text-white">
                                <HardDrive className="text-primary h-8 w-8" />
                                Lista de Programas 2026
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400 font-medium text-base pt-2 leading-relaxed">
                                {isMember 
                                    ? "Haz clic en el programa que deseas descargar. Se abrirá un enlace directo a Google Drive (principalmente para Windows)."
                                    : "Este es un beneficio exclusivo para nuestra comunidad VIP. Únete ahora para obtener los instaladores actualizados."
                                }
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {programsList.map((program) => (
                                <Button
                                    key={program.name}
                                    variant="outline"
                                    className={cn(
                                        "h-14 rounded-xl justify-between border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all font-bold uppercase text-[10px] group",
                                        !isMember && "opacity-60 grayscale"
                                    )}
                                    onClick={() => handleProgramDownload(program.url)}
                                >
                                    <span className="flex items-center gap-2 truncate">
                                        {program.name}
                                        {program.isNew && <Badge className="bg-primary text-[8px] h-4 px-1.5 font-black uppercase">NEW</Badge>}
                                    </span>
                                    {isMember ? (
                                        <Download className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                                    ) : (
                                        <Lock className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            ))}
                        </div>

                        <AlertDialogFooter className="flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
                            <AlertDialogCancel className="w-full sm:w-auto uppercase font-bold text-xs h-12 rounded-xl mt-0">
                                Cerrar
                            </AlertDialogCancel>
                            {!isMember && (
                                <Button asChild className="w-full sm:flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 font-black uppercase text-xs tracking-widest">
                                    <Link href="/membresia">Hacerme Miembro PRO</Link>
                                </Button>
                            )}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Card>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-10">
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/90 px-2 border-l-2 border-primary pl-4">Filtros de Catálogo</h3>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleCategoryChange('all')}
                  className={cn("text-left px-5 py-3 rounded-xl text-base transition-all font-normal uppercase tracking-tight", activeCategory === 'all' ? "bg-primary text-white shadow-lg" : "hover:bg-white/5 text-gray-400 hover:text-white")}
                >
                  Todas las categorías
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={cn(
                      "text-left px-5 py-3 rounded-xl text-base transition-all font-normal uppercase tracking-tight truncate", 
                      activeCategory === cat.slug ? "bg-primary text-white shadow-lg" : "hover:bg-white/5 text-gray-400 hover:text-white"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-grow space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 text-sm text-gray-400 uppercase font-bold">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Actualizado: {lastUpdateDate}</span>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar en catálogo..." 
                    className="pl-12 bg-black/50 border-white/10 h-12 w-full font-bold text-sm rounded-xl focus:border-primary/50"
                  />
                </div>
                <Select value={sortOrder} onValueChange={(v: any) => setSortOrder(v)}>
                    <SelectTrigger className="w-40 bg-black/50 border-white/10 h-12 font-bold uppercase text-[10px] rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Sugerencias</SelectItem>
                      <SelectItem value="recent">Reciente</SelectItem>
                      <SelectItem value="random">Aleatorios</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* TARJETA DE IMPACTO 1: MAESTRÍA IA (PRIMERO) */}
                <Card 
                  className="relative aspect-video rounded-[1.5rem] overflow-hidden border-2 border-primary/40 group cursor-pointer shadow-2xl transition-all hover:scale-[1.02] hover:border-primary"
                  onClick={() => router.push('/ia')}
                >
                    <video 
                        src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4" 
                        autoPlay muted loop playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        <div className="space-y-1">
                            <h4 className="text-sm md:text-base font-black uppercase tracking-widest text-white leading-tight drop-shadow-lg">
                                MAESTRÍA EN EDICIÓN <br/> INTELIGENCIA ARTIFICIAL 2026
                            </h4>
                            <p className="text-[10px] font-bold text-primary-foreground/80 uppercase tracking-tighter">YA DISPONIBLE PARA DESCARGAR</p>
                        </div>
                        <Badge className="mt-3 bg-emerald-500 text-black text-[9px] font-black uppercase px-3 py-0.5 tracking-wider border-none">DISPONIBLE AHORA</Badge>
                    </div>
                </Card>

                {displayedProducts.length > 0 ? (
                    displayedProducts.map(product => (
                        <ProductCard 
                        key={product.id} 
                        product={product} 
                        onProductClick={handleProductClick} 
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center space-y-4 bg-white/5 rounded-3xl border-2 border-dashed border-white/10">
                        <Info className="h-10 w-10 mx-auto text-gray-500" />
                        <p className="text-gray-400 font-medium">No se encontraron productos en esta categoría.</p>
                    </div>
                )}
            </div>

            {visibleCount < filteredAndSortedProducts.length && (
              <div className="flex justify-center pt-12">
                <Button 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  variant="outline"
                  className="rounded-full px-16 h-14 font-black uppercase tracking-widest border-white/10 hover:bg-white/5"
                >
                  Cargar más contenido
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-20 bg-black/40">
        <IaPromoBanner />
      </div>

      <ProductDetailDialog 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onOpenChange={(open) => {
          if (!open) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('product');
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
            setSelectedProduct(null);
          }
        }}
        onProductSelect={(prod) => {
            setSelectedProduct(prod);
            const params = new URLSearchParams(searchParams.toString());
            params.set('product', prod.slug);
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }}
      />
    </div>
  );
}

export default function ContenidosPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-[#020617]"><Spinner className="h-10 w-10 text-primary" /></div>}>
      <ContenidosPageContent />
    </Suspense>
  );
}
