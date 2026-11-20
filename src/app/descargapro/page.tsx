
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function DescargaProPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirigir permanentemente a contenidos ya que la sección de programas se ha integrado allí
        router.replace('/contenidos');
    }, [router]);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#020617]">
            <div className="flex flex-col items-center gap-4 text-white">
                <Spinner className="h-10 w-10 text-primary" />
                <p className="text-sm font-black uppercase tracking-widest animate-pulse">Redirigiendo a contenidos...</p>
            </div>
        </div>
    );
}
