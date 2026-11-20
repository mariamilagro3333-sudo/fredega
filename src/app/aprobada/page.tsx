'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, MessageCircle, Mail, Sparkles, UserPlus, Home, Clock, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PurchaseApprovedPage() {
  const contactLinks = {
    whatsapp: 'https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20mi%20compra%20en%20Hotmart%20ha%20sido%20aprobada.%20Solicito%20prioridad%20en%20la%20activación.',
    email: 'mailto:contacto@fredegapro.com?subject=Activación de Membresía - Compra Aprobada',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 py-12">
      <Card className="w-full max-w-2xl shadow-2xl border-green-500/30 overflow-hidden">
        <div className="bg-green-500/10 py-8 flex flex-col items-center justify-center relative overflow-hidden">
            <Sparkles className="absolute top-4 left-4 h-6 w-6 text-green-500 animate-pulse" />
            <Sparkles className="absolute bottom-4 right-4 h-6 w-6 text-green-500 animate-pulse" />
            <CheckCircle2 className="h-20 w-20 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
            <CardTitle className="text-3xl md:text-4xl font-extrabold text-center mt-4 px-4 font-headline">
                ¡Felicidades, ya eres miembro de nuestra plataforma! 🚀
            </CardTitle>
        </div>

        <CardContent className="p-6 md:p-10 space-y-8">
          <p className="text-lg text-center font-medium">
            Estamos muy emocionados de tenerte con nosotros en <strong>Fredega Producciones</strong>. Tu compra ha sido aprobada y ahora solo falta el paso final de activación.
          </p>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xl border-b pb-2">
                <Clock className="h-6 w-6" />
                <h3>¿Qué sigue ahora?</h3>
            </div>
            <p className="text-muted-foreground">
                En pocos minutos recibirás automáticamente un correo electrónico confirmando la activación total de tu membresía.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3 text-sm">
                <p className="font-semibold text-foreground">Por favor, ten en cuenta lo siguiente para que el proceso sea exitoso:</p>
                <ul className="space-y-2">
                    <li className="flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</div>
                        <p><strong>Registro previo:</strong> Asegúrate de que ya te has registrado en nuestra plataforma.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</div>
                        <p><strong>Consistencia de datos:</strong> Es fundamental que tu cuenta en nuestra web esté vinculada al mismo correo electrónico que utilizaste para realizar el pago en Hotmart.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</div>
                        <p><strong>Activación manual:</strong> Si pasan varios minutos y aún no ves tu membresía activa, no te preocupes; significa que el proceso se está realizando manualmente para asegurar que todo esté en orden.</p>
                    </li>
                </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xl border-b pb-2">
                <MessageCircle className="h-6 w-6" />
                <h3>¿Necesitas acelerar el proceso?</h3>
            </div>
            <p className="text-muted-foreground">
                Si el sistema tarda más de lo esperado, puedes comunicarte con nosotros directamente a través de nuestros medios oficiales para que el administrador priorice tu activación:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="w-full justify-start">
                    <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
                        WhatsApp: +57 319 545 6391
                    </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                    <a href={contactLinks.email} target="_blank" rel="noopener noreferrer">
                        <Mail className="mr-2 h-4 w-4 text-primary" />
                        contacto@fredegapro.com
                    </a>
                </Button>
            </div>
            <Alert className="bg-primary/5 border-primary/20">
                <Info className="h-4 w-4" />
                <AlertTitle>Nota sobre horarios</AlertTitle>
                <AlertDescription>
                    Si realizaste tu pago durante la madrugada o altas horas de la noche en Colombia, el administrador activará manualmente tu membresía al amanecer.
                </AlertDescription>
            </Alert>
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xl border-b pb-2">
                <AlertCircle className="h-6 w-6" />
                <h3>¿Usaste un correo diferente o no te has registrado?</h3>
            </div>
            <p className="text-muted-foreground">
                Si realizaste el pago con un correo electrónico distinto al de tu cuenta actual o si aún no te has registrado, por favor regístrate ahora mismo con los datos correctos. El administrador será notificado y procederá a realizar el cruce de información para habilitar tu acceso.
            </p>
            <div className="flex justify-center pt-2">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                    <Link href="/signup">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Registrarse Ahora
                    </Link>
                </Button>
            </div>
          </section>
        </CardContent>

        <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Volver al Inicio
                </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
                <Link href="/account">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Ver Mi Cuenta
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
