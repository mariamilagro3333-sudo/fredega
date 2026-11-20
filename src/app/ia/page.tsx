'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BrainCircuit, Sparkles, Rocket, Cpu, MonitorPlay, 
  Clock, CheckCircle2, Crown, Zap, ArrowRight, Play,
  Film, Video, Layers, Wand2, Gem, Users, Globe, Smartphone, TabletSmartphone
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const curriculum = [
    { 
        title: "MÓDULO 01: EL PROYECTO INICIAL DESDE EL MÓVIL", 
        topics: [
            "Edición Pro en Celular: Inmersión total en aplicaciones móviles.",
            "Captura e Ingeniería de Sonido: Grabación profesional con tu teléfono.",
            "Adiós a la PC: Configura tu entorno móvil para máxima eficiencia.",
            "IA en la palma de tu mano: Herramientas web accesibles desde el móvil."
        ] 
    },
    { 
        title: "MÓDULO 02: CREACIÓN DE MUNDOS Y FUSIÓN MÓVIL", 
        topics: [
            "Diseño de Escenarios: Generación de entornos realistas con IA.",
            "Transformación Visual: Procesado cinematográfico en el teléfono.",
            "Relighting Digital Móvil: Igualar iluminaciones complejas sin PC.",
            "Consistencia de Personajes: Control de identidad visual en tus clips."
        ] 
    },
    { 
        title: "MÓDULO 03: EFECTOS VISUALES Y PERSONAJES", 
        topics: [
            "Humanización de productos: Animación de objetos con rasgos humanos.",
            "El Arte del Clon: Diálogos entre sujetos reales y personajes IA.",
            "Cinematografía de Corto: Producción narrativa con cámaras virtuales.",
            "VFX Pro en Celular: Inserción de partículas y efectos de alto impacto."
        ] 
    },
    { 
        title: "MÓDULO 04: MOTION GRAPHICS Y VIRALIDAD", 
        topics: [
            "Animación de Logos: De marcas planas a Motion Graphics 4K.",
            "Visual Hooks: Creación de contenido viral de alto impacto.",
            "Tipografía Dinámica: Integración de textos pro en el entorno móvil."
        ] 
    },
    { 
        title: "MÓDULO 05: ACABADO 4K DEFINITIVO", 
        topics: [
            "Plantillas para Eventos: Uso de recursos premium directo en el teléfono.",
            "Estrategias de Eficiencia: Optimización en teléfonos gama media.",
            "Masterización Final: Acabado 4K, color y exportación móvil."
        ] 
    },
];

export default function IACoursePromoPage() {
  const { rol } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const isMember = rol === 'miembro' || rol === 'admin';
  const whatsappChannel = "https://whatsapp.com/channel/0029Vb9ptJvEAKWLbEBGNN10";

  const handleInscribe = () => {
    if (isMember) {
      window.open(whatsappChannel, '_blank');
    } else {
      router.push('/membresia');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col selection:bg-primary/30">
      
      {/* HERO SECTION CINEMÁTICO */}
      <section className="relative w-full py-20 md:py-40 overflow-hidden flex items-center justify-center">
        <video 
            src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4" 
            autoPlay muted loop playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-[#020617]" />
        
        <div className="container relative z-10 px-4 text-center space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex flex-col items-center gap-3 md:gap-4">
              <Badge className="bg-yellow-500 text-black font-black px-4 py-1 md:px-6 md:py-1.5 tracking-widest uppercase animate-pulse shadow-[0_0_20px_rgba(234,179,8,0.4)] text-[10px] md:text-xs">
                ESTRENO: MIÉRCOLES 25 DE NOVIEMBRE
              </Badge>
              <Badge className={cn(
                  "font-black px-6 py-2 tracking-widest uppercase shadow-[0_0_20px_rgba(30,144,255,0.4)] text-xs md:text-sm",
                  isMember ? "bg-emerald-600 text-white" : "bg-primary text-white"
              )}>
                {isMember ? "¡LISTO PARA EL LANZAMIENTO MÓVIL!" : "EDICIÓN PRO DESDE TU CELULAR"}
              </Badge>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="border-primary/50 text-primary font-black px-4 py-1 tracking-widest uppercase bg-primary/10 text-[9px] md:text-[10px]">
                  <Smartphone className="mr-2 h-3 w-3 md:h-4 md:w-4" /> NO NECESITAS PC
                </Badge>
                <Badge className="bg-emerald-600 text-white font-black px-4 py-1 tracking-widest uppercase text-[9px] md:text-[10px]">
                  GAMA MEDIA OK
                </Badge>
              </div>
          </div>
          <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] max-w-5xl mx-auto font-headline">
            MAESTRÍA EN <span className="text-primary italic">IA Y EDICIÓN MÓVIL</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-tight">
            Logra todos los efectos del demo usando solo tu <span className="text-white font-bold">celular</span>. El futuro de la edición está en tus manos.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 md:pt-8 w-full max-w-lg mx-auto">
            <Button onClick={handleInscribe} size="lg" className="h-16 md:h-20 w-full px-8 md:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs md:text-sm shadow-2xl hover:scale-105 transition-all">
                INSCRIBIRSE AHORA (ACCESO PRO)
            </Button>
             <Button asChild variant="outline" size="lg" className="h-16 md:h-20 w-full px-8 md:px-12 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs md:text-sm backdrop-blur-md">
                <Link href="#detalles">Ver Programa Detallado</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* DETALLES DEL CURSO */}
      <section id="detalles" className="container mx-auto py-16 md:py-24 px-4 md:px-6 space-y-20 md:space-y-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-6 md:space-y-8">
                  <div className="space-y-4 text-center lg:text-left">
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">EL MIÉRCOLES COMIENZA <span className="text-primary">TU NUEVA ERA</span></h2>
                      <p className="text-base md:text-lg text-gray-400 font-normal leading-relaxed">
                          Este 25 de noviembre liberamos el primer curso grabado íntegramente desde un teléfono. Aprenderás a integrar IA avanzada en tus ediciones móviles para lograr resultados cinematográficos en 4K.
                      </p>
                  </div>
                  <div className="space-y-4">
                      {[
                          { icon: Smartphone, title: "Edición 100% Móvil", text: "Clases grabadas y ejecutadas desde un celular para máxima accesibilidad." },
                          { icon: TabletSmartphone, title: "Gama Media OK", text: "Optimizado para funcionar en dispositivos estándar sin bloqueos." },
                          { icon: Zap, title: "Lanzamiento 25 Nov", text: "Material exclusivo que se publicará a mediados de este miércoles." },
                      ].map((feature, i) => (
                          <div key={i} className="flex items-start gap-4 p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 hover:border-primary/30 transition-colors group">
                              <feature.icon className="h-7 w-7 md:h-8 md:w-8 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                              <div>
                                  <h4 className="font-black uppercase text-[11px] md:text-sm mb-1">{feature.title}</h4>
                                  <p className="text-xs md:text-sm text-gray-400 font-medium">{feature.text}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="relative aspect-video rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-primary/20 shadow-2xl group">
                  <video 
                    src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4" 
                    autoPlay muted loop playsInline 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="p-5 md:p-6 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-white animate-pulse">
                          <Smartphone className="h-10 w-10 md:h-12 md:w-12" />
                      </div>
                  </div>
              </div>
          </div>

          {/* CATÁLOGO DE MÓDULOS */}
          <div className="space-y-12">
              <div className="text-center space-y-3">
                  <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">RUTA DE APRENDIZAJE <span className="text-primary">CELULAR</span></h2>
                  <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium">Todo lo que necesitas saber para dominar el cine móvil.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
                  {curriculum.map((module, i) => (
                      <Card key={i} className="bg-white/5 border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden hover:bg-white/[0.07] transition-all flex flex-col">
                          <CardHeader className="p-6 md:p-8 pb-4">
                              <div className="flex items-center gap-3 mb-2">
                                  <Badge className="bg-primary/20 text-primary border-none font-black text-[9px] md:text-[10px]">MÓDULO 0{i+1}</Badge>
                              </div>
                              <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight">{module.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-6 md:p-8 pt-0 flex-grow">
                              <ul className="space-y-3 md:space-y-4">
                                  {module.topics.map((topic, ti) => (
                                      <li key={ti} className="flex items-start gap-3 text-xs md:text-sm text-gray-400 leading-snug">
                                          <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500 shrink-0 mt-0.5" />
                                          <span className="font-medium">{topic}</span>
                                      </li>
                                  ))}
                              </ul>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>

          {/* CTA FINAL */}
          <section className="text-center pb-12">
            <Card className="bg-gradient-to-br from-primary/20 to-blue-900/10 border-2 border-primary/30 p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 hidden md:block">
                    <Smartphone className="h-64 w-64 text-primary" />
                </div>
                <Badge className="mb-4 md:mb-6 bg-yellow-500 text-black font-black uppercase tracking-widest text-[9px] md:text-xs">LANZAMIENTO: 25 NOVIEMBRE</Badge>
                <h2 className="text-3xl md:text-7xl font-black uppercase mb-4 md:mb-6 text-white leading-none tracking-tighter">EL MIÉRCOLES CAMBIA TU FORMA DE CREAR</h2>
                <p className="text-base md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-snug">
                    Accede a toda la formación móvil con tu membresía VIP. Únete ahora para recibir el aviso del lanzamiento.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                    <Button onClick={handleInscribe} size="lg" className="h-14 md:h-16 px-10 md:px-14 rounded-xl md:rounded-2xl bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest text-[10px] md:text-sm shadow-xl transition-all">
                         {isMember ? "IR AL CANAL WHATSAPP" : "ADQUIRIR MEMBRESÍA VIP"}
                    </Button>
                    <Button asChild size="lg" className="h-14 md:h-16 px-10 md:px-14 rounded-xl md:rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] md:text-sm shadow-xl transition-all">
                        <Link href="/pagos">
                            <Rocket className="mr-3 h-4 w-4 md:h-6 md:w-6" /> Inscribirme Hoy
                        </Link>
                    </Button>
                </div>
            </Card>
          </section>
      </section>
    </div>
  );
}