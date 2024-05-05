import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceExecution from 'App/Models/ServiceExecution'

export default class ServiceExecutionsController {
    /**
    * Lista todas las ejecuciones de servicios
    */
    public async index() {
        return ServiceExecution.all();
    }

    /**
    * Almacena la información de una ejecución de servicio
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nueva_ejecucion = await ServiceExecution.create(body);
        return nueva_ejecucion;
    }

    /**
    * Muestra la información de una sola ejecución de servicio
    */
    public async show({ params }: HttpContextContract) {
        return ServiceExecution.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una ejecución de servicio basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const la_ejecucion = await ServiceExecution.findOrFail(params.id);
        la_ejecucion.merge(body);
        await la_ejecucion.save();
        return la_ejecucion;
    }

    /**
    * Elimina una ejecución de servicio basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const la_ejecucion = await ServiceExecution.findOrFail(params.id);
        return la_ejecucion.delete();
    }
}

