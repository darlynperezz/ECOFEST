# Configuración de Envío de Correos

El sistema de pedidos personalizados ahora usa **FormSubmit.co**, un servicio gratuito y sin configuración necesaria.

## ¿Cómo funciona?

Cuando un cliente llena el formulario y presiona "Enviar Solicitud por Correo":

1. Los datos se envían a FormSubmit.co
2. FormSubmit.co recibe el correo y **lo envía automáticamente a semillerodarlyn@gmail.com**
3. Se muestra un mensaje de confirmación al usuario

## Ventajas

✅ **Sin configuración de credenciales**  
✅ **Funciona inmediatamente**  
✅ **Gratuito y seguro**  
✅ **No requiere dependencias adicionales**  

## Verificación

1. Abre la aplicación en `http://localhost:5173`
2. Ve al apartado "Pedidos Personalizados"
3. Completa el formulario
4. Presiona "Enviar Solicitud por Correo"
5. El correo debería llegar a `semillerodarlyn@gmail.com` en pocos segundos

## Si el correo no llega

1. **Revisa la carpeta de spam/correo no deseado**
2. **Espera unos segundos** - a veces tarda 10-30 segundos
3. **Verifica el email** - asegúrate de haber ingresado el email correcto en el formulario
4. **Intenta de nuevo** - hay límites de rate (máximo 50 correos por hora desde la misma IP)

## Personalización

Si quieres cambiar el destinatario `semillerodarlyn@gmail.com`:

1. Abre [src/components/CustomOrders.tsx](src/components/CustomOrders.tsx)
2. Busca la línea con `formsubmit.co/ajax/semillerodarlyn@gmail.com`
3. Reemplaza `semillerodarlyn@gmail.com` con el email deseado

Ejemplo:
```typescript
fetch('https://formsubmit.co/ajax/nuevo-email@gmail.com', {
```

## Más detalles

Para información completa sobre FormSubmit: [https://formsubmit.co/](https://formsubmit.co/)

