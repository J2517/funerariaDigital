import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation'

export default class CremationsController {
    /**
    * Lista todas las cremaciones
    */
    public async index() {
        return Cremation.all();
    }

    /**
    * Almacena la información de una cremación
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theCremation = await Cremation.create(body);
        return theCremation;
    }

    /**
    * Muestra la información de una sola cremación
    */
    public async show({ params }: HttpContextContract) {
        return Cremation.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una cremación basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theCremation = await Cremation.findOrFail(params.id);
        theCremation.merge(body);
        await theCremation.save();
        return theCremation;
    }

    /**
    * Elimina una cremación basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theCremation = await Cremation.findOrFail(params.id);
        return theCremation.delete();
    }
}
