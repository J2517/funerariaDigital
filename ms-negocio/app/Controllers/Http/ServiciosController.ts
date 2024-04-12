import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio'

export default class ServiciosController {
    /**
    * Lista todos los servicios
    */
    public async index() {
        return Servicio.all();
    }

    /**
    * Almacena la información de un servicio
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_servicio = await Servicio.create(body);
        return nuevo_servicio;
    }

    /**
    * Muestra la información de un solo servicio
    */
    public async show({ params }: HttpContextContract) {
        return Servicio.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un servicio basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_servicio = await Servicio.findOrFail(params.id);
        el_servicio.merge(body);
        await el_servicio.save();
        return el_servicio;
    }

    /**
    * Elimina un servicio basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_servicio = await Servicio.findOrFail(params.id);
        return el_servicio.delete();
    }
}
