'use server';

import { createAdminClient } from '@/lib/supabase/server';
import type { UserProfile, SiteNotification } from '@/types';
import { sendEmail } from '@/services/email-service';
import { z } from 'zod';
import { enhanceEmailSubject, enhanceEmailBody } from '@/ai/flows/email-enhancer-flow';
import { revalidatePath } from 'next/cache';

const EmailRecipientGroupSchema = z.enum(['all', 'guests', 'members', 'expired_members', 'expired_role']);
export type EmailRecipientGroup = z.infer<typeof EmailRecipientGroupSchema>;

// Función para asegurar que exista una fila en la tabla de notificaciones.
async function ensureSingleNotificationRow(): Promise<SiteNotification> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('site_notification').select('*').limit(1).single();

    if (error && error.code === 'PGRST116') {
        const { data: newData, error: insertError } = await supabaseAdmin
            .from('site_notification')
            .insert({
                id: 1,
                is_active: false,
                title: 'Bienvenido!',
                content: 'Esta es una notificación de ejemplo.',
                bg_color: '#49a9e5',
            })
            .select()
            .single();
        
        if (insertError) {
            console.error('Error creating initial notification row:', insertError);
            throw new Error('No se pudo crear la fila de notificación inicial.');
        }
        return newData as SiteNotification;
    }
    
    if (error) {
        console.error('Error fetching notification:', error);
        throw new Error('No se pudo obtener la notificación.');
    }
    
    return data as SiteNotification;
}


export async function getEmailRecipients(group: EmailRecipientGroup): Promise<{ email: string }[]> {
  const supabaseAdmin = createAdminClient();
  
  let query = supabaseAdmin.from('usuarios').select('email, role, membership_end_date');

  const { data, error } = await query;
  if (error) {
    console.error(`Error fetching recipients:`, error);
    return [];
  }

  // Filtrado manual robusto
  let filteredData = data || [];
  const now = new Date();

  if (group === 'guests') {
    filteredData = filteredData.filter(u => u.role === 'subscriber');
  } else if (group === 'members') {
    // Miembros activos: Rol miembro/admin Y (fecha fin >= hoy O fecha fin es nula)
    filteredData = filteredData.filter(u => 
        (u.role === 'miembro' || u.role === 'admin') && 
        (!u.membership_end_date || new Date(u.membership_end_date) >= now)
    );
  } else if (group === 'expired_members') {
    // Miembros que ya vencieron por FECHA pero aún tienen el ROL 'miembro'
    filteredData = filteredData.filter(u => 
        u.role === 'miembro' && u.membership_end_date && new Date(u.membership_end_date) < now
    );
  } else if (group === 'expired_role') {
    // Usuarios que ya tienen el rol 'expirado' asignado
    filteredData = filteredData.filter(u => u.role === 'expirado');
  }

  return filteredData.filter(u => u.email).map(u => ({ email: u.email! }));
}


export async function getRecentUsers(): Promise<UserProfile[]> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('usuarios')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
    
    if (error) {
        console.error('Error fetching recent users:', error);
        return [];
    }
    return data;
}

export async function generateEnhancedSubject(input: { subject: string }) {
    return enhanceEmailSubject(input);
}

export async function generateEnhancedBody(input: { body: string, prompt?: string }) {
    return enhanceEmailBody(input);
}

export async function sendBulkEmail(
  recipients: string[],
  subject: string,
  body: string
): Promise<{ successCount: number; failureCount: number; failedEmails: string[] }> {
  // Aseguramos que siempre se envíe a fredegaproducciones@gmail.com
  const adminEmail = "fredegaproducciones@gmail.com";
  const uniqueRecipients = Array.from(new Set([adminEmail, ...recipients]));

  if (!uniqueRecipients.length || !subject || !body) {
    return { successCount: 0, failureCount: uniqueRecipients.length, failedEmails: uniqueRecipients };
  }
  
  let successCount = 0;
  let failureCount = 0;
  const failedEmails: string[] = [];

  const unsubscribeLink = `<p style="text-align:center; font-size:12px; color:#999; margin-top:20px;">Si no quieres recibir más correos, puedes <a href="mailto:contacto@fredegapro.com?subject=Solicitud%20de%20baja%20de%20suscripción" style="color:#999; text-decoration:underline;">darte de baja aquí</a>.</p>`;
  const bodyWithUnsubscribe = `${body}<br><br>${unsubscribeLink}`;

  for (const email of uniqueRecipients) {
    try {
      await sendEmail({ to: email, subject, html: bodyWithUnsubscribe });
      successCount++;
    } catch (error) {
      console.error(`Error enviando correo a ${email}:`, error);
      failureCount++;
      failedEmails.push(email);
    }
  }
  
  return { successCount, failureCount, failedEmails };
}

export async function getNotification(): Promise<SiteNotification | null> {
    try {
        return await ensureSingleNotificationRow();
    } catch (error) {
        console.error('Error fetching notification from supabase:', error);
        return null;
    }
}

export async function updateNotification(notification: Partial<SiteNotification>): Promise<{ success: boolean; data?: SiteNotification; error?: string }> {
    const supabaseAdmin = createAdminClient();
    
    const notificationDataToUpdate = {
        ...notification,
        updated_at: new Date().toISOString(),
    };
    delete notificationDataToUpdate.id; 

    try {
        const { data, error } = await supabaseAdmin
            .from('site_notification')
            .update(notificationDataToUpdate)
            .eq('id', 1)
            .select()
            .single();

        if (error) {
            throw error;
        }
        
        revalidatePath('/');
        revalidatePath('/admin/correos');
        
        return { success: true, data: data as SiteNotification };
    } catch (error: any) {
        console.error('Error updating notification in supabase:', error);
        return { success: false, error: error.message };
    }
}