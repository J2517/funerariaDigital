import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PermissionsController {
    /**
    * Lista todas las permisos
    */
    public async index() {
        return Permission.all();
    }

    /**
    * Almacena la información de un permiso
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    url: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(60),
                    ]),
                    method: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(200),
                    ]),
                }),
            })

            // Crear el permiso si la validación pasa
            const thePermission = await Permission.create(request.body());
            return thePermission;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de un solo permiso
    */
    public async show({ params }: HttpContextContract) {
        return Permission.findOrFail(params.id);
    }

    /**
    * Actualiza la información de un permiso basado en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    url: schema.string.optional({ trim: true }, [
                        rules.maxLength(60),
                    ]),
                    method: schema.string.optional({ trim: true }, [
                        rules.maxLength(200),
                    ]),
                }),
            })

            // Actualizar el permiso si la validación pasa
            const thePermission = await Permission.findOrFail(params.id);
            thePermission.merge(request.body());
            await thePermission.save();
            return thePermission;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Elimina un permiso basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const thePermission = await Permission.findOrFail(params.id);
        return thePermission.delete();
    }
}

