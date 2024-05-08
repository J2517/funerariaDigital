import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation'

export default class CremationController {
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
        const nueva_cremacion = await Cremation.create(body);
        return nueva_cremacion;
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
        const la_cremacion = await Cremation.findOrFail(params.id);
        la_cremacion.merge(body);
        await la_cremacion.save();
        return la_cremacion;
    }

    /**
    * Elimina una cremación basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const la_cremacion = await Cremation.findOrFail(params.id);
        return la_cremacion.delete();
    }
}
