
'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { addDays, subDays, formatISO } from 'date-fns';

const USAGE_LIMIT = 5;
const RESET_DAYS = 2;

export type UsageStatus = {
  allowed: boolean;
  isMember: boolean;
  remaining?: number;
  resetsAt?: string;
  message?: string;
};

function getIp(): string {
    const forwardedFor = headers().get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }
    return headers().get('x-real-ip') || '127.0.0.1';
}

export async function canGenerateExpression(userRole?: string | null): Promise<UsageStatus> {
  if (userRole === 'miembro' || userRole === 'admin') {
    return { allowed: true, isMember: true };
  }

  const ip = getIp();
  const supabaseAdmin = createAdminClient();
  
  const { data, error } = await supabaseAdmin
    .from('usage_tracker')
    .select('*')
    .eq('identifier', ip)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching usage data:', error);
    return { allowed: false, isMember: false, message: 'Error al verificar el uso.' };
  }

  const now = new Date();
  
  if (!data) {
    return { 
      allowed: true, 
      isMember: false, 
      remaining: USAGE_LIMIT - 1,
      resetsAt: formatISO(addDays(now, RESET_DAYS)),
    };
  }

  const lastReset = new Date(data.last_reset);
  const resetTime = subDays(now, RESET_DAYS);

  if (lastReset < resetTime) {
    return { 
      allowed: true, 
      isMember: false, 
      remaining: USAGE_LIMIT - 1, 
      resetsAt: formatISO(addDays(now, RESET_DAYS)) 
    };
  }

  if (data.usage_count >= USAGE_LIMIT) {
    return {
      allowed: false,
      isMember: false,
      remaining: 0,
      resetsAt: formatISO(addDays(lastReset, RESET_DAYS)),
      message: 'Has alcanzado el límite de 5 generaciones gratuitas. ¡Hazte miembro para uso ilimitado!'
    };
  }

  return { 
    allowed: true, 
    isMember: false,
    remaining: USAGE_LIMIT - data.usage_count -1,
    resetsAt: formatISO(addDays(lastReset, RESET_DAYS)),
  };
}

export async function recordExpressionGeneration(userRole?: string | null): Promise<void> {
    if (userRole === 'miembro' || userRole === 'admin') {
      return; 
    }
    
    const identifier = getIp();
    if (!identifier) return;

    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('usage_tracker')
        .select('*')
        .eq('identifier', identifier)
        .single();
    
    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching usage data for recording:', error);
        return;
    }
    
    const now = new Date();

    if (data) {
        const lastReset = new Date(data.last_reset);
        const resetTime = subDays(now, RESET_DAYS);
        
        let newCount;
        let newResetDate;

        if (lastReset < resetTime) {
            newCount = 1;
            newResetDate = now.toISOString();
        } else {
            newCount = data.usage_count + 1;
            newResetDate = data.last_reset;
        }
        
        const { error: updateError } = await supabaseAdmin
            .from('usage_tracker')
            .update({ usage_count: newCount, last_reset: newResetDate })
            .eq('identifier', identifier);

        if (updateError) {
            console.error('Error updating usage count:', updateError);
        }
    } else {
        const { error: insertError } = await supabaseAdmin
            .from('usage_tracker')
            .insert({ identifier, usage_count: 1, last_reset: now.toISOString() });

        if (insertError) {
            console.error('Error inserting new usage record:', insertError);
        }
    }
}
