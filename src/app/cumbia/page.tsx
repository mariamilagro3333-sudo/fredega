'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music, Calendar, MapPin, Award, AlertTriangle, XCircle } from 'lucide-react';

export default function CumbiaLandingPage() {
  return (
    <div className="min-h-screen bg-[#050A14] text-white font-body selection:bg-yellow-500/30 pb-20">
      <header className="relative py-12 md:py-20 overflow-hidden border-b-4 border-yellow-500 bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="absolute top-0 right-0 p-8 opacity-10 animate-pulse">
            <Music className="h-64 w-64 text-yellow-500" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-red-600 text-white px-6 py-1 text-sm font-black uppercase tracking-widest mb-6 shadow-lg shadow-red-600/20">EDICIÓN 2026</Badge>
          <p className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-2 drop-shadow-md">
            Fundación Folclórica Estampas Colombianas Presenta
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-white drop-shadow-lg">
            V Concurso Departamental <br />
            <span className="text-yellow-500">Parejas Bailadoras de Cumbia</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-blue-400 uppercase tracking-[0.2em]">Jorge Eliecer Garizábalo García</h2>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 gap-12">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                        <Calendar className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white uppercase text-xs">Fecha del Evento</h4>
                        <p className="text-sm text-gray-400 font-bold">14 de Junio, 2026</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                        <MapPin className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white uppercase text-xs">Ubicación</h4>
                        <p className="text-sm text-gray-400">Soledad, Atlántico</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                        <Award className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white uppercase text-xs">Premios</h4>
                        <p className="text-sm text-gray-400">A los mejores bailadores</p>
                    </div>
                </div>
            </div>

            {/* Closed Registration Message */}
            <Card className="bg-red-600/10 border-red-600 border-2 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                <CardContent className="p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[450px]">
                    <div className="bg-red-600 p-6 rounded-full mb-8 shadow-xl shadow-red-600/40">
                        <XCircle className="h-16 w-16 text-white" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none mb-6">
                        Inscripciones <br />
                        <span className="text-red-500">Cerradas</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-red-600 rounded-full mb-8" />
                    <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
                        Lo sentimos, el periodo oficial de registro para el concurso ha finalizado el día <span className="text-white font-black underline decoration-red-600 underline-offset-8">29 de Mayo</span>.
                    </p>
                    <p className="mt-12 text-xs md:text-sm text-red-400/60 font-black uppercase tracking-[0.4em]">
                        Gracias a todas las parejas por su participación
                    </p>
                </CardContent>
            </Card>

            <div className="text-center space-y-8 pt-12 border-t border-white/5">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">ORGANIZA</p>
                    <div className="flex justify-center items-center">
                         <div className="flex flex-col items-center group">
                             <span className="text-yellow-500 font-black text-3xl md:text-4xl tracking-tighter uppercase transition-transform group-hover:scale-105">Estampas Colombianas</span>
                             <span className="text-[12px] md:text-sm text-gray-500 uppercase tracking-[0.3em] font-bold">Fundación Folclórica</span>
                         </div>
                    </div>
                </div>
                <div className="flex justify-center gap-4 opacity-50">
                     <div className="h-1.5 w-16 bg-yellow-500 rounded-full" />
                     <div className="h-1.5 w-16 bg-blue-500 rounded-full" />
                     <div className="h-1.5 w-16 bg-red-500 rounded-full" />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
