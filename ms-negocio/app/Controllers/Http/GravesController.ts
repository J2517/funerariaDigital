import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grave from 'App/Models/Grave'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class GravesController {
    /**
    * Lista todas las tumbas
    */
    public async index() {
        return Grave.all();
    }

    /**
    * Almacena la información de una tumba
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    code: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    description: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    price: schema.number([
                        rules.required(),
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                    row: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    column: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    level: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                    zone: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    capacity: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            })

            // Crear la tumba si la validación pasa
            const theGrave = await Grave.create(request.body());
            return theGrave;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de una sola tumba
    */
    public async show({ params }: HttpContextContract) {
        return Grave.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una tumba basada en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    code: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    price: schema.number.optional([
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                    row: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    column: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    level: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                    zone: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    capacity: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                }),
            })

            // Actualizar la tumba si la validación pasa
            const theGrave = await Grave.findOrFail(params.id);
            theGrave.merge(request.body());
            await theGrave.save();
            return theGrave;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina una tumba basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theGrave = await Grave.findOrFail(params.id);
        return theGrave.delete();
    }
}