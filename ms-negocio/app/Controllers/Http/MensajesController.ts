import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje'

export default class MensajesController {
    /**
    * Lista todos los mensajes
    */
    public async index() {
        return Mensaje.all();
    }

    /**
    * Almacena la información de un mensaje
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_mensaje = await Mensaje.create(body);
        return nuevo_mensaje;
    }

    /**
    * Muestra la información de un solo mensaje
    */
    public async show({ params }: HttpContextContract) {
        return Mensaje.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un mensaje basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_mensaje = await Mensaje.findOrFail(params.id);
        el_mensaje.merge(body);
        await el_mensaje.save();
        return el_mensaje;
    }

    /**
    * Elimina un mensaje basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_mensaje = await Mensaje.findOrFail(params.id);
        return el_mensaje.delete();
    }
}
