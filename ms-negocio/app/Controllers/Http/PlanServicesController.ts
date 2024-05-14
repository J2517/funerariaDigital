import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanService from 'App/Models/PlanService'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PlanServicesController {
    /**
    * Lista todos los servicios asociados a un plan
    */
    public async index() {
        return PlanService.all();
    }

    /**
    * Almacena la relación entre un plan y un servicio
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    plan_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                    service_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            })

            // Crear la relación si la validación pasa
            const thePlanService = await PlanService.create(request.body());
            return thePlanService;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de una relación plan-servicio
    */
    public async show({ params }: HttpContextContract) {
        return PlanService.findOrFail(params.id);
    }

    /**
    * Elimina una relación plan-servicio basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const thePlanService = await PlanService.findOrFail(params.id);
        return thePlanService.delete();
    }
}