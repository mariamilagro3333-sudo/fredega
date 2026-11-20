
'use client';

export const dynamic = 'force-dynamic';

import { PrivateRoute } from '@/components/private-route';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UsersTable } from '@/components/users-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/'); // Redirect non-admins to home
    }
  }, [isAdmin, loading, router]);

  if (loading) {
    return <div>Verificando permisos...</div>;
  }
  
  if (!isAdmin) {
     return <div>Redirigiendo...</div>;
  }
  
  return (
    <div className="container mx-auto py-10">
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="h-8 w-8 text-green-500" />
                        <div>
                            <CardTitle>Panel de Administración</CardTitle>
                            <CardDescription>
                                Gestiona todos los usuarios registrados en la plataforma.
                            </CardDescription>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href="/admin/correos">
                            <Mail className="mr-2 h-4 w-4" />
                            Enviar Correos
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <UsersTable />
            </CardContent>
        </Card>
    </div>
  );
}

export default function AdminPage() {
    return (
        <PrivateRoute>
            <AdminDashboard />
        </PrivateRoute>
    );
}
