import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headquarter from 'App/Models/Headquarter'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class HeadquartersController {
    /**
     * Lista todas las sedes
     */
    public async index(){
        return Headquarter.all();
    }

    /**
     * Almacena la información de una sede
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    city: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    department: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    telephone: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(20),
                    ]),
                    email: schema.string({ trim: true }, [
                        rules.required(),
                        rules.email(),
                        rules.maxLength(255),
                    ]),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    beneficiary_id: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            });

            // Crear la sede si la validación pasa
            const headquarter = await Headquarter.create(payload);
            return headquarter;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de una sola sede
     */
    public async show({ params }: HttpContextContract) {
        return Headquarter.findOrFail(params.id);
    }

    /**
     * Actualiza la información de una sede basada en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    city: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    department: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    telephone: schema.string.optional({ trim: true }, [
                        rules.maxLength(20),
                    ]),
                    email: schema.string.optional({ trim: true }, [
                        rules.email(),
                        rules.maxLength(255),
                    ]),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    beneficiary_id: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            });

            // Actualizar la sede si la validación pasa
            const headquarter = await Headquarter.findOrFail(params.id);
            headquarter.merge(payload);
            await headquarter.save();
            return headquarter;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina una sede basada en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const headquarter = await Headquarter.findOrFail(params.id);
        return headquarter.delete();
    }
}


