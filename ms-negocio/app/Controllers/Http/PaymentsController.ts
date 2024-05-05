import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment'

export default class PaymentsController {
    /**
    * Lista todos los pagos
    */
    public async index() {
        return Payment.all();
    }

    /**
    * Almacena la información de un pago
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_pago = await Payment.create(body);
        return nuevo_pago;
    }

    /**
    * Muestra la información de un solo pago
    */
    public async show({ params }: HttpContextContract) {
        return Payment.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un pago basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_pago = await Payment.findOrFail(params.id);
        el_pago.merge(body);
        await el_pago.save();
        return el_pago;
    }

    /**
    * Elimina un pago basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_pago = await Payment.findOrFail(params.id);
        return el_pago.delete();
    }
}
