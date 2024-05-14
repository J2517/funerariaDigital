import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RolesController {
    /**
    * Lista todos los roles
    */
    public async index() {
        return Role.all();
    }

    /**
    * Almacena la información de un rol
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
                        rules.maxLength(200),
                    ]),
                }),
            })

            // Crear el rol si la validación pasa
            const theRole = await Role.create(request.body());
            return theRole;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de un solo rol
    */
    public async show({ params }: HttpContextContract) {
        return Role.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un rol basado en el identificador y nuevos parámetros
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
                        rules.maxLength(200),
                    ]),
                }),
            })

            // Actualizar el rol si la validación pasa
            const theRole = await Role.findOrFail(params.id);
            theRole.merge(request.body());
            await theRole.save();
            return theRole;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina un rol basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theRole = await Role.findOrFail(params.id);
        return theRole.delete();
    }
}