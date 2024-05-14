import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ServicesController {
    /**
     * Lista todos los servicios
     */
    public async index(){
        return Service.all();
    }

    /**
     * Almacena la información de un servicio
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string({}, [
                        rules.required(),
                        rules.maxLength(255)
                    ]),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    price: schema.number([
                        rules.required(),
                        rules.range(0, Number.MAX_SAFE_INTEGER)
                    ]),
                    duration: schema.number([
                        rules.required(),
                        rules.range(1, Number.MAX_SAFE_INTEGER)
                    ]),
                    status: schema.boolean.optional(),
                    type: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    user_id: schema.number([
                        rules.required(),
                        rules.unsigned()
                    ]),
                    headquarter_id: schema.number([
                        rules.required(),
                        rules.unsigned()
                    ])
                }),
            });

            // Almacenar el servicio si la validación pasa
            const service = await Service.create(payload);
            return service;
        } catch (error) {
            return response.status(400).send(error.messages);
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
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    price: schema.number.optional([
                        rules.range(0, Number.MAX_SAFE_INTEGER)
                    ]),
                    duration: schema.number.optional([
                        rules.range(1, Number.MAX_SAFE_INTEGER)
                    ]),
                    status: schema.boolean.optional(),
                    type: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    user_id: schema.number.optional([
                        rules.unsigned()
                    ]),
                    headquarter_id: schema.number.optional([
                        rules.unsigned()
                    ])
                }),
            });

            // Actualizar el servicio si la validación pasa
            const service = await Service.findOrFail(params.id);
            service.merge(payload);
            await service.save();
            return service;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un servicio basado en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const service = await Service.findOrFail(params.id);
        return service.delete();
    }
}

