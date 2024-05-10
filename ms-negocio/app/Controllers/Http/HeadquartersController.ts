import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headquarter from 'App/Models/Headquarter'

export default class HeadquartersController {
    /**
    * Lista todas las sedes
    */
    public async index() {
        return Headquarter.all();
    }

    /**
    * Almacena la información de una sede
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theHeadquarter = await Headquarter.create(body);
        return theHeadquarter;
    }

    /**
    * Muestra la información de una sola sede
    */
    public async show({ params }: HttpContextContract) {
        return Headquarter.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una sede basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theHeadquarter = await Headquarter.findOrFail(params.id);
        theHeadquarter.merge(body);
        await theHeadquarter.save();
        return theHeadquarter;
    }

    /**
    * Elimina una sede basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theHeadquarter = await Headquarter.findOrFail(params.id);
        return theHeadquarter.delete();
    }
}

