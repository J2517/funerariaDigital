import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CremationsController {
    /**
    * Lista todas las cremaciones
    */
    public async index() {
        return Cremation.all();
    }

    /**
    * Almacena la información de una cremación
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name_deceased: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    date: schema.date({}, [
                        rules.required(),
                    ]),
                    place: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    description: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                }),
            })

            // Crear la cremación si la validación pasa
            const theCremation = await Cremation.create(request.body());
            return theCremation;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de una sola cremación
    */
    public async show({ params }: HttpContextContract) {
        return Cremation.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una cremación basada en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name_deceased: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    date: schema.date.optional({ format: 'yyyy-MM-dd HH:mm:ss' }),
                    place: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                }),
            })

            // Actualizar la cremación si la validación pasa
            const theCremation = await Cremation.findOrFail(params.id);
            theCremation.merge(request.body());
            await theCremation.save();
            return theCremation;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina una cremación basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theCremation = await Cremation.findOrFail(params.id);
        return theCremation.delete();
    }
}