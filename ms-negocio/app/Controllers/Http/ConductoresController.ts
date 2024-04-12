import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductore'

export default class ConductoresController {
    /**
    * Lista todos los conductores
    */
    public async index() {
        return Conductor.all();
    }

    /**
    * Almacena la información de un conductor
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_conductor = await Conductor.create(body);
        return nuevo_conductor;
    }

    /**
    * Muestra la información de un solo conductor
    */
    public async show({ params }: HttpContextContract) {
        return Conductor.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un conductor basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_conductor = await Conductor.findOrFail(params.id);
        el_conductor.merge(body);
        await el_conductor.save();
        return el_conductor;
    }

    /**
    * Elimina a un conductor basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_conductor = await Conductor.findOrFail(params.id);
        return el_conductor.delete();
    }
}

