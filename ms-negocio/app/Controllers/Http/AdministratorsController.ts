import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator'

export default class AdministratorsController {
    /**
    * Lista todos los administradores
    */
    public async index() {
        return Administrator.all();
    }

    /**
    * Almacena la información de un administrador
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theAdministrator = await Administrator.create(body);
        return theAdministrator;
    }

    /**
    * Muestra la información de un solo administrador
    */
    public async show({ params }: HttpContextContract) {
        return Administrator.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un administrador 
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theAdministrator = await Administrator.findOrFail(params.id);
        theAdministrator.merge(body);
        await theAdministrator.save();
        return theAdministrator;
    }

    /**
    * Elimina a un administrador basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theAdministrator = await Administrator.findOrFail(params.id);
        return theAdministrator.delete();
    }
}

