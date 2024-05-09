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
        const theSubcription = await Subcription.create(body);
        return theSubcription;
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
        const theSubcription = await Subcription.findOrFail(params.id);
        theSubcription.merge(body);
        await theSubcription.save();
        return theSubcription;
    }

    /**
    * Elimina una suscripción basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theSubcription = await Subcription.findOrFail(params.id);
        return theSubcription.delete();
    }
}

