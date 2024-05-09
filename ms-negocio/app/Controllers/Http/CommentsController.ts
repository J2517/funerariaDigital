import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

export default class CommentsController {
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
        const theComment = await Comment.create(body);
        return theComment;
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
        const theComment = await Comment.findOrFail(params.id);
        theComment.merge(body);
        await theComment.save();
        return theComment;
    }

    /**
    * Elimina un comentario basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theComment = await Comment.findOrFail(params.id);
        return theComment.delete();
    }
}

