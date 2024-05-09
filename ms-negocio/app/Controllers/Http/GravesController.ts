import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Graves from 'App/Models/Grave'

export default class GravesController {
    /**
    * Lista todas las sepulturas
    */
    public async index() {
        return Graves.all();
    }

    /**
    * Almacena la información de una sepultura
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theGrave = await Graves.create(body);
        return theGrave;
    }

    /**
    * Muestra la información de una sola sepultura
    */
    public async show({ params }: HttpContextContract) {
        return Graves.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una sepultura basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theGrave = await Graves.findOrFail(params.id);
        theGrave.merge(body);
        await theGrave.save();
        return theGrave;
    }

    /**
    * Elimina una sepultura basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theGrave = await Graves.findOrFail(params.id);
        return theGrave.delete();
    }
}
