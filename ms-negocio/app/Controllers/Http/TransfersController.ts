import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transfer from 'App/Models/Transfer'

export default class TrasfersController {
    /**
    * Lista todos los traslados
    */
    public async index() {
        return Transfer.all();
    }

    /**
    * Almacena la información de un traslado
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_traslado = await Transfer.create(body);
        return nuevo_traslado;
    }

    /**
    * Muestra la información de un solo traslado
    */
    public async show({ params }: HttpContextContract) {
        return Transfer.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un traslado basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_traslado = await Transfer.findOrFail(params.id);
        el_traslado.merge(body);
        await el_traslado.save();
        return el_traslado;
    }

    /**
    * Elimina un traslado basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_traslado = await Transfer.findOrFail(params.id);
        return el_traslado.delete();
    }
}

