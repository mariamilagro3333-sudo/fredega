
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film, Clapperboard, Sparkles, Bot, Globe, Check, Video, Laptop, Users, Briefcase, Star, HardDrive, BrainCircuit, Info, Layers, Wrench } from 'lucide-react';
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
    title: "Módulo 1: Fundamentos Esenciales y Flujo de Trabajo",
    price: "22",
    lessons: [
      "Interfaz, Flujo de Trabajo y Paneles.",
      "Propiedades de Transformación y Punto de Anclaje.",
      "Fotogramas Clave y Tipos de Interpolación.",
      "Gráfico de Velocidad y Suavizado.",
      "Controles Parentales y Jerarquías.",
      "Audio, Marcadores y Sincronización.",
      "Configuración de Composición y Precomposición.",
      "Exportación y Render.",
    ],
  },
  {
    icon: Clapperboard,
    title: "Módulo 2: Composición Espacial y Entorno 3D",
    price: "19",
    lessons: [
      "Composición y Cámara 3D.",
      "Profundidad de Campo y Enfoque.",
      "Luces 3D y Sombras.",
      "Capas 3D y Posicionamiento Avanzado.",
      "Sólidos y Formas Básicas 3D.",
      "Trazos y Animación de Recorridos 3D.",
      "Animación de Formas Complejas en 3D.",
      "Capa Nula 3D y Expresiones Básicas de Enlace.",
    ],
  },
  {
    icon: Sparkles,
    title: "Módulo 3: Motion Graphics y Estilos Visuales",
    price: "19",
    lessons: [
      "Máscaras Básicas y Animación.",
      "Máscaras Mate y Uso Avanzado.",
      "Principios de Motion Graphics y Estilo.",
      "Animación de Texto Avanzada.",
      "Creación de Intros y Lower Thirds.",
      "Transiciones Personalizadas.",
      "Efecto Líquido y Elementos Orgánicos.",
    ],
  },
  {
    icon: Bot,
    title: "Módulo 4: Expresiones, Códigos y Scripts",
    price: "21",
    lessons: [
      "Introducción a Expresiones y Código.",
      "Expresiones Wiggle y Loop.",
      "Uso de Expresiones Slider Control.",
      "Expresiones y Máscaras Mate.",
      "Uso del Panel Essential Graphics para Premiere.",
      "Aplicación de Presets y Scripts con Asistencia IA.",
      "Remapeo de Tiempo y Control de Flujo.",
    ],
  },
  {
    icon: Layers,
    title: "Módulo 5: Plantillas Avanzadas y Personalización",
    price: "19",
    lessons: [
      "Análisis y Deconstrucción de Plantillas Profesionales.",
      "Personalización Avanzada: Cambio de Estructura y Elementos.",
      "Creación de Controladores de Expresiones para Plantillas.",
      "Optimización de Plantillas para un Render Rápido.",
      "Adaptación de Plantillas a Diferentes Formatos (Vertical, Cuadrado).",
      "Exportación de Plantillas como Gráficos Esenciales (MOGRT).",
    ],
  },
  {
    icon: Wrench,
    title: "Módulo 6: Herramientas e Integración con Otros Programas",
    price: "22",
    lessons: [
        "Herramientas avanzadas: Rotoscopia, Tracking y Estabilización.",
        "Pintura Digital y Herramienta Clone Stamp.",
        "Sólidos y Efectos Generativos (Fractal Noise, etc.).",
        "Edición Avanzada de Colores y Creación de Looks.",
        "Flujo de Trabajo: Integración de After Effects con Filmora.",
        "Exportación de videos con transparencia (Canal Alfa) para Filmora.",
        "Proyecto Práctico: Composición con elementos de AE en Filmora.",
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

export default function CursoRobertoPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          ¡Bienvenido Roberto!
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Esta es la estructura para tu curso personalizado.
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
                  <li key={index} className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-b-0">
                    <span className="flex-grow">Lección {index + 1}: {lesson}</span>
                    <StatusBadge status="cotizado" />
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4 bg-muted/30 flex flex-col gap-2 mt-auto">
                <ModuleStatusBadge status="cotizado" />
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
