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
        const nuevo_chat = await Chat.create(body);
        return nuevo_chat;
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
        const el_chat = await Chat.findOrFail(params.id);
        el_chat.merge(body);
        await el_chat.save();
        return el_chat;
    }

    /**
    * Elimina un chat basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_chat = await Chat.findOrFail(params.id);
        return el_chat.delete();
    }
}

