
'use client';

export const dynamic = 'force-dynamic';

import { PrivateRoute } from '@/components/private-route';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteUserAccount, updateUserPassword } from './actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, KeyRound, Eye, EyeOff, AlertTriangle, Mail } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const passwordChangeSchema = z.object({
  newPassword: z.string().min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});
type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;


function PasswordChangeForm() {
    const { toast } = useToast();
    const { logout } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<PasswordChangeFormData>({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: PasswordChangeFormData) => {
        setLoading(true);
        const { success, error } = await updateUserPassword(data.newPassword);
        if (success) {
            toast({
                title: 'Contraseña actualizada',
                description: 'Por favor, inicia sesión de nuevo con tu nueva contraseña.',
            });
            await logout();
            router.push('/login');
        } else {
            console.error('Error updating password:', error);
            toast({
                variant: 'destructive',
                title: 'Error al cambiar la contraseña',
                description: error || 'Ocurrió un error inesperado.',
            });
        }
        setLoading(false);
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <KeyRound className="h-6 w-6" />
                    <CardTitle className="text-xl">Cambiar Contraseña</CardTitle>
                </div>
                <CardDescription>
                    Introduce una nueva contraseña para tu cuenta. Se cerrará tu sesión actual.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nueva Contraseña</FormLabel>
                                <FormControl>
                                <div className="relative">
                                    <Input 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="••••••••" 
                                    {...field} 
                                    disabled={loading}
                                    />
                                    <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute inset-y-0 right-0 h-full px-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                    >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                                <FormControl>
                                <div className="relative">
                                    <Input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    placeholder="••••••••" 
                                    {...field} 
                                    disabled={loading}
                                    />
                                     <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute inset-y-0 right-0 h-full px-3"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                         <Button type="submit" disabled={loading}>
                            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}

function DeleteAccountCard() {
    const { logout } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        const { success, error } = await deleteUserAccount();
        if (success) {
            toast({
                title: 'Cuenta eliminada',
                description: 'Tu cuenta ha sido eliminada permanentemente.',
            });
            await logout(); 
            router.push('/');
        } else {
            console.error('Error deleting user account:', error);
            toast({
                variant: 'destructive',
                title: 'Error al eliminar la cuenta',
                description: error || 'Ocurrió un error inesperado.',
            });
        }
        setIsDeleting(false);
    }

    return (
        <Card className='border-destructive/50'>
             <CardHeader>
                <div className='flex items-center gap-4'>
                    <AlertTriangle className='h-6 w-6 text-destructive'/>
                    <CardTitle className='text-xl'>Zona de Peligro</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                 <div className='flex justify-between items-center w-full p-4 border border-destructive/50 rounded-lg bg-destructive/10'>
                    <div>
                        <p className='font-medium'>Eliminar mi cuenta</p>
                        <p className='text-sm text-muted-foreground'>Esta acción es permanente e irreversible.</p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Eliminar Cuenta</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y
                                borrará tus datos de nuestros servidores.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className='bg-destructive hover:bg-destructive/90'
                            >
                                {isDeleting ? 'Eliminando...' : 'Sí, eliminar mi cuenta'}
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
}

function AccountDashboard() {
  const { user, rol, loading, isAdmin } = useAuth();
  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch (err) {
      console.error('Error initializing Supabase browser client in AccountDashboard:', err);
      return null;
    }
  }, []);
  
  const [membershipStartDate, setMembershipStartDate] = useState<string | null>(null);
  const [membershipEndDate, setMembershipEndDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && supabase) {
        try {
          const { data, error } = await supabase.from('usuarios').select('membership_start_date, membership_end_date').eq('id', user.id).single();
          if (error) {
            console.error('Error fetching user profile:', error);
            return;
          }
          if (data) {
            setMembershipStartDate(data.membership_start_date);
            setMembershipEndDate(data.membership_end_date);
          }
        } catch (err) {
          console.error('Exception fetching user profile:', err);
        }
      }
    };
    fetchProfile();
  }, [user, supabase]);
  
  if (loading || !user) {
    return null;
  }
  
  const getDisplayRole = (role: string | null) => {
    if (role === 'subscriber') return 'Invitado';
    if (role === 'miembro') return 'Miembro';
    if (role === 'admin') return 'Administrador';
    if (!role) return 'No asignado';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };
  
  const isMembershipActive = rol === 'admin' || rol === 'miembro';
  const membershipStatus = isMembershipActive ? 'Activa' : 'Inactiva';
  const displayRol = getDisplayRole(rol);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No establecida';
    return format(new Date(dateString), 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
        <Card>
            <CardHeader>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Mi Cuenta</CardTitle>
                        <CardDescription>
                            Gestiona la información de tu perfil y tu membresía.
                        </CardDescription>
                    </div>
                    {isAdmin && (
                        <Button asChild>
                            <Link href="/admin/correos">
                                <Mail className="mr-2 h-4 w-4" />
                                Enviar Correos
                            </Link>
                        </Button>
                    )}
                 </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <p className="text-muted-foreground">{displayRol}</p>
              </div>
               <div className="space-y-4 p-4 border rounded-lg">
                  <div className='flex justify-between items-start'>
                      <div>
                          <Label className='text-base'>Membresía</Label>
                          <p className={`text-sm font-semibold ${isMembershipActive ? 'text-green-500' : 'text-red-500'}`}>{membershipStatus}</p>
                      </div>
                       <Button variant={isMembershipActive ? 'outline' : 'default'} asChild>
                          <Link href={isMembershipActive ? '/renovar' : '/membresia'}>
                            {isMembershipActive ? 'Renovar Membresía' : 'Obtener membresía'}
                          </Link>
                      </Button>
                  </div>
                  {isMembershipActive && (
                    <div className="mt-4 pt-4 border-t space-y-4 text-sm">
                        <div>
                          <p className="font-medium">Fecha de Inicio:</p>
                          <p className="text-muted-foreground">{formatDate(membershipStartDate)}</p>
                        </div>
                         <div>
                          <p className="font-medium">Fecha de Vencimiento:</p>
                          <p className="text-muted-foreground">{formatDate(membershipEndDate)}</p>
                        </div>
                    </div>
                  )}
               </div>

                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Aviso Importante</AlertTitle>
                    <AlertDescription>
                        Si usted acabó de activar la membresía, puede que los detalles de caducidad aparezcan en 3 días hábiles.
                    </AlertDescription>
                </Alert>

            </CardContent>
        </Card>

        <PasswordChangeForm />
        <DeleteAccountCard />
    </div>
  );
}

export default function AccountPage() {
    return (
        <PrivateRoute>
            <AccountDashboard />
        </PrivateRoute>
    );
}
