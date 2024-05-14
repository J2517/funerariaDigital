import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transfer from 'App/Models/Transfer'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TransfersController {
    /**
     * Lista todas las transferencias
     */
    public async index(){
        return Transfer.all();
    }

    /**
     * Almacena la información de una transferencia
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    origin: schema.string({}, [
                        rules.required(),
                        rules.maxLength(255)
                    ]),
                    destination: schema.string({}, [
                        rules.required(),
                        rules.maxLength(255)
                    ]),
                    date: schema.date({},[
                        rules.required(),
                        rules.after('today')]),
                    description: schema.string({}, [
                        rules.required(),
                        rules.maxLength(255)
                    ]),
                    price: schema.number([
                        rules.required(),
                        rules.range(0, Number.MAX_SAFE_INTEGER)
                    ]),
                    service_id: schema.number([
                        rules.required(),
                        rules.unsigned()
                    ])
                }),
            });

            // Almacenar la transferencia si la validación pasa
            const transfer = await Transfer.create(payload);
            return transfer;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de una sola transferencia
     */
    public async show({ params }: HttpContextContract) {
        return Transfer.findOrFail(params.id);
    }

    /**
     * Actualiza la información de una transferencia basada en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    origin: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    destination: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    date: schema.date.optional({},[
                        rules.required(),
                        rules.after('today')]),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    price: schema.number.optional([
                        rules.range(0, Number.MAX_SAFE_INTEGER)
                    ]),
                    service_id: schema.number.optional([
                        rules.unsigned()
                    ])
                }),
            });

            // Actualizar la transferencia si la validación pasa
            const transfer = await Transfer.findOrFail(params.id);
            transfer.merge(payload);
            await transfer.save();
            return transfer;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina una transferencia basada en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const transfer = await Transfer.findOrFail(params.id);
        await transfer.delete();
        return { message: 'Transfer deleted successfully' };
    }
}
