import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PlansController {
    /**
    * Lista todos los planes
    */
    public async index() {
        return Plan.all();
    }

    /**
    * Almacena la información de un plan
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    price: schema.number([
                        rules.required(),
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                    description: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    duration: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            })

            // Crear el plan si la validación pasa
            const thePlan = await Plan.create(request.body());
            return thePlan;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de un solo plan
    */
    public async show({ params }: HttpContextContract) {
        return Plan.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un plan basado en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    price: schema.number.optional([
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    duration: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            })

            // Actualizar el plan si la validación pasa
            const thePlan = await Plan.findOrFail(params.id);
            thePlan.merge(request.body());
            await thePlan.save();
            return thePlan;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina un plan basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const thePlan = await Plan.findOrFail(params.id);
        return thePlan.delete();
    }
}