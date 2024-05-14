import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ChatsController {
    /**
    * Lista todos los chats
    */
    public async index(){
        return Chat.all();
    }

    /**
    * Almacena la información de un chat
    */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    message: schema.string([
                        rules.required(),
                        rules.maxLength(254)]),
                    service_execute_id: schema.number([
                        rules.required(),
                    ]),
                }),
            });

            // Crear el chat si la validación pasa
            const chat = await Chat.create(payload);
            return chat;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
    * Muestra la información de un solo chat
    */
    public async show({ params }: HttpContextContract) {
        return Chat.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un chat basado
    * en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    message: schema.string.optional([
                        rules.required(),
                        rules.maxLength(254)]),
                    service_execute_id: schema.number([
                        rules.required()]),
                }),
            });

            // Actualizar el chat si la validación pasa
            const chat = await Chat.findOrFail(params.id);
            chat.merge(payload);
            await chat.save();
            return chat;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
    * Elimina un chat basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const chat = await Chat.findOrFail(params.id);
        return chat.delete();
    }
}