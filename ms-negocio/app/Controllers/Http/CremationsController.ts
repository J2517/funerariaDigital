import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CremationsController {
    /**
     * Lista todas las cremaciones
     */
    public async index(){
        return Cremation.all();
    }

    /**
     * Almacena la información de una cremación
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name_deceased: schema.string([
                        rules.required(),
                        rules.maxLength(25)]),
                    date: schema.date({},[
                        rules.required(),
                        rules.after('today')]),
                    place: schema.string([
                        rules.required(),
                        rules.maxLength(30)]
                        ),
                    description: schema.string([
                        rules.required(),
                        rules.maxLength(250)]
                        ),
                    service_id: schema.number([
                        rules.unsigned(),
                        rules.required()]),
                }),
            });

            // Crear la cremación si la validación pasa
            const cremation = await Cremation.create(payload);
            return cremation;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de una sola cremación
     */
    public async show({ params }: HttpContextContract) {
        return Cremation.findOrFail(params.id);
    }

    /**
     * Actualiza la información de una cremación basada en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name_deceased: schema.string([
                        rules.maxLength(25)]),
                    date: schema.date({},[
                        rules.after('today')]),
                    place: schema.string([
                        rules.maxLength(30)]
                        ),
                    description: schema.string([
                        rules.maxLength(250)]
                        ),
                    service_id: schema.number([
                        rules.unsigned()]),
                }),
            });

            // Actualizar la cremación si la validación pasa
            const cremation = await Cremation.findOrFail(params.id);
            cremation.merge(payload);
            await cremation.save();
            return cremation;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina una cremación basada en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const cremation = await Cremation.findOrFail(params.id);
        await cremation.delete();
        return { message: 'Cremation deleted successfully' };
    }
}