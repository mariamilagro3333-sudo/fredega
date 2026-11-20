'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Check, CheckCircle, Gift, Bot, FolderDown, Rocket, Clapperboard, Flame, MessageCircle, Youtube, Star, Wallet, GraduationCap, Users, Heart, Repeat, Info, BadgeHelp, XCircle, CreditCard, ScrollText, Eye, BookOpen, BrainCircuit, Sparkles, Clock, Mail, Crown, Download, Zap, Target, PlayCircle, Package } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IaPromoBanner } from '@/components/ia-promo-banner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';

const pricingPlans = [
  {
    title: "Suscripción Semestral",
    subtitle: "Acceso por 6 meses (Recurrente)",
    price: "15",
    currency: "USD",
    features: [
        "Miles de plantillas exclusivas",
        "Súper Packs de Google Drive",
        "Acceso total por 6 meses",
        "Curso exclusivo de IA incluido",
        "Actualizaciones constantes (+100/mes)",
        "Cursos sin publicidad",
        "Descarga del catálogo completo",
        "Asesoría directa por WhatsApp"
    ]
  },
  {
    title: "Suscripción Anual",
    subtitle: "Acceso por 12 meses (Recurrente)",
    price: "22",
    currency: "USD",
    features: [
        "Miles de plantillas exclusivas",
        "Súper Packs de Google Drive",
        "Acceso total por 12 meses",
        "Curso exclusivo de IA incluido",
        "Actualizaciones constantes (+100/mes)",
        "Cursos sin publicidad",
        "Descarga del catálogo completo",
        "Asesoría directa por WhatsApp"
    ]
  }
];

export default function MembershipPage() {
  const { rol } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white">
      
      {/* HERO SECCIÓN */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden flex items-center justify-center bg-black">
        <video 
            src="https://media.fredegapro.com/01/catalogo/PANORAMICO.mp4" 
            autoPlay muted loop playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]" />
        
        <div className="container relative z-10 px-4 text-center space-y-6">
          <Badge className="bg-primary text-white font-black px-6 py-1 tracking-widest uppercase text-[10px] md:text-xs">MEMBRESÍA VIP 2026</Badge>
          <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] max-w-5xl mx-auto font-headline">
            POTENCIA TU <br/><span className="text-primary">CREATIVIDAD AL MÁXIMO</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium">
            Descarga la biblioteca más grande de recursos y domina la IA móvil.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="h-16 md:h-20 w-full sm:w-auto px-10 md:px-14 rounded-2xl md:rounded-3xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs md:text-sm shadow-xl hover:scale-105 transition-all">
                <Link href="#precios">{isMember ? 'Renovar Membresía Aquí' : 'Hazte miembro hoy'}</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        
        {/* PROMO CURSO IA */}
        <section className="mb-16 md:mb-20">
            <IaPromoBanner className="rounded-3xl md:rounded-[3rem] border-2 border-primary/20 shadow-2xl" />
        </section>

        {/* VALOR DE LOS SÚPER PACKS */}
        <section className="mb-20 md:mb-24 text-center space-y-8 md:space-y-12">
            <div className="space-y-4">
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">PODER EN <span className="text-primary">SÚPER PACKS</span></h2>
                <p className="text-gray-400 text-base md:text-xl font-medium max-w-4xl mx-auto leading-relaxed">
                    No descargues uno por uno. Obtén acceso a carpetas masivas de Google Drive organizadas por categorías.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                    { icon: Sparkles, name: 'EFECTOS VFX' },
                    { icon: Target, name: 'LOGOS' },
                    { icon: PlayCircle, name: 'INTROS' },
                    { icon: Package, name: 'PAQUETES' },
                ].map(item => (
                    <Card key={item.name} className="bg-white/5 border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-8 text-center group hover:bg-primary/10 transition-colors">
                        <item.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{item.name}</span>
                    </Card>
                ))}
            </div>
        </section>

        {/* PLANES DE PRECIO */}
        <section className="mb-20 md:mb-24 scroll-mt-24" id="precios">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={cn(
                  "relative flex flex-col border-2 md:border-4 rounded-3xl md:rounded-[3rem] overflow-hidden bg-white/5", 
                  index === 1 ? "border-primary shadow-[0_0_50px_rgba(30,144,255,0.2)] md:scale-105 z-10" : "border-white/10"
              )}>
                <CardHeader className="text-center pb-6 md:pb-8 border-b border-white/10 pt-8 md:pt-10">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">{plan.title}</h3>
                  <p className="text-[10px] md:text-sm font-bold text-primary uppercase tracking-widest mt-1 md:mt-2">{plan.subtitle}</p>
                  <div className="mt-6 md:mt-8 flex items-baseline justify-center gap-1">
                    <span className="text-5xl md:text-6xl font-black text-white">${plan.price}</span>
                    <span className="text-gray-500 uppercase text-[10px] md:text-xs font-black tracking-widest">{plan.currency}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-8 md:pt-10 px-6 md:px-8">
                  <ul className="space-y-4 md:space-y-5">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 md:gap-4 text-xs md:text-sm font-medium text-gray-300">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-8 md:pt-10 pb-8 md:pb-10 px-6 md:px-8">
                  <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase h-14 md:h-16 rounded-xl md:rounded-2xl shadow-xl tracking-widest text-[10px] md:text-sm">
                    <Link href="/pagos">{isMember ? "Renovar Ahora" : "Hazte Miembro Ahora"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20 md:mb-24 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-8 md:mb-12 uppercase tracking-tighter text-white">Preguntas Frecuentes</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                    { q: "¿Es un pago único?", a: "Los pagos por Hotmart son suscripciones recurrentes. Los pagos manuales (Nequi, etc.) son pagos únicos por el periodo contratado." },
                    { q: "¿Cómo accedo a los Súper Packs?", a: "Una vez seas miembro, al ingresar a la plataforma, verás los botones de descarga de Google Drive activos en todas las categorías premium." },
                    { q: "¿El curso de IA tiene costo adicional?", a: "No, para los miembros PRO, el curso de IA 2026 estará incluido sin costo adicional cuando se publique este miércoles." }
                ].map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border-white/10 bg-white/5 rounded-2xl px-5 md:px-6">
                        <AccordionTrigger className="text-left font-bold text-base md:text-lg text-white hover:no-underline py-5">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-gray-400 text-sm md:text-base leading-relaxed pb-6 font-medium">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>

        {/* CTA FINAL */}
        <section className="text-center mb-24 md:mb-32">
            <Card className="bg-gradient-to-br from-primary/20 to-blue-900/10 border-2 border-primary/30 p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 hidden md:block">
                    <Zap className="h-64 w-64 text-primary" />
                </div>
                <h2 className="text-3xl md:text-6xl font-black uppercase mb-4 md:mb-6 text-white leading-none tracking-tighter">ÚNETE A LA ELITE CREATIVA</h2>
                <p className="text-base md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto font-medium">No pierdas más tiempo buscando recursos por separado.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                    <Button asChild size="lg" className="h-14 md:h-16 px-10 md:px-14 rounded-xl md:rounded-2xl bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest text-[10px] md:text-sm shadow-xl transition-all">
                         <a href="https://api.whatsapp.com/send?phone=573195456391" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-3 h-5 w-5 md:h-6 md:w-6" /> WhatsApp Soporte
                        </a>
                    </Button>
                    <Button asChild size="lg" className="h-14 md:h-16 px-10 md:px-14 rounded-xl md:rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] md:text-sm shadow-xl transition-all">
                         <Link href="/pagos">
                            <Rocket className="mr-3 h-5 w-5 md:h-6 md:w-6" /> Empezar Ahora
                        </Link>
                    </Button>
                </div>
            </Card>
        </section>
      </div>
    </div>
  );
}
