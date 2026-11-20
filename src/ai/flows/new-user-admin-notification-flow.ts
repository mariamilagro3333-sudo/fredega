
'use server';
/**
 * @fileOverview Flow para enviar una notificación por correo al administrador sobre un nuevo registro.
 *
 * - sendNewUserAdminNotification - Función principal que envía el correo.
 * - NewUserAdminNotificationInput - Tipo de entrada para el flow.
 */

import { z } from 'zod';
import { sendEmail, type EmailPayload } from '@/services/email-service';

const NewUserAdminNotificationInputSchema = z.object({
  firstName: z.string().describe('El nombre de pila del nuevo usuario.'),
  lastName: z.string().describe('El apellido del nuevo usuario.'),
  email: z.string().email().describe('El correo electrónico del nuevo usuario.'),
});
export type NewUserAdminNotificationInput = z.infer<typeof NewUserAdminNotificationInputSchema>;

export async function sendNewUserAdminNotification(input: NewUserAdminNotificationInput): Promise<{ success: boolean; messageId?: string; }> {
    // Email directo del administrador según solicitud del usuario
    const adminEmail = "fredegaproducciones@gmail.com";
    const subject = `¡Nuevo Usuario Registrado en FredegaPro! 🎉`;
    
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #49a9e5;">¡Hola Admin! 👋</h2>
            <p>Un nuevo usuario se ha registrado en la plataforma <strong>fredegapro.com</strong>.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee; margin: 20px 0;">
                <h3 style="margin-top: 0; font-size: 1.1rem; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Detalles del Registro:</h3>
                <ul style="list-style: none; padding-left: 0;">
                    <li><strong>Nombre completo:</strong> ${input.firstName} ${input.lastName}</li>
                    <li><strong>Correo electrónico:</strong> <a href="mailto:${input.email}">${input.email}</a></li>
                    <li><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</li>
                </ul>
            </div>
            
            <p>El usuario ha sido invitado a unirse como miembro tras su registro. ¡La comunidad sigue creciendo! 🚀</p>
            <br>
            <p style="font-size: 0.9rem; color: #777;">Atentamente,<br>Sistema de Notificaciones FredegaPro</p>
        </div>
    `;

    const emailPayload: EmailPayload = {
        to: adminEmail,
        subject: subject,
        html: body,
    };

    try {
        const result = await sendEmail(emailPayload);
        console.log('Notificación de nuevo usuario enviada al admin:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error("Error al enviar la notificación al admin:", error);
        // Devolvemos éxito para no interrumpir el flujo del cliente, pero logueamos el fallo.
        return { success: true }; 
    }
}
