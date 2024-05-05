import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'

export default class DriversController {
    /**
    * Lista todos los conductores
    */
    public async index() {
        return Driver.all();
    }

    /**
    * Almacena la información de un conductor
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_conductor = await Driver.create(body);
        return nuevo_conductor;
    }

    /**
    * Muestra la información de un solo conductor
    */
    public async show({ params }: HttpContextContract) {
        return Driver.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un conductor basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_conductor = await Driver.findOrFail(params.id);
        el_conductor.merge(body);
        await el_conductor.save();
        return el_conductor;
    }

    /**
    * Elimina a un conductor basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_conductor = await Driver.findOrFail(params.id);
        return el_conductor.delete();
    }
}

