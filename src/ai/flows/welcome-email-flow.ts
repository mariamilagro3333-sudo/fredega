'use server';
/**
 * @fileOverview Flow para enviar un correo de bienvenida a los nuevos usuarios.
 */

import { z } from 'zod';
import { sendEmail, type EmailPayload } from '@/services/email-service';

const WelcomeEmailInputSchema = z.object({
  firstName: z.string().describe('El nombre de pila del nuevo usuario.'),
  email: z.string().email().describe('El correo electrónico del nuevo usuario.'),
});
export type WelcomeEmailInput = z.infer<typeof WelcomeEmailInputSchema>;

export async function sendWelcomeEmail(input: WelcomeEmailInput): Promise<{ success: boolean; messageId?: string; }> {
    const subject = "¡Fredega Producciones te da la bienvenida! 🎉";
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>¡Hola ${input.firstName}! 👋</p>
            <p>Soy Freddy De La Hoz y te doy la bienvenida a la plataforma de <b>fredegapro.com</b>. ¡Gracias por registrarte!</p>
            <p>Ahora solo te falta un paso más para desbloquear todo el potencial... <b>¡unirte como miembro!</b> Al hacerlo, tendrás acceso a un mundo de recursos:</p>
            <ul style="padding-left: 20px;">
              <li>🎁 Descarga miles de plantillas exclusivas y Súper Packs de Drive.</li>
              <li>✨ ¡Actualizaciones constantes! Más de 100 nuevos recursos cada mes.</li>
              <li>🤖 Curso exclusivo de IA incluido.</li>
              <li>🎬 Acceso a la descarga de todos los cursos sin publicidad.</li>
              <li>📦 Descarga de todo el contenido del catálogo (Fuera de Drive).</li>
              <li>🔥 Grupos exclusivos para miembros por WhatsApp.</li>
              <li>📲 Asesoría y soporte por WhatsApp.</li>
            </ul>
            <p style="margin-top: 25px; text-align: center;">
                <a href="https://fredegapro.com/membresia" style="background-color:#ff6b00; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-weight:bold; display:inline-block;">¡Hazte Miembro Ahora y Desbloquea Todo!</a>
            </p>
            <p>Gracias a tu apoyo con la membresía, este proyecto puede continuar adelante y seguir creando contenido de calidad para todos.</p>
            <p>Cordialmente,</p>
            <p><b>Freddy De La Hoz Garizábalo</b><br>Fredega Producciones</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size:12px; color:#666; text-align: center;">
              WhatsApp: <a href="https://api.whatsapp.com/send?phone=573195456391">+57 319 545 6391</a><br>
              Instagram: <a href="http://instagram.com/fredegapro">@fredegapro</a><br>
              Correo: contacto@fredegapro.com
            </p>
        </div>
    `;

    const emailPayload: EmailPayload = {
        to: input.email,
        subject: subject,
        html: body,
    };

    try {
        const result = await sendEmail(emailPayload);
        console.log('Correo de bienvenida enviado a:', input.email);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error("Error al enviar el correo de bienvenida:", error);
        return { success: false, messageId: undefined };
    }
}
