'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Film, BookOpen, Gem, BrainCircuit, HardDrive, Video, Laptop, Users, MessageCircle, Mail, UserCheck, Tv, Bot, Layers, Palette, BarChart, Clapperboard, Star, Quote, Eye, Instagram, Wrench, Cpu, Radio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';


interface StatusBadgeProps {
  status: 'realizado' | 'entregado' | 'pendiente' | 'cotizado';
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

const contactLinks = {
    whatsapp: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20una%20cotización%20real%20para%20un%20curso%20personalizado.',
    email: 'mailto:contacto@fredegapro.com?subject=Cotización%20de%20Curso%20Personalizado',
}

const modules = [
  {
    title: 'Módulo 1 – Adobe Premiere (Edición Fundamental)',
    status: 'realizado' as const,
    lessons: [
      { title: 'Cortes en Adobe Premiere', status: 'realizado' as const, hasMaterial: true },
      { title: 'Efectos', status: 'realizado' as const },
      { title: 'Transiciones', status: 'realizado' as const },
      { title: 'Textos', status: 'realizado' as const },
      { title: 'Plantillas de gráficos', status: 'realizado' as const, hasMaterial: true },
      { title: 'Mezclas con pluma', status: 'realizado' as const, hasMaterial: true },
      { title: 'Sonidos e IA', status: 'realizado' as const, hasMaterial: true },
      { title: 'Atenuación automática', status: 'realizado' as const },
      { title: 'Color lumétrico', status: 'realizado' as const },
    ],
  },
  {
    title: 'Módulo 2 – After Effects (Fundamentos de Motion Graphics)',
    description: 'Aquí se inicia con las bases de After Effects, enfocado en motion graphics y animaciones simples.',
    status: 'en proceso' as const,
    lessons: [
      { title: 'Interfaz y flujo de trabajo', status: 'entregado' as const },
      { title: 'Animación de texto y formas', status: 'pendiente' as const },
      { title: 'Uso de máscaras y animaciones simples', status: 'pendiente' as const },
      { title: 'Principios básicos de motion graphics', status: 'pendiente' as const },
      { title: 'Creación de intros y lower thirds simples', status: 'pendiente' as const },
    ],
  },
  {
    title: 'Módulo 3 – After Effects (Avanzado: Rotoscopia y Tracking)',
    description: 'En este nivel se aprende lo más potente de After Effects aplicado a proyectos reales.',
    status: 'cotizado' as const,
    price: 'Aquí irá el precio cotizado',
    lessons: [
      { title: 'Rotoscopia básica (recorte de sujetos y objetos)', status: 'cotizado' as const },
      { title: 'Tracking de movimiento (objetos y cámara)', status: 'cotizado' as const },
      { title: 'Edición avanzada de plantillas profesionales', status: 'cotizado' as const },
      { title: 'Creación de transiciones avanzadas', status: 'cotizado' as const },
      { title: 'Animación con máscaras y formas complejas', status: 'cotizado' as const },
      { title: 'Creación de efectos de logo e identidades visuales', status: 'cotizado' as const },
      { title: 'Proyecto práctico: intro corporativa y divertida', status: 'cotizado' as const },
    ],
  },
  {
    title: 'Módulo 4 – Filmora + Inteligencia Artificial (Reels y TikTok)',
    description: 'Un módulo práctico para crear contenido rápido y moderno para redes sociales.',
    status: 'cotizado' as const,
    price: 'Aquí irá el precio cotizado',
    lessons: [
        { title: 'Uso rápido de Filmora (plantillas, transiciones, efectos divertidos)', status: 'cotizado' as const },
        { title: 'Exportación rápida para móvil', status: 'cotizado' as const },
        { title: 'Guiones y textos con IA para Reels y TikTok', status: 'cotizado' as const },
        { title: 'Imágenes y fondos generados por IA (MidJourney, Ideogram)', status: 'cotizado' as const },
        { title: 'Efectos visuales avanzados con IA (fondos, estilos, clones digitales)', status: 'cotizado' as const },
        { title: 'Narraciones y voces con IA', status: 'cotizado' as const },
        { title: 'Proyecto práctico: un reel con efectos visuales creados con IA', status: 'cotizado' as const },
    ]
  },
  {
    title: '(Opcional) Módulo 5 – Integración Total',
    description: 'Aquí se une todo lo aprendido en un flujo de trabajo completo.',
    status: 'cotizado' as const,
    price: 'Aquí irá el precio cotizado',
    lessons: [
        { title: 'Flujo de trabajo: Premiere + After Effects + Filmora + IA', status: 'cotizado' as const },
        { title: 'Tips de grabación: iluminación, sonido, multicámara', status: 'cotizado' as const },
        { title: 'Estrategia básica para YouTube y TikTok: miniaturas, títulos y hashtags', status: 'cotizado' as const },
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

const personalizedCourseFeatures = [
    { icon: Radio, text: "Lecciones en video grabadas para que avances a tu ritmo." },
    { icon: Users, text: "Asesoría remota en vivo para resolver dudas puntuales." },
    { icon: Layers, text: "Contenido modular adaptado a tus metas específicas." },
    { icon: MessageCircle, text: "Asistencia permanente y directa vía WhatsApp." },
    { icon: Cpu, text: "Asistencia remota por Anydesk para solucionar problemas técnicos." }
];

const courseObjectives = [
    "Motion Graphics", "Eventos Sociales", "Efectos Visuales (VFX)",
    "Videografía", "Cine", "Videos Educativos", "Contenido para Redes Sociales"
];

export default function DemoCoursePage() {
    const { toast } = useToast();

    const handleDemoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toast({
            title: "Esto es un demo",
            description: "Aquí se descargaría la lección o el material del curso.",
        });
    }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          ¡Bienvenido Rafa Romero!
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Así se ve un curso personalizado en nuestra plataforma.
        </p>
      </header>

       <section className="mb-12 text-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 animate-pulse h-auto py-3 text-wrap">
                        Esto es un demo. Si quiero una cotización real, contáctanos aquí
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Por WhatsApp</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={contactLinks.email} target="_blank" rel="noopener noreferrer">
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Por Correo</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
      </section>

      <section className="mb-12 max-w-4xl mx-auto">
        <Card className="bg-primary/10 border-primary">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Instrucciones de Pago y Beneficios Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">Los pagos se realizan por módulo. Una vez completado el pago de un módulo, recibirás acceso a lo siguiente:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {paymentBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <benefit.icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                            <span>{benefit.text}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </section>
      
      <section className="mb-12 max-w-4xl mx-auto">
         <Card className="bg-card/50 border border-primary/30">
          <CardContent className="space-y-10 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">¿Cómo Funcionan?</h3>
                <div className="space-y-4 text-muted-foreground">
                  {personalizedCourseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p>{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Enfócate en lo que Quieres Lograr</h3>
                <div className="flex flex-wrap gap-2">
                  {courseObjectives.map(obj => (
                    <div key={obj} className="bg-muted px-3 py-1 rounded-full text-sm">{obj}</div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Las lecciones se adaptan a tu objetivo principal. Un curso completo puede tener de 4 a 6 módulos, cada uno con 7 a 9 lecciones, dependiendo de la complejidad.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <div className="flex items-center gap-4">
                        <StatusBadge status={lesson.status} />
                        <span className="flex-grow">{lesson.title}</span>
                    </div>
                    {lesson.status === 'realizado' && (
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Button onClick={handleDemoClick} size="sm" variant="outline" className="w-full">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Descargar Lección
                        </Button>
                        {('hasMaterial' in lesson && lesson.hasMaterial) && (
                          <Button onClick={handleDemoClick} size="sm" className="w-full">
                              <Download className="mr-2 h-4 w-4" />
                              Descargar Material
                          </Button>
                        )}
                      </div>
                    )}
                    {lesson.status === 'entregado' && (
                        <Button onClick={handleDemoClick} size="sm" className="w-full sm:w-auto">
                            <Download className="mr-2 h-4 w-4" />
                            Descargar Lección Entregada
                        </Button>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4 bg-muted/30 flex flex-col gap-2 mt-auto">
                <ModuleStatusBadge status={module.status} />
                {module.price && (
                    <div className="text-center font-bold text-lg">
                        Precio Cotizado: {module.price}
                    </div>
                )}
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
