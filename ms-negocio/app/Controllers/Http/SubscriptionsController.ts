import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SubscriptionsController {
    /**
    * Lista todas las suscripciones
    */
    public async index() {
        return Subscription.all();
    }

    /**
    * Almacena la información de una suscripción
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    start_date: schema.date({
                        format: 'yyyy-MM-dd HH:mm:ss'
                    }, [
                        rules.required(),
                    ]),
                    end_date: schema.date({
                        format: 'yyyy-MM-dd HH:mm:ss'
                    }, [
                        rules.required(),
                    ]),
                    customer_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                    plan_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            })

            // Crear la suscripción si la validación pasa
            const theSubscription = await Subscription.create(request.body());
            return theSubscription;
        } catch (error) {
            // Manejar errores
            console.error(error.messages); // Mostrar el mensaje de error en la consola
            return response.status(400).send({ error: error.message }); // Devolver el mensaje de error en la respuesta HTTP
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
            await request.validate({
                schema: schema.create({
                    start_date: schema.date.optional({
                        format: 'yyyy-MM-dd HH:mm:ss'
                    }),
                    end_date: schema.date.optional({
                        format: 'yyyy-MM-dd HH:mm:ss'
                    }),
                    customer_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                    plan_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            })

            // Actualizar la suscripción si la validación pasa
            const theSubscription = await Subscription.findOrFail(params.id);
            theSubscription.merge(request.body());
            await theSubscription.save();
            return theSubscription;
        } catch (error) {
            // Manejar errores
            console.error(error.messages); // Mostrar el mensaje de error en la consola
            return response.status(400).send({ error: error.message }); // Devolver el mensaje de error en la respuesta HTTP
        }
    }

    /**
    * Elimina una suscripción basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theSubscription = await Subscription.findOrFail(params.id);
        return theSubscription.delete();
    }
}
