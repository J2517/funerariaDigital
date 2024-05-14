import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PlansController {
    /**
     * Lista todos los planes
     */
    public async index(){
        return Plan.all();
    }

    /**
     * Almacena la información de un plan
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
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            });

            // Crear el plan si la validación pasa
            const plan = await Plan.create(payload);
            return plan;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo plan
     */
    public async show({ params }: HttpContextContract) {
        return Plan.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un plan
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
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
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            });

            // Actualizar el plan si la validación pasa
            const plan = await Plan.findOrFail(params.id);
            plan.merge(payload);
            await plan.save();
            return plan;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un plan
     */
    public async destroy({ params }: HttpContextContract) {
        const plan = await Plan.findOrFail(params.id);
        await plan.delete();
        return { message: 'Plan deleted successfully' };
    }
}
