
'use server';
/**
 * @fileOverview Flow para manejar solicitudes de recuperación de contraseña.
 *
 * - sendRecoveryPassword - Genera una contraseña temporal y la envía por correo.
 * - PasswordRecoveryInput - Tipo de entrada para el flow.
 */

import { z } from 'zod';
import { sendEmail, type EmailPayload } from '@/services/email-service';
import { createAdminClient } from '@/lib/supabase/server';

const PasswordRecoveryInputSchema = z.object({
  userId: z.string().uuid().describe('El ID del usuario que solicita el restablecimiento.'),
  email: z.string().email().describe('El correo electrónico del usuario.'),
  firstName: z.string().optional().describe('El nombre del usuario (opcional).'),
});
export type PasswordRecoveryInput = z.infer<typeof PasswordRecoveryInputSchema>;

const PasswordRecoveryOutputSchema = z.object({
  success: z.boolean(),
  password: z.string().optional(),
  error: z.string().optional()
});


export async function sendRecoveryPassword(input: PasswordRecoveryInput): Promise<{ success: boolean; password?: string; error?: string; }> {
    const supabaseAdmin = createAdminClient();
    const temporaryPassword = Math.random().toString(36).slice(-8);

    // 1. Actualizar la contraseña del usuario en Supabase Auth
    const { error: updateUserError } = await supabaseAdmin.auth.admin.updateUserById(input.userId, {
      password: temporaryPassword,
    });

    if (updateUserError) {
      console.error('Error al actualizar la contraseña del usuario:', updateUserError.message);
      return { success: false, error: 'No se pudo actualizar la contraseña en la base de datos.' };
    }
    
    // 2. Preparar y enviar el correo electrónico
    const greeting = input.firstName ? `¡Hola ${input.firstName}!` : '¡Hola!';
    const emailPayload: EmailPayload = {
        to: input.email,
        subject: "🔑 Te enviamos tu contraseña provisional de Fredega Producciones",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>${greeting}</p>
                <p>Has solicitado un cambio de contraseña para tu cuenta en <strong>fredegapro.com</strong>.</p>
                <p>Te proporcionamos una contraseña provisional para que puedas acceder con tu correo: <strong>${input.email}</strong></p>
                <div style="background-color: #f2f2f2; border: 1px solid #ddd; padding: 20px; text-align: center; margin: 20px 0;">
                    <h2 style="margin: 0; font-size: 24px; letter-spacing: 2px;">${temporaryPassword}</h2>
                </div>
                <p><strong>Instrucciones importantes:</strong></p>
                <ol>
                    <li>Ingresa a tu cuenta con esta contraseña provisional.</li>
                    <li>Ve a la sección <strong>"Mi Cuenta"</strong> en tu perfil.</li>
                    <li>Busca la opción para cambiar tu contraseña y establece una nueva que solo tú conozcas.</li>
                </ol>
                <br>
                <p>Atentamente,</p>
                <p>El equipo de Fredega Producciones.</p>
            </div>
        `,
    };

    try {
        const result = await sendEmail(emailPayload);
        console.log(`Correo de recuperación para ${input.email} enviado:`, result.messageId);
        return { success: true, password: temporaryPassword };
    } catch (error) {
        console.error(`Error al enviar correo de recuperación para ${input.email}:`, error);
        // Si el correo falla, es útil saberlo, pero la contraseña ya se actualizó.
        // Aún devolvemos éxito y la contraseña para que el admin pueda dársela manualmente.
        return { success: true, password: temporaryPassword, error: `Contraseña actualizada, pero el correo falló: ${(error as Error).message}` };
    }
}
