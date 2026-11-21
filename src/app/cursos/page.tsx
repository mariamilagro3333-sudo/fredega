'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { entries } from '@/lib/entries';
import { youtubeVideos, type YouTubeVideo } from '@/lib/youtube-videos';
import { ProductCard } from '@/components/product-card';
import type { Entry, Course } from '@/types';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { EntryDetailDialog } from '@/components/entry-detail-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, BrainCircuit, Film, Scan, PictureInPicture, MessageCircle, Mail, Star, Info, Eye, Youtube, Download, Play, ExternalLink, GraduationCap, Laptop, LayoutGrid, CheckCircle2, Clock, Gem, Sparkles, ChevronRight, Rocket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CourseDetailDialog } from '@/components/course-detail-dialog';
import { ExclusiveCourseDialog } from '@/components/exclusive-course-dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/video-player';
import { IaPromoBanner } from '@/components/ia-promo-banner';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const INITIAL_LOAD_COUNT = 12;
const LOAD_MORE_COUNT = 8;

const courses: Course[] = [
  {
    id: 'ae',
    logo: "Ae",
    title: "Cursos de After Effects",
    description: "Un curso gratuito y exhaustivo para aprender After Effects desde cero y convertirte en un profesional de la animación y los efectos visuales.",
    modules: [
        { title: "Módulo 1: Primeros Pasos", lessons: ["Usar After Effects por primera vez", "Recomendaciones y Espacios de Trabajo", "Crear una Historia de Instagram"] },
        { title: "Módulo 2: Animación y Efectos Fundamentales", lessons: ["Animar con el Editor de Gráficos", "Animar Textos y Dibujar Formas", "Usar Máscaras y Máscaras Alfa", "Efectos, Sólidos y Efectos de Audio", "Animación de Recorridos"] },
        { title: "Módulo 3: El Espacio 3D", lessons: ["Crear y Animar con Cámaras 3D", "Modo Retrato y Profundidad de Campo", "Integrar Objetos 3D en Videos", "Quitar Fondos (Rotoscopia)", "Animar 3D con Movimientos", "Seguimiento y Cámaras de dos Nodos"] },
        { title: "Módulo 4: Expresiones y Exportación", lessons: ["Usar Expresiones por Primera Vez", "Exportar con y sin Transparencia"] },
    ],
    isFree: true,
    youtubePlaylistUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc',
  },
  {
    id: 'pr',
    icon: Film,
    title: "Curso Adobe Premiere",
    description: "Edición de vídeo profesional al alcance de todos. Este curso gratuito te guiará desde los conceptos básicos hasta las técnicas más avanzadas de Premiere.",
    modules: [
        { title: "Módulo 1: Fundamentos Esenciales", lessons: ["Usar Premiere por primera vez", "Crear una Secuencia", "Crear elementos en Premiere", "El nuevo panel de Propiedades"] },
        { title: "Módulo 2: Edición y Flujo de Trabajo", lessons: ["Editar rápidamente en Premiere", "Los keyframes en Premiere", "Trabajar fluido en Premiere", "Editar videos 4K en computadoras viejas"] },
        { title: "Módulo 3: Gráficos, Audio y Color", lessons: ["Crea textos en Premiere", "Todo sobre Plantillas de Gráficos", "Editar audios en Premiere", "Sonidos esenciales en Premiere", "Mezclas en Premiere"] },
        { title: "Módulo 4: Técnicas Avanzadas y Exportación", lessons: ["Editar varias cámaras en Premiere", "Dividir escenas y autoreframe", "Aplicar Efectos en Premiere", "¿Es bueno el estabilizador de videos?", "Efecto tinta, brocha y mate", "Máscaras con líneas overlay", "Increíble Transición Split", "Mostrar Web o pantalla en 3D", "Aplicar y exportar con transparencia", "Editar automáticamente con texto", "Crea los subtítulos de moda", "Exportar de manera correcta", "Exportar con dos clics"] },
    ],
    isFree: true,
    youtubePlaylistUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDxyWWhdCURlBFhOWxKUjoQQ&si=3jPFrmD6lGtbsjRc',
  },
  {
    id: 'ai',
    logo: "Ai",
    title: "Curso Adobe Illustrator",
    description: "Aprende a crear gráficos vectoriales espectaculares. Un curso gratuito y completo para dominar las herramientas esenciales de Illustrator desde el principio.",
     modules: [
        { title: "Módulo 1: Fundamentos del Vector", lessons: ["Crear formas con la herramienta Pluma", "Vectorizar, crear y pintar con Pinceles"] },
        { title: "Módulo 2: Color y Apariencia", lessons: ["Aplicar luces, sombras y degradados", "Usar la herramienta Malla para color avanzado", "Aplicar texturas a ilustraciones"] },
        { title: "Módulo 3: Herramientas y Flujo de Trabajo", lessons: ["Calco de imagen para vectorizar automáticamente", "Cambiar tamaño de mesa de trabajo", "Ajustar ilustración a nuevo tamaño"] },
        { title: "Módulo 4: Animación y Plugins (con After Effects)", lessons: ["Plugin Overlord para importar de Illustrator a After Effects", "Animar ilustraciones desde cero en After Effects", "Animar rostros con Duik Bassel", "Animar y hacer caminar personajes (Rigging)"] },
    ],
    isFree: true,
  },
  {
    id: 'ia-pro',
    icon: Rocket,
    title: "Nuevos Cursos Completos 2026",
    description: "Muy pronto After Effects - Adobe Premiere - Filmora - Inteligencia Artificial en videos. Formación actualizada con frecuencia a las últimas versiones y novedades.",
    modules: [
        { title: "Módulo: Edición con IA", lessons: ["Gemini Pro para Videos", "Sora y el futuro de la edición", "Flujos con After Effects e IA"] },
    ],
    isFree: false,
  },
  {
    id: 'mocha',
    icon: Scan,
    title: "Curso Mocha Pro",
    description: "Conviértete en un experto del trackeo planar. Aprende a usar este potente plugin junto a After Effects para integrar elementos VFX con una precisión inigualable.",
     modules: [
        { title: "Módulo 1: Introducción al Trackeo Planar", lessons: ["¿Qué es Mocha Pro y por qué usarlo?", "Interfaz y herramientas básicas", "Tu primer trackeo exitoso"] },
        { title: "Módulo 2: Técnicas Avanzadas", lessons: ["Trackeo de superficies difíciles (reflejos, oclusiones)", "Módulo 'AdjustTrack' para correcciones", "Exportación de datos a After Effects"] },
        { title: "Módulo 3: Rotoscopia y Extracción", lessons: ["Creación de máquinas magnéticas", "Rotoscopia para extraer objetos en movimiento", "Limpieza de fondos con el módulo 'Remove'"] },
        { title: "Módulo 4: Inserción y VFX", lessons: ["Insertar gráficos en pantallas y superficies", "Estabilización de tomas", "Proyecto final: Integración de un elemento VFX"] },
    ],
    isFree: true,
  },
  {
    id: 'parallax',
    icon: PictureInPicture,
    title: "Curso Efecto Parallax",
    description: "Dale vida y profundidad a tus imágenes. Este curso te enseñará a combinar Photoshop y After Effects para crear animaciones con un impresionante efecto Parallax.",
     modules: [
        { title: "Módulo 1: Preparación en Photoshop", lessons: ["Crear punto de fuga y recorte", "Crear máquinas de recorte"] },
        { title: "Módulo 2: Composición y Animación 3D en After Effects", lessons: ["Animar punto de fuga y composición 3D con cámara", "Componer escena 3D con cámara", "Usar la herramienta 'puppet' (marioneta)"] },
        { title: "Módulo 3: Efectos y Plugins Avanzados", lessons: ["Usar Trapcode Particular, Shine, Starglow y Optical Flares"] },
        { title: "Módulo 4: Técnicas Específicas y Proyectos", lessons: ["Aplicar desenfoque y enfoque con cámara (Profundidad de campo)", "Animar rostros para darles movimiento", "Animar imágenes complejas con Liquify, Puppet y efectos de tormenta"] },
    ],
    isFree: true,
  },
];

const contactLinks = {
    whatsappCourses: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20información%20sobre%20los%20cursos%20personalizados',
    email: 'mailto:contacto@fredegapro.com',
}

function CourseSection({ course, onCourseClick }: { course: Course; onCourseClick: (course: Course) => void }) {
  return (
    <section id={course.id} className="w-full overflow-hidden border-y-2 border-primary/30 bg-[#0a0f1e] py-16 md:py-24 relative group scroll-mt-20">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
        {course.icon ? <course.icon className="h-48 w-48 text-primary" /> : <span className="text-9xl font-black text-primary font-headline">{course.logo}</span>}
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex flex-col lg:flex-row items-start gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Badge className={cn("px-4 py-1 text-sm font-black uppercase tracking-widest border-none", course.isFree ? "bg-green-600 text-white" : "bg-amber-500 text-black animate-pulse")}>
                {course.isFree ? "GRATUITO" : "MUY PRONTO - EXCLUSIVO"}
              </Badge>
              {!course.isFree && <Badge variant="outline" className="text-primary border-primary/30 px-4 py-1 text-sm font-bold uppercase tracking-widest">PRO</Badge>}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[1.1] font-headline">
              {course.title}
            </h2>
            
            <p className="text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-3xl">
              {course.description}
            </p>

            <div className="pt-4">
              <Accordion type="single" collapsible className="w-full max-w-2xl">
                <AccordionItem value="modules" className="border-white/10">
                  <AccordionTrigger className="text-lg font-bold text-white uppercase tracking-widest hover:text-primary transition-colors">
                    Ver Módulos y Lecciones
                  </AccordionTrigger>
                  <AccordionContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {course.modules.map((module, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="text-primary font-black uppercase tracking-tighter text-sm flex items-center gap-2">
                            <ChevronRight className="h-4 w-4" /> {module.title}
                          </h4>
                          <ul className="space-y-1 pl-6">
                            {module.lessons.map((lesson, lIdx) => (
                              <li key={lIdx} className="text-gray-400 text-sm font-normal list-disc">{lesson}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-8">
              <Button onClick={() => onCourseClick(course)} size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 h-16 font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-105">
                {course.isFree ? "Realizar Curso" : "Hazte Miembro"}
              </Button>
              {course.youtubePlaylistUrl && (
                <Button asChild variant="ghost" size="lg" className="text-gray-300 hover:text-white hover:bg-white/5 h-16 font-bold uppercase tracking-widest">
                  <a href={course.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    Ver en YouTube <Youtube className="h-5 w-5 text-red-500" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonalizedCoursesBanner() {
  return (
    <section id="cursos-personalizados" className="w-full overflow-hidden border-y-2 border-accent/30 bg-[#1e150a] py-16 md:py-24 relative group scroll-mt-20">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <Star className="h-48 w-48 text-accent fill-accent" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Badge className="bg-accent text-black px-4 py-1 text-sm font-black uppercase tracking-widest border-none">
                PREMIUM
              </Badge>
              <Badge variant="outline" className="text-accent border-accent/30 px-4 py-1 text-sm font-bold uppercase tracking-widest">PERSONALIZADO</Badge>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[1.1] font-headline">
              Cursos <span className="text-accent">A Tu Medida</span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-3xl">
              Avanza a tu propio ritmo con un plan de estudios diseñado para ti. Ofrezco cursos personalizados de Adobe Premiere, After Effects, DaVinci Resolve y más.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-black rounded-full px-12 h-16 font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-105">
                    Consultar Ahora
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black text-white border-white/10 p-2">
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-black">
                    <Link href={contactLinks.whatsappCourses} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3">
                      <MessageCircle className="h-5 w-5" /> WhatsApp
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-accent hover:text-black">
                    <Link href={contactLinks.email} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3">
                      <Mail className="h-5 w-5" /> Correo Electrónico
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button asChild variant="ghost" size="lg" className="text-gray-300 hover:text-white hover:bg-white/5 h-16 font-bold uppercase tracking-widest">
                <Link href="/demo" className="flex items-center gap-3">
                  Ver un Demo <Eye className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { rol } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';

  const entryParam = searchParams.get('entry');
  const courseParam = searchParams.get('course');

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedYoutubeVideo, setSelectedYoutubeVideo] = useState<YouTubeVideo | null>(null);
  const [visibleEntriesCount, setVisibleEntriesCount] = useState(INITIAL_LOAD_COUNT);
  const [showExclusiveDialog, setShowExclusiveDialog] = useState(false);
  
  useEffect(() => {
    if (pathname === '/cursos' && entryParam) {
      const entry = entries.find(p => p.slug === entryParam);
      if (entry) {
        setSelectedEntry(entry);
      }
    } else {
        setSelectedEntry(null);
    }
  }, [entryParam, pathname]);

  useEffect(() => {
    if (pathname === '/cursos' && courseParam) {
        const course = courses.find(c => c.id === courseParam);
        if (course) {
            if (course.id === 'ae') {
                router.push('/cursoae');
            } else if (course.id === 'pr') {
                router.push('/cursopremiere');
            } else {
                setSelectedCourse(course);
            }
        }
    } else {
        setSelectedCourse(null);
    }
  }, [courseParam, pathname, router]);

  // Manejo manual de anclajes al cargar la página
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Pequeño retardo para asegurar que el contenido se haya renderizado
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [pathname]);

  const handleEntryClick = (entry: Entry) => {
    if (entry.slug === 'halloween') {
      router.push('/contenidos?category=halloween');
      return;
    }
    const params = new URLSearchParams(window.location.search);
    params.set('entry', entry.slug);
    router.push(`/cursos?${params.toString()}`, { scroll: false });
  };

  const handleDialogClose = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('entry');
    router.push(`/cursos?${params.toString()}`, { scroll: false });
  };

  const handleCourseClick = (course: Course) => {
      if (!course.isFree) {
          if (isMember && course.id !== 'ia-pro') {
              router.push('/cursoia');
          } else {
              setShowExclusiveDialog(true);
          }
          return;
      }
      if (course.id === 'ae') {
        router.push('/cursoae');
        return;
      }
      if (course.id === 'pr') {
        router.push('/cursopremiere');
        return;
      }
      const params = new URLSearchParams(window.location.search);
      params.set('course', course.id);
      router.push(`/cursos?${params.toString()}`, { scroll: false });
  }

  const handleCourseDialogClose = () => {
      const params = new URLSearchParams(window.location.search);
      params.delete('course');
      router.push(`/cursos?${params.toString()}`, { scroll: false });
  }

  const allEntriesToDisplay = useMemo(() => {
    return [...entries].sort((a, b) => b.id - a.id);
  }, []);
  
  const featuredYoutubeVideos = useMemo(() => {
    return [...youtubeVideos]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 6);
  }, []);
  
  const entriesToDisplay = useMemo(() => {
    return allEntriesToDisplay.slice(0, visibleEntriesCount);
  }, [allEntriesToDisplay, visibleEntriesCount]);

  const handleLoadMore = () => {
    setVisibleEntriesCount(prevCount => prevCount + LOAD_MORE_COUNT);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-1">
        
        {/* VIDEO HEADER CINEMÁTICO */}
        <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
            <video 
                src="https://media.fredegapro.com/01/catalogo/PANORAMICO.mp4" 
                autoPlay muted loop playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            <div className="container relative z-10 px-4 text-center space-y-4">
                <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-1 text-xs font-black uppercase tracking-[0.3em]">
                    CENTRO DE FORMACIÓN PRO
                </Badge>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white font-headline leading-tight">
                    Cursos y <span className="text-primary">Especializaciones</span>
                </h1>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-medium">
                    Desde lo básico hasta el dominio de la Inteligencia Artificial en Adobe, CapCut, Filmora y DaVinci.
                </p>
            </div>
        </section>

        {/* Header & Featured Banner */}
        <section className="container mx-auto px-4 md:px-6 py-12">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-headline">Explora nuestros tutoriales gratuitos</h2>
                <p className="text-gray-400 text-sm md:text-base mt-3 max-w-2xl mx-auto font-normal">
                    Debajo de la sección de cursos, desplázate para ver más de {entries.length + youtubeVideos.length} tutoriales gratuitos.
                </p>
            </div>
            
            <div className="flex justify-center mb-8 overflow-x-auto pb-20 scrollbar-hide">
                 <div className="flex items-center px-4 min-w-max mx-auto gap-4">
                    {featuredYoutubeVideos.map((video) => (
                        <button 
                            key={video.id} 
                            onClick={() => setSelectedYoutubeVideo(video)} 
                            className="group relative text-center flex-shrink-0"
                        >
                            <div className="relative h-20 w-20 md:h-28 md:w-24 overflow-hidden rounded-full border-4 border-primary shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:z-10 group-hover:rotate-3">
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
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-48 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20 pointer-events-none">
                                <p className="text-[10px] md:text-xs font-bold text-foreground line-clamp-none bg-background/90 backdrop-blur-sm p-2 rounded border border-primary/20 shadow-2xl">
                                    {video.title}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>

        {/* IA PROMO BANNER */}
        <div className="mb-16">
          <IaPromoBanner />
        </div>

        {/* PERSONALIZED COURSES */}
        <div className="mb-16">
          <PersonalizedCoursesBanner />
        </div>

        {/* COURSES LIST (NEW DESIGN) */}
        <div className="space-y-0">
          <div className="container mx-auto px-4 md:px-6 py-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white font-headline">Nuestros Cursos de Formación</h2>
            <p className="text-base md:text-lg text-gray-400 mt-3 font-normal">Domina las herramientas más potentes del mercado.</p>
          </div>
          {courses.map((course) => (
            <CourseSection key={course.id} course={course} onCourseClick={handleCourseClick} />
          ))}
        </div>

        {/* ALL TUTORIALS GRID */}
        <section className="container mx-auto px-4 md:px-6 py-24">
            <div className="flex items-center gap-4 mb-12">
                <div className="bg-primary/20 p-4 rounded-2xl">
                    <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-headline">Todos Nuestros Tutoriales</h3>
                    <p className="text-gray-400 text-sm md:text-base font-normal">Amplía tus habilidades con nuestras guías gratuitas.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {entriesToDisplay.map((entry) => (
                   <ProductCard key={entry.id} product={entry} onProductClick={handleEntryClick} />
                ))}
            </div>

            {entriesToDisplay.length < allEntriesToDisplay.length && (
                <div className="mt-16 text-center">
                   <Button onClick={handleLoadMore} size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white px-12 h-16 rounded-full font-bold uppercase tracking-widest transition-all">
                     Cargar más tutoriales gratuitos
                   </Button>
                </div>
            )}
        </section>
      </main>
      
      <EntryDetailDialog 
        entry={selectedEntry} 
        isOpen={!!selectedEntry} 
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          }
        }}
      />

       <CourseDetailDialog
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onOpenChange={(open) => {
            if (!open) {
                handleCourseDialogClose();
            }
        }}
      />

      <ExclusiveCourseDialog 
        isOpen={showExclusiveDialog}
        onOpenChange={setShowExclusiveDialog}
      />

      {/* YouTube Video Player Modal */}
      <Dialog open={!!selectedYoutubeVideo} onOpenChange={(open) => !open && setSelectedYoutubeVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
          <div className="flex flex-col gap-4">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow-2xl border border-white/10">
              {selectedYoutubeVideo && <VideoPlayer src={selectedYoutubeVideo.url} />}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-black/80 backdrop-blur-xl rounded-lg border border-white/10 text-white gap-4">
              <div className="flex-grow">
                <h3 className="text-xl font-bold uppercase">{selectedYoutubeVideo?.title}</h3>
                <p className="text-sm text-gray-400 mt-1 font-normal">{selectedYoutubeVideo?.category}</p>
              </div>
              <div className="flex gap-2">
                {selectedYoutubeVideo?.downloadUrl && (
                    <Button asChild className="bg-green-600 hover:bg-green-700 font-normal uppercase">
                        <a href={selectedYoutubeVideo.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Material
                        </a>
                    </Button>
                )}
                <Button asChild className="bg-primary hover:bg-primary/90 font-normal uppercase">
                  <a href={selectedYoutubeVideo?.url} target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-4 w-4" />
                    Ver Tutorial
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-black"><Spinner className="h-10 w-10 text-primary" /></div>}>
      <CoursesPageContent />
    </Suspense>
  )
}
