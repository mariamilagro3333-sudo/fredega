'use client';

import { useState } from 'react';
import { 
  Sparkles, Layers, PlayCircle, Target, Package, Users, Activity, 
  Download, Gem, ArrowRight, Lock, Crown, ChevronRight,
  FileVideo, Video, Heart, Star, Clapperboard, GitBranch, ToyBrick, 
  Moon, Briefcase, Cpu, Type, Rocket, Info, CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const superPacksData = [
  { id: 'corporativos', name: 'CORPORATIVOS', icon: Briefcase, url: 'https://drive.google.com/drive/folders/1-2RQLVMxyPDBgO3nvsXadGh4Icxa80VJ?usp=drive_link' },
  { id: 'efectos', name: 'EFECTOS VFX', icon: Sparkles, url: 'https://drive.google.com/drive/folders/1YKSMit3glKeIAtxQYGlBS0BBao1MFbXq?usp=drive_link' },
  { id: 'elementos', name: 'ELEMENTOS Y EFECTOS', icon: Layers, url: 'https://drive.google.com/drive/folders/1zc9h8SPHYheBPe6FbLVc6ud7210QuU5o?usp=drive_link' },
  { id: 'eventos-sociales', name: 'EVENTOS SOCIALES', icon: Heart, url: 'https://drive.google.com/drive/folders/1s8Dz1T-C3Ed4VrETULKJNA_NbvLc_7Ci?usp=drive_link' },
  { id: 'cursos', name: 'CURSOS', icon: GraduationCapIcon, url: 'https://drive.google.com/drive/folders/1ikrsSTbVTMJwaH3x-ejHwxGjV1KWSINK?usp=drive_link' },
  { id: 'motion-graphics', name: 'MOTION GRAPHICS', icon: Activity, url: 'https://drive.google.com/drive/folders/1plI5EC_8tijljyzM78Wlm-NDatqLtDcl?usp=drive_link' },
  { id: 'intros', name: 'INTROS', icon: PlayCircle, url: 'https://drive.google.com/drive/folders/1Q40D2Bm98nKEoQV7PDHgbcti3ukunWIF?usp=drive_link' },
  { id: 'logos', name: 'LOGOS', icon: Target, url: 'https://drive.google.com/drive/folders/1TYB6rPLWQGT9HWZA84GP9dMKPDSA9zKg?usp=drive_link' },
  { id: 'packs', name: 'PAQUETES DE PLANTILLAS', icon: Package, url: 'https://drive.google.com/drive/folders/1F2GKpXpUuzGSZwhjS6ysBkOiKbwFeh1z?usp=drive_link' },
  { id: 'plugins', name: 'PLUGINS Y HERRAMIENTAS', icon: Cpu, url: 'https://drive.google.com/drive/folders/1tlBCLXzsPGnLRi1jpgAa9LoMl_WNoiZz?usp=drive_link' },
  { id: 'redes-sociales', name: 'REDES SOCIALES', icon: Users, url: 'https://drive.google.com/drive/folders/1xyhqDxvVLZrN_jwnCgV_Uys0rENtcfKm?usp=drive_link' },
  { id: 'titulos', name: 'TÍTULOS Y TEXTOS', icon: Type, url: 'https://drive.google.com/drive/folders/1Xk3rsNtdcS2BlBB_OMHcBomMh76DpI4n?usp=drive_link' },
];

function GraduationCapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

interface SuperPackPortalProps {
  onCategorySelect?: (categoryId: string) => void;
  activeCategory?: string;
  showTitle?: boolean;
}

export function SuperPackPortal({ onCategorySelect, activeCategory, showTitle = true }: SuperPackPortalProps) {
  const { rol } = useAuth();
  const isMember = rol === 'miembro' || rol === 'admin';
  const pathname = usePathname();

  return (
    <div className="w-full space-y-10">
      {showTitle && (
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-2">
              <Badge className="bg-primary text-primary-foreground border-none px-6 py-1.5 text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(30,144,255,0.4)] animate-pulse">
                  ACCESO TOTAL EXCLUSIVO
              </Badge>
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white font-headline leading-none max-w-5xl mx-auto">
            DESCARGA MILES DE PLANTILLAS, EFECTOS Y RECURSOS
          </h2>
          <p className="text-lg md:text-2xl text-gray-400 font-normal max-w-3xl mx-auto leading-tight">
              Desbloquea instantáneamente toda nuestra biblioteca masiva organizada en carpetas de Google Drive para <span className="text-primary font-bold">Premiere, After Effects y DaVinci Resolve.</span>
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="h-1 w-32 bg-primary rounded-full" />
            <Link 
              href={pathname === '/contenidos' ? '#descarga-seccion' : '/contenidos#descarga-seccion'}
              className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary hover:text-primary/80 transition-all animate-bounce mt-2 inline-block cursor-pointer"
            >
              ELIJA EL PAQUETE QUE DESEA DESCARGAR ↓
            </Link>
          </div>
        </div>
      )}

      {/* SUPER PACKS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {superPacksData.map((pack) => (
          <button
            key={pack.id}
            onClick={() => onCategorySelect?.(pack.id)}
            className={cn(
              "group relative flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-300 overflow-hidden",
              activeCategory === pack.id 
                ? "bg-primary border-primary text-white shadow-[0_0_30px_rgba(30,144,255,0.3)]" 
                : "bg-white/5 border-white/5 hover:border-primary/50 hover:bg-primary/5 text-gray-400"
            )}
          >
            <pack.icon className={cn(
                "h-8 w-8 mb-3 transition-transform duration-500 group-hover:scale-110",
                activeCategory === pack.id ? "text-white" : "text-primary/70 group-hover:text-primary"
            )} />
            <span className={cn(
                "text-[10px] font-black uppercase tracking-widest text-center leading-tight",
                activeCategory === pack.id ? "text-white" : "text-gray-400 group-hover:text-white"
            )}>
              {pack.name}
            </span>
            {!isMember && (
                <div className="absolute top-2 right-2">
                    <Crown className="h-3 w-3 opacity-20 group-hover:opacity-100 transition-opacity text-accent" />
                </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}