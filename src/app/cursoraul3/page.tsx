
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film, Clapperboard, Sparkles, Bot, Globe, Check, Video, Laptop, Users, Briefcase, Star, HardDrive, BrainCircuit, Info, Download, BookOpen, File, Camera, Type } from 'lucide-react';
import Link from 'next/link';

interface StatusBadgeProps {
  status: 'cotizado' | 'entregado';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    cotizado: { text: 'Cotizado', color: 'bg-blue-500' },
    entregado: { text: 'Entregado', color: 'bg-green-500' },
  };
  const { text, color } = statusStyles[status];
  return <div className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white ${color}`}>{text}</div>;
};

interface ModuleStatusBadgeProps {
    status: 'cotizado' | 'en proceso' | 'realizado';
}

const ModuleStatusBadge: React.FC<ModuleStatusBadgeProps> = ({ status }) => {
    const statusStyles = {
        cotizado: { text: 'Estado del Módulo: Cotizado', color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
        'en proceso': { text: 'Estado del Módulo: En Proceso', color: 'bg-orange-500/20 text-orange-700 border-orange-500/30' },
        realizado: { text: 'Estado del Módulo: Realizado', color: 'bg-green-500/20 text-green-700 border-green-500/30' },
    };
    const { text, color } = statusStyles[status];
    return <div className={`w-full text-center rounded-lg px-4 py-2 text-sm font-semibold border ${color}`}>{text}</div>;
}

const modules = [
  {
    icon: Film,
    title: "Módulo 1: Básico de After Effects",
    status: 'cotizado' as const,
    price: "19",
    lessons: [
      { name: "Propiedades y Keyframes", status: 'cotizado' as const },
      { name: "Gráficos de velocidad", status: 'cotizado' as const },
      { name: "Desenfoque y exportación", status: 'cotizado' as const },
      { name: "Importar una plantilla", status: 'cotizado' as const },
      { name: "Control parental y Punto de anclaje", status: 'cotizado' as const },
      { name: "Animación Básica de Textos", status: 'cotizado' as const },
      { name: "Audio, Marcadores y Sincronización", status: 'cotizado' as const },
      { name: "Configuración de Composición y Precomposición", status: 'cotizado' as const },
    ],
  },
  {
    icon: Bot,
    title: "Módulo 2: División de capas por IA, Photoshop y Animación Básica",
    status: 'cotizado' as const,
    price: "18",
    lessons: [
      { name: "Preparación de capas en Photoshop", status: 'cotizado' as const },
      { name: "División automática de capas con IA", status: 'cotizado' as const },
      { name: "Generación de audio con IA (Voces y música)", status: 'cotizado' as const },
      { name: "Principios de animación básica en After Effects", status: 'cotizado' as const },
      { name: "Sincronización de audio y animación", status: 'cotizado' as const },
      { name: "Animación de cámara simple (Zoom, Paneo)", status: 'cotizado' as const },
      { name: "Exportación para redes sociales", status: 'cotizado' as const },
    ],
  },
  {
    icon: Sparkles,
    title: "Módulo 3: Animación Avanzada de Personajes",
    status: 'cotizado' as const,
    price: "22",
    lessons: [
      { name: "Introducción al Rigging de personajes", status: 'cotizado' as const },
      { name: "Uso del plugin Duik para rigging automático", status: 'cotizado' as const },
      { name: "Creación de controladores de animación", status: 'cotizado' as const },
      { name: "Animación de ciclos de caminado y carrera", status: 'cotizado' as const },
      { name: "Introducción al Lip Sync (Sincronización de labios)", status: 'cotizado'as const },
      { name: "Técnicas de Lip Sync automático y manual", status: 'cotizado' as const },
      { name: "Animación de expresiones faciales", status: 'cotizado'as const },
      { name: "Integración del personaje en una escena", status: 'cotizado' as const },
    ],
  },
  {
    icon: Camera,
    title: "Módulo 4: Animación de Cámaras y Textos",
    status: 'cotizado' as const,
    price: "21",
    lessons: [
        { name: "Principios de la cámara 3D en After Effects", status: 'cotizado' as const },
        { name: "Movimientos de cámara avanzados (Dolly, Truck, Arc)", status: 'cotizado' as const },
        { name: "Animación de cámara con capa nula", status: 'cotizado' as const },
        { name: "Tracking de cámara 3D", status: 'cotizado' as const },
        { name: "Animadores de texto avanzados", status: 'cotizado' as const },
        { name: "Integración de textos en escenas 3D", status: 'cotizado' as const },
    ]
  }
];

const paymentBenefits = [
    { icon: Video, text: "Lecciones en video 4K entregadas por Google Drive." },
    { icon: Laptop, text: "Programas para Windows, plugins y recursos necesarios (incluye activación)." },
    { icon: Users, text: "8 meses de membresía a nuestra plataforma de aprendizaje." },
    { icon: HardDrive, text: "1 año de suscripción a Google Drive con 2TB de almacenamiento." },
    { icon: BrainCircuit, text: "1 año de suscripción a Gemini AI Pro." },
];

export default function CursoRaul3Page() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          Curso Personalizado para Raúl
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Esta es la cotización y estructura para tu curso de After Effects.
        </p>
      </header>
      
      <section className="mb-12 max-w-4xl mx-auto">
         <Card className="bg-primary/10 border-primary">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-center">Beneficios Adicionales Incluidos</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentBenefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                        <benefit.icon className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{benefit.text}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
      </section>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {modules.map((module) => (
          <Card key={module.title} className="overflow-hidden flex flex-col">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-4">
                <module.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl font-bold">{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <ul className="space-y-4">
                {module.lessons.map((lesson, index) => (
                  <li key={index} className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-b-0">
                    <div className='flex items-center gap-2 flex-grow'>
                        <span className="flex-grow">Lección {index + 1}: {lesson.name}</span>
                    </div>
                    <StatusBadge status={lesson.status} />
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4 bg-muted/30 flex flex-col gap-2 mt-auto">
                <ModuleStatusBadge status={module.status} />
                <div className="text-center font-bold text-lg">
                    Precio Cotizado: ${module.price} Dólares Americanos
                </div>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
