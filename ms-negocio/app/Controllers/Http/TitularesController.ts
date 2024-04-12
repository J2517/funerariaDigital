import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Titular from 'App/Models/Titulare'

export default class TitularesController {
    /**
    * Lista todos los titulares
    */
    public async index() {
        return Titular.all();
    }

    /**
    * Almacena la información de un titular
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_titular = await Titular.create(body);
        return nuevo_titular;
    }

    /**
    * Muestra la información de un solo titular
    */
    public async show({ params }: HttpContextContract) {
        return Titular.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un titular basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_titular = await Titular.findOrFail(params.id);
        el_titular.merge(body);
        await el_titular.save();
        return el_titular;
    }

    /**
    * Elimina a un titular basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_titular = await Titular.findOrFail(params.id);
        return el_titular.delete();
    }
}

