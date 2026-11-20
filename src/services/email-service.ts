
'use server';

import nodemailer from 'nodemailer';

export interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

// Configuración del transportador de correo usando variables de entorno.
// Asegúrate de que estas variables estén definidas en tu archivo .env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: parseInt(process.env.SMTP_PORT || '465', 10) === 465, // true para el puerto 465, false para otros
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendEmail(payload: EmailPayload) {
    const options = {
        from: `"Fredega Producciones" <${process.env.SMTP_USER}>`,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
    };

    try {
        const info = await transporter.sendMail(options);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('No se pudo enviar el correo electrónico.');
    }
}
