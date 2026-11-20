
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Film, Radio, Layers, MessageCircle, Cpu, Users, Gem, BrainCircuit, HardDrive, BookOpen } from 'lucide-react';
import Link from 'next/link';

type LessonStatus = 'realizado' | 'entregado' | 'pendiente' | 'cotizado';

interface StatusBadgeProps {
  status: LessonStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    realizado: { text: 'Realizado', color: 'bg-green-500' },
    entregado: { text: 'Entregado', color: 'bg-red-500' },
    pendiente: { text: 'Pendiente', color: 'bg-yellow-500' },
    cotizado: { text: 'Cotizado', color: 'bg-blue-500' },
  };
  const { text, color } = statusStyles[status];
  return <div className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white ${color}`}>{text}</div>;
};

interface ModuleStatusBadgeProps {
    status: 'realizado' | 'en proceso' | 'cotizado';
}

const ModuleStatusBadge: React.FC<ModuleStatusBadgeProps> = ({ status }) => {
    const statusStyles = {
        realizado: { text: 'Estado del Módulo: Realizado', color: 'bg-green-500/20 text-green-700 border-green-500/30' },
        'en proceso': { text: 'Estado del Módulo: En Proceso', color: 'bg-red-500/20 text-red-700 border-red-500/30' },
        cotizado: { text: 'Estado del Módulo: Cotizado', color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
    };
    const { text, color } = statusStyles[status];
    return <div className={`w-full text-center rounded-lg px-4 py-2 text-sm font-semibold border ${color}`}>{text}</div>;
}

interface Lesson {
  title: string;
  status: LessonStatus;
  links?: {
    leccion?: string;
    material?: string;
  };
}

interface Module {
  title: string;
  description?: string;
  status: 'realizado' | 'en proceso' | 'cotizado';
  price?: string;
  lessons: Lesson[];
}

const modules: Module[] = [
  {
    title: 'Módulo 1 – Adobe Premiere (Edición Fundamental)',
    status: 'realizado',
    lessons: [
      { title: 'Lección 1: Cortes en Adobe Premiere', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/1Tl-hH0pQhtnfy0T4F9w8Dz-SukICtec1/view?usp=drive_link', material: 'https://drive.google.com/file/d/1HLZOjCYt9EJnzdx0pfTyChNiZCKYYEQf/view?usp=drive_link' } },
      { title: 'Lección 2: Efectos', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/1XMveqyXbZK4-PHJOsLdKjBLZAmTIJVK8/view?usp=sharing' } },
      { title: 'Lección 3: Transiciones', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/1E2OVJH1TUVoCY45vxRIA2xWiUlAiQb7B/view?usp=sharing' } },
      { title: 'Lección 4: Textos', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/1pf_p-IbKqIGKbWdjyXmTN3ld30Vjishy/view?usp=drive_link' } },
      { title: 'Lección 5: Plantillas de gráficos', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/1GLj7iezHZ35B3Ri9s_HyjglL-uTZpelr/view?usp=drive_link', material: 'https://drive.google.com/file/d/1N-K8b1r3DYPWNJKuJbf45f3u8K8br4e1/view?usp=drive_link' } },
      { title: 'Lección 6: Mezclas con pluma', status: 'realizado', links: { leccion: 'https://drive.google.com/filed/1bFgZicCzQCJs2YedAx2gT2avgeiI9Q2c/view?usp=sharing', material: 'https://drive.google.com/file/d/1Bakd6PV8_xtR77clP8ITBjoHrUNcELvm/view?usp=sharing' } },
      { title: 'Lección 7: Sonidos e IA', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/12qX0j-pKBCKf9ZCNn2oSgN8Qa45BAByj/view?usp=sharing', material: 'https://drive.google.com/file/d/12qX0j-pKBCKf9ZCNn2oSgN8Qa45BAByj/view?usp=sharing' } },
      { title: 'Lección 8: Atenuación automática', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/1eziWsJitUi-GvaVM_km4U0AckAgIIx24/view?usp=sharing' } },
      { title: 'Lección 9: Color lumétrico', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/1cQJPTnyimIbKhUuRlbE74SOSFooRO5cF/view?usp=sharing' } },
    ],
  },
  {
    title: 'Módulo 2 – After Effects (Fundamentos de Motion Graphics)',
    description: 'Aquí se inicia con las bases de After Effects, enfocado en motion graphics y animaciones simples.',
    status: 'en proceso',
    lessons: [
      { title: 'Lección 1: Interfaz y flujo de trabajo', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/17UHqoEY7qrOjXh_4gHkXCKsJMqvP1ADL/view?usp=drive_link', material: 'https://drive.google.com/file/d/11NA1ui4sJrPRizn_Jue0Y5brWxSxOAHB/view?usp=drive_link' } },
      { title: 'Lección 2: Aplicando efectos', status: 'realizado', links: { leccion: 'https://drive.google.com/file/d/1HtdDyVmAKNTLbm0DwSgtMcXzhfJeEnhM/view?usp=drive_link' } },
      { title: 'Lección 3: Exportar Mi primera composición', status: 'pendiente' },
      { title: 'Lección 4: Uso de máscaras y animaciones simples', status: 'pendiente' },
      { title: 'Lección 5: Principios básicos de motion graphics', status: 'pendiente' },
      { title: 'Lección 6: Creación de intros y lower thirds simples', status: 'pendiente' },
    ],
  },
  {
    title: 'Módulo 3 – After Effects (Avanzado: Rotoscopia y Tracking)',
    description: 'En este nivel se aprende lo más potente de After Effects aplicado a proyectos reales.',
    status: 'cotizado',
    price: '60.000',
    lessons: [
      { title: 'Lección 1: Rotoscopia básica (recorte de sujetos y objetos)', status: 'cotizado' },
      { title: 'Lección 2: Tracking de movimiento (objetos y cámara)', status: 'cotizado' },
      { title: 'Lección 3: Edición avanzada de plantillas profesionales', status: 'cotizado' },
      { title: 'Lección 4: Creación de transiciones avanzadas', status: 'cotizado' },
      { title: 'Lección 5: Animación con máscaras y formas complejas', status: 'cotizado' },
      { title: 'Lección 6: Creación de efectos de logo e identidades visuales', status: 'cotizado' },
      { title: 'Lección 7: Proyecto práctico: intro corporativa y divertida', status: 'cotizado' },
    ],
  },
  {
    title: 'Módulo 4 – Filmora + Inteligencia Artificial (Reels y TikTok)',
    description: 'Un módulo práctico para crear contenido rápido y moderno para redes sociales.',
    status: 'cotizado',
    price: '60.000',
    lessons: [
        { title: 'Lección 1: Uso rápido de Filmora (plantillas, transiciones, efectos divertidos)', status: 'cotizado' },
        { title: 'Lección 2: Exportación rápida para móvil', status: 'cotizado' },
        { title: 'Lección 3: Guiones y textos com IA para Reels y TikTok', status: 'cotizado' },
        { title: 'Lección 4: Imágenes y fondos generados por IA (MidJourney, Ideogram)', status: 'cotizado' },
        { title: 'Lección 5: Efectos visuales avanzados com IA (fondos, estilos, clones digitales)', status: 'cotizado' },
        { title: 'Lección 6: Narraciones y voces com IA', status: 'cotizado' },
        { title: 'Lección 7: Proyecto práctico: un reel com efectos visuales creados com IA', status: 'cotizado' },
    ]
  },
  {
    title: '(Opcional) Módulo 5 – Integración Total',
    description: 'Aquí se une todo lo aprendido en un flujo de trabajo completo.',
    status: 'cotizado',
    price: '50.000',
    lessons: [
        { title: 'Lección 1: Flujo de trabajo: Premiere + After Effects + Filmora + IA', status: 'cotizado' },
        { title: 'Lección 2: Tips de grabación: iluminación, sonido, multicámara', status: 'cotizado' },
        { title: 'Lección 3: Estrategia básica para YouTube y TikTok: miniaturas, títulos y hashtags', status: 'cotizado' },
    ]
  }
];


export default function CursoFamerPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          ¡Bienvenido Famer Velasquez!
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Aquí está tu curso personalizado.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {modules.map((module) => (
          <Card key={module.title} className="overflow-hidden flex flex-col">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-2xl font-bold">{module.title}</CardTitle>
              {module.description && <p className="text-muted-foreground pt-2">{module.description}</p>}
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <ul className="space-y-4">
                {module.lessons.map((lesson, index) => (
                  <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 border-b border-border last:border-b-0">
                    <div className="flex items-center gap-4 flex-grow">
                        <StatusBadge status={lesson.status} />
                        <span>{lesson.title}</span>
                    </div>
                    {lesson.status === 'realizado' && lesson.links && (
                      <div className="flex flex-col gap-2 sm:flex-shrink-0 mt-2 sm:mt-0 w-full sm:w-auto">
                        {lesson.links.leccion && (
                          <Button asChild size="sm" variant="outline" className="w-full">
                            <Link href={lesson.links.leccion} target="_blank" rel="noopener noreferrer">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Descargar Lección
                            </Link>
                          </Button>
                        )}
                        {lesson.links.material && (
                          <Button asChild size="sm" className="w-full">
                            <Link href={lesson.links.material} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-2 h-4 w-4" />
                              Descargar Material
                            </Link>
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
                {module.price && (
                    <div className="text-center font-bold text-lg">
                        Precio Cotizado: ${module.price} COP
                    </div>
                )}
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
