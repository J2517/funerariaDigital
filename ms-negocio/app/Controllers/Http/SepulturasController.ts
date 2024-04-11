import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sepultura from 'App/Models/Sepultura'

export default class SepulturasController {
    /**
    * Lista todas las sepulturas
    */
    public async index() {
        return Sepultura.all();
    }

    /**
    * Almacena la información de una sepultura
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nueva_sepultura = await Sepultura.create(body);
        return nueva_sepultura;
    }

    /**
    * Muestra la información de una sola sepultura
    */
    public async show({ params }: HttpContextContract) {
        return Sepultura.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una sepultura basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const la_sepultura = await Sepultura.findOrFail(params.id);
        la_sepultura.merge(body);
        await la_sepultura.save();
        return la_sepultura;
    }

    /**
    * Elimina una sepultura basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const la_sepultura = await Sepultura.findOrFail(params.id);
        return la_sepultura.delete();
    }
}
