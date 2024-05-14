import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class MessagesController {
    /**
     * Lista todos los mensajes
     */
    public async index(){
        return Message.all();
    }

    /**
     * Almacena la información de un mensaje
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    content: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    user_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            });

            // Crear el mensaje si la validación pasa
            const message = await Message.create(payload);
            return message;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
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
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    content: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    user_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            });

            // Actualizar el mensaje si la validación pasa
            const message = await Message.findOrFail(params.id);
            message.merge(payload);
            await message.save();
            return message;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un mensaje basado en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const message = await Message.findOrFail(params.id);
        return message.delete();
    }
}