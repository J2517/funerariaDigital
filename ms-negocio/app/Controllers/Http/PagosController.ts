import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pago from 'App/Models/Pago'

export default class PagosController {
    /**
    * Lista todos los pagos
    */
    public async index() {
        return Pago.all();
    }

    /**
    * Almacena la información de un pago
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_pago = await Pago.create(body);
        return nuevo_pago;
    }

    /**
    * Muestra la información de un solo pago
    */
    public async show({ params }: HttpContextContract) {
        return Pago.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un pago basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_pago = await Pago.findOrFail(params.id);
        el_pago.merge(body);
        await el_pago.save();
        return el_pago;
    }

    /**
    * Elimina un pago basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_pago = await Pago.findOrFail(params.id);
        return el_pago.delete();
    }
}
