import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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
                    licencia: schema.string({}, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    user_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                    service_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
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
    * Actualiza la información de un conductor basado
    * en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    licencia: schema.string.optional({}, [
                        rules.maxLength(255),
                    ]),
                    user_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
                    service_id: schema.number.optional([
                        rules.unsigned(),
                    ]),
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
    * Elimina un conductor basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const driver = await Driver.findOrFail(params.id);
        return driver.delete();
    }
}
