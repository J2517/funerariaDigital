import Env from '@ioc:Adonis/Core/Env'

export default {
  apiKey: Env.get('EPAYCO_API_KEY') as string,
  privateKey: Env.get('EPAYCO_PRIVATE_KEY') as string,
  lang: 'ES', // idioma
  test: true, // cambiar a false en producción
}