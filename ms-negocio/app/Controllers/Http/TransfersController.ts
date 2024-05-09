import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transfer from 'App/Models/Transfer'

export default class TransfersController {
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
        const theTransfer = await Transfer.create(body);
        return theTransfer;
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
        const theTransfer = await Transfer.findOrFail(params.id);
        theTransfer.merge(body);
        await theTransfer.save();
        return theTransfer;
    }

    /**
    * Elimina un traslado basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theTransfer = await Transfer.findOrFail(params.id);
        return theTransfer.delete();
    }
}

