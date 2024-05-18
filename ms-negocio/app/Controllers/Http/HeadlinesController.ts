import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headline from 'App/Models/Headline'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class HeadlinesController {
    /**
     * Lista todas las titulares
     */
    public async index(){
        return Headline.all();
    }

    /**
     * Almacena la información de un titular
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    tipo_plan: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    user_id: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            });

            // Crear el titular si la validación pasa
            const headline = await Headline.create(payload);
            return headline;
        } catch (error) {
            console.error(error); // Imprimir el objeto error completo en la consola

            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo titular
     */
    public async show({ params }: HttpContextContract) {
        return Headline.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un titular basado en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    tipoPlan: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    user_id: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            });

            // Actualizar el titular si la validación pasa
            const headline = await Headline.findOrFail(params.id);
            headline.merge(payload);
            await headline.save();
            return headline;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un titular basado en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const headline = await Headline.findOrFail(params.id);
        return headline.delete();
    }
}

