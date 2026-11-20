
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hourglass, Mail, Home } from 'lucide-react';
import Link from 'next/link';

export default function WaitingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Hourglass className="h-16 w-16 text-primary animate-spin" />
          </div>
          <CardTitle className="text-3xl font-extrabold">¡Tu compra está en proceso!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Estamos esperando a que Hotmart procese el pago y lo apruebe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Una vez se haya completado correctamente, Hotmart te enviará un correo de confirmación. Inmediatamente después, nosotros también te daremos la bienvenida a la membresía y tendrás acceso a todo el contenido exclusivo.
          </p>
          <p className="font-semibold text-foreground">
            Gracias por tu paciencia y por tu intención de unirte a nuestra membresía y ser parte de nuestra familia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline">
              <a href="mailto:contacto@fredegapro.com" target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 h-4 w-4" />
                Contactar a Soporte
              </a>
            </Button>
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
