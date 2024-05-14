import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    type_customer: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(60),
                    ]),
                }),
            })

            // Crear el cliente si la validación pasa
            const theCustomer = await Customer.create(request.body());
            return theCustomer;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
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
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    type_customer: schema.string.optional({ trim: true }, [
                        rules.maxLength(60),
                    ]),
                }),
            })

            // Actualizar el cliente si la validación pasa
            const theCustomer = await Customer.findOrFail(params.id);
            theCustomer.merge(request.body());
            await theCustomer.save();
            return theCustomer;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina un cliente basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theCustomer = await Customer.findOrFail(params.id);
        return theCustomer.delete();
    }
}


