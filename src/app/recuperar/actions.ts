
'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { sendRecoveryPassword } from '@/ai/flows/password-recovery-flow';

export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  if (!email) {
    // This case should be caught by client-side validation, but we handle it anyway.
    return { success: false, error: 'Email is required.' };
  }

  const supabaseAdmin = createAdminClient();

  // Find the user by email in the 'usuarios' table to get their ID and name.
  // Using .ilike() for case-insensitive search.
  const { data: user, error: findError } = await supabaseAdmin
    .from('usuarios')
    .select('id, first_name')
    .ilike('email', email)
    .single();
  
  // If the user is not found, we return success to the UI to prevent email enumeration.
  // The user will see the "Check your email" screen, but no email will be sent.
  if (findError || !user) {
    console.warn(`Recovery attempt for unregistered (or not found) email: ${email}`);
    return { success: true };
  }

  const { id: userId, first_name: firstName } = user;
  
  if (!userId) {
    console.error(`Incomplete data for user with email: ${email}`);
    // Again, return success to the UI for security.
    return { success: true };
  }
  
  // We reuse the existing flow that works for the admin panel.
  // The 'firstName' is now optional in the flow, so we pass it if available.
  const result = await sendRecoveryPassword({ userId, email, firstName: firstName || undefined });

  if (result.success) {
    return { success: true };
  } else {
    // If the flow fails, log the error on the server but return success to the UI.
    console.error(`sendRecoveryPassword flow failed for ${email}:`, (result as any).error || (result as any).message || 'Error desconocido');
    return { success: true }; // Obscure the failure from the end client.
  }
}
