import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

export default class CommentController {
    /**
    * Lista todos los comentarios
    */
    public async index() {
        return Comment.all();
    }

    /**
    * Almacena la información de un comentario
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_comentario = await Comment.create(body);
        return nuevo_comentario;
    }

    /**
    * Muestra la información de un solo comentario
    */
    public async show({ params }: HttpContextContract) {
        return Comment.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un comentario basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_comentario = await Comment.findOrFail(params.id);
        el_comentario.merge(body);
        await el_comentario.save();
        return el_comentario;
    }

    /**
    * Elimina un comentario basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_comentario = await Comment.findOrFail(params.id);
        return el_comentario.delete();
    }
}

