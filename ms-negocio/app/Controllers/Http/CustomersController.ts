import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class CustomersController {
    /**
    * Lista todos los clientes
    */
    public async index() {
        return Customer.all();
    }

    /**
    * Almacena la información de un cliente
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theCustomer = await Customer.create(body);
        return theCustomer;
    }

    /**
    * Muestra la información de un solo cliente
    */
    public async show({ params }: HttpContextContract) {
        return Customer.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un cliente basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theCustomer = await Customer.findOrFail(params.id);
        theCustomer.merge(body);
        await theCustomer.save();
        return theCustomer;
    }

    /**
    * Elimina a un cliente basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theCustomer = await Customer.findOrFail(params.id);
        return theCustomer.delete();
    }
}

