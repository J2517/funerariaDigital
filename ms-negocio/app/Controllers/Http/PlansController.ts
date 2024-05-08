import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'

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
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_plan = await Plan.create(body);
        return nuevo_plan;
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
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_plan = await Plan.findOrFail(params.id);
        el_plan.merge(body);
        await el_plan.save();
        return el_plan;
    }

    /**
    * Elimina un plan basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_plan = await Plan.findOrFail(params.id);
        return el_plan.delete();
    }
}

