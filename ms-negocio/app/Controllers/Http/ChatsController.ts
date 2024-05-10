import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat'

export default class ChatsController {
    /**
    * Lista todos los chats
    */
    public async index() {
        return Chat.all();
    }

    /**
    * Almacena la información de un chat
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theChat = await Chat.create(body);
        return theChat;
    }

    /**
    * Muestra la información de un solo chat
    */
    public async show({ params }: HttpContextContract) {
        return Chat.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un chat basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theChat = await Chat.findOrFail(params.id);
        theChat.merge(body);
        await theChat.save();
        return theChat;
    }

    /**
    * Elimina un chat basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theChat = await Chat.findOrFail(params.id);
        return theChat.delete();
    }
}

