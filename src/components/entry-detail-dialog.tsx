
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Entry, Product } from '@/types';
import { VideoPlayer } from './video-player';
import { Button } from './ui/button';
import { Download, Facebook, Instagram, MessageCircle, Gem, Info, Mail, Wrench, Eye, Youtube, Play, Crown, Scaling, HardDrive, Settings2, Zap, ZapOff, Sparkles, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/alert-dialog"
import { useAuth } from '@/context/auth-context';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecentContent } from '@/lib/all-content';
import Image from 'next/image';
import { IaCourseSpotlight } from './ia-course-spotlight';

interface EntryDetailDialogProps {
  entry: Entry | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EntryDetailDialog({ entry, isOpen, onOpenChange }: EntryDetailDialogProps) {
  const { toast } = useToast();
  const { rol, user } = useAuth();
  const router = useRouter();
  const isMember = rol === 'miembro' || rol === 'admin';

  const featuredContent = useMemo(() => {
    return getRecentContent(6);
  }, []);

  if (!entry) return null;

  const getEntryUrl = () => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/cursos?entry=${entry.slug}`;
  }

  const handleCopyLink = async () => {
    const url = getEntryUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Enlace copiado",
        description: "El enlace de la entrada ha sido copiado al portapapeles.",
      });
    } catch (err) {
      console.error('Error al copiar el enlace: ', err);
      toast({
        variant: "destructive",
        title: "Error al copiar",
        description: "No se pudo copiar el enlace.",
      });
    }
  };
  
  const socialFollowLinks = {
    facebook: 'https://facebook.com/fredega',
    instagram: 'http://instagram.com/fredegapro',
    whatsapp: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quiero%20comunicarme%20con%20Fredega%20Producciones',
    email: 'mailto:contacto@fredegapro.com?subject=Consulta%20General%20de%20Servicios',
    youtube: 'https://youtube.com/fredega',
  };

  const DownloadSection = () => (
      <div className="flex flex-col gap-6 w-full">
        {!isMember && (
            <>
                <Alert className="bg-primary/5 border-primary/20">
                    <Info className="h-5 w-5 text-primary" />
                    <AlertTitle className="text-primary font-bold">¿Necesitas algo a tu medida?</AlertTitle>
                    <AlertDescription className="text-base">
                        <p>Si deseas un curso, plantilla, app web/móvil o trabajo de edición complejo, no dudes en contactarme. Un curso personalizado incluye lecciones grabadas, asesoría en vivo y más.</p>
                        <div className="flex flex-col sm:flex-row gap-2 mt-3">
                             <Button asChild size="sm" variant="link" className='p-0 h-auto justify-start text-primary text-base font-normal'>
                                <Link href="/demo">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Ver un curso de demostración aquí
                                </Link>
                            </Button>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="w-full sm:w-auto flex-shrink-0 font-normal">Contactar Aquí</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                <a href="https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20cotizar%20un%20curso%20o%20servicio%20personalizado." target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    <span>WhatsApp</span>
                                </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                <a href="mailto:contacto@fredegapro.com?subject=Cotización%20de%20Curso%20o%20Servicio%20Personalizado" target="_blank" rel="noopener noreferrer">
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Correo Electrónico</span>
                                </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                <Link href="/servicios#cursos-personalizados-anchor">
                                    <Wrench className="mr-2 h-4 w-4" />
                                    <span>Conocer más sobre cursos</span>
                                </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </AlertDescription>
                </Alert>
            </>
        )}
        
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-4 w-full">
            {entry.downloadUrl && (
              <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105 flex-1 h-14 sm:h-12 text-lg font-normal"
              >
                  <a href={entry.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Descargar Material
                  </a>
              </Button>
            )}
             <Button asChild size="lg" className="text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transition-transform duration-300 hover:scale-105 flex-1 h-14 sm:h-12 text-lg font-normal"
              >
                  <a href={socialFollowLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="mr-2 h-5 w-5" />
                      Seguir en Instagram
                  </a>
              </Button>
          </div>

          {!isMember && (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="lg" variant="outline" className="w-full h-14 sm:h-12 transition-transform duration-300 hover:scale-105 border-accent text-accent hover:bg-accent/10 hover:text-accent font-bold text-lg">
                        <Gem className="mr-2 h-5 w-5" />
                        Descarga miles de recursos aquí
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold">¡Contenido Exclusivo para Miembros!</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                       Accede a una página de descargas exclusiva con miles de recursos y disfruta de más de 100 nuevos elementos cada 5 días.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="font-normal">Cancelar</AlertDialogCancel>
                        <AlertDialogAction asChild className="border border-input bg-background hover:bg-accent hover:text-accent-foreground font-normal">
                            <Link href="/membresia">Más información aquí</Link>
                        </AlertDialogAction>
                        <AlertDialogAction asChild className="bg-accent hover:bg-accent/90 font-normal">
                            <Link href="/membresia">Hazte Miembro Ahora</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
  )

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="col-span-1 md:col-span-2 p-6 md:p-8 border-r">
            <div className="aspect-video w-full overflow-hidden rounded-xl border bg-black mb-6 shadow-2xl">
              <VideoPlayer src={entry.videoUrl} thumbnail={entry.coverImage} />
            </div>

            <div className="space-y-8">
                <div>
                    <p className="text-xs text-primary font-bold tracking-widest uppercase mb-1">Cursos y Tutoriales</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline">{entry.title}</h2>
                    {entry.author && (
                        <p className="text-base text-muted-foreground mt-1">Por <span className="text-primary font-bold">{entry.author}</span></p>
                    )}
                </div>

                {(entry.description || entry.resolution || entry.fileSize || entry.compatibility) && (
                    <div className="space-y-6">
                        {entry.description && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Detalles del tutorial</h3>
                                <div className="text-base md:text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap">
                                    {entry.description}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/5">
                            {entry.compatibility && (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Settings2 className="h-5 w-5" />
                                        <span className="text-xs font-bold uppercase tracking-tighter">Programa</span>
                                    </div>
                                    <p className="text-sm md:text-base font-bold">{entry.compatibility}</p>
                                </div>
                            )}
                            {entry.resolution && (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Scaling className="h-5 w-5" />
                                        <span className="text-xs font-bold uppercase tracking-tighter">Calidad</span>
                                    </div>
                                    <p className="text-sm md:text-base font-bold">{entry.resolution}</p>
                                </div>
                            )}
                            {entry.fileSize && (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <HardDrive className="h-5 w-5" />
                                        <span className="text-xs font-bold uppercase tracking-tighter">Peso</span>
                                    </div>
                                    <p className="text-sm md:text-base font-bold">{entry.fileSize}</p>
                                </div>
                            )}
                            {entry.requiresPlugins !== undefined && (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        {entry.requiresPlugins ? <Zap className="h-5 w-5 text-primary" /> : <ZapOff className="h-5 w-5" />}
                                        <span className="text-xs font-bold uppercase tracking-tighter">Recursos</span>
                                    </div>
                                    <p className="text-sm md:text-base font-bold">{entry.requiresPlugins ? 'Usa Plugins' : 'Standard'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <DownloadSection />

                {/* CURSO DE IA INTEGRADO EN CADA TUTORIAL */}
                <IaCourseSpotlight
                  variant="compact"
                  onNavigate={() => onOpenChange(false)}
                />

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
                    <Button onClick={handleCopyLink} variant="outline" size="sm" className="rounded-full font-normal">
                        <Sparkles className="mr-2 h-4 w-4" /> Copiar Enlace
                    </Button>
                    <Button asChild variant="outline" size="sm" className="rounded-full font-normal">
                        <a href={socialFollowLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="mr-2 h-4 w-4" /> Facebook
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="rounded-full font-normal">
                        <a href={socialFollowLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="mr-2 h-4 w-4" /> Instagram
                        </a>
                    </Button>
                </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1 bg-muted/30 p-6 md:p-8 space-y-8">
            <IaCourseSpotlight
              variant="sidebar"
              onNavigate={() => onOpenChange(false)}
            />

            {isMember ? (
                <Card className="bg-primary/10 border-primary/20 shadow-none">
                    <CardContent className="p-4 text-center space-y-3">
                        <Crown className="h-8 w-8 text-primary mx-auto" />
                        <p className="text-base font-bold">¡Hola Miembro PRO!</p>
                        <p className="text-sm text-muted-foreground">Recuerda que tienes acceso ilimitado a miles de recursos.</p>
                        <Button asChild variant="default" className="w-full h-10 text-xs font-normal">
                            <Link href="/descargapro">Ir a Beneficios</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card className="bg-accent/10 border-accent/20 shadow-none">
                    <CardHeader className="p-4 pb-2">
                        <Gem className="h-8 w-8 text-accent mx-auto mb-2" />
                        <CardTitle className='text-center text-lg font-bold'>Potencia tu Creatividad</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center space-y-4">
                        <ul className="space-y-2 text-left text-xs">
                            <li className='flex items-start gap-2'><Gem className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /><span>Acceso a miles de plantillas premium.</span></li>
                            <li className='flex items-start gap-2'><Gem className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /><span>Curso exclusivo de IA y VFX.</span></li>
                            <li className='flex items-start gap-2'><Gem className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /><span>Actualizaciones cada 5 días.</span></li>
                        </ul>
                        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 w-full h-12 text-base font-normal">
                            <Link href="/membresia">Ser Miembro PRO</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}

            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-sm uppercase tracking-tight">Contenido Reciente</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                {featuredContent.map(item => (
                    <button 
                        key={item.id} 
                        onClick={() => router.push(`/contenidos?product=${item.slug}`)}
                        className="group text-left"
                    >
                        <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/5 bg-black relative">
                            <Image
                                src={item.coverImage}
                                alt={item.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                <Play className="h-6 w-6 text-white fill-white" />
                            </div>
                        </div>
                        <p className="mt-1.5 text-[10px] font-bold line-clamp-2 leading-tight text-muted-foreground group-hover:text-foreground transition-colors">{item.title}</p>
                    </button>
                ))}
                </div>
            </div>

            <Card className="bg-white/5 border-white/10 shadow-none">
                <CardContent className="p-4 space-y-4">
                    <div className="text-center">
                        <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
                        <h3 className="text-sm font-bold uppercase tracking-tight">Cursos Gratis</h3>
                    </div>
                    <ul className="space-y-2">
                       {['Premiere Pro', 'After Effects', 'Illustrator', 'IA & Video'].map((course, index) => (
                         <li key={index} className="text-xs flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                           <div className="h-1 w-1 rounded-full bg-primary" />
                           <Link href="/cursos">{course}</Link>
                         </li>
                       ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
