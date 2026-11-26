'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  CreditCard,
  Crown,
  FileText,
  Globe,
  Gift,
  Mail,
  MessageCircle,
  Package,
  PlayCircle,
  Smartphone,
  Sparkles,
  Target,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IaPromoBanner } from '@/components/ia-promo-banner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import {
  IA_INSTRUCTIONS_PDF_URL,
  MEMBERSHIP_PAYMENT_CONFIG,
} from '@/lib/ia-curriculum';

const membershipBenefits = [
  'Curso completo de Inteligencia Artificial y Edición PRO ya disponible para descargar',
  'Miles de plantillas exclusivas para Premiere, After Effects y DaVinci Resolve',
  'Acceso directo a los Súper Packs organizados en Google Drive',
  'Más de 100 recursos nuevos cada mes y actualizaciones constantes',
  'Cursos completos descargables sin publicidad',
  'Asesoría y soporte directo por WhatsApp',
];

const faqs = [
  {
    q: '¿Cuál es la diferencia entre pagar con tarjeta/PayPal y pagar por transferencia o Western Union?',
    a: 'Con Tarjeta, PayPal o Banca Internacional (Hotmart) accedes a 6 meses o 1 año con suscripción que puedes cancelar cuando quieras. Con Transferencia (Nequi, Bre-B, Daviplata) o Western Union haces un pago único y ya incluye la promoción del doble de tiempo: 1 año por el precio de 6 meses, o 2 años por el precio de 1 año.',
  },
  {
    q: '¿El curso de Inteligencia Artificial tiene costo adicional?',
    a: 'No. Con tu Membresía PRO el curso completo de IA está incluido sin costo adicional y el Módulo 01 ya está listo para descargar.',
  },
  {
    q: '¿Qué correo debo usar si pago por Hotmart?',
    a: 'Debes usar exactamente el mismo correo electrónico con el que te registraste en FredegaPro para que tu acceso se active sin inconvenientes.',
  },
  {
    q: '¿Cómo activo mi cuenta si pago por Nequi, Bre-B, Daviplata o Western Union?',
    a: 'Solo envíanos el comprobante de transferencia (o el código MTCN si pagas por Western Union) junto con tu correo de registro por WhatsApp o correo electrónico y activamos tu membresía.',
  },
];

type PaymentModalState =
  | null
  | { type: 'transfer'; duration: '1 año' | '2 años'; amount: string }
  | { type: 'western'; duration: '1 año' | '2 años'; amount: string };

export default function MembershipPage() {
  const { rol } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';
  const [highlightMethods, setHighlightMethods] = useState(false);
  const [paymentModal, setPaymentModal] = useState<PaymentModalState>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGoToPaymentMethods = () => {
    setHighlightMethods(true);
    const el = document.getElementById('medios-de-pago');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => setHighlightMethods(false), 1800);
  };

  const handleCopyText = async (value: string, fieldKey: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // ignore clipboard errors in restricted frames
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* 1. CABECERA COMPACTA CON BOTÓN PRINCIPAL COMPRAR MEMBRESÍA */}
      <section className="relative w-full py-12 md:py-20 overflow-hidden flex items-center justify-center bg-black border-b border-white/10">
        <video
          src="https://media.fredegapro.com/01/catalogo/PANORAMICO.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-[#020617]/80" />

        <div className="container relative z-10 px-4 text-center space-y-5 max-w-3xl mx-auto">
          <Badge className="bg-primary text-white font-black px-4 py-1 tracking-widest uppercase text-[10px] md:text-xs">
            MEMBRESÍA PRO 2026
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[1.02] font-headline">
            ACCEDE AL CURSO DE IA Y A{' '}
            <span className="text-primary">MILES DE RECURSOS</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium max-w-xl mx-auto">
            Activa tu membresía en pocos pasos y empieza a descargar el curso hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Button
              type="button"
              onClick={handleGoToPaymentMethods}
              size="lg"
              className="h-14 w-full sm:w-auto px-8 md:px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs md:text-sm shadow-[0_12px_35px_rgba(30,144,255,0.4)] hover:scale-[1.02] transition-all"
            >
              <Crown className="mr-2 h-5 w-5" />
              {isMember ? 'Renovar o Comprar Membresía' : 'Comprar Membresía'}
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 sm:h-14 w-full sm:w-auto px-6 rounded-2xl border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200 font-black uppercase tracking-wider text-[11px] md:text-xs"
            >
              <a
                href={IA_INSTRUCTIONS_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 h-4 w-4" />
                Descargar Instrucciones PDF
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14 space-y-14 md:space-y-20">
        {/* 2. PRECIOS EN DÓLARES Y PESOS COLOMBIANOS */}
        <section id="precios" className="scroll-mt-24 space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <Badge className="bg-emerald-500 text-black font-black uppercase tracking-widest text-[10px] px-3.5 py-1">
              PRECIOS CLAROS
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Planes de <span className="text-primary">Membresía PRO</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium">
              Elige tu plan y presiona comprar para ver enseguida todos los medios de pago.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* PLAN 6 MESES */}
            <Card className="bg-white/[0.04] border-2 border-white/15 rounded-3xl overflow-hidden flex flex-col">
              <CardHeader className="text-center p-6 pb-5 border-b border-white/10 space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-primary">
                  Plan Semestral
                </p>
                <CardTitle className="text-2xl font-black uppercase text-white">
                  6 Meses de Acceso
                </CardTitle>
                <div className="pt-2 space-y-1">
                  <p className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.dollars}
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-primary leading-tight">
                    {MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.cop}
                  </p>
                </div>
                <p className="text-[11px] font-semibold text-emerald-400 pt-1">
                  Por transferencia o Western Union recibes 1 año completo (promoción)
                </p>
              </CardHeader>
              <CardFooter className="p-5 mt-auto">
                <Button
                  type="button"
                  onClick={handleGoToPaymentMethods}
                  size="lg"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-lg"
                >
                  Comprar
                </Button>
              </CardFooter>
            </Card>

            {/* PLAN 1 AÑO */}
            <Card className="bg-primary/10 border-2 border-primary rounded-3xl overflow-hidden flex flex-col shadow-[0_0_40px_rgba(30,144,255,0.18)]">
              <CardHeader className="text-center p-6 pb-5 border-b border-white/10 space-y-2">
                <div className="flex justify-center">
                  <Badge className="bg-emerald-500 text-black font-black uppercase text-[10px] tracking-widest px-3 py-0.5">
                    MÁS RECOMENDADO
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-black uppercase text-white">
                  1 Año de Acceso
                </CardTitle>
                <div className="pt-2 space-y-1">
                  <p className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {MEMBERSHIP_PAYMENT_CONFIG.prices.annual.dollars}
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-emerald-400 leading-tight">
                    {MEMBERSHIP_PAYMENT_CONFIG.prices.annual.cop}
                  </p>
                </div>
                <p className="text-[11px] font-semibold text-emerald-300 pt-1">
                  Por transferencia o Western Union recibes 2 años completos (promoción)
                </p>
              </CardHeader>
              <CardFooter className="p-5 mt-auto">
                <Button
                  type="button"
                  onClick={handleGoToPaymentMethods}
                  size="lg"
                  className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest text-xs shadow-lg"
                >
                  Comprar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* MEDIOS DE PAGO DIRECTOS (6 BOTONES INMEDIATOS) */}
        <section
          id="medios-de-pago"
          className={cn(
            'scroll-mt-24 max-w-4xl mx-auto rounded-3xl border-2 p-5 sm:p-8 space-y-6 transition-all duration-500',
            highlightMethods
              ? 'border-emerald-400 bg-primary/15 shadow-[0_0_50px_rgba(16,185,129,0.25)]'
              : 'border-primary/40 bg-white/[0.03]'
          )}
        >
          <div className="text-center space-y-2">
            <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[10px] px-3.5 py-1">
              ELIGE TU MEDIO DE PAGO
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              Botones de Pago Directo
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
              Selecciona la opción que prefieras. Recuerda usar el mismo correo con el que te registraste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {/* 1. Hotmart 6 meses */}
            <a
              href={MEMBERSHIP_PAYMENT_CONFIG.hotmart.sixMonths}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-3 rounded-2xl border-2 border-primary/40 bg-blue-950/50 hover:bg-blue-900/60 hover:border-primary p-4 sm:p-5 transition-all text-left"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-primary">
                    <CreditCard className="h-4 w-4 shrink-0" />
                    Tarjeta, PayPal o Banca Internacional
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white shrink-0" />
                </div>
                <p className="text-base sm:text-lg font-black text-white leading-snug">
                  6 meses por {MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.dollars}
                </p>
                <p className="text-xs font-bold text-gray-300">
                  ({MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.cop})
                </p>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white group-hover:bg-primary/90">
                Pagar 6 meses ahora
              </span>
            </a>

            {/* 2. Hotmart 1 año */}
            <a
              href={MEMBERSHIP_PAYMENT_CONFIG.hotmart.annual}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-3 rounded-2xl border-2 border-primary/40 bg-blue-950/50 hover:bg-blue-900/60 hover:border-primary p-4 sm:p-5 transition-all text-left"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-primary">
                    <CreditCard className="h-4 w-4 shrink-0" />
                    Tarjeta, PayPal o Banca Internacional
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white shrink-0" />
                </div>
                <p className="text-base sm:text-lg font-black text-white leading-snug">
                  1 año por {MEMBERSHIP_PAYMENT_CONFIG.prices.annual.dollars}
                </p>
                <p className="text-xs font-bold text-gray-300">
                  ({MEMBERSHIP_PAYMENT_CONFIG.prices.annual.cop})
                </p>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white group-hover:bg-primary/90">
                Pagar 1 año ahora
              </span>
            </a>

            {/* 3. Transferencia 1 año (precio 6 meses en pesos colombianos + promoción) */}
            <button
              type="button"
              onClick={() =>
                setPaymentModal({
                  type: 'transfer',
                  duration: '1 año',
                  amount: MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.cop,
                })
              }
              className="group flex flex-col justify-between gap-3 rounded-2xl border-2 border-emerald-500/45 bg-emerald-950/35 hover:bg-emerald-900/40 hover:border-emerald-400 p-4 sm:p-5 transition-all text-left cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    <Smartphone className="h-4 w-4 shrink-0" />
                    Transferencia: Nequi, Bre-B, Daviplata
                  </span>
                  <Badge className="bg-yellow-500 text-black font-black uppercase text-[9px] px-2 py-0.5">
                    <Gift className="mr-1 h-3 w-3" />
                    Ya incluye la promoción
                  </Badge>
                </div>
                <p className="text-base sm:text-lg font-black text-white leading-snug">
                  1 año por {MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.cop}
                </p>
                <p className="text-xs text-emerald-200/90 font-medium">
                  Pagas el valor de 6 meses y recibes 1 año completo (pago único).
                </p>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-black group-hover:bg-emerald-400">
                Ver datos de transferencia
              </span>
            </button>

            {/* 4. Transferencia 2 años (precio 1 año en pesos colombianos + promoción) */}
            <button
              type="button"
              onClick={() =>
                setPaymentModal({
                  type: 'transfer',
                  duration: '2 años',
                  amount: MEMBERSHIP_PAYMENT_CONFIG.prices.annual.cop,
                })
              }
              className="group flex flex-col justify-between gap-3 rounded-2xl border-2 border-emerald-500/45 bg-emerald-950/35 hover:bg-emerald-900/40 hover:border-emerald-400 p-4 sm:p-5 transition-all text-left cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    <Smartphone className="h-4 w-4 shrink-0" />
                    Transferencia: Nequi, Bre-B, Daviplata
                  </span>
                  <Badge className="bg-yellow-500 text-black font-black uppercase text-[9px] px-2 py-0.5">
                    <Gift className="mr-1 h-3 w-3" />
                    Ya incluye la promoción
                  </Badge>
                </div>
                <p className="text-base sm:text-lg font-black text-white leading-snug">
                  2 años por {MEMBERSHIP_PAYMENT_CONFIG.prices.annual.cop}
                </p>
                <p className="text-xs text-emerald-200/90 font-medium">
                  Pagas el valor de 1 año y recibes 2 años completos (pago único).
                </p>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-black group-hover:bg-emerald-400">
                Ver datos de transferencia
              </span>
            </button>

            {/* 5. Western Union 1 año (precio en dólares + promoción) */}
            <button
              type="button"
              onClick={() =>
                setPaymentModal({
                  type: 'western',
                  duration: '1 año',
                  amount: MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.dollars,
                })
              }
              className="group flex flex-col justify-between gap-3 rounded-2xl border-2 border-yellow-500/40 bg-yellow-500/[0.07] hover:bg-yellow-500/[0.13] hover:border-yellow-400 p-4 sm:p-5 transition-all text-left cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-yellow-300">
                    <Globe className="h-4 w-4 shrink-0" />
                    Western Union Internacional
                  </span>
                  <Badge className="bg-yellow-500 text-black font-black uppercase text-[9px] px-2 py-0.5">
                    <Gift className="mr-1 h-3 w-3" />
                    Ya incluye la promoción
                  </Badge>
                </div>
                <p className="text-base sm:text-lg font-black text-white leading-snug">
                  1 año por {MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.dollars}
                </p>
                <p className="text-xs text-yellow-100/85 font-medium">
                  Envías {MEMBERSHIP_PAYMENT_CONFIG.prices.sixMonths.dollars} y recibes 1 año completo (pago único).
                </p>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-black group-hover:bg-yellow-400">
                Ver datos de Western Union
              </span>
            </button>

            {/* 6. Western Union 2 años (precio en dólares + promoción) */}
            <button
              type="button"
              onClick={() =>
                setPaymentModal({
                  type: 'western',
                  duration: '2 años',
                  amount: MEMBERSHIP_PAYMENT_CONFIG.prices.annual.dollars,
                })
              }
              className="group flex flex-col justify-between gap-3 rounded-2xl border-2 border-yellow-500/40 bg-yellow-500/[0.07] hover:bg-yellow-500/[0.13] hover:border-yellow-400 p-4 sm:p-5 transition-all text-left cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-yellow-300">
                    <Globe className="h-4 w-4 shrink-0" />
                    Western Union Internacional
                  </span>
                  <Badge className="bg-yellow-500 text-black font-black uppercase text-[9px] px-2 py-0.5">
                    <Gift className="mr-1 h-3 w-3" />
                    Ya incluye la promoción
                  </Badge>
                </div>
                <p className="text-base sm:text-lg font-black text-white leading-snug">
                  2 años por {MEMBERSHIP_PAYMENT_CONFIG.prices.annual.dollars}
                </p>
                <p className="text-xs text-yellow-100/85 font-medium">
                  Envías {MEMBERSHIP_PAYMENT_CONFIG.prices.annual.dollars} y recibes 2 años completos (pago único).
                </p>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-black group-hover:bg-yellow-400">
                Ver datos de Western Union
              </span>
            </button>
          </div>

          {/* Aviso correo + acceso rápido a instrucciones PDF */}
          <div className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 text-xs text-amber-100 leading-relaxed">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Importante:</strong> Al pagar con Hotmart usa el mismo correo electrónico con el que te registraste en FredegaPro. Si tienes dudas, descarga la guía en PDF.
              </span>
            </div>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full sm:w-auto shrink-0 h-10 px-4 rounded-xl border-white/20 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-wider text-[10px]"
            >
              <a
                href={IA_INSTRUCTIONS_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-1.5 h-3.5 w-3.5" />
                Ver Instrucciones PDF
              </a>
            </Button>
          </div>
        </section>

        {/* 3. BENEFICIOS DE LA MEMBRESÍA */}
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-primary/20 text-primary border border-primary/30 font-black uppercase tracking-widest text-[10px] px-3.5 py-1">
              TODO LO QUE INCLUYE
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              Beneficios de ser <span className="text-primary">Miembro PRO</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {membershipBenefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-semibold text-gray-200 leading-snug">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {[
              { icon: Sparkles, name: 'EFECTOS VFX' },
              { icon: Target, name: 'LOGOS' },
              { icon: PlayCircle, name: 'INTROS' },
              { icon: Package, name: 'SÚPER PACKS' },
            ].map((item) => (
              <Card
                key={item.name}
                className="bg-white/5 border-white/10 rounded-2xl p-5 text-center"
              >
                <item.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary mx-auto mb-2.5" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white">
                  {item.name}
                </span>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. INSTRUCCIONES PDF + PREGUNTAS FRECUENTES */}
        <section className="max-w-3xl mx-auto space-y-10">
          <div className="rounded-3xl border-2 border-emerald-500/35 bg-emerald-500/10 p-6 sm:p-8 text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mx-auto">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Guía de Instrucciones en PDF
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto">
                Descarga el PDF paso a paso con todas las instrucciones para hacerte miembro, activar tu cuenta y realizar el curso de IA sin complicaciones.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-1">
              <Button
                asChild
                size="lg"
                className="h-12 px-7 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-wider text-xs w-full sm:w-auto"
              >
                <a
                  href={IA_INSTRUCTIONS_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Descargar Instrucciones PDF
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-6 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-wider text-xs w-full sm:w-auto"
              >
                <a
                  href={MEMBERSHIP_PAYMENT_CONFIG.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
                  WhatsApp Soporte
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-center uppercase tracking-tighter text-white">
              Preguntas Frecuentes
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-white/10 bg-white/5 rounded-2xl px-4 sm:px-6"
                >
                  <AccordionTrigger className="text-left font-bold text-sm sm:text-base text-white hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-xs sm:text-sm leading-relaxed pb-5 font-medium">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 5. INFORMACIÓN DEL CURSO DE IA (AL FINAL) */}
        <section className="pt-2">
          <IaPromoBanner className="rounded-3xl md:rounded-[3rem] border-2 border-primary/25 shadow-2xl" />
        </section>
      </div>

      {/* MODAL RESPONSIVE DE DATOS DE TRANSFERENCIA / WESTERN UNION */}
      <Dialog open={!!paymentModal} onOpenChange={(open) => !open && setPaymentModal(null)}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-md max-h-[86dvh] overflow-y-auto overflow-x-hidden flex flex-col gap-4 bg-[#020617] border border-primary/40 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
          {paymentModal?.type === 'transfer' && (
            <>
              <DialogHeader className="text-left space-y-2 pt-3 sm:pt-0 pr-6">
                <Badge className="w-fit bg-emerald-500 text-black font-black uppercase text-[10px]">
                  TRANSFERENCIA · YA INCLUYE PROMOCIÓN
                </Badge>
                <DialogTitle className="text-lg sm:text-xl font-black uppercase leading-tight text-white">
                  Pago por Nequi, Llave Bre-B o Daviplata
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-gray-300">
                  Plan seleccionado: <strong className="text-white">{paymentModal.duration}</strong> por{' '}
                  <strong className="text-emerald-400">{paymentModal.amount}</strong> (pago único).
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 space-y-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Número de Nequi, Daviplata o Llave Bre-B
                  </p>
                  <div className="flex items-center justify-between gap-2 rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5">
                    <span className="text-lg font-black tracking-wider text-white">
                      {MEMBERSHIP_PAYMENT_CONFIG.transfer.number}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyText('3195456391', 'transfer-number')}
                      className="h-8 px-2.5 text-primary hover:text-white hover:bg-white/10"
                    >
                      {copiedField === 'transfer-number' ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-gray-200">
                  A nombre de: <strong className="text-white">{MEMBERSHIP_PAYMENT_CONFIG.transfer.holder}</strong>
                </p>
                <p className="text-gray-200">
                  Valor a transferir: <strong className="text-emerald-400">{paymentModal.amount}</strong> ({paymentModal.duration} de acceso).
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Al realizar la transferencia, envíanos el comprobante junto con tu correo de registro por WhatsApp o correo para activar tu membresía.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-auto min-h-11 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-wider text-xs whitespace-normal text-center"
                >
                  <a
                    href={MEMBERSHIP_PAYMENT_CONFIG.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 shrink-0" />
                    Enviar comprobante por WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full h-auto min-h-10 py-2 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-[11px] whitespace-normal text-center"
                >
                  <a
                    href={MEMBERSHIP_PAYMENT_CONFIG.contact.email}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="mr-2 h-4 w-4 shrink-0" />
                    Enviar comprobante por Correo
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="w-full h-auto min-h-9 py-2 rounded-xl text-primary hover:bg-primary/10 font-bold uppercase tracking-wider text-[10px]"
                >
                  <a
                    href={IA_INSTRUCTIONS_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                    Descargar instrucciones en PDF
                  </a>
                </Button>
              </div>
            </>
          )}

          {paymentModal?.type === 'western' && (
            <>
              <DialogHeader className="text-left space-y-2 pt-3 sm:pt-0 pr-6">
                <Badge className="w-fit bg-yellow-500 text-black font-black uppercase text-[10px]">
                  WESTERN UNION · YA INCLUYE PROMOCIÓN
                </Badge>
                <DialogTitle className="text-lg sm:text-xl font-black uppercase leading-tight text-white">
                  Datos para Giro por Western Union
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-gray-300">
                  Plan seleccionado: <strong className="text-white">{paymentModal.duration}</strong> por{' '}
                  <strong className="text-yellow-400">{paymentModal.amount}</strong> (pago único).
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 space-y-2.5 text-xs sm:text-sm">
                <p className="text-gray-200">
                  <strong className="text-white">Monto a enviar:</strong>{' '}
                  <span className="text-yellow-400 font-black">{paymentModal.amount}</span> ({paymentModal.duration} de acceso)
                </p>
                <div className="rounded-xl bg-black/50 border border-white/10 p-3 space-y-1.5">
                  <p className="text-gray-200 break-words">
                    <strong className="text-white">Nombre:</strong>{' '}
                    {MEMBERSHIP_PAYMENT_CONFIG.westernUnion.recipientName}
                  </p>
                  <p className="text-gray-200">
                    <strong className="text-white">Documento:</strong>{' '}
                    {MEMBERSHIP_PAYMENT_CONFIG.westernUnion.document}
                  </p>
                  <p className="text-gray-200">
                    <strong className="text-white">País:</strong>{' '}
                    {MEMBERSHIP_PAYMENT_CONFIG.westernUnion.country}
                  </p>
                  <p className="text-gray-200">
                    <strong className="text-white">Ciudad:</strong>{' '}
                    {MEMBERSHIP_PAYMENT_CONFIG.westernUnion.city}
                  </p>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Al realizar el giro, envíanos el código MTCN junto con tu correo de registro por WhatsApp o correo para activar tu membresía.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-auto min-h-11 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-wider text-xs whitespace-normal text-center"
                >
                  <a
                    href={MEMBERSHIP_PAYMENT_CONFIG.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 shrink-0" />
                    Enviar código MTCN por WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full h-auto min-h-10 py-2 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-[11px] whitespace-normal text-center"
                >
                  <a
                    href={MEMBERSHIP_PAYMENT_CONFIG.contact.email}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="mr-2 h-4 w-4 shrink-0" />
                    Enviar código MTCN por Correo
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="w-full h-auto min-h-9 py-2 rounded-xl text-primary hover:bg-primary/10 font-bold uppercase tracking-wider text-[10px]"
                >
                  <a
                    href={IA_INSTRUCTIONS_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                    Descargar instrucciones en PDF
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
