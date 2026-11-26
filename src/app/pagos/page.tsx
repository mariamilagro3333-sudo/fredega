'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, CreditCard, Smartphone, Globe, ScrollText, AlertTriangle, Gift, Mail, MessageCircle, Building, FileText } from 'lucide-react';
import { PaymentMethods } from '@/components/payment-methods';
import { ScrollAnchor } from '@/components/scroll-anchor';
import { IA_INSTRUCTIONS_PDF_URL } from '@/lib/ia-curriculum';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const hotmartLinks = {
  sixMonths: "https://pay.hotmart.com/N104679990R?off=tbg912ru",
  annual: "https://pay.hotmart.com/N104679990R?off=x9rxw3oy"
};

const manualPaymentLinks = {
  contact: {
      whatsapp: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20activar%20mi%20membresía.%20Adjunto%20mi%20comprobante%20de%20pago.',
      email: 'mailto:contacto@fredegapro.com?subject=Activación%20de%20Membresía%20-%20Comprobante&body=Hola,%20adjunto%20mi%20comprobante%20de%20pago%20para%20activar%20mi%20membresía.'
  }
};

const membershipRules = [
    "Su usuario y contraseña es personal e intransferible.",
    "No comparta el contenido privado que viene en los beneficios VIP (materiales, talleres, plugins, enlace del grupo, paquetes, etc.).",
    "Sea asertivo y amable en el grupo de WhatsApp.",
    "El sistema detectará si un usuario ingresa muchas veces desde diferentes direcciones IP o diferentes lugares del mundo.",
    "El incumplimiento de estas reglas conllevará a la suspensión permanente de su cuenta y membresía."
];

export default function PaymentsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <section className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          Adquiere aquí tu membresía de Fredega
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Tu acceso a contenido exclusivo de producción audiovisual con IA.
        </p>
        <div className="mt-5">
          <Button asChild variant="outline" size="lg" className="rounded-xl border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold">
            <a href={IA_INSTRUCTIONS_PDF_URL} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" />
              Descargar Instrucciones PDF para hacerse miembro
            </a>
          </Button>
        </div>
      </section>

      <section className="mb-6 max-w-3xl mx-auto">
        <Alert>
          <Info className="h-5 w-5" />
          <AlertTitle>Aviso Importante: Suscripción Recurrente</AlertTitle>
          <AlertDescription>
            Los pagos por Hotmart ahora funcionan bajo un modelo de <strong>suscripción recurrente</strong>. Esto significa que el cobro se realizará automáticamente al finalizar cada periodo (semestral o anual) para que no pierdas el acceso. <strong>Usted puede cancelar la recurrencia cuando desee desde Hotmart o contactándonos en cualquier momento.</strong>
          </AlertDescription>
        </Alert>
      </section>

      <section className="mb-12 max-w-3xl mx-auto">
        <Alert className="bg-red-600 text-white border-red-700">
          <AlertTriangle className="h-5 w-5 text-white" />
          <AlertTitle className="text-white">Súper Importante</AlertTitle>
          <AlertDescription className="text-white/90">
            <p>Es fundamental que el correo electrónico que coloques al pagar en Hotmart sea el mismo con el que te registraste o iniciaste sesión en FredegaPro. Asegúrate de tener una cuenta y haber iniciado sesión aquí antes de comprar para una activación automática segura.</p>
            <br />
            <p>Si por alguna razón la activación de tu membresía no es automática, nuestro equipo será notificado para activarla manualmente.</p>
          </AlertDescription>
        </Alert>
      </section>

      <section className="mb-12 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Paga tu suscripción de forma segura</CardTitle>
                    <CardDescription>Elige tu plan y configura tu suscripción automática en Hotmart.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
                <Button asChild size="lg" className="bg-blue-800 hover:bg-blue-700 text-white h-auto py-3 whitespace-normal text-center">
                <Link href={hotmartLinks.sixMonths} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="mr-2 shrink-0" />
                    Suscripción 6 Meses ($15 dólares · $40.000 pesos colombianos)
                </Link>
                </Button>
                <Button asChild size="lg" className="bg-blue-800 hover:bg-blue-700 text-white h-auto py-3 whitespace-normal text-center">
                <Link href={hotmartLinks.annual} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="mr-2 shrink-0" />
                    Suscripción 1 Año ($22 dólares · $60.000 pesos colombianos)
                </Link>
                </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-3 text-sm text-muted-foreground border">
                <p className="font-semibold text-foreground">Por favor, ten en cuenta lo siguiente para que el proceso sea exitoso:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Registro previo:</strong> Asegúrate de que ya te has registrado en nuestra plataforma.</li>
                    <li><strong>Consistencia de datos:</strong> Es fundamental que tu cuenta en nuestra web esté vinculada al mismo correo electrónico que utilizaste para realizar el pago en Hotmart.</li>
                </ul>
            </div>

             <Alert className="mt-4 border-yellow-500 bg-yellow-500/10 text-foreground text-left">
                <Gift className="h-5 w-5 text-yellow-500" />
                <AlertTitle className="font-bold text-yellow-400">¡OFERTA DE PAGO ÚNICO!</AlertTitle>
                <AlertDescription>
                    <p className="mb-2 font-semibold">
                        Si prefieres no usar suscripción y pagar una sola vez por Nequi, Bre-B, Daviplata o Western Union, ¡te duplicamos el tiempo de acceso!
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Paga $15 dólares (<strong>$40.000 pesos colombianos</strong>) y recibe <strong>12 meses (1 Año completo)</strong>.</li>
                        <li>Paga $22 dólares (<strong>$60.000 pesos colombianos</strong>) y recibe <strong>24 meses (2 Años completos)</strong>.</li>
                    </ul>
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </section>
      
      <section className="mb-12 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
                <Smartphone className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Opciones de pago manual (Sin suscripción)</CardTitle>
                    <CardDescription>
                        Realiza un pago único y recibe el doble de tiempo.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="lg" variant="secondary" className="w-full">
                  <Smartphone className="mr-2" /> Nequi
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Instrucciones para Pago con Nequi</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="text-sm space-y-4">
                    <p>Realiza la transferencia para el plan deseado (con meses duplicados):</p>
                    <ul className="list-disc pl-5 bg-muted p-3 rounded-md">
                        <li><strong>Plan 1 Año (con promoción):</strong> $40.000 pesos colombianos</li>
                        <li><strong>Plan 2 Años (con promoción):</strong> $60.000 pesos colombianos</li>
                    </ul>
                    <p>Envía el dinero al número Nequi:</p>
                    <p className="font-bold text-lg text-center bg-muted p-2 rounded-md">319 545 6391</p>
                    <p>A nombre de: <strong>Fred*** D* L* Gariz****</strong></p>
                    <p>Al terminar, envíanos el comprobante por WhatsApp o correo para activar tu cuenta.</p>
                    <div className="pt-4 text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button className="w-full bg-blue-800 text-white hover:bg-blue-700">Contáctenos aquí</Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild><a href={manualPaymentLinks.contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2"/> Vía WhatsApp</a></DropdownMenuItem>
                                <DropdownMenuItem asChild><a href="mailto:contacto@fredegapro.com?subject=Activación%20de%20Membresía%20-%20Comprobante" target="_blank" rel="noopener noreferrer"><Mail className="mr-2"/> Vía Correo</a></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <AlertDialogFooter><AlertDialogCancel>Cerrar</AlertDialogCancel></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="lg" variant="secondary" className="w-full">
                  <Smartphone className="mr-2" /> Daviplata
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Instrucciones para Pago con Daviplata</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="text-sm space-y-4">
                    <p>Realiza la transferencia para el plan deseado (con meses duplicados):</p>
                    <ul className="list-disc pl-5 bg-muted p-3 rounded-md">
                        <li><strong>Plan 1 Año (con promoción):</strong> $40.000 pesos colombianos</li>
                        <li><strong>Plan 2 Años (con promoción):</strong> $60.000 pesos colombianos</li>
                    </ul>
                    <p>Envía el dinero al número Daviplata:</p>
                    <p className="font-bold text-lg text-center bg-muted p-2 rounded-md">319 545 6391</p>
                    <p>A nombre de: <strong>Fred*** D* L* Gariz****</strong></p>
                    <p>Al terminar, envíanos el comprobante para activar tu acceso.</p>
                    <div className="pt-4 text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button className="w-full bg-blue-800 text-white hover:bg-blue-700">Contáctenos aquí</Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild><a href={manualPaymentLinks.contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2"/> Vía WhatsApp</a></DropdownMenuItem>
                                <DropdownMenuItem asChild><a href="mailto:contacto@fredegapro.com?subject=Activación%20de%20Membresía%20-%20Comprobante" target="_blank" rel="noopener noreferrer"><Mail className="mr-2"/> Vía Correo</a></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <AlertDialogFooter><AlertDialogCancel>Cerrar</AlertDialogCancel></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="lg" variant="secondary" className="w-full">
                  <Building className="mr-2" /> Llave Bre-Be
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Instrucciones para Llave Bre-Be</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="text-sm space-y-4">
                    <p>Usa la opción Llave Bre-Be desde tu app bancaria:</p>
                     <ul className="list-disc pl-5 bg-muted p-3 rounded-md">
                        <li><strong>Plan 1 Año (con promoción):</strong> $40.000 pesos colombianos</li>
                        <li><strong>Plan 2 Años (con promoción):</strong> $60.000 pesos colombianos</li>
                    </ul>
                    <p>Número de celular:</p>
                    <p className="font-bold text-lg text-center bg-muted p-2 rounded-md">319 545 6391</p>
                    <p>A nombre de: <strong>Fred*** D* L* Gariz****</strong></p>
                    <p>Envíanos el comprobante para la activación manual.</p>
                    <div className="pt-4 text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button className="w-full bg-blue-800 text-white hover:bg-blue-700">Contáctenos aquí</Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild><a href={manualPaymentLinks.contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2"/> Vía WhatsApp</a></DropdownMenuItem>
                                <DropdownMenuItem asChild><a href="mailto:contacto@fredegapro.com?subject=Activación%20de%20Membresía%20-%20Comprobante" target="_blank" rel="noopener noreferrer"><Mail className="mr-2"/> Vía Correo</a></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <AlertDialogFooter><AlertDialogCancel>Cerrar</AlertDialogCancel></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="cursor-pointer w-full">
                        <Globe className="mr-2" /> Western Union
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Western Union (Pago Único Duplicado)</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex flex-col gap-3 py-4">
                        <div className="text-sm space-y-3 max-h-[60vh] overflow-y-auto pr-4">
                            <p>Monto a enviar (recibes el doble de tiempo):</p>
                            <ul className="list-disc pl-5 bg-muted p-3 rounded-md">
                                <li><strong>Plan 1 Año (con promoción):</strong> $15 dólares</li>
                                <li><strong>Plan 2 Años (con promoción):</strong> $22 dólares</li>
                            </ul>
                            <p><strong>Datos del destinatario:</strong></p>
                            <ul className="list-disc pl-5 bg-muted p-3 rounded-md">
                                <li><strong>Nombre:</strong> FREDY AMIR DE LA HOZ GARIZABALO</li>
                                <li><strong>Documento:</strong> Cédula de Ciudadanía No. 1042440954</li>
                                <li><strong>País:</strong> Colombia</li>
                                <li><strong>Ciudad:</strong> Soledad, Atlántico</li>
                            </ul>
                            <p>Envíanos el código MTCN por WhatsApp o correo para activar tu membresía.</p>
                        </div>
                        <div className="pt-4 text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="w-full bg-blue-800 text-white hover:bg-blue-700">Contáctenos aquí</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a href={manualPaymentLinks.contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2"/> Vía WhatsApp</a>
                                    </DropdownMenuItem>
                                     <DropdownMenuItem asChild>
                                        <a href="mailto:contacto@fredegapro.com?subject=Activación%20de%20Membresía%20-%20Comprobante" target="_blank" rel="noopener noreferrer"><Mail className="mr-2"/> Vía Correo</a>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12 max-w-5xl mx-auto">
        <ScrollAnchor id="medios-de-pago" />
        <PaymentMethods />
      </section>

      <section className="max-w-3xl mx-auto">
        <Card className="bg-muted/30">
          <CardHeader>
            <div className="flex items-center gap-4">
              <ScrollText className="h-8 w-8 text-primary" />
              <CardTitle>Reglas de la membresía</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              {membershipRules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 text-primary font-bold">📜</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
