import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'

export default class BeneficiarysController {
    /**
    * Lista todos los Beneficiarios
    */
    public async index() {
        return Beneficiary.all();
    }

    /**
    * Almacena la información de un Beneficiarios
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theBeneficiary = await Beneficiary.create(body);
        return theBeneficiary;
    }

    /**
    * Muestra la información de un solo Beneficiarios
    */
    public async show({ params }: HttpContextContract) {
        return Beneficiary.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un Beneficiario basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theBeneficiary = await Beneficiary.findOrFail(params.id);
        theBeneficiary.merge(body);
        await theBeneficiary.save();
        return theBeneficiary;
    }

    /**
    * Elimina a un Beneficiarios basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theBeneficiary = await Beneficiary.findOrFail(params.id);
        return theBeneficiary.delete();
    }
}

