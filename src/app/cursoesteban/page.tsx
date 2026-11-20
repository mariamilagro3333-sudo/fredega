
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film, Clapperboard, Sparkles, Bot, Globe, Check, Video, Laptop, Users, Briefcase, Star, HardDrive, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

interface StatusBadgeProps {
  status: 'cotizado';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    cotizado: { text: 'Cotizado', color: 'bg-blue-500' },
  };
  const { text, color } = statusStyles[status];
  return <div className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white ${color}`}>{text}</div>;
};

interface ModuleStatusBadgeProps {
    status: 'cotizado';
}

const ModuleStatusBadge: React.FC<ModuleStatusBadgeProps> = ({ status }) => {
    const statusStyles = {
        cotizado: { text: 'Estado del Módulo: Cotizado', color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
    };
    const { text, color } = statusStyles[status];
    return <div className={`w-full text-center rounded-lg px-4 py-2 text-sm font-semibold border ${color}`}>{text}</div>;
}

const modules = [
  {
    icon: Film,
    title: "Módulo 1: Adobe Premiere Pro - Edición de Video Esencial",
    price: "80.000",
    lessons: [
      "Primeros Pasos y Organización.",
      "Armado y Pulido de la Historia.",
      "Títulos y Textos.",
      "Sonido de Calidad.",
      "Mezcla Precisa con la Herramienta Pluma.",
      "Color y Ambiente.",
      "Herramientas Avanzadas: Multicámara y Estabilización.",
      "¡A Exportar!",
    ],
  },
  {
    icon: Clapperboard,
    title: "Módulo 2: Filmora - El Arte de la Edición Ágil y Creativa",
    price: "50.000",
    lessons: [
      "Primeros Pasos y Flujo de Trabajo.",
      "Edición de la Línea de Tiempo.",
      "Transiciones y Movimientos.",
      "Herramientas Avanzadas: Máscaras y Seguimiento.",
      "Efectos y Estilización Visual.",
      "Títulos y Gráficos Dinámicos.",
      "Sonido de Calidad.",
      "Exportación Final.",
    ],
  },
  {
    icon: Sparkles,
    title: "Módulo 3: After Effects Básico - Introducción a la Animación",
    price: "60.000",
    lessons: [
      "Conoce After Effects.",
      "Animación con Keyframes.",
      "Animación con Curvas de Velocidad.",
      "Creación de Títulos Animados.",
      "Uso de Capas de Forma.",
      "Animación de Máscaras.",
      "Efectos Básicos.",
      "Render y Exportación.",
    ],
  },
  {
    icon: Bot,
    title: "Módulo 4: After Effects Avanzado e Inteligencia Artificial",
    price: "60.000",
    lessons: [
      "Introducción a Expresiones.",
      "Gemini para Expresiones.",
      "Integración con 3D.",
      "Efectos de Partículas y Particle Playground.",
      "Motion Graphics Complejos.",
    ],
  },
  {
    icon: Globe,
    title: "Módulo 5: Integración y Herramientas Web",
    price: "70.000",
    lessons: [
      "Flujo de Trabajo Integrado.",
      "Herramientas de Inteligencia Artificial en la Web.",
      "Automatización en la Edición.",
      "Color Grading Avanzado con DaVinci Resolve.",
      "Proyecto Final: Video Completo de un Evento.",
    ],
  },
];

const paymentBenefits = [
    { icon: Video, text: "Lecciones en video 4K entregadas por Google Drive." },
    { icon: Laptop, text: "Programas para Windows, plugins y recursos necesarios (incluye activación)." },
    { icon: Users, text: "8 meses de membresía a nuestra plataforma de aprendizaje." },
    { icon: HardDrive, text: "1 año de suscripción a Google Drive con 2TB de almacenamiento." },
    { icon: BrainCircuit, text: "1 año de suscripción a Gemini AI Pro." },
];

export default function CursoEstebanPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          ¡Bienvenido Esteban Marriaga!
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Aquí se alojará su curso personalizado, junto con todas sus lecciones, materiales y programas.
        </p>
      </header>

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
                    <span className="flex-grow">{lesson}</span>
                    <StatusBadge status="cotizado" />
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4 bg-muted/30 flex flex-col gap-2 mt-auto">
                <ModuleStatusBadge status="cotizado" />
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
