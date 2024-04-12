import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administradore from 'App/Models/Administradore'

export default class AdministradoresController {
    /**
    * Lista todos los administradores
    */
    public async index() {
        return Administradore.all();
    }

    /**
    * Almacena la información de un administrador
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_administrador = await Administradore.create(body);
        return nuevo_administrador;
    }

    /**
    * Muestra la información de un solo administrador
    */
    public async show({ params }: HttpContextContract) {
        return Administradore.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un administrador 
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_administrador = await Administradore.findOrFail(params.id);
        el_administrador.merge(body);
        await el_administrador.save();
        return el_administrador;
    }

    /**
    * Elimina a un administrador basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_administrador = await Administradore.findOrFail(params.id);
        return el_administrador.delete();
    }
}

