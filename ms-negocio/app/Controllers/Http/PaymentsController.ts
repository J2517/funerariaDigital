import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PaymentsController {
    /**
     * Lista todos los pagos.
     */
    public async index() {
        return Payment.all();
    }

    /**
     * Almacena un nuevo pago.
     */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    amount: schema.number([
                        rules.required(),
                    ]),
                    method: schema.string({}, [
                        rules.required(),
                    ]),
                    reference: schema.string({}, [
                        rules.required(),
                    ]),
                    description: schema.string.optional(),
                    date: schema.date({
                        format: 'yyyy-MM-dd HH:mm:ss'
                    }, [
                        rules.required(),
                    ]),
                    subscription_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            })

            // Crear el pago si la validación pasa
            const payment = await Payment.create(request.body());
            return payment;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Muestra un solo pago.
     */
    public async show({ params }: HttpContextContract) {
        return Payment.findOrFail(params.id);
    }

    /**
     * Actualiza un pago basado en el identificador y nuevos parámetros.
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    amount: schema.number.optional(),
                    method: schema.string.optional(),
                    reference: schema.string.optional(),
                    description: schema.string.optional(),
                    date: schema.date.optional({
                        format: 'yyyy-MM-dd HH:mm:ss'
                    }),
                    subscription_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            })

            // Actualizar el pago si la validación pasa
            const payment = await Payment.findOrFail(params.id);
            payment.merge(request.body());
            await payment.save();
            return payment;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Elimina un pago basado en el identificador.
     */
    public async destroy({ params }: HttpContextContract) {
        const payment = await Payment.findOrFail(params.id);
        return payment.delete();
    }
}