import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CommentsController {
    /**
     * Lista todos los comentarios.
     */
    public async index() {
        return Comment.all();
    }

    /**
     * Almacena la información de un comentario.
     */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    content: schema.string({}, [
                        rules.required(),
                        rules.maxLength(120),
                    ]),
                    service_execute_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            })

            // Crear el comentario si la validación pasa
            const theComment = await Comment.create(request.body());
            return theComment;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Muestra la información de un solo comentario.
     */
    public async show({ params }: HttpContextContract) {
        return Comment.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un comentario basado en el identificador y nuevos parámetros.
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    content: schema.string.optional({}, [
                        rules.maxLength(120),
                    ]),
                    service_execute_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                }),
            })

            // Actualizar el comentario si la validación pasa
            const theComment = await Comment.findOrFail(params.id);
            theComment.merge(request.body());
            await theComment.save();
            return theComment;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
     * Elimina un comentario basado en el identificador.
     */
    public async destroy({ params }: HttpContextContract) {
        const theComment = await Comment.findOrFail(params.id);
        return theComment.delete();
    }
}