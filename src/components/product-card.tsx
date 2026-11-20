
'use client';

import Image from 'next/image';
import {
  Card,
  CardHeader,
} from '@/components/ui/card';
import type { Product, Entry, DownloadLink } from '@/types';
import { Gem, Star, Download, Play, Crown, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from './ui/button';
import Hls from 'hls.js';
import { cn, getHlsProxyUrl } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';

interface ProductCardProps {
  product: Product | Entry;
  onProductClick: (product: Product | Entry) => void;
}

const SoftwareBadgeText = ({ category }: { category: 'after-effects' | 'premiere' | 'davinci-resolve' }) => {
  const styles = {
    'after-effects': { label: 'After Effects', color: 'bg-purple-600' },
    'premiere': { label: 'Premiere', color: 'bg-pink-600' },
    'davinci-resolve': { label: 'Davinci', color: 'bg-red-600' },
  };

  const { label, color } = styles[category];

  return (
    <div className={`flex items-center justify-center rounded-full ${color} px-3 py-1 text-[10px] font-normal text-white shadow-lg backdrop-blur-sm border border-white/10`}>
      {label}
    </div>
  );
};

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { rol, user } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';
  const [isHovered, setIsHovered] = useState(false);
  const [showHybridDialog, setShowHybridDialog] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const softwareCategories = product.categories.filter(
    (cat) => cat === 'after-effects' || cat === 'premiere' || cat === 'davinci-resolve'
  ) as ('after-effects' | 'premiere' | 'davinci-resolve')[];
  
  const isExclusive = 'isExclusive' in product && product.isExclusive;
  const isNew = 'isNew' in product && product.isNew;
  const isFeatured = 'isFeatured' in product && product.isFeatured;
  const isHybrid = 'isHybrid' in product && (product as any).isHybrid;

  const isHLS = product.videoUrl?.includes('.m3u8');
  const hasDirectVideo = product.videoUrl && (
    product.videoUrl.includes('.mp4') || 
    isHLS ||
    product.videoUrl.includes('envatousercontent') || 
    product.videoUrl.includes('motionarray.com') ||
    product.videoUrl.includes('archive.org')
  );

  const finalVideoUrl = isHLS ? getHlsProxyUrl(product.videoUrl) : product.videoUrl;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasDirectVideo) return;

    if (isHLS) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          xhrSetup: (xhr) => {
            xhr.withCredentials = false;
          }
        });
        hlsRef.current = hls;
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error('HLS fatal error in ProductCard:', data);
          }
        });
        hls.loadSource(finalVideoUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = finalVideoUrl;
      }
    } else {
      video.src = product.videoUrl;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [finalVideoUrl, hasDirectVideo, isHLS, product.videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasDirectVideo) return;

    if (isHovered) {
      video.play().catch((err) => {
        console.error('Video play failed in ProductCard:', err);
      });
    } else {
      video.pause();
    }
  }, [isHovered, hasDirectVideo]);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Si es híbrido, abrimos el diálogo de selección inmediata
    if (isHybrid) {
      setShowHybridDialog(true);
      return;
    }

    const url = 'downloadUrl' in product ? product.downloadUrl : undefined;
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleHybridLink = (link: DownloadLink) => {
    if (link.isExclusive && !isMember) {
      // Redirigir a membresía si intenta bajar el completo sin ser miembro
      window.location.href = '/membresia';
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
    setShowHybridDialog(false);
  };

  return (
    <>
      <div 
        className="group relative block cursor-pointer w-full" 
        onClick={() => onProductClick(product)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="h-full w-full overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.05] border-none bg-transparent">
          <CardHeader className="p-0 relative aspect-video rounded-xl overflow-hidden bg-muted w-full">
            <Image
              src={product.coverImage}
              alt={product.title}
              fill
              className={`object-cover w-full h-full transition-opacity duration-500 ${isHovered && hasDirectVideo ? 'opacity-0' : 'opacity-100'}`}
            />
            
            {hasDirectVideo && (
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="auto"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              ></video>
            )}

            <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 z-20 pointer-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-white text-xs md:text-sm font-normal leading-tight line-clamp-2 drop-shadow-lg pr-10 uppercase">
                {product.title}
              </p>
            </div>

            {(isMember || isHybrid) && (
              <div className="absolute bottom-3 right-3 z-30 pointer-events-auto">
                <Button 
                  variant="secondary"
                  size="sm"
                  className="h-9 w-9 rounded-full p-0 shadow-xl border border-white/20 hover:scale-110 transition-transform bg-black/60 hover:bg-primary text-white"
                  onClick={handleDownloadClick}
                  title={isHybrid ? "Seleccionar descarga" : "Descarga Directa"}
                >
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Burbujas informativas */}
            <div className="absolute top-3 left-3 flex flex-col gap-y-2 z-10">
              {isHybrid ? (
                /* Burbuja única para productos híbridos */
                <div className="flex items-center justify-center rounded-full bg-primary/90 text-white px-3 py-1 text-[10px] font-bold shadow-lg backdrop-blur-sm border border-primary/20">
                  <Star className="mr-1.5 h-3 w-3" />
                  PAQUETE
                </div>
              ) : (
                /* Burbujas estándar para productos no híbridos */
                <>
                  {isExclusive ? (
                    <div className="flex items-center justify-center rounded-full bg-accent/90 text-accent-foreground px-3 py-1 text-[10px] font-bold shadow-lg backdrop-blur-sm border border-accent/20">
                      <Gem className="mr-1.5 h-3 w-3" />
                      MIEMBRO
                    </div>
                  ) : (
                    'downloadUrl' in product && product.downloadUrl && (
                      <div className="flex items-center justify-center rounded-full bg-green-600/90 px-3 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm border border-green-500/20">
                        GRATIS
                      </div>
                    )
                  )}
                  
                  {softwareCategories.map((cat) => (
                    <SoftwareBadgeText key={cat} category={cat} />
                  ))}

                  {isNew && (
                    <div className="flex items-center justify-center rounded-full bg-blue-500/90 text-white px-3 py-1 text-[10px] font-bold shadow-lg backdrop-blur-sm border border-blue-400/20">
                      NUEVO
                    </div>
                  )}
                  
                  {isFeatured && (
                    <div className="flex items-center justify-center rounded-full bg-blue-600/90 text-white px-3 py-1 text-[10px] font-bold shadow-lg backdrop-blur-sm border border-blue-400/20">
                      <Star className="mr-1.5 h-3 w-3" />
                      DESTACADO
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </CardHeader>
        </Card>
      </div>

      {/* Diálogo especializado para productos Híbridos */}
      <AlertDialog open={showHybridDialog} onOpenChange={setShowHybridDialog}>
        <AlertDialogContent className="bg-slate-950 border-white/10 rounded-2xl p-6 sm:p-8 max-w-lg shadow-2xl">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/20 text-primary">
                <Download className="h-8 w-8" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-2xl font-bold uppercase tracking-tight text-white">
              Opciones de Descarga
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-400 text-base pt-2">
              Este paquete contiene dos versiones disponibles. Selecciona la que deseas obtener:
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid grid-cols-1 gap-4 py-6">
            {'downloadLinks' in product && product.downloadLinks?.map((link, idx) => (
              <Button
                key={idx}
                variant={link.isExclusive ? "default" : "secondary"}
                className={cn(
                  "h-16 rounded-xl flex items-center justify-between px-6 transition-all hover:scale-[1.02] group",
                  link.isExclusive 
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground border-accent/20" 
                    : "bg-green-600 hover:bg-green-700 text-white border-green-500/20"
                )}
                onClick={() => handleHybridLink(link)}
              >
                <div className="flex flex-col items-start text-left flex-1 min-w-0 mr-2">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                    {link.isExclusive ? "Paquete Miembro" : "Paquete Gratuito"}
                  </span>
                  <span className="text-sm font-bold leading-tight">{link.label}</span>
                </div>
                {link.isExclusive ? (
                  <Crown className={cn("h-6 w-6 shrink-0", !isMember && "animate-pulse")} />
                ) : (
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                )}
              </Button>
            ))}
          </div>

          <AlertDialogFooter className="flex-col sm:flex-row gap-2 border-t border-white/5 pt-4">
            <AlertDialogCancel className="w-full sm:w-auto uppercase font-bold text-xs h-12 rounded-xl mt-0">
              Cancelar
            </AlertDialogCancel>
            {!isMember && (
              <Button asChild className="w-full sm:flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold uppercase text-xs">
                <Link href="/membresia">Ver Beneficios PRO</Link>
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
