import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RolePermission from 'App/Models/RolePermission'

export default class ServiceExecutionsController {
    /**
    * Lista todas las ejecuciones de servicios
    */
    public async index() {
        return RolePermission.all();
    }

    /**
    * Almacena la información de una ejecución de servicio
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theRolePermission = await RolePermission.create(body);
        return theRolePermission;
    }

    /**
    * Muestra la información de una sola ejecución de servicio
    */
    public async show({ params }: HttpContextContract) {
        return RolePermission.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una ejecución de servicio basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theRolePermission = await RolePermission.findOrFail(params.id);
        theRolePermission.merge(body);
        await theRolePermission.save(); 
        return theRolePermission;
    }

    /**
    * Elimina una ejecución de servicio basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theRolePermission = await RolePermission.findOrFail(params.id);
        return theRolePermission.delete();
    }
}

