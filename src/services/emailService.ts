import emailjs from '@emailjs/browser';

// Inicializar EmailJS con tu Public Key
// Obtén tu Public Key en: https://dashboard.emailjs.com/admin
export const initEmailJS = () => {
  emailjs.init('YOUR_PUBLIC_KEY'); // Reemplaza con tu Public Key
};

export const sendOrderEmail = async (formData: {
  company: string;
  name: string;
  email: string;
  phone: string;
  productType: string;
  quantity: string;
  details: string;
}) => {
  try {
    // Enviar correo al administrador
    await emailjs.send(
      'SERVICE_ID', // Reemplaza con tu Service ID
      'TEMPLATE_ID', // Reemplaza con tu Template ID
      {
        to_email: 'semillerodarlyn@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        customer_phone: formData.phone,
        company_name: formData.company,
        product_type: formData.productType,
        quantity: formData.quantity,
        details: formData.details,
      }
    );

    // Enviar correo de confirmación al cliente
    await emailjs.send(
      'SERVICE_ID',
      'TEMPLATE_CONFIRMATION_ID', // Plantilla de confirmación
      {
        to_email: formData.email,
        customer_name: formData.name,
        product_type: formData.productType,
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
};
