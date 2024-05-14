import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RolePermission from 'App/Models/RolePermission'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RolePermissionsController {
    /**
    * Lista todos los permisos asociados a un rol
    */
    public async index() {
        return RolePermission.all();
    }

    /**
    * Almacena la relación entre un rol y un permiso
    */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    role_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                    permission_id: schema.number([
                        rules.required(),
                        rules.unsigned(),
                    ]),
                }),
            })

            // Crear la relación si la validación pasa
            const theRolePermission = await RolePermission.create(request.body());
            return theRolePermission;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }

    /**
    * Muestra la información de una relación rol-permiso
    */
    public async show({ params }: HttpContextContract) {
        return RolePermission.findOrFail(params.id);
    }

    /**
    * Elimina una relación rol-permiso basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theRolePermission = await RolePermission.findOrFail(params.id);
        return theRolePermission.delete();
    }
}