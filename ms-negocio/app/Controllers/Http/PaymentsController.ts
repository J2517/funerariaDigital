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
        const thePayment = await Payment.create(body);
        return thePayment;
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
        const thePayment = await Payment.findOrFail(params.id);
        thePayment.merge(body);
        await thePayment.save();
        return thePayment;
    }

    /**
    * Elimina un pago basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const thePayment = await Payment.findOrFail(params.id);
        return thePayment.delete();
    }
}
