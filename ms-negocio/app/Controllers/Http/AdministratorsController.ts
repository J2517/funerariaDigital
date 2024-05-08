import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrador from 'App/Models/Administrator'

export default class AdministradorsController {
    /**
    * Lista todos los administradores
    */
    public async index() {
        return Administrador.all();
    }

    /**
    * Almacena la información de un administrador
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_administrador = await Administrador.create(body);
        return nuevo_administrador;
    }

    /**
    * Muestra la información de un solo administrador
    */
    public async show({ params }: HttpContextContract) {
        return Administrador.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un administrador 
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_administrador = await Administrador.findOrFail(params.id);
        el_administrador.merge(body);
        await el_administrador.save();
        return el_administrador;
    }

    /**
    * Elimina a un administrador basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_administrador = await Administrador.findOrFail(params.id);
        return el_administrador.delete();
    }
}

