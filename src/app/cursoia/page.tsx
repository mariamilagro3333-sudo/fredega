
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Download, BookOpen, Star, HardDrive, Gem, Link as LinkIcon, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IaDemosCarousel } from '@/components/ia-demos-carousel';

type LessonStatus = 'publicado' | 'entregado' | 'pendiente' | 'cotizado';

interface StatusBadgeProps {
  status: LessonStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    publicado: { text: 'Publicado', color: 'bg-green-500' },
    entregado: { text: 'Entregado', color: 'bg-red-500' },
    pendiente: { text: 'Pendiente', color: 'bg-yellow-500' },
    cotizado: { text: 'Cotizado', color: 'bg-blue-500' },
  };
  const { text, color } = statusStyles[status];
  return <div className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white ${color}`}>{text}</div>;
};

interface ModuleStatusBadgeProps {
    status: 'publicado' | 'en proceso' | 'pendiente';
}

const ModuleStatusBadge: React.FC<ModuleStatusBadgeProps> = ({ status }) => {
    const statusStyles = {
        publicado: { text: 'Módulo Publicado', color: 'bg-green-500/20 text-green-700 border-green-500/30' },
        'en proceso': { text: 'Módulo En Proceso', color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
        pendiente: { text: 'Módulo Pendiente', color: 'bg-red-500/20 text-red-700 border-red-500/30' },
    };
    const { text, color } = statusStyles[status];
    return <div className={`w-full text-center rounded-lg px-4 py-2 text-sm font-semibold border ${color}`}>{text}</div>;
}

interface Lesson {
  title: string;
  status: LessonStatus;
  links?: {
    leccion: string;
    material?: string;
  };
}

interface Module {
  title: string;
  status: 'publicado' | 'en proceso' | 'pendiente';
  materialUrl?: string;
  lessons: Lesson[];
}


const modules: Module[] = [
  {
    title: "Bonus Extra: Integración de 3D con Tracking",
    status: 'publicado',
    lessons: [
      { title: "Lección 1: Corrección de Color", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1STGWrjuq_Ks-c-dtq71rj-fj1jjqTxL1?usp=drive_link' } },
      { title: "Lección 2: VFX Blender 3D", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1nv6hLK3oRtFnTzG9m-WtexY7piKXi_BA?usp=drive_link' } },
      { title: "Lección 3: Tracking Blender", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/17WA9OyEbVWPmJPvpB908Ix2ablUlDcvz?usp=drive_link' } },
      { title: "Lección 4: Malla 3D", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1-VyDd6oB3pbnjatu0_6pN0xWtaxckRqL?usp=drive_link' } },
      { title: "Lección 5: Animar Cubo", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1y1JwYZZSRbu74uCOYhneXAwji_Ix7lAT?usp=drive_link' } },
      { title: "Lección 6: Importar Objeto", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1nEEqCsOEfjS6BSu8xaoCwcEcn5Dm8CnG?usp=drive_link' } },
      { title: "Lección 7: Luces en Blender", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1JlemhEKDlKkUnfayat1Py_szsig2AbhU?usp=drive_link' } },
      { title: "Lección 8: Materiales y Render", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1-v9thj720BRv6Ms9xqB9DVkmwOL0F1zV?usp=drive_link' } },
      { title: "Lección 9: Eliminar Objetos en After", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1V0dgTllaZBLTSDa8ETj6yxn-uyYksWTt?usp=drive_link' } },
      { title: "Lección 10: Mezclas y Render Final", status: 'publicado', links: { leccion: 'https://drive.google.com/drive/folders/1oiJdhiPkTGLF96mjg1EaVbo7-ocXoXb4?usp=drive_link' } }
    ],
  },
  {
    title: "Creación de Publicidad con IA",
    status: 'publicado',
    materialUrl: "https://drive.google.com/drive/folders/1d_ZFb3XFNnLrdk6koEw4QeXYQjFdfXrh?usp=drive_link",
    lessons: [
      { title: "Lección 1: Diseñar 3 Primeros Productos", status: 'publicado', links: { leccion: 'https://drive.google.com/file/d/13okpU2Oq_s9_Ec6NyVBpOgXJWbBozZn-/view?usp=drive_link' } },
      { title: "Lección 2: Variaciones con ChatGPT e Ideogram", status: 'publicado', links: { leccion: 'https://drive.google.com/file/d/1VWcy9Uk8P7YgmU2VyNxOHJ-EY47IAULV/view?usp=drive_link' } },
      { title: "Lección 3: Subir Resolución con IA", status: 'publicado', links: { leccion: 'https://drive.google.com/file/d/1aUJbf1Sl7MKgX0nT4DXgsvEepzwbd86s/view?usp=drive_link' } },
      { title: "Lección 4: Crear Correos para Herramientas IA", status: 'publicado', links: { leccion: 'https://drive.google.com/file/d/1qjqgtU8uPUqHbfFiVMvz4463V5ZMG9Oq/view?usp=drive_link' } },
      { title: "Lección 5: Crear Marca con IA", status: 'publicado', links: { leccion: 'https://drive.google.com/file/d/1IBRhC19VtncDiqN_-CmEjoPB5AVMHHfP/view?usp=drive_link' } },
      { title: "Lección 6: Corregir Detalles con Gemini", status: 'publicado', links: { leccion: 'https://drive.google.com/file/d/1F_CKByYmLZuYYuIKT5byIajHC5nWycjb/view?usp=drive_link' } }
    ],
  },
  {
    title: "Creación y Edición de Video con IA",
    status: 'pendiente',
    lessons: [
      { title: "Lección 1: Herramientas de IA para convertir texto a video", status: 'pendiente', links: { leccion: '#' } },
      { title: "Lección 2: Animación de imágenes estáticas a video", status: 'pendiente', links: { leccion: '#' } },
      { title: "Lección 3: Edición y mejora de videos generados por IA", status: 'pendiente', links: { leccion: '#' } }
    ],
  },
  {
    title: "Flujo de Trabajo IA en After Effects",
    status: 'pendiente',
    lessons: [
      { title: "Lección 1: Plugins de IA para After Effects", status: 'pendiente', links: { leccion: '#' } },
      { title: "Lección 2: Automatización de tareas repetitivas", status: 'pendiente', links: { leccion: '#' } },
      { title: "Lección 3: Creación de Motion Graphics avanzados con IA", status: 'pendiente', links: { leccion: '#' } }
    ],
  },
  {
    title: "Escalado y Calidad de Video",
    status: 'pendiente',
    lessons: [
      { title: "Lección 1: Técnicas de escalado de video con IA", status: 'pendiente', links: { leccion: '#' } },
      { title: "Lección 2: Reducción de ruido y mejora de la nitidez", status: 'pendiente', links: { leccion: '#' } },
      { title: "Lección 3: Exportación para máxima calidad en redes sociales", status: 'pendiente', links: { leccion: '#' } }
    ],
  },
];


function ExclusiveCourseDashboard() {
  const { user, rol } = useAuth();
  const [showAccessDialog, setShowAccessDialog] = useState(false);

  const isMember = rol === 'admin' || rol === 'miembro';

  const handleDownloadClick = (url: string) => {
    if (isMember) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setShowAccessDialog(true);
    }
  };
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
         <div className="flex justify-center items-center gap-4 mb-4">
            <BrainCircuit className="h-12 w-12 text-primary" />
            <Star className="h-12 w-12 text-accent" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          Curso Exclusivo: IA, Reels & VFX
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          Domina Blender, After Effects, Premiere y Filmora, y explora todas las IAs de generación de imagen y video para crear Motion Graphics y diseños impactantes.
        </p>
      </header>

      <section className="mb-12 rounded-[2rem] border border-primary/25 bg-[#020617] p-5 md:p-8 shadow-2xl">
        <IaDemosCarousel />
      </section>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {modules.map((module) => (
          <Card key={module.title} className="overflow-hidden flex flex-col">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-2xl font-bold">{module.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              {module.materialUrl && (
                  <Button onClick={() => handleDownloadClick(module.materialUrl!)} className='w-full mb-6'>
                      <HardDrive className="mr-2 h-4 w-4" />
                      Descargar Material de este Módulo
                  </Button>
              )}
              <ul className="space-y-4">
                {module.lessons.map((lesson, index) => (
                  <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 border-b border-border last:border-b-0">
                    <div className="flex items-center gap-4 flex-grow">
                        <StatusBadge status={lesson.status} />
                        <span className="flex-grow">
                            
                            {lesson.title}
                        </span>
                    </div>
                    {lesson.status === 'publicado' && lesson.links && (
                      <div className="flex flex-col gap-2 sm:flex-shrink-0 mt-2 sm:mt-0 w-full sm:w-auto">
                        {lesson.links.leccion && lesson.links.leccion !== '#' && (
                          <Button onClick={() => { if (lesson.links?.leccion) handleDownloadClick(lesson.links.leccion) }} size="sm" variant="outline" className="w-full">
                              <BookOpen className="mr-2 h-4 w-4" />
                               {module.title.includes('Bonus Extra') ? 'Descargar lección y material' : 'Descargar Lección'}
                          </Button>
                        )}
                        {lesson.links.material && lesson.links.material !== '#' && (
                          <Button onClick={() => { if (lesson.links?.material) handleDownloadClick(lesson.links.material) }} size="sm" className="w-full">
                              <Download className="mr-2 h-4 w-4" />
                              Descargar Material
                          </Button>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4 bg-muted/30 flex flex-col gap-2 mt-auto">
                <ModuleStatusBadge status={module.status} />
            </CardFooter>
          </Card>
        ))}
      </main>

       <AlertDialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Gem className="text-accent" />
              Contenido Exclusivo para Miembros
            </AlertDialogTitle>
            <AlertDialogDescription>
              {user 
                ? "Este contenido es exclusivo para miembros PRO. ¡Activa tu membresía para obtener acceso inmediato!"
                : "Para descargar este contenido, necesitas iniciar sesión y ser un miembro PRO."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
                <Link href={user ? "/membresia" : "/login"}>
                    {user ? "Obtener Membresía" : "Iniciar Sesión"}
                </Link>
            </AlertDialogAction>
            {!user && (
                 <AlertDialogAction asChild>
                    <Link href="/signup">Registrarse</Link>
                </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

export default function ExclusiveCoursePage() {
    return <ExclusiveCourseDashboard />;
}
