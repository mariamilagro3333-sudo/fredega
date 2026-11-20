
'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { use } from 'react';

const updatePasswordSchema = z.object({
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
}).refine(data => data.password, {
    message: "La contraseña no puede estar vacía.",
    path: ["password"],
});


export async function updateUserPassword(password: string): Promise<{ success: boolean, error: string | null }> {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const validatedFields = updatePasswordSchema.safeParse({ password });

    if (!validatedFields.success) {
        return {
            success: false,
            error: validatedFields.error.flatten().fieldErrors.password?.[0] || 'Contraseña inválida.',
        };
    }

    const { error } = await supabase.auth.updateUser({ password: validatedFields.data.password });

    if (error) {
        console.error('Error updating user password:', error.message);
        return { success: false, error: 'No se pudo actualizar la contraseña. ' + error.message };
    }

    // Invalidar todas las sesiones después de un cambio de contraseña
    await supabase.auth.signOut();

    return { success: true, error: null };
}

export async function deleteUserAccount(): Promise<{ success: boolean; error: string | null }> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuario no autenticado.' };
  }

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    console.error('Error deleting user:', error.message);
    return { success: false, error: 'No se pudo eliminar la cuenta. ' + error.message };
  }

  revalidatePath('/');
  return { success: true, error: null };
}
