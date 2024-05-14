import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PaymentsController {
    /**
     * Lista todos los pagos
     */
    public async index(){
        return Payment.all();
    }

    /**
     * Almacena la información de un pago
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    amount: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                    method: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    reference: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    date: schema.date({},[
                        rules.required(),
                        rules.after('today')]
                    ),
                    user_id: schema.number([
                        rules.unsigned(),
                        rules.required()]),
                    subscription_id: schema.number([
                        rules.unsigned(),
                        rules.required()]),
                }),
            });

            // Crear el pago si la validación pasa
            const payment = await Payment.create(payload);
            return payment;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo pago
     */
    public async show({ params }: HttpContextContract) {
        return Payment.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un pago
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    amount: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                    method: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    reference: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    date: schema.date.optional({}, [
                        rules.after('today'),
                    ]),
                    user_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                    subscription_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            });

            // Actualizar el pago si la validación pasa
            const payment = await Payment.findOrFail(params.id);
            payment.merge(payload);
            await payment.save();
            return payment;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un pago
     */
    public async destroy({ params }: HttpContextContract) {
        const payment = await Payment.findOrFail(params.id);
        await payment.delete();
        return { message: 'Payment deleted successfully' };
    }
}
