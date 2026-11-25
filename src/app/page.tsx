'use client';

import { useMemo, Suspense, useState, useEffect } from 'react';
import { Hero } from '@/components/hero';
import { ProductCard } from '@/components/product-card';
import { ProductDetailDialog } from '@/components/product-detail-dialog';
import { youtubeVideos, type YouTubeVideo } from '@/lib/youtube-videos';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, Sparkles, Gem, ArrowRight, Star, UserCheck, MonitorSmartphone, Zap, Laptop, Layers, BrainCircuit, Scan, PictureInPicture, Play, Info, Mail, MessageCircle, Film, Youtube, Crown, Rocket, Smartphone } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/video-player';
import { IaPromoBanner } from '@/components/ia-promo-banner';
import { allProducts, getSmartShuffledProducts } from '@/lib/all-content';
import { useRegional } from '@/components/regional-context';
import { SuperPackPortal } from '@/components/super-pack-portal';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';
import { useInscribe } from '@/components/inscribe-context';
import { IaDemosCarousel } from '@/components/ia-demos-carousel';
import { IaCourseSpotlight } from '@/components/ia-course-spotlight';

const serviceGridItems = [
    { icon: UserCheck, title: "Cursos personalizados", href: "/servicios#cursos-personalizados-anchor" },
    { icon: MonitorSmartphone, title: "Aplicaciones móvil y web", href: "/servicios" },
    { icon: Zap, title: "Automatizaciones", href: "/servicios" },
    { icon: Sparkles, title: "Herramientas de IA", href: "/ia" },
    { icon: Laptop, title: "Cursos", href: "/cursos" },
    { icon: Layers, title: "Contenidos", href: "/contenidos" },
];

const courseList = [
    { 
        icon: BrainCircuit, 
        title: "Inteligencia Artificial", 
        description: "Domina herramientas de IA enfocadas en edición y producción de efectos visuales 100% con tu teléfono, tablet u ordenador.", 
        href: "/ia" 
    },
    { 
        logo: "Ae", 
        title: "After Effects", 
        description: "Aprende After Effects desde cero y conviértete en un profesional de la animación.", 
        href: "/cursos#ae" 
    },
    { 
        icon: Film, 
        title: "Adobe Premiere", 
        description: "Edición de video profesional, efectos y postproducción desde cero.", 
        href: "/cursos#pr" 
    },
];

function HomePageContent() {
  const { rol } = useAuth();
  const { handleInscribe } = useInscribe();
  const isMember = rol === 'admin' || rol === 'miembro';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isCheckingLocation } = useRegional();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedYoutubeVideo, setSelectedYoutubeVideo] = useState<YouTubeVideo | null>(null);
  const [shuffledProducts, setShuffledProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!isCheckingLocation) {
        sessionStorage.setItem('enteredMainSite', 'true');
        window.dispatchEvent(new Event('enteredMainSite'));
    }
  }, [isCheckingLocation]);

  useEffect(() => {
      setShuffledProducts(getSmartShuffledProducts(allProducts));
  }, []);

  const featuredTutorials = useMemo(() => {
    return [...youtubeVideos]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 6);
  }, []);

  const latestFreeProducts = useMemo(() => {
    return shuffledProducts
        .filter(p => (!p.isExclusive || p.isHybrid) && p.slug !== 'maestria-edicion-ia-2026')
        .slice(0, 4);
  }, [shuffledProducts]);

  const featuredMemberProducts = useMemo(() => {
    return shuffledProducts
        .filter(p => p.isExclusive && p.slug !== 'maestria-edicion-ia-2026')
        .slice(0, 4);
  }, [shuffledProducts]);

  useEffect(() => {
    const productSlug = searchParams.get('product');
    if (productSlug) {
      const product = allProducts.find(p => p.slug === productSlug);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [searchParams]);

  const handleProductClick = (product: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('product', product.slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/contenidos?category=${categoryId}#descarga-seccion`);
  };

  if (isCheckingLocation) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black gap-4">
        <Spinner className="h-10 w-10 text-primary" />
        <p className="text-sm text-gray-500 uppercase tracking-widest animate-pulse">Iniciando plataforma...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-20">
      <Hero />

      {/* ANUNCIO LANZAMIENTO IA */}
      <section className="container mx-auto px-4 md:px-6">
        <Card 
          className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border-2 border-primary/30 bg-primary/5 p-6 md:p-12 cursor-pointer group hover:border-primary/60 transition-all"
          onClick={() => router.push('/ia')}
        >
            <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Smartphone className="h-32 w-32 md:h-48 md:w-48 text-primary" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                <div className="space-y-3 text-center md:text-left">
                    <Badge className="bg-emerald-500 text-black font-black uppercase text-[10px] md:text-xs tracking-widest px-3 py-1">¡CURSO YA DISPONIBLE PARA DESCARGAR!</Badge>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-tight">MAESTRÍA EN IA: TELÉFONO, TABLET U ORDENADOR</h2>
                    <p className="text-sm md:text-base text-gray-400 font-medium max-w-xl">Aprende los efectos pro del momento realizando el curso 100% desde tu teléfono, tablet u ordenador. Ya disponible para descargar para miembros PRO.</p>
                </div>
                <Button
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInscribe();
                  }}
                  className="h-12 md:h-14 w-full md:w-auto px-8 md:px-10 rounded-xl md:rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] md:text-xs group-hover:bg-primary group-hover:text-white transition-all shadow-xl shrink-0"
                >
                    {isMember ? (
                      <>
                        <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Descargar y realizar curso
                      </>
                    ) : (
                      <>
                        Inscribirse Ahora <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                      </>
                    )}
                </Button>
            </div>

            <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
              <IaDemosCarousel variant="compact" />
            </div>
        </Card>
      </section>

      {/* SUPER PACK PORTAL SECTION */}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <SuperPackPortal onCategorySelect={handleCategorySelect} />
      </section>
      
      {/* SERVICE GRID */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {serviceGridItems.map((service, index) => (
                <Link key={index} href={service.href} className="block group">
                  <Card className="flex flex-col items-center justify-center text-center p-4 md:p-6 bg-card border-border hover:border-primary hover:bg-primary/5 transition-all h-full shadow-sm group-hover:shadow-md">
                      <service.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight">{service.title}</CardTitle>
                  </Card>
                </Link>
            ))}
        </div>
      </section>

      <section className="w-full py-4 md:py-8">
        <IaPromoBanner />
      </section>

      {/* RECENT TUTORIALS */}
      <section className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-xl md:text-2xl font-black text-foreground mb-6 md:mb-8 uppercase tracking-tighter">Tutoriales Recientes</h2>
        <div className="flex justify-center overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex items-center px-4 min-w-max mx-auto gap-3 md:gap-4">
                {featuredTutorials.map((video) => (
                    <button 
                        key={video.id} 
                        onClick={() => setSelectedYoutubeVideo(video)} 
                        className="group relative text-center flex-shrink-0"
                    >
                        <div className="relative h-20 w-20 md:h-28 md:w-28 overflow-hidden rounded-full border-2 md:border-4 border-primary shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <Image 
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="h-6 w-6 text-white fill-white" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
        <Button asChild variant="outline" size="sm" className="mt-2 h-10 px-6 rounded-full font-bold uppercase text-[10px] tracking-widest border-white/10">
            <Link href="/aprende">Ver todos los tutoriales</Link>
        </Button>
      </section>

      {/* RECOMMENDED CONTENT */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Sugerencias Pro</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* MAESTRÍA IA CARD */}
            <Card 
                className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border-2 border-primary/40 group cursor-pointer shadow-xl transition-all hover:scale-[1.01] hover:border-primary sm:col-span-2 lg:row-span-2"
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
                            MAESTRÍA EN EDICIÓN <br/> IA MÓVIL 2026
                        </h4>
                        <p className="text-[9px] md:text-[10px] font-bold text-primary-foreground/80 uppercase tracking-tighter">YA DISPONIBLE PARA DESCARGAR</p>
                    </div>
                    <Badge className="mt-3 bg-emerald-500 text-black text-[8px] md:text-[9px] font-black uppercase px-3 py-0.5 tracking-wider border-none">DISPONIBLE AHORA</Badge>
                </div>
            </Card>

            {latestFreeProducts.map((product) => (
                <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
            ))}
        </div>
        <div className="text-center mt-10">
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 rounded-xl md:rounded-full font-black px-10 h-14 md:h-12 uppercase tracking-widest text-[10px] md:text-xs shadow-xl">
                <Link href="/contenidos">Ver todo el catálogo</Link>
            </Button>
        </div>
      </section>

      {/* MEMBER CONVERSION SECTION */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-[#1a1a1a] rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 text-center text-white border-2 border-yellow-500/30">
            <Gem className="h-10 w-10 md:h-12 md:w-12 text-yellow-500 mx-auto mb-5 md:mb-6 animate-pulse" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-5 uppercase tracking-tighter leading-tight max-w-3xl mx-auto">Acceso Total a Miles de Recursos con la Membresía PRO</h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-10 font-medium leading-relaxed">
                Descarga miles de plantillas, efectos y títulos en Google Drive. Recibe más de 100 nuevos recursos cada 5 días.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                <Card 
                  className="relative aspect-square md:aspect-video rounded-xl md:rounded-2xl overflow-hidden border-2 border-primary/40 group cursor-pointer shadow-lg transition-all hover:scale-[1.01] hover:border-primary col-span-2 md:row-span-2"
                  onClick={() => isMember ? router.push('/descargapro') : router.push('/membresia')}
                >
                    <video 
                        src="https://media.fredegapro.com/01/catalogo/PANORAMICO.mp4" 
                        autoPlay muted loop playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                    <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                        <h4 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white leading-tight drop-shadow-lg">
                            DESCARGAR TODO CON UN CLIC EN DRIVE
                        </h4>
                        <Badge className="mt-2 bg-primary text-primary-foreground text-[7px] md:text-[8px] font-black uppercase px-2 py-0.5 tracking-wider border-none">MIEMBROS PRO</Badge>
                    </div>
                </Card>

                {featuredMemberProducts.map((product) => (
                    <div key={product.id} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group cursor-pointer shadow-lg" onClick={() => handleProductClick(product)}>
                        <Image src={product.coverImage} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Play className="h-6 w-6 text-white fill-white" />
                        </div>
                    </div>
                ))}
            </div>
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-black uppercase rounded-xl md:rounded-full px-8 md:px-12 h-12 md:h-14 tracking-widest text-xs md:text-sm shadow-2xl shadow-yellow-500/10 w-full sm:w-auto">
                <Link href="/membresia">Obtener Membresía Aquí</Link>
            </Button>
        </div>
      </section>

      {/* FREE COURSES PREVIEW */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-[2rem] border-2 border-primary/50 p-6 md:p-10 pt-16 bg-card">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="rounded-full bg-primary px-6 py-2.5 md:px-8 md:py-3 shadow-2xl border border-primary/50">
                    <h2 className="whitespace-nowrap text-sm sm:text-base md:text-lg font-black text-white uppercase tracking-widest">Cursos Gratuitos</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {courseList.map((course, index) => (
                    <div key={index} className="space-y-3 md:space-y-4 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all border border-primary/20 shrink-0">
                                {course.icon && <course.icon className="h-6 w-6 text-primary" />}
                                {course.logo && <span className="text-xl font-black text-primary">{course.logo}</span>}
                            </div>
                            <h3 className="font-black text-base md:text-lg uppercase tracking-tight leading-tight">{course.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3 font-normal leading-relaxed">{course.description}</p>
                        <Link href={course.href} className="inline-flex items-center text-[10px] md:text-xs font-black text-primary hover:underline uppercase tracking-widest">
                            VER MÁS DETALLES <ArrowRight className="ml-1.5 h-3 w-3" />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="text-center mt-10 md:mt-12 pt-8 md:pt-10 border-t border-border/50">
                <Link href="/cursos" className="text-[10px] md:text-xs font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">VER TODOS LOS CURSOS</Link>
            </div>
        </div>
      </section>

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

      {/* YouTube Video Player Modal */}
      <Dialog open={!!selectedYoutubeVideo} onOpenChange={(open) => !open && setSelectedYoutubeVideo(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
              {selectedYoutubeVideo && <VideoPlayer src={selectedYoutubeVideo.url} />}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 md:p-6 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 text-white gap-4">
              <div className="flex-grow space-y-1">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight leading-tight">{selectedYoutubeVideo?.title}</h3>
                <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">{selectedYoutubeVideo?.category}</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {selectedYoutubeVideo?.downloadUrl && (
                    <Button asChild className="flex-1 sm:flex-none h-12 bg-emerald-600 hover:bg-emerald-700 font-black uppercase text-[10px] tracking-widest rounded-xl">
                        <a href={selectedYoutubeVideo.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" /> Material
                        </a>
                    </Button>
                )}
                <Button asChild className="flex-1 sm:flex-none h-12 bg-primary hover:bg-primary/90 font-black uppercase text-[10px] tracking-widest rounded-xl px-6">
                  <a href={selectedYoutubeVideo?.url} target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-4 w-4" /> Ver en YouTube
                  </a>
                </Button>
              </div>
            </div>
            <IaCourseSpotlight
              variant="compact"
              onNavigate={() => setSelectedYoutubeVideo(null)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-black"><Spinner className="h-10 w-10 text-primary" /></div>}>
      <HomePageContent />
    </Suspense>
  );
}