
'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

function AuthActionRedirect() {
  const router = useRouter();

  useEffect(() => {
    // This page is now a fallback. The primary logic is in /auth/callback.
    // If a user lands here, it's likely after an action, so we redirect them home.
    router.push('/');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <Spinner className="h-8 w-8 mb-4" />
      <p>Completando acción y redirigiendo...</p>
    </div>
  );
}

export default function AuthActionPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
            <AuthActionRedirect />
        </Suspense>
    )
}
