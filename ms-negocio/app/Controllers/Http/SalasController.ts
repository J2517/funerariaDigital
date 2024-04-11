import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from 'App/Models/Sala'

export default class SalasController {
    /**
    * Lista todas las salas
    */
    public async index() {
        return Sala.all();
    }

    /**
    * Almacena la información de una sala
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nueva_sala = await Sala.create(body);
        return nueva_sala;
    }

    /**
    * Muestra la información de una sola sala
    */
    public async show({ params }: HttpContextContract) {
        return Sala.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una sala basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const la_sala = await Sala.findOrFail(params.id);
        la_sala.merge(body);
        await la_sala.save();
        return la_sala;
    }

    /**
    * Elimina una sala basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const la_sala = await Sala.findOrFail(params.id);
        return la_sala.delete();
    }
}

