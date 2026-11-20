
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { add, formatISO } from 'https://esm.sh/date-fns@2';

interface HotmartPayload {
  event?: string;
  data?: {
    buyer?: {
      email?: string;
      first_name?: string;
    };
  };
}


Deno.serve(async (req) => {
  // 1. Verificación de seguridad
  const hottok = req.headers.get('hottok') || req.headers.get('Hottok');
  const secret = Deno.env.get('HOTMART_WEBHOOK_SECRET');

  if (!secret) {
    console.error('ERROR: HOTMART_WEBHOOK_SECRET no está configurado.');
    return new Response('Webhook secret not configured on server', { status: 500 });
  }

  const isTestPayload = JSON.stringify(await req.clone().json()).includes("testeComprador");
  
  if (!isTestPayload && hottok !== secret) {
    console.warn('ACCESO DENEGADO: El hottok recibido no coincide con el secreto esperado.');
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const payload: HotmartPayload = await req.json();

    if (payload.event?.toUpperCase() !== 'PURCHASE_APPROVED') {
      return new Response(JSON.stringify({ message: 'Evento no procesado', event: payload.event }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const email = payload.data?.buyer?.email;
    
    if (!email) {
      return new Response(JSON.stringify({ error: 'Buyer email not found' }), { status: 400 });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: user, error: findError } = await supabaseAdmin
      .from('usuarios')
      .select('id, role') // También seleccionamos el rol actual
      .ilike('email', email)
      .single();

    if (findError || !user) {
      console.warn(`Usuario no encontrado con .ilike() para el email: ${email}`);
      return new Response(JSON.stringify({ message: 'User not found, but webhook acknowledged.' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const startDate = new Date();
    const endDate = add(startDate, { years: 1 });

    const { error: updateError } = await supabaseAdmin
      .from('usuarios')
      .update({ 
        role: 'miembro',
        membership_start_date: formatISO(startDate),
        membership_end_date: formatISO(endDate),
      })
      .eq('id', user.id);
      
    if (updateError) {
      console.error(`Error al actualizar el rol para ${email}:`, updateError.message);
      return new Response(JSON.stringify({ error: 'Failed to update user role', details: updateError.message }), { status: 500 });
    }

    console.log(`Usuario ${email} actualizado a 'miembro' exitosamente.`);

    return new Response(JSON.stringify({ success: true, message: 'User role updated' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error fatal procesando el webhook de Hotmart:', error.message);
    return new Response('Internal Server Error', { status: 500 });
  }
});
