'use client';

import { Zap, Rocket, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CourseSelectorOverlayProps {
  onCourseSelect: (courseId: string) => void;
  isOpen: boolean;
}

export function CourseSelectorOverlay({ onCourseSelect, isOpen }: CourseSelectorOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md animate-in fade-in duration-500 p-4 overflow-y-auto">
      <div className="max-w-5xl w-full py-8">
        <header className="text-center mb-8 space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter font-headline text-white uppercase">
            ¿Qué nivel dominaremos hoy?
          </h1>
          <p className="text-lg text-muted-foreground font-normal max-w-2xl mx-auto">
            Elige tu camino de aprendizaje y potencia tu creatividad con técnicas profesionales.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TARJETA DESTACADA: IA */}
          <Card 
            className="md:col-span-2 group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5 hover:border-primary/50 transition-all duration-300 cursor-pointer shadow-xl"
            onClick={() => onCourseSelect('ae-ia')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 flex flex-col h-full justify-between min-h-[220px]">
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-primary text-primary-foreground shadow-lg">
                    <Zap className="h-8 w-8 fill-current" />
                  </div>
                  <Badge className="bg-accent text-accent-foreground px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    MÁS RECIENTE
                  </Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white uppercase leading-tight">
                  Curso Inteligencia Artificial <br />
                  <span className="text-primary text-xl md:text-2xl">con After Effects</span>
                </h2>
                <p className="text-sm text-gray-400 font-normal max-w-md">
                  Mezcla lo profesional con herramientas de IA para crear Motion Graphics de última generación.
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-tighter mt-4">
                COMENZAR NIVEL <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          {/* TARJETA MODERNA: 2025 */}
          <Card 
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer shadow-lg"
            onClick={() => onCourseSelect('ae-2025')}
          >
            <CardContent className="p-6 flex flex-col h-full justify-between">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/10 text-white w-fit group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase leading-tight">
                  After Effects 2025 <br />
                  <span className="text-muted-foreground text-base font-normal">Moderno</span>
                </h3>
                <p className="text-xs text-gray-400 font-normal">
                  Aprende After Effects de la A a la Z sin IA. El estándar de la industria.
                </p>
              </div>
              <div className="mt-4 text-white/50 group-hover:text-primary transition-colors text-right">
                <ChevronRight className="h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          {/* GRUPO CLÁSICOS */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50 md:col-span-2 px-2">
              Cursos clásicos After Effects 2021
            </div>
            
            <Card 
              className="group flex items-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => onCourseSelect('ae-basico')}
            >
              <div className="p-2 rounded-lg bg-muted text-muted-foreground mr-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase text-sm">Curso Básico</h4>
                <p className="text-[10px] text-muted-foreground font-normal">La base fundamental.</p>
              </div>
              <ChevronRight className="h-4 w-4 ml-auto text-white/20 group-hover:text-primary" />
            </Card>

            <Card 
              className="group flex items-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => onCourseSelect('ae-avanzado')}
            >
              <div className="p-2 rounded-lg bg-muted text-muted-foreground mr-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase text-sm">Curso Avanzado</h4>
                <p className="text-[10px] text-muted-foreground font-normal">Efectos y Motion Graphics pro.</p>
              </div>
              <ChevronRight className="h-4 w-4 ml-auto text-white/20 group-hover:text-primary" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
