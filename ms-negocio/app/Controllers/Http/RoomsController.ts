import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RoomsController {
    /**
     * Lista todas las habitaciones.
     */
    public async index() {
        return Room.all();
    }

    /**
     * Almacena una nueva habitación.
     */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string({}, [
                        rules.required(),
                    ]),
                    capacity: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                    status: schema.boolean.optional(),
                    description: schema.string.optional(),
                    headquarter_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            })

            // Crear la habitación si la validación pasa
            const room = await Room.create(request.body());
            return room;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Muestra una sola habitación.
     */
    public async show({ params }: HttpContextContract) {
        return Room.findOrFail(params.id);
    }

    /**
     * Actualiza una habitación basada en el identificador y nuevos parámetros.
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string.optional(),
                    capacity: schema.number.optional([
                        rules.unsigned(),
                    ]),
                    status: schema.boolean.optional(),
                    description: schema.string.optional(),
                    headquarter_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            })

            // Actualizar la habitación si la validación pasa
            const room = await Room.findOrFail(params.id);
            room.merge(request.body());
            await room.save();
            return room;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Elimina una habitación basada en el identificador.
     */
    public async destroy({ params }: HttpContextContract) {
        const room = await Room.findOrFail(params.id);
        return room.delete();
    }
}