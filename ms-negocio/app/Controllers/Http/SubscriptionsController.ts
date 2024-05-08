import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subcription from 'App/Models/Subcription'

export default class SubscriptionsController {
    /**
    * Lista todas las suscripciones
    */
    public async index() {
        return Subcription.all();
    }

    /**
    * Almacena la información de una suscripción
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nueva_suscripcion = await Subcription.create(body);
        return nueva_suscripcion;
    }

    /**
    * Muestra la información de una sola suscripción
    */
    public async show({ params }: HttpContextContract) {
        return Subcription.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una suscripción basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const la_suscripcion = await Subcription.findOrFail(params.id);
        la_suscripcion.merge(body);
        await la_suscripcion.save();
        return la_suscripcion;
    }

    /**
    * Elimina una suscripción basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const la_suscripcion = await Subcription.findOrFail(params.id);
        return la_suscripcion.delete();
    }
}
