'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { MoreHorizontal, Search, CalendarIcon, Copy, Trash2, KeyRound, Mail, UserPlus, UserX, ChevronDown, Filter, AlertCircle, Clock, Users, UserMinus } from 'lucide-react';
import { getAllUsers, updateUserRole, updateUserMembershipDate, generateAndSendRecoveryPassword, deleteUserAccountByAdmin, sendManualMembershipEmail, bulkDeleteUsers, bulkUpdateUserRole } from '@/app/admin/actions';
import type { UserProfile } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { format, formatDistanceToNow, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
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
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';

type EditingState = {
  userId: string;
  dateType: 'membership_start_date' | 'membership_end_date';
} | null;

type FilterType = 'all' | 'expired' | 'inactive_subscribers';

export function UsersTable() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const { toast } = useToast();
  
  const [editing, setEditing] = useState<EditingState>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const [generatedPassword, setGeneratedPassword] = useState<{ forUser: string; pass: string } | null>(null);

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { users: fetchedUsers, error } = await getAllUsers();

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error al cargar usuarios',
          description: `No se pudo obtener la lista de usuarios. Error: ${error}`,
        });
        console.error('Error fetching users via server action:', error);
      } else {
        setUsers(fetchedUsers || []);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [toast]);
  
  const filteredUsers = useMemo(() => {
    let result = users;
    
    if (searchTerm) {
        result = result.filter(user => 
            (user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }
    
    if (filterType === 'expired') {
        const now = new Date();
        result = result.filter(user => {
            if (!user.membership_end_date) return false;
            return new Date(user.membership_end_date) < now && user.role === 'miembro';
        });
    }

    if (filterType === 'inactive_subscribers') {
        result = result.filter(user => {
            const daysSinceRegistration = differenceInDays(new Date(), new Date(user.created_at));
            return user.role === 'subscriber' && daysSinceRegistration > 15;
        });
    }
    
    return result;
  }, [users, searchTerm, filterType]);

  const expiredCount = useMemo(() => {
    const now = new Date();
    return users.filter(u => u.membership_end_date && new Date(u.membership_end_date) < now && u.role === 'miembro').length;
  }, [users]);

  const inactiveSubCount = useMemo(() => {
    return users.filter(u => {
        const daysSinceRegistration = differenceInDays(new Date(), new Date(u.created_at));
        return u.role === 'subscriber' && daysSinceRegistration > 15;
    }).length;
  }, [users]);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (userId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUserIds(prev => [...prev, userId]);
    } else {
      setSelectedUserIds(prev => prev.filter(id => id !== userId));
    }
  };
  
  const handleRoleChange = async (userId: string, newRole: string) => {
    const oldUsers = [...users];
    
    setUsers(currentUsers =>
      currentUsers.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    );

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('newRole', newRole);
    
    const { success, error } = await updateUserRole(formData);

    if (error) {
        console.error('Error updating user role:', error);
        setUsers(oldUsers);
        toast({
            variant: 'destructive',
            title: 'Error al cambiar el rol',
            description: error,
        });
    } else {
        toast({
            title: '¡Rol actualizado!',
            description: 'El rol del usuario ha sido cambiado correctamente.',
        });
    }
  };

  const handleDateEdit = (userId: string, dateType: 'membership_start_date' | 'membership_end_date', currentDate: string | null) => {
    setEditing({ userId, dateType });
    setSelectedDate(currentDate ? new Date(currentDate) : undefined);
  };
  
  const handleDateSave = async () => {
    if (!editing || !selectedDate) return;

    const { userId, dateType } = editing;
    const oldUsers = [...users];

    setUsers(currentUsers =>
      currentUsers.map(u => u.id === userId ? { ...u, [dateType]: selectedDate.toISOString() } : u)
    );

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('dateType', dateType);
    formData.append('newDate', selectedDate.toISOString());

    const { success, error } = await updateUserMembershipDate(formData);
    
    if (error) {
      console.error('Error updating membership date:', error);
      setUsers(oldUsers);
      toast({
        variant: 'destructive',
        title: 'Error al actualizar la fecha',
        description: error,
      });
    } else {
      toast({
        title: '¡Fecha actualizada!',
        description: 'La fecha de membresía ha sido actualizada.',
      });
    }
    
    setEditing(null);
    setSelectedDate(undefined);
  };
  
   const handleGeneratePassword = async (userId: string, userEmail: string, firstName: string) => {
    setIsProcessing(prev => ({...prev, [userId]: true}));
    const result = await generateAndSendRecoveryPassword(userId, userEmail, firstName);
    if (result.success && result.password) {
      setGeneratedPassword({ forUser: userEmail, pass: result.password });
      toast({
        title: 'Correo Enviado',
        description: `Se ha enviado la contraseña provisional a ${userEmail}.`,
      });
    } else {
      console.error('Error generating recovery password:', result.error);
      toast({
        variant: 'destructive',
        title: 'Error al enviar correo',
        description: result.error || 'Ocurrió un error inesperado.',
      });
    }
    setIsProcessing(prev => ({...prev, [userId]: false}));
  };

    const handleSendMembershipEmail = async (user: UserProfile) => {
        if (!user.email) {
            toast({ variant: 'destructive', title: 'Faltan datos', description: 'El usuario no tiene un email válido.' });
            return;
        }
        setIsProcessing(prev => ({...prev, [user.id]: true}));
        const { success, error } = await sendManualMembershipEmail(user.email);
        if (success) {
            toast({ title: 'Correo de bienvenida enviado', description: `Se ha enviado el correo a ${user.email}.` });
        } else {
            console.error('Error sending manual membership email:', error);
            toast({ variant: 'destructive', title: 'Error al enviar correo', description: error });
        }
        setIsProcessing(prev => ({...prev, [user.id]: false}));
    };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({ title: 'Copiado', description: 'La contraseña ha sido copiada al portapapeles.' });
      })
      .catch((err) => {
        console.error('Error copying password to clipboard:', err);
        toast({ variant: 'destructive', title: 'Error al copiar', description: 'No se pudo copiar la contraseña.' });
      });
  };

  const handleDeleteUser = async (userId: string, userEmail: string | undefined) => {
    setIsProcessing(prev => ({...prev, [userId]: true}));
    const { success, error } = await deleteUserAccountByAdmin(userId);

    if (success) {
        setUsers(currentUsers => currentUsers.filter(u => u.id !== userId));
        toast({
            title: 'Usuario eliminado',
            description: `La cuenta de ${userEmail} ha sido eliminada.`,
        });
    } else {
        console.error('Error deleting user account:', error);
        toast({
            variant: 'destructive',
            title: 'Error al eliminar',
            description: error,
        });
    }
    setIsProcessing(prev => ({...prev, [userId]: false}));
  }

  const handleBulkDelete = async () => {
    setIsBulkProcessing(true);
    const { success, error } = await bulkDeleteUsers(selectedUserIds);
    if (success) {
      setUsers(currentUsers => currentUsers.filter(u => !selectedUserIds.includes(u.id)));
      toast({ title: `Se han eliminado ${selectedUserIds.length} usuarios.` });
      setSelectedUserIds([]);
    } else {
      console.error('Error in bulk delete:', error);
      toast({ variant: 'destructive', title: 'Error en la eliminación masiva', description: error });
    }
    setIsBulkProcessing(false);
  }

  const handleBulkRoleUpdate = async (newRole: 'miembro' | 'subscriber' | 'expirado') => {
    setIsBulkProcessing(true);
    const { success, error } = await bulkUpdateUserRole(selectedUserIds, newRole);
    if (success) {
      setUsers(currentUsers => currentUsers.map(u => selectedUserIds.includes(u.id) ? { ...u, role: newRole } : u));
      toast({ title: `${selectedUserIds.length} usuarios actualizados a '${newRole}'.` });
      setSelectedUserIds([]);
    } else {
      console.error('Error in bulk role update:', error);
      toast({ variant: 'destructive', title: 'Error en la actualización masiva', description: error });
    }
    setIsBulkProcessing(false);
  }

  const getRoleVariant = (role: string | null) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'subscriber':
        return 'secondary';
      case 'expirado':
        return 'outline';
      default:
        return 'outline';
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No establecido';
    try {
        return format(new Date(dateString), 'dd LLL, yyyy', { locale: es });
    } catch (error) {
        console.error('Error formatting date:', dateString, error);
        return 'Fecha inválida';
    }
  };
  
  const formatRelativeDate = (dateString: string | null) => {
    if (!dateString) return 'Fecha desconocida';
    try {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: es });
    } catch (error) {
        console.error('Error formatting relative date:', dateString, error);
        return 'Fecha inválida';
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full md:w-auto">
                 <div className="relative flex-grow md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Buscar por email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                 </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={filterType !== 'all' ? 'secondary' : 'outline'} className="gap-2">
                            <Filter className="h-4 w-4" />
                            {filterType === 'expired' ? 'Filtrando: Miembros Vencidos' : filterType === 'inactive_subscribers' ? 'Filtrando: Sub +15 días' : 'Filtrar'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={filterType} onValueChange={(v) => setFilterType(v as FilterType)}>
                            <DropdownMenuRadioItem value="all">Ver Todos</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="expired" className="text-amber-500 font-bold">
                                Miembros Vencidos ({expiredCount})
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="inactive_subscribers" className="text-red-500 font-bold">
                                Subscribers +15 días ({inactiveSubCount})
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                 </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium">
                <Badge variant="outline" className="gap-1 px-3 py-1">
                    <Users className="h-3 w-3" /> {users.length} Total
                </Badge>
                <Badge variant="outline" className="gap-1 px-3 py-1 text-amber-500 border-amber-500/30">
                    <AlertCircle className="h-3 w-3" /> {expiredCount} Vencidos
                </Badge>
                <Badge variant="outline" className="gap-1 px-3 py-1 text-red-500 border-red-500/30">
                    <UserMinus className="h-3 w-3" /> {inactiveSubCount} Inactivos
                </Badge>
            </div>
        </div>

        {selectedUserIds.length > 0 && (
            <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
                 <div className="flex items-center gap-2">
                    <Checkbox 
                        checked={selectedUserIds.length === filteredUsers.length}
                        onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-bold text-primary">{selectedUserIds.length} usuario(s) seleccionado(s)</span>
                 </div>
                 <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" disabled={isBulkProcessing} variant="outline" className="gap-2">
                                <KeyRound className="h-3 w-3" /> Cambiar Rol <ChevronDown className="ml-1 h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleBulkRoleUpdate('miembro')}>Hacer Miembros</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkRoleUpdate('subscriber')}>Hacer Subscriber</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkRoleUpdate('expirado')}>Hacer Expirados</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button asChild size="sm" variant="outline" className="gap-2">
                        <Link href={`/admin/correos?bulk=${selectedUserIds.join(',')}`}>
                            <Mail className="h-3 w-3" /> Escribir Correo
                        </Link>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" disabled={isBulkProcessing} className="gap-2">
                                <Trash2 className="h-3 w-3" /> Eliminar
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar {selectedUserIds.length} usuarios?</AlertDialogTitle>
                                <AlertDialogDescription>Esta acción es permanente e irreversible. Se eliminarán todas las cuentas seleccionadas.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleBulkDelete} disabled={isBulkProcessing} className="bg-destructive hover:bg-destructive/90">
                                    {isBulkProcessing ? 'Eliminando...' : 'Sí, eliminar permanentemente'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                 </div>
            </div>
        )}

        <div className="border rounded-lg overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="w-[40px] pl-4">
                        <Checkbox 
                            checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                            onCheckedChange={handleSelectAll}
                        />
                    </TableHead>
                    <TableHead className="font-bold">Usuario / Email</TableHead>
                    <TableHead className="font-bold">Rol</TableHead>
                    <TableHead className="font-bold">Vencimiento</TableHead>
                    <TableHead className="text-right pr-4 font-bold">Gestión</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => {
                        const isExpired = user.membership_end_date && new Date(user.membership_end_date) < new Date() && user.role === 'miembro';
                        const isInactiveSub = user.role === 'subscriber' && differenceInDays(new Date(), new Date(user.created_at)) > 15;
                        
                        return (
                        <TableRow 
                            key={user.id} 
                            className={cn(
                                "transition-colors",
                                isExpired && "bg-amber-500/5 hover:bg-amber-500/10 border-l-4 border-l-amber-500",
                                isInactiveSub && "bg-red-500/5 hover:bg-red-500/10 border-l-4 border-l-red-500",
                                selectedUserIds.includes(user.id) && "bg-primary/5"
                            )}
                        >
                            <TableCell className="pl-4">
                                <Checkbox 
                                    checked={selectedUserIds.includes(user.id)}
                                    onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium flex items-center gap-2">
                                        {user.email}
                                        {isExpired && (
                                            <Badge variant="outline" className="text-[9px] h-4 px-1.5 uppercase font-black border-amber-500 text-amber-500 bg-amber-500/10 gap-1">
                                                <Clock className="h-2 w-2" /> Vencido
                                            </Badge>
                                        )}
                                        {isInactiveSub && (
                                            <Badge variant="outline" className="text-[9px] h-4 px-1.5 uppercase font-black border-red-500 text-red-500 bg-red-500/10 gap-1">
                                                <UserMinus className="h-2 w-2" /> Inactivo +15d
                                            </Badge>
                                        )}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Registrado {formatRelativeDate(user.created_at)}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                {user.role === 'miembro' ? (
                                    <Badge className="bg-yellow-500 text-black font-bold text-[10px] uppercase">{user.role}</Badge>
                                ) : (
                                    <Badge variant={getRoleVariant(user.role)} className="text-[10px] uppercase font-bold">{user.role || 'N/A'}</Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <Popover
                                    open={editing?.userId === user.id && editing?.dateType === 'membership_end_date'}
                                    onOpenChange={(isOpen) => !isOpen && setEditing(null)}
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={cn(
                                                "h-8 px-2 text-xs gap-2 font-medium hover:bg-muted",
                                                isExpired ? "text-amber-500 font-bold" : "text-muted-foreground"
                                            )}
                                            onClick={() => handleDateEdit(user.id, 'membership_end_date', user.membership_end_date)}
                                        >
                                            <CalendarIcon className="h-3 w-3" />
                                            {user.membership_end_date ? formatDate(user.membership_end_date) : "Sin fecha"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                                        <div className="p-2 border-t flex justify-end gap-2 bg-muted/30">
                                            <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>Cancelar</Button>
                                            <Button size="sm" onClick={handleDateSave}>Actualizar</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell className="text-right pr-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Acciones de Usuario</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleGeneratePassword(user.id, user.email || '', user.first_name || '')} className="cursor-pointer gap-2">
                                            <KeyRound className="h-4 w-4" /> Enviar Clave Provisional
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleSendMembershipEmail(user)} disabled={user.role !== 'miembro'} className="cursor-pointer gap-2">
                                            <Mail className="h-4 w-4" /> Enviar Bienvenida Membresía
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Cambiar Rol</DropdownMenuLabel>
                                        <DropdownMenuRadioGroup value={user.role || ''} onValueChange={(newRole) => handleRoleChange(user.id, newRole)}>
                                            <DropdownMenuRadioItem value="admin">Administrador</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="miembro">Miembro PRO</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="subscriber">Subscriber</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="expirado">Expirado</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                        <DropdownMenuSeparator />
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive gap-2 cursor-pointer">
                                                    <Trash2 className="h-4 w-4" /> Eliminar cuenta
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
                                                    <AlertDialogDescription>Esto borrará permanentemente la cuenta de <strong>{user.email}</strong>.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteUser(user.id, user.email)} className="bg-destructive hover:bg-destructive/90">Eliminar ahora</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )})
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-40 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Search className="h-8 w-8 opacity-20" />
                                <p>No se encontraron resultados para los filtros aplicados.</p>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>

         <AlertDialog open={!!generatedPassword} onOpenChange={(open) => !open && setGeneratedPassword(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Nueva Clave Provisional</AlertDialogTitle>
                    <AlertDialogDescription>Cópiala y envíasela al usuario manualmente si el correo no llegara. El email automático ya fue disparado.</AlertDialogDescription>
                </AlertDialogHeader>
                <div className="my-4 p-4 bg-muted rounded-xl font-mono text-xl text-center tracking-[0.2em] relative border border-primary/20">
                    {generatedPassword?.pass}
                    <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2" onClick={() => copyToClipboard(generatedPassword?.pass || '')}>
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setGeneratedPassword(null)}>Cerrar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
