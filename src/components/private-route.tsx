'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from './ui/spinner';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si la carga ha terminado y sigue sin haber usuario, redirige al login.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Mientras el estado de autenticación se esté cargando,
  // muestra un spinner. Esta es la única condición para mostrar el spinner.
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
            <Spinner className="h-12 w-12 text-primary" />
        </div>
    );
  }

  // Si la carga ha terminado y hay un usuario, muestra el contenido protegido.
  // Si la carga terminó y no hay usuario, este componente se desmontará en breve
  // por la redirección del useEffect, por lo que un render nulo o un fragmento vacío es seguro.
  return user ? <>{children}</> : null;
}
