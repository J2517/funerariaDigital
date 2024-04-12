Para verificar que funcione correctamente el envío de correos se debe correr main.py.
Ruta: http://localhost:5000/send-email
Cuerpo de petición  JSON
{
  "email": "jackria345@gmail.com",
  "subject": "Asunto de prueba",
  "body": "Este es el cuerpo personalizado del mensaje."
}
Recuerde cambiar sus credenciales de acceso en el archivo .env