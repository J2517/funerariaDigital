import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from 'App/Models/Comentario'

export default class ComentariosController {
    /**
    * Lista todos los comentarios
    */
    public async index() {
        return Comentario.all();
    }

    /**
    * Almacena la información de un comentario
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_comentario = await Comentario.create(body);
        return nuevo_comentario;
    }

    /**
    * Muestra la información de un solo comentario
    */
    public async show({ params }: HttpContextContract) {
        return Comentario.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un comentario basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_comentario = await Comentario.findOrFail(params.id);
        el_comentario.merge(body);
        await el_comentario.save();
        return el_comentario;
    }

    /**
    * Elimina un comentario basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_comentario = await Comentario.findOrFail(params.id);
        return el_comentario.delete();
    }
}

