
'use server'

import { createAdminClient } from '@/lib/supabase/server';
import type { UserProfile } from '@/types';
import { z } from 'zod';
import { sendRecoveryPassword } from '@/ai/flows/password-recovery-flow';
import { sendMembershipEmail } from '@/ai/flows/membership-email-flow';

export async function getAllUsers(): Promise<{ users: UserProfile[] | null; error: string | null }> {
  try {
    const supabaseAdmin = createAdminClient();
    
    const { data, error } = await supabaseAdmin
        .from('usuarios')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users from usuarios table:', error.message);
        return { users: null, error: error.message };
    }

    return { users: data as UserProfile[], error: null };

  } catch (e: any) {
    console.error('Exception in getAllUsers:', e.message);
    return { users: null, error: e.message || 'An unexpected error occurred.' };
  }
}

const updateUserRoleSchema = z.object({
    userId: z.string().uuid(),
    newRole: z.enum(['admin', 'miembro', 'subscriber', 'expirado']),
});

export async function updateUserRole(formData: FormData): Promise<{ success: boolean; error: string | null }> {
    const validatedFields = updateUserRoleSchema.safeParse({
        userId: formData.get('userId'),
        newRole: formData.get('newRole'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            error: 'Datos inválidos. No se pudo actualizar el rol.',
        };
    }

    const { userId, newRole } = validatedFields.data;

    try {
        const supabaseAdmin = createAdminClient();
        
        const { error } = await supabaseAdmin
            .from('usuarios')
            .update({ role: newRole })
            .eq('id', userId);

        if (error) {
            console.error('Error updating user role in usuarios table:', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (e: any) {
        console.error('Exception in updateUserRole:', e.message);
        return { success: false, error: e.message || 'Un error inesperado ocurrió.' };
    }
}

const updateUserMembershipDateSchema = z.object({
  userId: z.string().uuid(),
  dateType: z.enum(['membership_start_date', 'membership_end_date']),
  newDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "La fecha debe ser válida.",
  }),
});

export async function updateUserMembershipDate(formData: FormData): Promise<{ success: boolean, error: string | null }> {
  const validatedFields = updateUserMembershipDateSchema.safeParse({
    userId: formData.get('userId'),
    dateType: formData.get('dateType'),
    newDate: formData.get('newDate'),
  });

  if (!validatedFields.success) {
    console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      error: 'Datos inválidos. No se pudo actualizar la fecha.',
    };
  }
  
  const { userId, dateType, newDate } = validatedFields.data;

  try {
    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
        .from('usuarios')
        .update({ [dateType]: newDate })
        .eq('id', userId);

    if (error) {
      console.error('Error updating membership date:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };

  } catch (e: any) {
    console.error('Exception in updateUserMembershipDate:', e.message);
    return { success: false, error: e.message || 'Un error inesperado ocurrió.' };
  }
}

export async function generateAndSendRecoveryPassword(userId: string, email: string, firstName: string): Promise<{ success: boolean, password?: string, error?: string }> {
  return await sendRecoveryPassword({ userId, email, firstName });
}

export async function sendManualMembershipEmail(email: string): Promise<{ success: boolean, error?: string }> {
    const result = await sendMembershipEmail({ email });
    if (result.success) {
        return { success: true };
    } else {
        console.error('Failed to send manual membership email to:', email);
        return { success: false, error: 'Failed to send membership email.' };
    }
}


export async function deleteUserAccountByAdmin(userId: string): Promise<{ success: boolean; error: string | null }> {
  if (!userId) {
    return { success: false, error: 'User ID is required.' };
  }

  const supabaseAdmin = createAdminClient();

  // Primero, intenta eliminar el usuario de la autenticación.
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);

  // Si el error es "User not found", lo ignoramos porque nuestro objetivo es limpiar el registro de todas formas.
  if (authError && !authError.message.toLowerCase().includes('user not found')) {
    console.error('Error deleting auth user by admin:', authError.message);
    return { success: false, error: 'No se pudo eliminar la cuenta de autenticación. ' + authError.message };
  }

  // Luego, independientemente de si el usuario de autenticación existía o no, eliminamos el registro de la tabla 'usuarios'.
  const { error: dbError } = await supabaseAdmin
    .from('usuarios')
    .delete()
    .eq('id', userId);

  if (dbError) {
    console.error('Error deleting user from usuarios table:', dbError.message);
    return { success: false, error: 'No se pudo eliminar el registro del usuario. ' + dbError.message };
  }

  return { success: true, error: null };
}

export async function bulkDeleteUsers(userIds: string[]): Promise<{ success: boolean; error?: string; detail?: any[] }> {
    if (!userIds || userIds.length === 0) {
        return { success: false, error: 'No se proporcionaron IDs de usuario.' };
    }

    const supabaseAdmin = createAdminClient();
    const results = [];

    for (const userId of userIds) {
        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
        if (authError && !authError.message.toLowerCase().includes('user not found')) {
            console.error(`Bulk delete auth error for user ${userId}:`, authError.message);
            results.push({ userId, status: 'error', reason: `Auth: ${authError.message}` });
            continue; 
        }

        const { error: dbError } = await supabaseAdmin.from('usuarios').delete().eq('id', userId);
        if (dbError) {
            console.error(`Bulk delete DB error for user ${userId}:`, dbError.message);
            results.push({ userId, status: 'error', reason: `DB: ${dbError.message}` });
        } else {
            results.push({ userId, status: 'success' });
        }
    }

    const failed = results.filter(r => r.status === 'error');
    if (failed.length > 0) {
        return { success: false, error: `${failed.length} de ${userIds.length} usuarios no pudieron ser eliminados.`, detail: failed };
    }

    return { success: true };
}


export async function bulkUpdateUserRole(userIds: string[], newRole: 'admin' | 'miembro' | 'subscriber' | 'expirado'): Promise<{ success: boolean; error?: string }> {
    if (!userIds || userIds.length === 0) {
        return { success: false, error: 'No se proporcionaron IDs de usuario.' };
    }

    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('usuarios')
        .update({ role: newRole })
        .in('id', userIds);

    if (error) {
        console.error('Error in bulk role update:', error.message);
        return { success: false, error: `No se pudo actualizar los roles: ${error.message}` };
    }

    return { success: true };
}
