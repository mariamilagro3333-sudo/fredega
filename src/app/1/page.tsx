
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomePage from '../page';

export default function ForceHomePage() {
    const router = useRouter();

    useEffect(() => {
        // Establecer la bandera para evitar redirección en la raíz
        sessionStorage.setItem('forceHome', 'true');
    }, []);

    // Simplemente renderizamos el contenido de la Home
    return <HomePage />;
}
