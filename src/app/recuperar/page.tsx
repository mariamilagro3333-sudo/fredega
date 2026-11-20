'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { requestPasswordReset } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, MessageCircle, CheckCircle, KeyRound, AlertTriangle } from 'lucide-react';

const recoverySchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
});

type RecoveryFormData = z.infer<typeof recoverySchema>;

export default function RecuperarPage() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const form = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(data: RecoveryFormData) {
    setLoading(true);
    // The server action will always return success to the client to prevent email enumeration.
    // We can directly move to the submitted state.
    try {
      const result = await requestPasswordReset(data.email);
      if (!result.success) {
        console.error('Password reset request error:', result.error);
      }
    } catch (error) {
      console.error('Password reset request exception:', error);
    }
    setIsSubmitted(true);
    setLoading(false);
    setCountdown(60); 
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <CardTitle className="mt-4">¡Revisa tu correo!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Si la dirección de correo electrónico que ingresaste está asociada con una cuenta, te hemos enviado un email con una contraseña provisional.
            </p>
            <p className="text-sm">
                No olvides revisar tu carpeta de spam o correo no deseado.
            </p>
            <div className="mt-6 text-center text-sm">
                <Link href="/login" className="underline text-primary">
                Volver a Iniciar Sesión
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="mt-4">Recuperar Contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para recibir una contraseña provisional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@correo.com" {...field} disabled={loading || countdown > 0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading || countdown > 0}>
                {loading ? 'Enviando...' : (countdown > 0 ? `Reintentar en ${countdown}s` : 'Recuperar Contraseña')}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4 text-sm">
            <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>¿No funciona?</AlertTitle>
                <AlertDescription>
                   Si no recibes el correo o tienes problemas, contáctanos para una recuperación manual.
                   <div className="flex flex-col gap-2 mt-3">
                        <Button asChild size="sm" variant="outline">
                            <a href="https://api.whatsapp.com/send?phone=573195456391&text=Hola,%20necesito%20ayuda%20para%20recuperar%20mi%20contraseña%20en%20fredegapro.com" target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-4 w-4"/> Contactar por WhatsApp
                            </a>
                        </Button>
                         <Button asChild size="sm" variant="outline">
                            <a href="mailto:contacto@fredegapro.com?subject=Ayuda%20para%20recuperar%20contraseña" target="_blank" rel="noopener noreferrer">
                                <Mail className="mr-2 h-4 w-4"/> Contactar por Correo
                            </a>
                        </Button>
                   </div>
                </AlertDescription>
            </Alert>
          <div className="w-full text-center mt-4">
            <Link href="/login" className="underline text-primary">
              Volver a Iniciar Sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
