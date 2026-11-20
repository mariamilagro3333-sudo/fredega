
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Crown, ArrowRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export default function ExclusiveDownloadsPage() {
    return (
        <div className="container mx-auto py-20 px-4 flex items-center justify-center min-h-[70vh]">
            <Card className="max-w-3xl w-full border-2 border-primary/20 shadow-2xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center space-y-6 pb-2">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative bg-primary text-primary-foreground p-6 rounded-full shadow-xl">
                                <Crown className="h-12 w-12" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline">
                            ¡Mejoramos tu experiencia de descarga!
                        </CardTitle>
                        <CardDescription className="text-lg text-primary font-semibold">
                            Descarga directa habilitada
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-center space-y-8 p-8 md:p-12">
                    <div className="bg-muted/50 p-6 rounded-2xl border border-border/50 space-y-4">
                        <p className="text-xl md:text-2xl leading-relaxed font-medium text-foreground/90">
                            Ahora puede descargar todo el contenido con un solo clic en la misma página de contenidos.
                        </p>
                        <div className="flex items-center justify-center gap-3 text-muted-foreground">
                            <MousePointer2 className="h-5 w-5 text-primary" />
                            <p className="text-base">
                                Al iniciar sesión como miembro te aparecerá un botón de descarga encima de la miniatura del recurso.
                            </p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button asChild size="lg" className="h-16 px-10 text-xl font-bold rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 group">
                            <Link href="/contenidos">
                                IR A DESCARGA DE CONTENIDOS
                                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
