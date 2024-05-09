import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
    /**
    * Lista todos los permisos
    */
    public async index() {
        return Permission.all();
    }

    /**
    * Almacena la información de un permiso
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const thePermission = await Permission.create(body);
        return thePermission;
    }

    /**
    * Muestra la información de un solo permiso
    */
    public async show({ params }: HttpContextContract) {
        return Permission.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un permiso basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const thePermission = await Permission.findOrFail(params.id);
        thePermission.merge(body);
        await thePermission.save();
        return thePermission;
    }

    /**
    * Elimina a un permiso basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const thePermission = await Permission.findOrFail(params.id);
        return thePermission.delete();
    }
}

