'use server';
/**
 * @fileOverview Flow para generar y enviar un correo de bienvenida a la membresía.
 *
 * - sendMembershipEmail - Función principal que orquesta la generación del correo.
 * - MembershipEmailInput - Tipo de entrada para el flow.
 */

import { z } from 'zod';
import { sendEmail, type EmailPayload } from '@/services/email-service';

const MembershipEmailInputSchema = z.object({
  email: z.string().email().describe('El correo electrónico del nuevo miembro.'),
});
export type MembershipEmailInput = z.infer<typeof MembershipEmailInputSchema>;

export async function sendMembershipEmail(input: MembershipEmailInput): Promise<{ success: boolean; messageId?: string; }> {
    const subject = "¡Tu membresía FredegaPro está activa!";
    const body = `
      <p>¡Hola! 🎉</p>
      <p>¡Felicidades y bienvenido a la membresía de Fredega Producciones! Estamos muy emocionados de tenerte a bordo y listos para potenciar tu creatividad al máximo.</p>
      
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">¡Ahora tienes acceso total a todos los beneficios PRO!</h2>

      <p>A partir de ahora, tienes acceso exclusivo a todos los beneficios de ser miembro. Puedes iniciar sesión en <b>fredegapro.com</b> y empezar a disfrutar de:</p>
      <ul>
        <li>🎁 Descarga miles de plantillas exclusivas y Súper Packs de Drive.</li>
        <li>✨ ¡Actualizaciones constantes! Más de 100 nuevos recursos cada mes.</li>
        <li>🤖 Curso exclusivo de IA incluido.</li>
        <li>🎬 Acceso a la descarga de todos los cursos sin publicidad.</li>
        <li>📦 Descarga de todo el contenido del catálogo (Fuera de Drive).</li>
        <li>🚀 Acceso a las últimas versiones de los programas Adobe, Davinci y otros para Windows.</li>
        <li>🔥 Grupos exclusivos para miembros por WhatsApp.</li>
        <li>📲 Asesoría y soporte por WhatsApp.</li>
      </ul>
      <p>¡No esperes más para explorar y descargar todo lo que necesites! Estamos aquí para ayudarte a crear proyectos increíbles.</p>
      <p><b>Importante:</b> Puedes ver la fecha de caducidad de tu membresía ingresando a la plataforma y visitando la sección <b>"Mi Cuenta"</b> en tu perfil.</p>
      <p>¡A crear se ha dicho!<br>El equipo de Fredega Producciones</p>
    `;

    const emailPayload: EmailPayload = {
        to: input.email,
        subject: subject,
        html: body,
    };

    try {
        const result = await sendEmail(emailPayload);
        console.log('Correo de bienvenida a la membresía enviado:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error("Error al enviar el correo de membresía:", error);
        return { success: false, messageId: undefined };
    }
}
