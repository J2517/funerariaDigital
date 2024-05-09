import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'

export default class MessagesController {
    /**
    * Lista todos los mensajes
    */
    public async index() {
        return Message.all();
    }

    /**
    * Almacena la información de un mensaje
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theMessage = await Message.create(body);
        return theMessage;
    }

    /**
    * Muestra la información de un solo mensaje
    */
    public async show({ params }: HttpContextContract) {
        return Message.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un mensaje basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theMessage = await Message.findOrFail(params.id);
        theMessage.merge(body);
        await theMessage.save();
        return theMessage;
    }

    /**
    * Elimina un mensaje basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theMessage = await Message.findOrFail(params.id);
        return theMessage.delete();
    }
}
