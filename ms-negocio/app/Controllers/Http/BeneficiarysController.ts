import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class BeneficiariesController {
    /**
    * Lista todos los beneficiarios
    */
    public async index(){
        return Beneficiary.all();
    }

    /**
    * Almacena la información de un beneficiario
    */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    accountHolder_id: schema.number([
                        rules.unsigned(),
                        rules.required()
                    ]),
                    user_id: schema.number([
                        rules.unsigned(),
                        rules.required()
                    ]),
                }),
            });

            // Crear el beneficiario si la validación pasa
            const beneficiary = await Beneficiary.create(payload);
            return beneficiary;
        } catch (error) {
            console.log(error);
            return response.status(400).send(error.messages);
        }
    }

    /**
    * Muestra la información de un solo beneficiario
    */
    public async show({ params }: HttpContextContract) {
        return Beneficiary.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un beneficiario basado
    * en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    accountHolder_id: schema.number.optional([
                        rules.unsigned()]),
                    user_id: schema.number.optional([
                        rules.unsigned()]),
                }),
            });

            // Actualizar el beneficiario si la validación pasa
            const beneficiary = await Beneficiary.findOrFail(params.id);
            beneficiary.merge(payload);
            await beneficiary.save();
            return beneficiary;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
    * Elimina a un beneficiario basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const beneficiary = await Beneficiary.findOrFail(params.id);
        return beneficiary.delete();
    }
}

