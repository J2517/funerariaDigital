import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headline from 'App/Models/Headline'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class HeadlinesController {
    /**
    * Lista todas las noticias
    */
    public async index() {
        return Headline.all();
    }

    /**
    * Almacena la información de una noticia
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(60),
                    ]),
                    email: schema.string({ trim: true }, [
                        rules.required(),
                        rules.email(),
                        rules.maxLength(254),
                    ]),
                    password: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(256),
                    ]),
                }),
            })

            // Crear la noticia si la validación pasa
            const theHeadline = await Headline.create(request.body());
            return theHeadline;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de una sola noticia
    */
    public async show({ params }: HttpContextContract) {
        return Headline.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una noticia basada en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string.optional({ trim: true }, [
                        rules.maxLength(60),
                    ]),
                    email: schema.string.optional({ trim: true }, [
                        rules.email(),
                        rules.maxLength(254),
                    ]),
                    password: schema.string.optional({ trim: true }, [
                        rules.maxLength(256),
                    ]),
                }),
            })

            // Actualizar la noticia si la validación pasa
            const theHeadline = await Headline.findOrFail(params.id);
            theHeadline.merge(request.body());
            await theHeadline.save();
            return theHeadline;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina una noticia basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theHeadline = await Headline.findOrFail(params.id);
        return theHeadline.delete();
    }
}
