'use server';
/**
 * @fileOverview Flow para notificar al administrador sobre una nueva inscripción al concurso de cumbia.
 */

import { z } from 'zod';
import { sendEmail } from '@/services/email-service';

export async function sendCumbiaRegistrationNotification(input: any) {
  const adminEmail = "fredegaproducciones@gmail.com";
  const subject = "⚠️ Nueva Inscripción: V Concurso Departamental de Cumbia";
  
  const body = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563EB;">Nueva Inscripción Recibida</h2>
        <p>Se ha registrado una nueva pareja para el <strong>V Concurso Departamental de Parejas Bailadoras de Cumbia</strong>.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee; margin-bottom: 20px;">
            <h3 style="color: #EAB308; border-bottom: 2px solid #EAB308; padding-bottom: 5px;">Datos del Parejo (Hombre)</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li><strong>Nombres:</strong> ${input.parejo.nombres}</li>
                <li><strong>Identidad:</strong> ${input.parejo.tipoIdentificacion} ${input.parejo.numeroIdentidad}</li>
                <li><strong>Edad:</strong> ${input.parejo.edad} años</li>
                <li><strong>Ubicación:</strong> ${input.parejo.ubicacion}</li>
                <li><strong>Dirección:</strong> ${input.parejo.direccion}</li>
                <li><strong>Teléfono:</strong> ${input.parejo.telefono}</li>
                <li><strong>Email:</strong> ${input.parejo.email}</li>
            </ul>
        </div>

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee; margin-bottom: 20px;">
            <h3 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 5px;">Datos de la Pareja (Mujer)</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li><strong>Nombres:</strong> ${input.pareja.nombres}</li>
                <li><strong>Identidad:</strong> ${input.pareja.tipoIdentificacion} ${input.pareja.numeroIdentidad}</li>
                <li><strong>Edad:</strong> ${input.pareja.edad} años</li>
                <li><strong>Ubicación:</strong> ${input.pareja.ubicacion}</li>
                <li><strong>Dirección:</strong> ${input.pareja.direccion}</li>
                <li><strong>Teléfono:</strong> ${input.pareja.telefono}</li>
                <li><strong>Email:</strong> ${input.pareja.email}</li>
            </ul>
        </div>

        ${input.isMinor ? `
        <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; border: 1px solid #fee2e2; margin-bottom: 20px;">
            <h3 style="color: #DC2626; border-bottom: 2px solid #DC2626; padding-bottom: 5px;">Datos del Representante (Menores de edad)</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li><strong>Nombre:</strong> ${input.representante.nombres}</li>
                <li><strong>C.C:</strong> ${input.representante.cc}</li>
                <li><strong>Edad:</strong> ${input.representante.edad} años</li>
                <li><strong>Teléfono:</strong> ${input.representante.telefono}</li>
                <li><strong>Email:</strong> ${input.representante.email}</li>
            </ul>
        </div>
        ` : ''}

        <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; border: 1px solid #dbeafe;">
            <h3 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 5px;">Documentos Adjuntos</h3>
            <p>Puedes ver los archivos cargados en los siguientes enlaces:</p>
            <ul style="list-style: none; padding-left: 0;">
                <li>📄 <strong>ID Parejo:</strong> <a href="${input.docs.parejoIdUrl}" target="_blank">Ver documento</a></li>
                <li>📄 <strong>ID Pareja:</strong> <a href="${input.docs.parejaIdUrl}" target="_blank">Ver documento</a></li>
                ${input.docs.representanteIdUrl ? `<li>📄 <strong>ID Representante:</strong> <a href="${input.docs.representanteIdUrl}" target="_blank">Ver documento</a></li>` : ''}
                ${input.docs.representanteRutUrl ? `<li>📄 <strong>RUT Representante:</strong> <a href="${input.docs.representanteRutUrl}" target="_blank">Ver documento</a></li>` : ''}
            </ul>
        </div>
        
        <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; pt: 10px;">
            Este es un correo automático generado por el sistema de inscripciones de FredegaPro.
        </p>
    </div>
  `;

  try {
    await sendEmail({
        to: adminEmail,
        subject: subject,
        html: body,
    });
    return { success: true };
  } catch (error) {
    console.error("Error al enviar notificación de cumbia:", error);
    return { success: false };
  }
}
