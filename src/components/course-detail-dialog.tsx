
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import type { Course } from '@/types';
import { Button } from './ui/button';
import { Download, Gem, Info, Star, Youtube, Film, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';

interface CourseDetailDialogProps {
  course: Course | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const memberCourseDownloads: Record<string, string> = {
    ae: 'https://drive.google.com/file/d/11D3S_aIzuiBEgQIdpUnAms3JELlWwiu8/view?usp=drive_link',
    pr: 'https://drive.google.com/file/d/1vz30lqlsC45iFjdlOcem61IecKj5YRCi/view?usp=drive_link',
    ai: 'https://drive.google.com/drive/folders/10Ia4Mz7MDn-cLt18rRUVeQVkgmbftBxc?usp=drive_link',
    mocha: 'https://drive.google.com/drive/folders/1fTCBz2f-xFTH4kB6gfPxojl_NZyu6XU5?usp=drive_link',
    parallax: 'https://drive.google.com/drive/folders/1d0F730VlHYEuO-EhBRDVehJE42fs4EaJ?usp=drive_link',
};

const bonusCourse = {
    title: 'Curso de Cinema 4D',
    url: 'https://drive.google.com/file/d/1wSjA0BArkHzmLjoXmG36vPzetSmJA-Gs/view?usp=drive_link'
}

export function CourseDetailDialog({ course, isOpen, onOpenChange }: CourseDetailDialogProps) {
  const { rol, user } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';
  
  if (!course) return null;

  const memberDownloadLink = memberCourseDownloads[course.id];

  // Member-specific view
  if (isMember && memberDownloadLink) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className='text-center'>
                <Star className="h-10 w-10 text-accent mx-auto mb-4" />
                <DialogTitle className="text-2xl font-bold font-headline">¡Acceso de Miembro PRO!</DialogTitle>
            </div>
            <DialogDescription className="text-base text-muted-foreground text-center pt-2">
                ¡Felicidades! Como miembro, tienes acceso directo para descargar este curso completo con un solo clic.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center">
                <Button asChild size="lg">
                    <a href={memberDownloadLink} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-5 w-5" />
                        Descargar Curso Completo
                    </a>
                </Button>
            </div>
             <Alert variant="default" className="border-accent bg-accent/10 text-accent-foreground">
                <Gem className="h-5 w-5 text-accent" />
                <AlertTitle className="text-accent">¡Curso Bonus Para Ti!</AlertTitle>
                <AlertDescription className='flex items-center justify-between'>
                   <p className="text-foreground/90">Por ser miembro, también tienes acceso al {bonusCourse.title}.</p>
                   <Button asChild size="sm" className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">
                       <a href={bonusCourse.url} target="_blank" rel="noopener noreferrer">
                           <Download className="mr-2 h-4 w-4" />
                           Descargar
                       </a>
                   </Button>
                </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Default view for non-members or courses without a special member link
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            {course.icon && <course.icon className="h-12 w-12 text-primary" />}
            {course.logo && <div className="text-5xl font-bold text-primary">{course.logo}</div>}
            <DialogTitle className="text-2xl font-bold font-headline">{course.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground">
            {course.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="flex flex-wrap justify-center gap-4">
                {course.youtubePlaylistUrl && (
                     <Button asChild size="lg" variant="outline">
                        <a href={course.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer">
                            <Youtube className="mr-2 h-5 w-5" />
                            Ver Lecciones en YouTube
                        </a>
                    </Button>
                )}
                {course.lessonDownloads && course.lessonDownloads.length > 0 ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="lg">
                                <Download className="mr-2 h-5 w-5" />
                                Descargar Material por Lección
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-h-64 overflow-y-auto">
                            {course.lessonDownloads.map((link, index) => (
                                <DropdownMenuItem key={index} asChild disabled={!link.url}>
                                    {link.url ? (
                                      <a href={link.url || '#'} target="_blank" rel="noopener noreferrer">
                                        {link.label}
                                      </a>
                                    ) : (
                                      <span>{link.label}</span>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild size="lg">
                        <a href="https://fredegapro.com/cursos" target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-5 w-5" />
                            Descargar Curso por Lecciones
                        </a>
                    </Button>
                )}
            </div>

            {course.youtubePlaylistUrl && (
                <p className="text-center text-xs text-muted-foreground">
                    Serás redirigido a YouTube para ver cada lección con publicidad.
                </p>
            )}
            
            {!user && (
                 <Alert>
                    <LogIn className="h-5 w-5" />
                    <AlertTitle>¿Ya eres miembro?</AlertTitle>
                    <AlertDescription className='flex justify-between items-center'>
                       <div>
                         <p>¡Inicia sesión con tu membresía! Encontrarás inmediatamente el botón para descargar el curso completo y el curso bonus de Cinema 4D.</p>
                       </div>
                       <Button asChild size="sm" className="mt-2" variant="outline">
                           <Link href="/login">
                               Iniciar Sesión
                           </Link>
                       </Button>
                    </AlertDescription>
                </Alert>
            )}

            <Alert variant="default" className="border-accent bg-accent/10 text-accent-foreground">
                <Star className="h-5 w-5 text-accent" />
                <AlertTitle className="text-accent">Acceso Total con la Membresía PRO</AlertTitle>
                <AlertDescription>
                   <p className="text-foreground/90">¡Con la membresía PRO podrás descargar este y TODOS los demás cursos directamente, sin publicidad y en una sola carpeta de Drive! Olvídate de ir lección por lección.</p>
                   <Button asChild size="sm" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                       <Link href="/membresia">
                           <Gem className="mr-2 h-4 w-4" />
                           Ver Beneficios de la Membresía
                       </Link>
                   </Button>
                </AlertDescription>
            </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}
