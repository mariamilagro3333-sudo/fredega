
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Download, Gem, Star } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useAuth } from '@/context/auth-context';

interface ExclusiveCourseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExclusiveCourseDialog({ isOpen, onOpenChange }: ExclusiveCourseDialogProps) {
  const { user, rol } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';

  if (isMember) {
    return (
       <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-headline text-center">
               <Star className="h-10 w-10 text-accent mx-auto mb-4" />
               ¡Acceso Concedido!
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground text-center pt-2">
              ¡Felicidades! Como miembro PRO, tienes acceso exclusivo a este curso.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4 text-center">
              <p>Descarga todas las lecciones y materiales directamente desde el siguiente enlace:</p>
               <Button asChild size="lg">
                <a href="https://drive.google.com/drive/folders/18eHX-vTZkvUEs3Y_VlakqwrymIFjKyo4?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Descargar Lecciones y Materiales
                </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-headline text-center">
             <Gem className="h-10 w-10 text-accent mx-auto mb-4" />
             Curso Exclusivo para Miembros
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground text-center pt-2">
            Este curso está disponible únicamente para nuestros miembros PRO.
            {user ? " ¡Ya casi estás! Activa tu membresía para acceder." : " Inicia sesión o únete para desbloquearlo."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <Alert variant="default" className="border-accent bg-accent/10 text-accent-foreground">
                <Star className="h-5 w-5 text-accent" />
                <AlertTitle className="text-accent">Acceso Total con la Membresía PRO</AlertTitle>
                <AlertDescription>
                   <p className="text-foreground/90">¡Con la membresía PRO podrás descargar este y TODOS los demás cursos directamente, sin publicidad y en una sola carpeta de Drive! Olvídate de ir lección por lección.</p>
                </AlertDescription>
            </Alert>
        </div>
         <DialogFooter className='sm:justify-center gap-2'>
            <Button asChild variant="outline">
                <Link href="/membresia">Más información aquí</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90">
                 <Link href="/membresia">Hazte Miembro Ahora</Link>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
