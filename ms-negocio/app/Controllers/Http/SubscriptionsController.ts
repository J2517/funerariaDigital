import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SubscriptionsController {
    /**
     * Lista todas las suscripciones
     */
    public async index(){
        return Subscription.all();
    }

    /**
     * Almacena la información de una suscripción
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    start_date: schema.date({},[
                        rules.required(),
                        rules.after('today')]),
                    end_date: schema.date({},[
                        rules.required(),
                        rules.after('today')]),
                    customer_id: schema.number([
                        rules.required(),
                        rules.unsigned()
                    ]),
                    plan_id: schema.number([
                        rules.required(),
                        rules.unsigned()
                    ])
                }),
            });

            // Almacenar la suscripción si la validación pasa
            const subscription = await Subscription.create(payload);
            return subscription;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de una sola suscripción
     */
    public async show({ params }: HttpContextContract) {
        return Subscription.findOrFail(params.id);
    }

    /**
     * Actualiza la información de una suscripción basada en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    start_date: schema.date.optional({},[
                        rules.required(),
                        rules.after('today')]),
                    end_date: schema.date.optional({},[
                        rules.required(),
                        rules.after('today')]),
                    customer_id: schema.number.optional([
                        rules.unsigned()
                    ]),
                    plan_id: schema.number.optional([
                        rules.unsigned()
                    ])
                }),
            });

            // Actualizar la suscripción si la validación pasa
            const subscription = await Subscription.findOrFail(params.id);
            subscription.merge(payload);
            await subscription.save();
            return subscription;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina una suscripción basada en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const subscription = await Subscription.findOrFail(params.id);
        await subscription.delete();
        return { message: 'Subscription deleted successfully' };
    }
}

