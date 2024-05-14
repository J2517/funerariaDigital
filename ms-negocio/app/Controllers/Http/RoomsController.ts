import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RoomsController {
    /**
     * Lista todas las habitaciones
     */
    public async index(){
        return Room.all();
    }

    /**
     * Almacena la información de una habitación
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string({}, [
                        rules.required(),
                        rules.maxLength(255)
                    ]),
                    capacity: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER)
                    ]),
                    status: schema.boolean.optional(),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    headquarter_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                        rules.range(1, Number.MAX_SAFE_INTEGER)
                    ])
                }),
            });

            // Almacenar la habitación si la validación pasa
            const room = await Room.create(payload);
            return room;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de una sola habitación
     */
    public async show({ params }: HttpContextContract) {
        return Room.findOrFail(params.id);
    }

    /**
     * Actualiza la información de una habitación basada en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    capacity: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER)
                    ]),
                    status: schema.boolean.optional(),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    headquarter_id: schema.number.optional([
                        rules.unsigned(),
                        rules.range(1, Number.MAX_SAFE_INTEGER)
                    ])
                }),
            });

            // Actualizar la habitación si la validación pasa
            const room = await Room.findOrFail(params.id);
            room.merge(payload);
            await room.save();
            return room;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina una habitación basada en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const room = await Room.findOrFail(params.id);
        return room.delete();
    }
}
