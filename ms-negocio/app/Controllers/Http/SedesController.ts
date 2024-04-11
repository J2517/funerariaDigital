import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sede from 'App/Models/Sede'

export default class SedesController {
    /**
    * Lista todas las sedes
    */
    public async index() {
        return Sede.all();
    }

    /**
    * Almacena la información de una sede
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nueva_sede = await Sede.create(body);
        return nueva_sede;
    }

    /**
    * Muestra la información de una sola sede
    */
    public async show({ params }: HttpContextContract) {
        return Sede.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una sede basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const la_sede = await Sede.findOrFail(params.id);
        la_sede.merge(body);
        await la_sede.save();
        return la_sede;
    }

    /**
    * Elimina una sede basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const la_sede = await Sede.findOrFail(params.id);
        return la_sede.delete();
    }
}

