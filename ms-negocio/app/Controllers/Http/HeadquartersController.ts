import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headquarters from 'App/Models/Headquarter'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class HeadquartersController {
    /**
     * Lista todas las sedes.
     */
    public async index() {
        return Headquarters.all();
    }

    /**
     * Almacena una nueva sede.
     */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string({}, [
                        rules.required(),
                    ]),
                    address: schema.string({}, [
                        rules.required(),
                    ]),
                    telephone: schema.string({}, [
                        rules.required(),
                    ]),
                    email: schema.string({}, [
                        rules.required(),
                        rules.email(),
                    ]),
                    description: schema.string.optional(),
                    beneficiary_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            })

            // Crear la sede si la validación pasa
            const headquarter = await Headquarters.create(request.body());
            return headquarter;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Muestra una sola sede.
     */
    public async show({ params }: HttpContextContract) {
        return Headquarters.findOrFail(params.id);
    }

    /**
     * Actualiza una sede basada en el identificador y nuevos parámetros.
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string.optional(),
                    address: schema.string.optional(),
                    telephone: schema.string.optional(),
                    email: schema.string.optional(),
                    description: schema.string.optional(),
                    beneficiary_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            })

            // Actualizar la sede si la validación pasa
            const headquarter = await Headquarters.findOrFail(params.id);
            headquarter.merge(request.body());
            await headquarter.save();
            return headquarter;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Elimina una sede basada en el identificador.
     */
    public async destroy({ params }: HttpContextContract) {
        const headquarter = await Headquarters.findOrFail(params.id);
        return headquarter.delete();
    }
}


