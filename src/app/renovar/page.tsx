'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, CreditCard, Smartphone, Globe, ScrollText, AlertTriangle, Gift, Mail, MessageCircle, Building } from 'lucide-react';
import { PaymentMethods } from '@/components/payment-methods';
import { ScrollAnchor } from '@/components/scroll-anchor';
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
      whatsapp: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20quisiera%20renovar%20mi%20membresía.%20Adjunto%20mi%20comprobante%20de%20pago.',
      email: 'mailto:contacto@fredegapro.com?subject=Renovación%20de%20Membresía%20-%20Comprobante&body=Hola,%20adjunto%20mi%20comprobante%20de%20pago%20para%20renovar%20mi%20membresía.'
  }
};

const membershipRules = [
    "Su usuario y contraseña es personal e intransferible.",
    "No comparta el contenido privado que viene en los beneficios VIP (materiales, talleres, plugins, enlace del grupo, paquetes, etc.).",
    "Sea asertivo y amable en el grupo de WhatsApp.",
    "El sistema detectará si un usuario ingresa muchas veces desde diferentes direcciones IP o diferentes lugares del mundo.",
    "El incumplimiento de estas reglas conllevará a la suspensión permanente de su cuenta y membresía."
];

export default function RenewPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <section className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          Renueva aquí tu membresía de Fredega
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Mantén tu acceso a contenido exclusivo de producción audiovisual con IA.
        </p>
      </section>

      <section className="mb-6 max-w-3xl mx-auto">
        <Alert>
          <Info className="h-5 w-5" />
          <AlertTitle>Aviso Importante sobre Renovación</AlertTitle>
          <AlertDescription>
            Los pagos son gestionados de forma segura por la plataforma Hotmart. Si configuraste una suscripción recurrente, la renovación se hará automáticamente. <strong>Aunque la renovación sea automática, usted puede cancelar su suscripción en cualquier momento directamente desde Hotmart o contactándonos.</strong> Si prefieres renovar manualmente para aprovechar las ofertas, puedes hacerlo contactándonos.
          </AlertDescription>
        </Alert>
      </section>

      <section className="mb-12 max-w-3xl mx-auto">
        <Alert className="bg-red-600 text-white border-red-700">
          <AlertTriangle className="h-5 w-5 text-white" />
          <AlertTitle className="text-white">Súper Importante</AlertTitle>
          <AlertDescription className="text-white/90">
             <p>Es fundamental que el correo electrónico que coloques al renovar en Hotmart sea el mismo con el que te registraste en FredegaPro para una activación automática y segura.</p>
          </AlertDescription>
        </Alert>
      </section>

      <section className="mb-12 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Renueva tu membresía de forma segura</CardTitle>
                    <CardDescription>Elige uno de nuestros planes de suscripción y paga en línea.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
                <Button asChild size="lg" className="bg-blue-800 hover:bg-blue-700 text-white">
                <Link href={hotmartLinks.sixMonths} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="mr-2" />
                    Renovar Suscripción Semestral ($15 USD)
                </Link>
                </Button>
                <Button asChild size="lg" className="bg-blue-800 hover:bg-blue-700 text-white">
                <Link href={hotmartLinks.annual} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="mr-2" />
                    Renovar Suscripción Anual ($22 USD)
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
                <AlertTitle className="font-bold text-yellow-400">¡OFERTA ESPECIAL DE RENOVACIÓN!</AlertTitle>
                <AlertDescription>
                    <p className="mb-2 font-semibold">
                        ¡Hey! Si renuevas por Nequi, Daviplata, Llave Bre-Be o Western Union, ¡se te duplican los meses de membresía!
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Paga $15 USD (<strong>$40.000 COP</strong>) y recibe <strong>12 meses (1 Año completo)</strong>.</li>
                        <li>Paga $22 USD (<strong>$90.000 COP</strong>) y recibe <strong>24 meses (2 Años completos)</strong>.</li>
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
                    <CardTitle>Opciones de renovación manual</CardTitle>
                    <CardDescription>
                        Paga manualmente a través de Nequi, Daviplata, Llave Bre-Be (Colombia) o Western Union (Internacional).
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
                        <li><strong>Plan Semestral (recibes 12 meses):</strong> $40.000 COP</li>
                        <li><strong>Plan Anual (recibes 24 meses):</strong> $90.000 COP</li>
                    </ul>
                    <p>Envía el dinero al número Nequi:</p>
                    <p className="font-bold text-lg text-center bg-muted p-2 rounded-md">319 545 6391</p>
                    <p>A nombre de: <strong>Fred*** D* L* Gariz****</strong></p>
                    <p>Una vez realizada la transferencia, envíanos el comprobante por WhatsApp o correo para renovar tu acceso.</p>
                    <div className="pt-4 text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button className="w-full bg-blue-800 text-white hover:bg-blue-700">Contáctenos aquí</Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild><a href={manualPaymentLinks.contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2"/> Vía WhatsApp</a></DropdownMenuItem>
                                <DropdownMenuItem asChild><a href="mailto:contacto@fredegapro.com?subject=Renovación%20de%20Membresía%20-%20Comprobante" target="_blank" rel="noopener noreferrer"><Mail className="mr-2"/> Vía Correo</a></DropdownMenuItem>
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
                        <li><strong>Plan Semestral (recibes 12 meses):</strong> $40.000 COP</li>
                        <li><strong>Plan Anual (recibes 24 meses):</strong> $90.000 COP</li>
                    </ul>
                    <p>Envía el dinero al número Daviplata:</p>
                    <p className="font-bold text-lg text-center bg-muted p-2 rounded-md">319 545 6391</p>
                    <p>A nombre de: <strong>Fred*** D* L* Gariz****</strong></p>
                    <p>Una vez realizada la transferencia, envíanos el comprobante por WhatsApp o correo para renovar tu acceso.</p>
                    <div className="pt-4 text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button className="w-full bg-blue-800 text-white hover:bg-blue-700">Contáctenos aquí</Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild><a href={manualPaymentLinks.contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2"/> Vía WhatsApp</a></DropdownMenuItem>
                                <DropdownMenuItem asChild><a href="mailto:contacto@fredegapro.com?subject=Renovación%20de%20Membresía%20-%20Comprobante" target="_blank" rel="noopener noreferrer"><Mail className="mr-2"/> Vía Correo</a></DropdownMenuItem>
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
                  <AlertDialogTitle>Instrucciones para Transferencia con Llave Bre-Be</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="text-sm space-y-4">
                    <p>Realiza la transferencia para el plan deseado (con meses duplicados):</p>
                     <ul className="list-disc pl-5 bg-muted p-3 rounded-md">
                        <li><strong>Plan Semestral (recibes 12 meses):</strong> $40.000 COP</li>
                        <li><strong>Plan Anual (recibes 24 meses):</strong> $90.000 COP</li>
                    </ul>
                    <p>Envía el dinero al número de celular:</p>
                    <p className="font-bold text-lg text-center bg-muted p-2 rounded-md">319 545 6391</p>
                    <p>A nombre de: <strong>Fred*** D* L* Gariz****</strong></p>
                    <p>Una vez realizada la transferencia, contáctanos con el comprobante para renovar tu acceso.</p>
                    <div className="pt-4 text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button className="w-full bg-blue-800 text-white hover:bg-blue-700">Contáctenos aquí</Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild><a href={manualPaymentLinks.contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2"/> Vía WhatsApp</a></DropdownMenuItem>
                                <DropdownMenuItem asChild><a href="mailto:contacto@fredegapro.com?subject=Renovación%20de%20Membresía%20-%20Comprobante" target="_blank" rel="noopener noreferrer"><Mail className="mr-2"/> Vía Correo</a></DropdownMenuItem>
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
                        <AlertDialogTitle>Western Union (Renovación Manual Duplicada)</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex flex-col gap-3 py-4">
                        <div className="text-sm space-y-3 max-h-[60vh] overflow-y-auto pr-4">
                            <p>Selecciona el monto según el plan (¡con meses duplicados!):</p>
                            <ul className="list-disc pl-5 bg-muted p-3 rounded-md">
                                <li><strong>Plan Semestral (recibes 12 meses):</strong> Enviar $15 USD</li>
                                <li><strong>Plan Anual (recibes 24 meses):</strong> Enviar $22 USD</li>
                            </ul>
                            <p><strong>Datos del destinatario:</strong></p>
                            <ul className="list-disc pl-5 bg-muted p-3 rounded-md">
                                <li><strong>Nombre:</strong> FREDY AMIR DE LA HOZ GARIZABALO</li>
                                <li><strong>Documento:</strong> Cédula de Ciudadanía No. 1042440954</li>
                                <li><strong>País:</strong> Colombia</li>
                                <li><strong>Ciudad:</strong> Soledad, Atlántico</li>
                            </ul>
                            <p>Comunícate con nosotros por WhatsApp o correo y envíanos el código MTCN para renovar tu membresía.</p>
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
                                        <a href="mailto:contacto@fredegapro.com?subject=Renovación%20de%20Membresía%20-%20Comprobante" target="_blank" rel="noopener noreferrer"><Mail className="mr-2"/> Vía Correo</a>
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
