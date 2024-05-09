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
        const theDriver = await Driver.create(body);
        return theDriver;
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
        const theDriver = await Driver.findOrFail(params.id);
        theDriver.merge(body);
        await theDriver.save();
        return theDriver;
    }

    /**
    * Elimina a un conductor basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theDriver = await Driver.findOrFail(params.id);
        return theDriver.delete();
    }
}

