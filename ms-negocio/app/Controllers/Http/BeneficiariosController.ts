import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiario from 'App/Models/Beneficiario'

export default class BeneficiariosController {
    /**
    * Lista todos los beneficiarios
    */
    public async index() {
        return Beneficiario.all();
    }

    /**
    * Almacena la información de un beneficiario
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const nuevo_beneficiario = await Beneficiario.create(body);
        return nuevo_beneficiario;
    }

    /**
    * Muestra la información de un solo beneficiario
    */
    public async show({ params }: HttpContextContract) {
        return Beneficiario.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un beneficiario basado en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const el_beneficiario = await Beneficiario.findOrFail(params.id);
        el_beneficiario.merge(body);
        await el_beneficiario.save();
        return el_beneficiario;
    }

    /**
    * Elimina a un beneficiario basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const el_beneficiario = await Beneficiario.findOrFail(params.id);
        return el_beneficiario.delete();
    }
}

