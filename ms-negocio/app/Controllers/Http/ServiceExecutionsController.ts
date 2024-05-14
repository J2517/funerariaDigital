import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceExecution from 'App/Models/ServiceExecution'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ServiceExecutionsController {
    /**
     * Lista todas las ejecuciones de servicio
     */
    public async index(){
        return ServiceExecution.all();
    }

    /**
     * Almacena la información de una ejecución de servicio
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    date: schema.date({},[
                        rules.required(),
                        rules.after('today')]),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    price: schema.number.optional([
                        rules.range(0, Number.MAX_SAFE_INTEGER)
                    ]),
                    service_id: schema.number([
                        rules.required(),
                        rules.unsigned()
                    ]),
                    user_id: schema.number([
                        rules.required(),
                        rules.unsigned()
                    ])
                }),
            });

            // Almacenar la ejecución de servicio si la validación pasa
            const serviceExecution = await ServiceExecution.create(payload);
            return serviceExecution;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de una sola ejecución de servicio
     */
    public async show({ params }: HttpContextContract) {
        return ServiceExecution.findOrFail(params.id);
    }

    /**
     * Actualiza la información de una ejecución de servicio basada en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    date: schema.date.optional({},[
                        rules.after('today')]),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    price: schema.number.optional([
                        rules.range(0, Number.MAX_SAFE_INTEGER)
                    ]),
                    service_id: schema.number.optional([
                        rules.unsigned()
                    ]),
                    user_id: schema.number.optional([
                        rules.unsigned()
                    ])
                }),
            });

            // Actualizar la ejecución de servicio si la validación pasa
            const serviceExecution = await ServiceExecution.findOrFail(params.id);
            serviceExecution.merge(payload);
            await serviceExecution.save();
            return serviceExecution;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina una ejecución de servicio basada en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const serviceExecution = await ServiceExecution.findOrFail(params.id);
        return serviceExecution.delete();
    }
}


