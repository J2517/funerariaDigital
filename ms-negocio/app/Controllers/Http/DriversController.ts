import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class DriversController {
    /**
     * Lista todos los conductores
     */
    public async index(){
        return Driver.all();
    }

    /**
     * Almacena la información de un conductor
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    licencia: schema.string(),
                    user_id: schema.number(),
                    service_id: schema.number(),
                }),
            });

            // Crear el conductor si la validación pasa
            const driver = await Driver.create(payload);
            return driver;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo conductor
     */
    public async show({ params }: HttpContextContract) {
        return Driver.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un conductor basado en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    licencia: schema.string.optional(),
                    user_id: schema.number.optional(),
                    service_id: schema.number.optional(),
                }),
            });

            // Actualizar el conductor si la validación pasa
            const driver = await Driver.findOrFail(params.id);
            driver.merge(payload);
            await driver.save();
            return driver;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina a un conductor basado en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const driver = await Driver.findOrFail(params.id);
        await driver.delete();
        return { message: 'Driver deleted successfully' };
    }
}