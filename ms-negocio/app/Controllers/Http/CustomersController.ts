import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CustomersController {
    /**
     * Lista todos los clientes
     */
    public async index(){
        return Customer.all();
    }

    /**
     * Almacena la información de un cliente
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    type_customer: schema.string([
                        rules.required(),
                        rules.maxLength(60)
                    ]),
                    user_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            });

            // Crear el cliente si la validación pasa
            const customer = await Customer.create(payload);
            return customer;
        } catch (error) {
            return response.status(400).send(error.messages);
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
            const payload = await request.validate({
                schema: schema.create({
                    type_customer: schema.string([
                        rules.maxLength(30)]),
                    user_id: schema.number.optional([
                        rules.unsigned()
                    ]),
                }),
            });

            // Actualizar el cliente si la validación pasa
            const customer = await Customer.findOrFail(params.id);
            customer.merge(payload);
            await customer.save();
            return customer;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un cliente basado en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const customer = await Customer.findOrFail(params.id);
        await customer.delete();
        return { message: 'Customer deleted successfully' };
    }
}
