import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceExecution from 'App/Models/ServiceExecution'

export default class ServiceExecutionsController {
    /**
    * Lista todas las ejecuciones de servicios
    */
    public async index() {
        let serviceExecutions: ServiceExecution[] = await ServiceExecution.query().preload('chat')
        return serviceExecutions
    } 

    /**
    * Almacena la información de una ejecución de servicio
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theExecution = await ServiceExecution.create(body);
        return theExecution;
    }

    /**
    * Muestra la información de una sola ejecución de servicio
    */
    public async show({ params }: HttpContextContract) {
        return ServiceExecution.query().where("id", params.id).preload('chat')
                                                              .preload('comments');
    }

    /**
    * Actualiza la información de una ejecución de servicio basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theExecution = await ServiceExecution.findOrFail(params.id);
        theExecution.merge(body);
        await theExecution.save();
        return theExecution;
    }

    /**
    * Elimina una ejecución de servicio basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theExecution = await ServiceExecution.findOrFail(params.id);
        return theExecution.delete();
    }
}

