import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanService from 'App/Models/PlanService'

export default class ServiceExecutionsController {
    /**
    * Lista todas las ejecuciones de servicios
    */
    public async index() {
        return PlanService.all();
    }

    /**
    * Almacena la información de una ejecución de servicio
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const thePlanService = await PlanService.create(body);
        return thePlanService;
    }

    /**
    * Muestra la información de una sola ejecución de servicio
    */
    public async show({ params }: HttpContextContract) {
        return PlanService.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una ejecución de servicio basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const thePlanService = await PlanService.findOrFail(params.id);
        thePlanService.merge(body);
        await thePlanService.save(); 
        return thePlanService;
    }

    /**
    * Elimina una ejecución de servicio basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const thePlanService = await PlanService.findOrFail(params.id);
        return thePlanService.delete();
    }
}

