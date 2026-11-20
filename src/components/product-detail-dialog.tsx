'use client';

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { Product, Entry } from '@/types';
import { VideoPlayer } from './video-player';
import { Button } from './ui/button';
import { 
  Download, Instagram, MessageCircle, Gem, 
  Settings2, Scaling, HardDrive, Zap, 
  Crown, Sparkles, ArrowRight, Rocket, BrainCircuit 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/lib/categories';
import Link from 'next/link';
import { 
  AlertDialog, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import { useAuth } from '@/context/auth-context';
import { useMemo, useState } from 'react';
import { getRecentContent } from '@/lib/all-content';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ProductDetailDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onProductSelect: (product: Product | Entry) => void;
}

export function ProductDetailDialog({ product, isOpen, onOpenChange, onProductSelect }: ProductDetailDialogProps) {
  const { toast } = useToast();
  const { rol } = useAuth();
  const router = useRouter();
  const isMember = rol === 'miembro' || rol === 'admin';
  const [showMemberDialog, setShowMemberDialog] = useState(false);

  const featuredContent = useMemo(() => {
    return getRecentContent(6);
  }, []);

  if (!product) return null;

  const isExclusive = product.isExclusive;
  const isHybrid = (product as any).isHybrid;

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/contenidos?product=${product.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Enlace copiado", description: "Copiado al portapapeles." });
    } catch (err) {
      console.error('Error al copiar el enlace:', err);
      toast({ variant: "destructive", title: "Error al copiar" });
    }
  };
  
  const handleDownloadClick = (link: { url?: string; isExclusive?: boolean }) => {
    if (link.isExclusive && !isMember) {
        setShowMemberDialog(true);
    } else if (link.url) {
        window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-y-auto bg-[#020617] text-white border-white/10">
        
        {/* BANNER SUPERIOR CON VIDEO PANORÁMICO */}
        <div className="relative w-full h-32 md:h-48 overflow-hidden flex items-center justify-center">
            <video 
                src="https://media.fredegapro.com/01/catalogo/PANORAMICO.mp4" 
                autoPlay muted loop playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
            <Rocket className="relative z-10 h-10 w-10 text-primary animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="col-span-1 md:col-span-2 p-6 md:p-10 border-r border-white/5">
            <div className="aspect-video w-full overflow-hidden rounded-[2rem] border-2 border-white/10 bg-black mb-8 shadow-2xl">
              <VideoPlayer src={product.videoUrl} thumbnail={product.coverImage} />
            </div>

            <div className="space-y-8">
                <div className="space-y-2">
                    <p className="text-xs text-primary font-black tracking-[0.3em] uppercase">
                        {product.categories.map(cat => categories.find(c => c.slug === cat)?.name || cat).join(' • ')}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{product.title}</h2>
                    {product.author && <p className="text-base text-gray-400 font-medium">Por <span className="text-primary font-bold">{product.author}</span></p>}
                </div>

                <div className="space-y-8">
                    {product.description && (
                        <div className="text-lg md:text-xl leading-relaxed text-gray-300 font-normal whitespace-pre-wrap">
                            {product.description}
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-white/5">
                        {[
                            { icon: Settings2, label: 'Programa', val: product.compatibility },
                            { icon: Scaling, label: 'Calidad', val: product.resolution },
                            { icon: HardDrive, label: 'Peso', val: product.fileSize },
                            { icon: Zap, label: 'Plugins', val: product.requiresPlugins ? 'Requeridos' : 'Standard' },
                        ].map((info, i) => info.val && (
                            <div key={i} className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <info.icon className="h-4 w-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{info.label}</span>
                                </div>
                                <p className="text-sm font-black uppercase text-white">{info.val}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {isHybrid && product.downloadLinks ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {product.downloadLinks.map((link, index) => (
                                <Button
                                    key={index}
                                    size="lg"
                                    className={cn(
                                        "h-14 rounded-2xl font-black uppercase tracking-widest text-xs",
                                        link.isExclusive ? "bg-accent text-accent-foreground" : "bg-primary text-white"
                                    )}
                                    onClick={() => handleDownloadClick(link)}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    {link.label} {link.isExclusive && <Crown className="ml-2 h-4 w-4" />}
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4">
                            {product.downloadUrl && (
                                <Button
                                    size="lg"
                                    className="flex-1 h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs"
                                    onClick={() => handleDownloadClick({ url: product.downloadUrl, isExclusive })}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Descargar Ahora
                                </Button>
                            )}
                            <Button asChild size="lg" variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 font-black uppercase tracking-widest text-xs">
                                <a href="http://instagram.com/fredegapro" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="mr-2 h-5 w-5" /> Seguir en Instagram
                                </a>
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/5">
                    <Button onClick={handleCopyLink} variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-10 px-6 rounded-full hover:bg-white/5">
                        <Sparkles className="mr-2 h-3 w-3" /> Copiar Enlace
                    </Button>
                    <Button asChild variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-10 px-6 rounded-full hover:bg-white/5">
                        <a href="https://api.whatsapp.com/send?phone=573127042982" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-2 h-3 w-3" /> WhatsApp
                        </a>
                    </Button>
                </div>
            </div>
          </div>

          <aside className="bg-white/[0.02] p-6 md:p-10 space-y-10">
            {/* PANEL DE CONVERSIÓN MASIVA */}
            <div className={cn(
                "p-8 rounded-[2rem] border-2 space-y-6 text-center shadow-2xl relative overflow-hidden group",
                isMember ? "bg-primary/10 border-primary/20" : "bg-accent/10 border-accent/20"
            )}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-lg font-black uppercase tracking-tighter leading-tight relative z-10">
                    DESCARGAR MILES DE PLANTILLAS, EFECTOS Y RECURSOS CON UN SOLO CLIC EN GOOGLE DRIVE AQUÍ
                </h3>
                
                <Button asChild className={cn(
                    "w-full rounded-xl h-14 uppercase font-black text-xs tracking-widest shadow-xl hover:scale-105 transition-transform relative z-10",
                    isMember ? "bg-primary text-white" : "bg-accent text-accent-foreground"
                )}>
                    <Link href="/contenidos">
                        IR A DESCARGAS MASIVAS <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                
                {!isMember && (
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest relative z-10">Beneficio exclusivo para miembros PRO</p>
                )}
            </div>

            <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Sugerencias</h3>
                <div className="grid grid-cols-2 gap-4">
                {/* SUGERENCIA VIP 1: MAESTRÍA IA (NUEVO) */}
                <button 
                    onClick={() => {
                        onOpenChange(false);
                        router.push('/ia');
                    }}
                    className="group text-left space-y-2 col-span-2"
                >
                    <div className="aspect-[21/9] relative rounded-xl overflow-hidden border-2 border-primary/40 bg-black shadow-lg">
                        <video 
                            src="https://media.fredegapro.com/01/catalogo/PANORAMICO2.mp4" 
                            autoPlay muted loop playsInline 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-tight text-primary leading-tight">
                        MAESTRÍA EN EDICIÓN INTELIGENCIA ARTIFICIAL 2026
                    </p>
                </button>

                {featuredContent.map(item => (
                    <button key={item.id} onClick={() => onProductSelect(item)} className="group text-left space-y-2">
                        <div className="aspect-video relative rounded-xl overflow-hidden border border-white/5 bg-black">
                            <Image src={item.coverImage} alt={item.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-all" />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-tight line-clamp-2 text-gray-500 group-hover:text-white transition-colors leading-tight">{item.title}</p>
                    </button>
                ))}
                </div>
            </div>
          </aside>
        </div>

         <AlertDialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
            <AlertDialogContent className="bg-slate-950 border-white/10 rounded-[2.5rem] p-10">
                <AlertDialogHeader>
                    <Gem className="h-12 w-12 text-accent mx-auto mb-4 animate-pulse" />
                    <AlertDialogTitle className="text-center text-2xl font-black uppercase text-white">RECURSO EXCLUSIVO PRO</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-lg pt-2 text-gray-400">
                        Este archivo masivo es parte de los Súper Packs de Google Drive, disponibles solo para miembros.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-4 pt-10 border-t border-white/5 mt-8">
                    <AlertDialogCancel className="w-full sm:w-auto uppercase font-bold text-xs h-14 rounded-2xl border-white/10">Volver</AlertDialogCancel>
                    <Button asChild className="w-full sm:flex-1 h-14 rounded-2xl bg-accent text-black font-black uppercase text-sm">
                        <Link href="/membresia">Hacerme Miembro Ahora</Link>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
    </>
  );
}
