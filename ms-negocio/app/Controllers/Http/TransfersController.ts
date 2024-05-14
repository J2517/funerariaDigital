import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transfer from 'App/Models/Transfer'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TransfersController {
    /**
    * Lista todas las transferencias
    */
    public async index() {
        return Transfer.all();
    }

    /**
    * Almacena la información de una transferencia
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    origin: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    destination: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    date: schema.date({}, [
                        rules.required(),
                    ]),
                    description: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    price: schema.number([
                        rules.required(),
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            })

            // Crear la transferencia si la validación pasa
            const theTransfer = await Transfer.create(request.body());
            return theTransfer;
        } catch (error) {
            return response.status(400).send(error.messages)
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
            await request.validate({
                schema: schema.create({
                    origin: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    destination: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    date: schema.date.optional({ format: 'yyyy-MM-dd HH:mm:ss' }),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    price: schema.number.optional([
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            })

            // Actualizar la transferencia si la validación pasa
            const theTransfer = await Transfer.findOrFail(params.id);
            theTransfer.merge(request.body());
            await theTransfer.save();
            return theTransfer;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina una transferencia basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theTransfer = await Transfer.findOrFail(params.id);
        return theTransfer.delete();
    }
}