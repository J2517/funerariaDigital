import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PermissionsController {
    /**
     * Lista todas las permisos
     */
    public async index(){
        return Permission.all();
    }

    /**
     * Almacena la información de un permiso
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    url: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                    method: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(255),
                    ]),
                }),
            });

            // Crear el permiso si la validación pasa
            const permission = await Permission.create(payload);
            return permission;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo permiso
     */
    public async show({ params }: HttpContextContract) {
        return Permission.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un permiso
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    url: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                    method: schema.string.optional({ trim: true }, [
                        rules.maxLength(255),
                    ]),
                }),
            });

            // Actualizar el permiso si la validación pasa
            const permission = await Permission.findOrFail(params.id);
            permission.merge(payload);
            await permission.save();
            return permission;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un permiso
     */
    public async destroy({ params }: HttpContextContract) {
        const permission = await Permission.findOrFail(params.id);
        await permission.delete();
        return { message: 'Permission deleted successfully' };
    }
}
