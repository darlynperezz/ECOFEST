import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OrderEmailRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  productType: string;
  quantity: number;
  customizations?: string;
  additionalNotes?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const orderData: OrderEmailRequest = await req.json();

    const emailContent = `
      <h2>Nueva Solicitud de Pedido - EcoFest DOM</h2>

      <h3>Información del Cliente</h3>
      <p><strong>Nombre:</strong> ${orderData.customerName}</p>
      <p><strong>Email:</strong> ${orderData.customerEmail}</p>
      <p><strong>Teléfono:</strong> ${orderData.customerPhone}</p>
      ${orderData.companyName ? `<p><strong>Empresa:</strong> ${orderData.companyName}</p>` : ''}

      <h3>Detalles del Pedido</h3>
      <p><strong>Tipo de Producto:</strong> ${orderData.productType}</p>
      <p><strong>Cantidad:</strong> ${orderData.quantity}</p>
      ${orderData.customizations ? `<p><strong>Personalizaciones:</strong> ${orderData.customizations}</p>` : ''}
      ${orderData.additionalNotes ? `<p><strong>Notas Adicionales:</strong> ${orderData.additionalNotes}</p>` : ''}
    `;

    const confirmationEmailContent = `
      <h2>¡Gracias por tu solicitud!</h2>
      <p>Hola ${orderData.customerName},</p>
      <p>Hemos recibido tu solicitud de pedido personalizado para <strong>${orderData.productType}</strong>.</p>
      <p>Nos pondremos en contacto contigo muy pronto sobre tu orden. Revisa tu correo electrónico para más información.</p>
      <p>Si tienes cualquier pregunta, no dudes en contactarnos.</p>
      <p><strong>EcoFest DOM</strong></p>
    `;

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY no configurada');
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'EcoFest DOM <onboarding@resend.dev>',
        to: ['semillerodarlyn@gmail.com'],
        subject: `Nueva Solicitud de Pedido - ${orderData.customerName}`,
        html: emailContent,
        reply_to: orderData.customerEmail,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al enviar email: ${errorText}`);
    }

    // Enviar correo de confirmación al cliente
    const confirmationRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'EcoFest DOM <onboarding@resend.dev>',
        to: [orderData.customerEmail],
        subject: 'Solicitud de Pedido Recibida - EcoFest DOM',
        html: confirmationEmailContent,
      }),
    });

    if (!confirmationRes.ok) {
      const errorText = await confirmationRes.text();
      throw new Error(`Error al enviar email de confirmación: ${errorText}`);
    }

    const data = await res.json();

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
