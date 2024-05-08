import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'

export default class BeneficiaryController {
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
        const nuevo_Beneficiary = await Beneficiary.create(body);
        return nuevo_Beneficiary;
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
        const el_Beneficiary = await Beneficiary.findOrFail(params.id);
        el_Beneficiary.merge(body);
        await el_Beneficiary.save();
        return el_Beneficiary;
    }

    /**
    * Elimina a un Beneficiarios basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_Beneficiary = await Beneficiary.findOrFail(params.id);
        return el_Beneficiary.delete();
    }
}

