import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class CustomerController {
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
        const nuevo_customer = await Customer.create(body);
        return nuevo_customer;
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
        const el_cliente = await Customer.findOrFail(params.id);
        el_cliente.merge(body);
        await el_cliente.save();
        return el_cliente;
    }

    /**
    * Elimina a un cliente basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_cliente = await Customer.findOrFail(params.id);
        return el_cliente.delete();
    }
}

