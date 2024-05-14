import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AdministratorsController {
    /**
     * Lista todos los administradores
     */
    public async index(){
        return Administrator.all();
    }

    /**
     * Almacena la información de un administrador
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    user_id: schema.number([
                        rules.unsigned(),
                        rules.required()
                    ]),
                }),
            });

            // Crear el administrador si la validación pasa
            const administrator = await Administrator.create(payload);
            return administrator;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo administrador
     */
    public async show({ params }: HttpContextContract) {
        return Administrator.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un administrador basado
     * en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    user_id: schema.number.optional([
                        rules.unsigned()]),
                }),
            });

            // Actualizar el administrador si la validación pasa
            const administrator = await Administrator.findOrFail(params.id);
            administrator.merge(payload);
            await administrator.save();
            return administrator;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina a un administrador basado en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const administrator = await Administrator.findOrFail(params.id);
        return administrator.delete();
    }
}

