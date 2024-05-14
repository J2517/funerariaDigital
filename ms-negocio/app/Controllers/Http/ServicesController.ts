import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ServicesController {
    /**
    * Lista todos los servicios
    */
    public async index() {
        return Service.all();
    }

    /**
    * Almacena la información de un servicio
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string({ trim: true }, [
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
                    duration: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                    status: schema.boolean([
                        rules.required(),
                    ]),
                    type: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                }),
            })

            // Crear el servicio si la validación pasa
            const theService = await Service.create(request.body());
            return theService;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de un solo servicio
    */
    public async show({ params }: HttpContextContract) {
        return Service.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un servicio basado en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    description: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    price: schema.number.optional([
                        rules.range(0, Number.MAX_SAFE_INTEGER),
                    ]),
                    duration: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER),
                    ]),
                    status: schema.boolean.optional(),
                    type: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                }),
            })

            // Actualizar el servicio si la validación pasa
            const theService = await Service.findOrFail(params.id);
            theService.merge(request.body());
            await theService.save();
            return theService;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina un servicio basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theService = await Service.findOrFail(params.id);
        return theService.delete();
    }
}
