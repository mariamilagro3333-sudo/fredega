
'use client';

import { useState } from 'react';
import type { Course } from '@/types';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Youtube, Download, Star, Gem, Film, CheckCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

const premiereCourseData: Course = {
    id: 'pr',
    icon: Film,
    title: "Curso Adobe Premiere",
    description: "Edición de vídeo profesional al alcance de todos. Este curso gratuito te guiará desde los conceptos básicos hasta las técnicas más avanzadas de Premiere.",
    modules: [
        { title: "Módulo 1: Fundamentos Esenciales", lessons: ["- Usar Premiere por primera vez", "- Crear una Secuencia", "- Crear elementos en Premiere", "- El nuevo panel de Propiedades"] },
        { title: "Módulo 2: Edición y Flujo de Trabajo", lessons: ["- Editar rápidamente en Premiere", "- Los keyframes en Premiere", "- Trabajar fluido en Premiere", "- Editar videos 4K en computadoras viejas"] },
        { title: "Módulo 3: Gráficos, Audio y Color", lessons: ["- Crea textos en Premiere", "- Todo sobre Plantillas de Gráficos", "- Editar audios en Premiere", "- Sonidos esenciales en Premiere", "- Mezclas en Premiere"] },
        { title: "Módulo 4: Técnicas Avanzadas y Exportación", lessons: ["- Editar varias cámaras en Premiere", "- Dividir escenas y autoreframe", "- Aplicar Efectos en Premiere", "- ¿Es bueno el estabilizador de videos?", "- Efecto tinta, brocha y mate", "- Máscaras con líneas overlay", "- Increíble Transición Split", "- Mostrar Web o pantalla en 3D", "- Aplicar y exportar con transparencia", "- Editar automáticamente con texto", "- Crea los subtítulos de moda", "- Exportar de manera correcta", "- Exportar con dos clics"] },
    ],
    isFree: true,
    youtubePlaylistUrl: 'https://youtube.com/playlist?list=PLc5Uz6xFaHDyqXTaLJlZ3GHW5pFezCeXA&si=p8o2OcQrjb0Madpe',
    lessonDownloads: [
        { label: 'Lección 01: Usar Premiere por primera vez', url: 'https://drive.google.com/file/d/1sxPIofzNz3dlVNPvVemsip-Jl0JGvtFg/view?usp=drive_link' },
        { label: 'Lección 02: Crear una secuencia', url: 'https://drive.google.com/file/d/1-wmeHB3C9oNqrxRRgvZn7711PcsbZxC3/view?usp=drive_link' },
        { label: 'Lección 03: Crear elementos en Premiere', url: 'https://drive.google.com/file/d/1BQ5XOOLYAC_agdg568APYkXo3zwSiS4r/view?usp=drive_link' },
        { label: 'Lección 04: Editar de la mejor manera', url: 'https://drive.google.com/file/d/1zjx_HvBg8IwEi5HuOI83SWVeSEjBswpU/view?usp=drive_link' },
        { label: 'Lección 05: Panel de propiedades', url: 'https://drive.google.com/file/d/1FfRxc62BEh-jm_IQ3BUri6yTkViPvRUF/view?usp=drive_link' },
        { label: 'Lección 06: Aplicar efectos en Premiere', url: 'https://drive.google.com/file/d/1TflhwEC_ICFrD7IwHJYoQGg5rFkdd3t5/view?usp=drive_link' },
        { label: 'Lección 07: Trabajar fluido', url: 'https://drive.google.com/file/d/1hoyMF9soJ4T4KyJ1Sgwdc0U1Vjwt9-Qw/view?usp=drive_link' },
        { label: 'Lección 08: Editar audios en Premiere', url: 'https://drive.google.com/file/d/1sIE7zzWKd0iIxNCtzA6U9rY70vzziKwU/view?usp=drive_link' },
        { label: 'Lección 09: Exportar', url: 'https://drive.google.com/file/d/12bKEMxQD50xpc_mIUiwCcTFVgPt5GX1l/view?usp=drive_link' },
        { label: 'Lección 10: Exportar rápidamente', url: 'https://drive.google.com/file/d/1iT-2vWi-1lC055MgVtg-IVL0Gy32hvmr/view?usp=drive_link' },
        { label: 'Lección 11: Editar 4K en computadoras viejas', url: 'https://drive.google.com/file/d/11aIwYWPCq5cUwuoc3JVQ2FiOelbR-O25/view?usp=drive_link' },
        { label: 'Lección 12: Keyframes', url: 'https://drive.google.com/file/d/1yGJpxSDrVJhSfApMOoIeaAceu-zyoZRd/view?usp=drive_link' },
        { label: 'Lección 13: Mezclas en Premiere', url: 'https://drive.google.com/file/d/1QYS-PodQ6-Lw1dEMHMqQhF5Ed-OHm_ZT/view?usp=drive_link' },
        { label: 'Lección 14: Textos en Premiere', url: 'https://drive.google.com/file/d/1mA2ZhFV77PjZNZYOmLH3xbsR9AqcCqtf/view?usp=drive_link' },
        { label: 'Lección 15: Gráficos esenciales Premiere', url: 'https://drive.google.com/file/d/1SZrZ5eVYxG681Z5NIaEew3h-qh1g28NA/view?usp=drive_link' },
        { label: 'Lección 16: Dividir escenas Autoreframe', url: 'https://drive.google.com/file/d/1HaQT6r1JNUMoaPmu1wSvw7hujramLvCy/view?usp=drive_link' },
        { label: 'Lección 17: Sonidos esenciales', url: 'https://drive.google.com/file/d/1CNaruwu7E7-sArkJcrPKDrkjlOYuRMXS/view?usp=drive_link' },
        { label: 'Lección 18: Varias cámaras', url: 'https://drive.google.com/file/d/1XWvElQRjXnXR2BcX1nvIWZHwCSL2-S6S/view?usp=drive_link' },
        { label: 'Lección 19: No tiene material', url: null },
        { label: 'Lección 20: Efecto tinta en Premiere', url: 'https://drive.google.com/file/d/12W_E_jQ-tQXSBZOBUNQFbJE5o7HTgPYF/view?usp=drive_link' },
        { label: 'Lección 21: Estabilización', url: 'https://drive.google.com/file/d/1Xeqi1hg0yuCUBKmEP5w5-QQzjXEulVwN/view?usp=drive_link' },
        { label: 'Lección 22: Edición automática por textos', url: 'https://drive.google.com/file/d/1AnQqxT6zSZ98eJkJeSyzWeC8JfsFWsCL/view?usp=drive_link' },
        { label: 'Lección 23: Subtítulos Premiere', url: 'https://drive.google.com/file/d/1uNrGw9nIUudKlvmo-2B_4ssfPzu_kxcc/view?usp=drive_link' },
    ]
};

const memberCourseDownloadUrl = 'https://drive.google.com/file/d/1vz30lqlsC45iFjdlOcem61IecKj5YRCi/view?usp=drive_link';
const allLessons = premiereCourseData.modules.flatMap(module => module.lessons);

export default function PremiereCoursePage() {
  const { rol } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-4">
            {premiereCourseData.icon && <premiereCourseData.icon className="h-12 w-12 text-primary" />}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          {premiereCourseData.title}
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          {premiereCourseData.description}
        </p>
      </header>

      {isMember ? (
          <Alert className="mb-8 max-w-4xl mx-auto bg-green-500/10 border-green-500/30">
            <Gem className="h-5 w-5 text-green-500" />
            <AlertTitle className="font-bold text-green-400">¡Beneficio de Miembro!</AlertTitle>
            <AlertDescription>
              Como miembro, puedes descargar el curso completo con todos sus materiales con un solo clic. Encuentra el botón de descarga completa más abajo.
            </AlertDescription>
          </Alert>
      ) : (
        <Alert variant="default" className="mb-8 max-w-4xl mx-auto border-accent bg-accent/10 text-accent-foreground">
            <Star className="h-5 w-5 text-accent" />
            <AlertTitle className="text-accent">¡Descarga el Curso Completo con la Membresía PRO!</AlertTitle>
            <AlertDescription>
               <p className="text-foreground/90">¿Quieres descargar este curso completo, sin publicidad y con un solo clic? ¡Hazte miembro PRO y obtén acceso a este y muchos otros beneficios exclusivos!</p>
               <Button asChild size="sm" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                   <Link href="/membresia">
                       <Gem className="mr-2 h-4 w-4" />
                       Ver Beneficios de la Membresía
                   </Link>
               </Button>
            </AlertDescription>
        </Alert>
      )}

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Contenido del Curso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a href={premiereCourseData.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-5 w-5" />
                    Ver Lecciones en YouTube
                  </a>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="lg" className="w-full">
                      <Download className="mr-2 h-5 w-5" />
                      Descargar Material por Lección
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-64 overflow-y-auto">
                    {premiereCourseData.lessonDownloads?.map((link, index) => (
                      <DropdownMenuItem key={index} asChild disabled={!link.url}>
                        {link.url ? (
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        ) : (
                          <span>{link.label}</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {isMember && (
                    <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                        <a href={memberCourseDownloadUrl} target="_blank" rel="noopener noreferrer">
                            <Star className="mr-2 h-5 w-5" />
                            Descargar Curso Completo
                        </a>
                    </Button>
                )}
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4 mt-6">Todas las Lecciones del Curso</h3>
                <ul className="space-y-3">
                    {allLessons.map((lesson, index) => (
                        <li key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>{lesson.replace(/^- /, '')}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
