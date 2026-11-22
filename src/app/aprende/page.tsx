'use client';

import { useState, useMemo } from 'react';
import { youtubeVideos, type YouTubeVideo } from '@/lib/youtube-videos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Play, ArrowRight, ExternalLink, Filter, Download, BrainCircuit, Sparkles, Rocket, Cpu, MonitorPlay, Clock, Globe, Gem, Info, Smartphone } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/video-player';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { entries } from '@/lib/entries';
import type { Entry } from '@/types';
import { EntryDetailDialog } from '@/components/entry-detail-dialog';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useInscribe } from '@/components/inscribe-context';
import { IaDemosCarousel } from '@/components/ia-demos-carousel';
import { IaLaunchCountdown } from '@/components/ia-launch-countdown';
import { cn } from '@/lib/utils';

const categories = ['Todas', 'Google AI', 'Adobe Suite', 'CapCut Pro', 'Filmora IA', 'Davinci Resolve'] as const;

export default function AprendePage() {
  const { handleInscribe, isMember } = useInscribe();
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('Todas');
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const filteredVideos = useMemo(() => {
    let result = [...youtubeVideos];
    
    if (activeCategory !== 'Todas') {
      const catMap: Record<string, string> = {
          'Google AI': 'Inteligencia Artificial',
          'Adobe Suite': 'After Effects',
          'CapCut Pro': 'CapCut',
          'Filmora IA': 'Filmora',
          'Davinci Resolve': 'Davinci Resolve'
      };
      const searchCat = catMap[activeCategory];
      result = result.filter(v => v.category.includes(searchCat) || v.title.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    return result.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [activeCategory]);

  const featuredEntries = useMemo(() => {
    return [...entries].sort((a, b) => b.id - a.id).slice(0, 8);
  }, []);

  const handleEntryClick = (entry: any) => {
    setSelectedEntry(entry as Entry);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* HERO SECCIÓN APRENDE IA */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden flex items-center justify-center">
        <video 
            src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4" 
            autoPlay muted loop playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-[#020617]" />
        
        <div className="container relative z-10 px-4 text-center space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex flex-col items-center gap-3">
              <Badge className="bg-yellow-500 text-black font-black px-5 py-1.5 tracking-widest uppercase animate-pulse shadow-[0_0_20px_rgba(234,179,8,0.4)] text-[10px] md:text-xs">
                ESTRENO: MIÉRCOLES 25 NOV · 12:00 PM COLOMBIA
              </Badge>
              <Badge className="bg-primary text-white font-black px-5 py-1.5 tracking-widest uppercase shadow-[0_0_20px_rgba(30,144,255,0.3)] text-[10px] md:text-xs">
                MAESTRÍA IA 2026
              </Badge>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="border-yellow-500 text-yellow-500 font-black px-4 py-1.5 tracking-widest uppercase bg-yellow-500/10 text-[10px] md:text-xs">
                  <Smartphone className="mr-2 h-4 w-4" /> 100% TELÉFONO, TABLET U ORDENADOR
                </Badge>
                <Badge className="bg-emerald-600 text-white font-black px-4 py-1.5 tracking-widest uppercase text-[10px] md:text-xs">
                  GAMA MEDIA OK
                </Badge>
              </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] max-w-4xl mx-auto font-headline">
            DOMINA LA <span className="text-primary italic">IA EN CUALQUIER DISPOSITIVO</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-snug">
            Aprende a crear efectos cinematográficos realizando el curso <span className="text-white font-bold">100% con tu teléfono, tablet u ordenador</span>. Únete hoy para el lanzamiento de este miércoles al mediodía.
          </p>

          <IaLaunchCountdown variant="hero" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-2">
            <button 
                onClick={handleInscribe} 
                className={cn(
                    "h-14 px-8 md:px-10 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-2xl hover:scale-105 transition-all text-white flex items-center justify-center w-full sm:w-auto sm:min-w-[260px]",
                    isMember ? "bg-emerald-600 hover:bg-emerald-700" : "bg-primary hover:bg-primary/90"
                )}
            >
                {isMember ? "INSCRIBIRSE AL LANZAMIENTO" : "INSCRIBIRSE (ACCESO PRO)"}
                <ArrowRight className="ml-2.5 h-4 w-4 md:h-5 md:w-5" />
            </button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs md:text-sm backdrop-blur-md shadow-xl w-full sm:w-auto">
                <Link href="/ia">Ver Programa Detallado</Link>
            </Button>
          </div>

          {/* DEMOS 2x2 EN EL HERO */}
          <div className="max-w-3xl mx-auto w-full pt-4">
            <IaDemosCarousel variant="hero" />
          </div>

          <div className="flex justify-center gap-4 md:gap-6 pt-2 flex-wrap">
              <div className="flex flex-col items-center gap-2 text-primary">
                  <div className="p-3 md:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                      <Smartphone className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Edición Móvil</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-primary">
                  <div className="p-3 md:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                      <MonitorPlay className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Resultados 4K</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-primary">
                  <div className="p-3 md:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                      <Cpu className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Gama Media</span>
              </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4 md:px-6 space-y-16">
        
        {/* FILTROS DE CATEGORÍA */}
        <div className="flex justify-center">
            <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as any)} className="w-full max-w-5xl">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto p-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                {categories.map((cat) => (
                <TabsTrigger 
                    key={cat} 
                    value={cat} 
                    className="text-[10px] md:text-xs py-3 font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all rounded-xl"
                >
                    {cat}
                </TabsTrigger>
                ))}
            </TabsList>
            </Tabs>
        </div>

        {/* CUADRÍCULA DE VIDEOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVideos.map((video) => (
            <Card 
                key={video.id} 
                className="group cursor-pointer overflow-hidden border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/5 backdrop-blur-md rounded-[2rem]"
                onClick={() => setSelectedVideo(video)}
            >
                <div className="relative aspect-video overflow-hidden">
                <Image 
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-primary/20 backdrop-blur-xl p-5 rounded-full border border-primary/30">
                        <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-primary/90 text-white border-none backdrop-blur-md font-black text-[9px] tracking-widest px-3 py-1 uppercase">
                    {video.category}
                    </Badge>
                </div>
                </div>
                <CardHeader className="p-6">
                <CardTitle className="text-sm md:text-base font-black uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-primary transition-colors min-h-[3rem]">
                    {video.title}
                </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                <Button variant="outline" size="sm" className="w-full rounded-xl border-white/10 group-hover:bg-primary group-hover:text-white transition-all font-black uppercase text-[10px] tracking-widest h-11">
                    Estudiar Lección
                    <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
                </CardContent>
            </Card>
            ))}
        </div>

        {filteredVideos.length === 0 && (
            <div className="text-center py-32 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
                <Filter className="h-16 w-16 mx-auto text-gray-600 mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tighter">Sin lecciones disponibles</h3>
                <p className="text-gray-400 mt-2 font-medium">Estamos procesando nuevo contenido de IA móvil para esta categoría.</p>
                <Button variant="link" onClick={() => setActiveCategory('Todas')} className="mt-6 text-primary font-black uppercase tracking-widest text-xs">
                    Ver todas las lecciones
                </Button>
            </div>
        )}

        <Separator className="opacity-10" />

        {/* SECCIÓN DE TUTORIALES CLÁSICOS */}
        <section className="pb-32 space-y-12">
            <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter font-headline">Tutoriales <span className="text-primary">Especializados</span></h2>
                <p className="text-gray-400 text-sm md:text-base font-normal">Explora nuestra biblioteca de técnicas avanzadas gratuitas.</p>
            </div>
            
            <div className="flex justify-center overflow-x-auto pb-10 scrollbar-hide">
                <div className="flex items-center px-4 min-w-max mx-auto gap-4">
                    {featuredEntries.map((entry) => (
                        <button 
                            key={entry.id} 
                            onClick={() => handleEntryClick(entry)} 
                            className="group relative text-center flex-shrink-0"
                        >
                            <div className="relative h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-[2rem] border-4 border-primary/20 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:z-10 group-hover:border-primary">
                                <Image 
                                    src={entry.coverImage}
                                    alt={entry.title}
                                    fill
                                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                />
                                {isMember && entry.downloadUrl && (
                                    <div className="absolute top-2 right-2 z-30">
                                        <div className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                            <Download className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="text-center">
                <Button asChild size="lg" className="rounded-2xl px-12 h-14 bg-white text-black font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all">
                    <Link href="/cursos">Explorar Todos los Cursos</Link>
                </Button>
            </div>
        </section>
      </div>

      {/* REPRODUCTOR VIDEO */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent shadow-none">
          <div className="flex flex-col gap-4">
            <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-black shadow-2xl border-2 border-white/10">
              {selectedVideo && <VideoPlayer src={selectedVideo.url} />}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 bg-[#020617]/90 backdrop-blur-2xl rounded-[2rem] border border-white/10 text-white gap-6">
              <div className="flex-grow space-y-2">
                <Badge className="bg-primary text-white border-none font-black uppercase tracking-widest text-[9px] px-3 py-1">
                    {selectedVideo?.category}
                </Badge>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none">{selectedVideo?.title}</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    Formación Profesional Fredega Pro 2026 • Resultados 4K Celular
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {selectedVideo?.downloadUrl && (
                  <Button asChild className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-black uppercase tracking-widest text-[10px] px-8">
                    <a href={selectedVideo.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Material
                    </a>
                  </Button>
                )}
                <Button asChild className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] px-8">
                  <a href={selectedVideo?.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Ver Original
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EntryDetailDialog 
        entry={selectedEntry} 
        isOpen={!!selectedEntry} 
        onOpenChange={(open) => !open && setSelectedEntry(null)}
      />
    </div>
  );
}