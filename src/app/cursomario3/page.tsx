
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
    title: "Módulo 1: Fundamentos Esenciales y Flujo de Trabajo",
    status: 'en proceso' as const,
    price: "75.000",
    lessons: [
      { name: "Propiedades y Keyframes", status: 'entregado' as const, links: { leccion: 'https://drive.google.com/file/d/1oILsqGjxRnXFrX_n6MR2waY7iT3C2g2C/view?usp=drive_link' } },
      { name: "Gráficos de velocidad", status: 'entregado' as const, links: { leccion: 'https://drive.google.com/file/d/1Fu2y4q0vX0hiVu_K8gqzSogdCNFNnYla/view?usp=drive_link' } },
      { name: "Desenfoque y exportación", status: 'entregado' as const, links: { leccion: 'https://drive.google.com/file/d/1mhC1Z6HG4S-Ulj4i-z0M0A-flmS-RidO/view?usp=drive_link' } },
      { name: "Importar una plantilla", status: 'entregado' as const, links: { leccion: 'https://drive.google.com/file/d/15ruB7vq-VTkaA2F23wBVyDlUjY9JMegQ/view?usp=drive_link', material: 'https://drive.google.com/file/d/1c_dHMNY66geR4It6tXEypE0WmR09_TBQ/view?usp=drive_link'} },
      { name: "Control parental y Punto de anclaje", status: 'entregado' as const, links: { leccion: 'https://drive.google.com/file/d/1FIKVEeteaQ4_z26X8tF52E5wcFuJxi5V/view?usp=drive_link' } },
      { name: "Animación Básica de Textos", status: 'entregado' as const, links: { leccion: 'https://drive.google.com/file/d/1VUgyY0YbAkkpNWZFT_WP2SlXRTXyXw8m/view?usp=drive_link' } },
      { name: "Plantillas avanzadas de textos", status: 'entregado' as const, links: { leccion: 'https://drive.google.com/file/d/1pbvi5nCZ8SUkQ4MtSeZR0vEgRyFh__dl/view?usp=drive_link', material: 'https://drive.google.com/file/d/1cXPkL1bVJpPIP-Kx8kE8_KRFC9DtSbis/view?usp=drive_link' } },
      { name: "Máscaras", status: 'entregado' as const, links: { leccion: 'https://drive.google.com/file/d/1gpvIGJZQBxwC0AGhC_DUnJKKC6tR9zSH/view?usp=drive_link', material: 'https://drive.google.com/file/d/1BjrbezCR5WGtM8oAw-GcGKFwtkvlVzpH/view?usp=drive_link' } },
      { name: "Audio, Marcadores y Sincronización", status: 'cotizado' as const },
      { name: "Configuración de Composición y Precomposición", status: 'cotizado' as const },
      { name: "Exportación y Render", status: 'cotizado' as const },
    ],
  },
  {
    icon: Clapperboard,
    title: "Módulo 2: Composición Espacial y Entorno 3D",
    status: 'cotizado' as const,
    price: "60.000",
    lessons: [
      { name: "Composición y Cámara 3D", status: 'cotizado' as const },
      { name: "Profundidad de Campo y Enfoque", status: 'cotizado' as const },
      { name: "Luces 3D y Sombras", status: 'cotizado' as const },
      { name: "Capas 3D y Posicionamiento Avanzado", status: 'cotizado' as const },
      { name: "Sólidos y Formas Básicas 3D", status: 'cotizado' as const },
      { name: "Trazos y Animación de Recorridos 3D", status: 'cotizado' as const },
      { name: "Animación de Formas Complejas en 3D", status: 'cotizado' as const },
      { name: "Capa Nula 3D y Expresiones Básicas de Enlace", status: 'cotizado' as const },
    ],
  },
  {
    icon: Sparkles,
    title: "Módulo 3: Motion Graphics y Estilos Visuales",
    status: 'cotizado' as const,
    price: "60.000",
    lessons: [
      { name: "Máscaras Básicas y Animación", status: 'cotizado' as const },
      { name: "Máscaras Mate y Uso Avanzado", status: 'cotizado' as const },
      { name: "Principios de Motion Graphics y Estilo", status: 'cotizado' as const },
      { name: "Animación de Texto Avanzada", status: 'cotizado' as const },
      { name: "Creación de Intros y Lower Thirds", status: 'cotizado' as const },
      { name: "Transiciones Personalizadas", status: 'cotizado' as const },
      { name: "Efecto Líquido y Elementos Orgánicos", status: 'cotizado' as const },
    ],
  },
  {
    icon: Bot,
    title: "Módulo 4: Plantillas, Expresiones y Códigos",
    status: 'cotizado' as const,
    price: "70.000",
    lessons: [
      { name: "Edición Avanzada de Plantillas Profesionales", status: 'cotizado' as const },
      { name: "Introducción a Expresiones y Código", status: 'cotizado' as const },
      { name: "Expresiones Wiggle y Loop", status: 'cotizado' as const },
      { name: "Uso de Expresiones Slider Control", status: 'cotizado' as const },
      { name: "Expresiones y Máscaras Mate", status: 'cotizado' as const },
      { name: "Uso del Panel Essential Graphics", status: 'cotizado' as const },
      { name: "Aplicación de Presets y Scripts con Asistencia IA", status: 'cotizado' as const },
      { name: "Remapeo de Tiempo y Control de Flujo", status: 'cotizado' as const },
    ],
  },
  {
    icon: Globe,
    title: "Módulo 5: Tracking y Efectos Visuales (VFX)",
    status: 'cotizado' as const,
    price: "60.000",
    lessons: [
      { name: "Tracking de Movimiento 2D y 3D", status: 'cotizado' as const },
      { name: "Rotoscopia y Recorte de Sujetos", status: 'cotizado' as const },
      { name: "Composición con Chroma Key", status: 'cotizado' as const },
      { name: "Estabilización de Video", status: 'cotizado' as const },
      { name: "Compensación de Plano", status: 'cotizado' as const },
      { name: "Integración de Gráficos en Video (Práctica de VFX)", status: 'cotizado' as const },
    ],
  },
  {
    icon: Briefcase,
    title: "Módulo 6: Herramientas Adicionales y Proyecto Final",
    status: 'cotizado' as const,
    price: "70.000",
    lessons: [
        { name: "Pintura Digital y Herramienta Clone Stamp", status: 'cotizado' as const },
        { name: "Sólidos y Efectos Generativos", status: 'cotizado' as const },
        { name: "Edición Avanzada de Colores y Look", status: 'cotizado' as const },
        { name: "Efectos de Partículas y Elementos Atmósfericos", status: 'cotizado' as const },
        { name: "Trabajo con Scripts y Paneles de Terceros", status: 'cotizado' as const },
        { name: "Flujo de Trabajo entre After Effects y Premiere Pro", status: 'cotizado' as const },
        { name: "Proyecto Práctico Integral Final", status: 'cotizado' as const },
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

export default function CursoMario3Page() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          Curso Personalizado: After Effects con IA
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          ¡Bienvenido Mario! Esta es la cotización y estructura para tu curso.
        </p>
      </header>
      
      <section className="mb-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-blue-500/10 border-blue-500/30">
            <CardHeader>
                 <CardTitle className="text-lg font-bold text-center flex items-center justify-center gap-2"><Info className="h-5 w-5"/>Aclaraciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span><b>Enfoque en IA:</b> El uso de herramientas asistidas por Inteligencia Artificial (IA) se integra desde el Módulo 1.</span>
                </div>
                 <div className="flex items-start gap-3">
                    <HardDrive className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span><b>Materiales:</b> Todos los materiales de apoyo se descargan directamente desde la plataforma para cada lección.</span>
                </div>
            </CardContent>
        </Card>
         <Card className="bg-primary/10 border-primary">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-center">Beneficios Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {paymentBenefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                        <benefit.icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
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
                  <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-border last:border-b-0">
                    <div className='flex items-center gap-2 flex-grow'>
                        <StatusBadge status={lesson.status} />
                        <span className="flex-grow">Lección {index + 1}: {lesson.name}</span>
                    </div>
                    {lesson.status === 'entregado' && 'links' in lesson && lesson.links && (
                        <div className="flex flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
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
                                        <File className="mr-2 h-4 w-4" />
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
                <div className="text-center font-bold text-lg">
                    Precio Cotizado: ${module.price} COP
                </div>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}

    

    
