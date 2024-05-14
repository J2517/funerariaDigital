import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ChatsController {
    /**
     * Lista todos los mensajes de chat.
     */
    public async index() {
        return Chat.all();
    }

    /**
     * Almacena un nuevo mensaje de chat.
     */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    message: schema.string({}, [
                        rules.required(),
                        rules.maxLength(300),
                    ]),
                    service_execute_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            })

            // Crear el mensaje de chat si la validación pasa
            const chatMessage = await Chat.create(request.body());
            return chatMessage;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Muestra un solo mensaje de chat.
     */
    public async show({ params }: HttpContextContract) {
        return Chat.findOrFail(params.id);
    }

    /**
     * Actualiza un mensaje de chat basado en el identificador y nuevos parámetros.
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    message: schema.string.optional({}, [
                        rules.maxLength(300),
                    ]),
                    service_execute_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            })

            // Actualizar el mensaje de chat si la validación pasa
            const chatMessage = await Chat.findOrFail(params.id);
            chatMessage.merge(request.body());
            await chatMessage.save();
            return chatMessage;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Elimina un mensaje de chat basado en el identificador.
     */
    public async destroy({ params }: HttpContextContract) {
        const chatMessage = await Chat.findOrFail(params.id);
        return chatMessage.delete();
    }
}

