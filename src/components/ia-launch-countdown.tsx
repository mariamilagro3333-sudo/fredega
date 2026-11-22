'use client';

import { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// Miércoles 25 de noviembre de 2026 a las 12:00 PM hora Colombia (UTC-5)
export const LAUNCH_TARGET_ISO = '2026-11-25T12:00:00-05:00';
const LAUNCH_TARGET_MS = new Date(LAUNCH_TARGET_ISO).getTime();

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLaunched: boolean;
}

function calculateTimeRemaining(): TimeRemaining {
  const diff = LAUNCH_TARGET_MS - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLaunched: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isLaunched: false };
}

interface IaLaunchCountdownProps {
  variant?: 'hero' | 'banner' | 'compact';
  className?: string;
  align?: 'center' | 'left';
}

export function IaLaunchCountdown({
  variant = 'hero',
  className,
  align = 'center',
}: IaLaunchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isCompact = variant === 'compact';
  const isLeft = align === 'left';

  if (timeLeft?.isLaunched) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 rounded-full bg-emerald-600/20 border border-emerald-500/40 px-4 py-2 text-emerald-300 text-xs font-black uppercase tracking-widest',
          className
        )}
      >
        <Sparkles className="h-4 w-4 text-emerald-400" />
        <span>¡Lanzamiento disponible ahora!</span>
      </div>
    );
  }

  const units = [
    { label: 'Días', value: timeLeft ? String(timeLeft.days).padStart(2, '0') : '--' },
    { label: 'Horas', value: timeLeft ? String(timeLeft.hours).padStart(2, '0') : '--' },
    { label: 'Min', value: timeLeft ? String(timeLeft.minutes).padStart(2, '0') : '--' },
    { label: 'Seg', value: timeLeft ? String(timeLeft.seconds).padStart(2, '0') : '--' },
  ];

  return (
    <div
      className={cn(
        'flex flex-col gap-2.5',
        isLeft ? 'items-center lg:items-start' : 'items-center',
        className
      )}
    >
      <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-yellow-400">
        <Clock className="h-3.5 w-3.5 shrink-0" />
        <span>Lanzamiento: Miércoles 25 Nov · 12:00 PM (Hora Colombia)</span>
      </div>

      <div className={cn('grid grid-cols-4 gap-2 sm:gap-3', isCompact ? 'max-w-xs' : 'max-w-sm w-full')}>
        {units.map((unit) => (
          <div
            key={unit.label}
            className={cn(
              'flex flex-col items-center justify-center rounded-xl border border-white/15 bg-black/60 backdrop-blur-md shadow-lg',
              isCompact ? 'px-2.5 py-2' : 'px-3 py-2.5 sm:py-3'
            )}
          >
            <span
              className={cn(
                'font-black text-white tabular-nums leading-none font-headline',
                isCompact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'
              )}
            >
              {unit.value}
            </span>
            <span className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
