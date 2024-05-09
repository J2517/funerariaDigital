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
        const thePlan = await Plan.create(body);
        return thePlan;
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
        const thePlan = await Plan.findOrFail(params.id);
        thePlan.merge(body);
        await thePlan.save();
        return thePlan;
    }

    /**
    * Elimina un plan basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const thePlan = await Plan.findOrFail(params.id);
        return thePlan.delete();
    }
}

