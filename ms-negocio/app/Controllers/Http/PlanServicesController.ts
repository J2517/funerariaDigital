import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanService from 'App/Models/PlanService'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PlanServicesController {
    /**
     * Lista todos los registros de PlanService
     */
    public async index(){
        return PlanService.all();
    }

    /**
     * Almacena la información de un registro de PlanService
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    plan_id: schema.number([
                        rules.unsigned(),
                        rules.required()
                    ]),
                    service_id: schema.number([
                        rules.unsigned(),
                        rules.required()
                    ]),
                }),
            });

            // Crear el registro de PlanService si la validación pasa
            const planService = await PlanService.create(payload);
            return planService;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo registro de PlanService
     */
    public async show({ params }: HttpContextContract) {
        return PlanService.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un registro de PlanService basado en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    plan_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                    service_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            });

            // Actualizar el registro de PlanService si la validación pasa
            const planService = await PlanService.findOrFail(params.id);
            planService.merge(payload);
            await planService.save();
            return planService;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un registro de PlanService basado en el identificador
     */
    public async destroy({ params, response }: HttpContextContract) {
        const planService = await PlanService.findOrFail(params.id);
        await planService.delete();
        return response.status(204);
    }
}
