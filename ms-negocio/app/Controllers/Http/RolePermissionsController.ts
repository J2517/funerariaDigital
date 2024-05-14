import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RolePermission from 'App/Models/RolePermission'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RolePermissionsController {
    /**
     * Lista todos los registros de RolePermission
     */
    public async index(){
        return RolePermission.all();
    }

    /**
     * Almacena la información de un registro de RolePermission
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    role_id: schema.number([
                        rules.unsigned(),
                        rules.required()
                    ]),
                    permission_id: schema.number([
                        rules.unsigned(),
                      rules.required(),
                    ]),
                }),
            });

            // Crear el registro de RolePermission si la validación pasa
            const rolePermission = await RolePermission.create(payload);
            return rolePermission;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo registro de RolePermission
     */
    public async show({ params }: HttpContextContract) {
        return RolePermission.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un registro de RolePermission basado en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    role_id: schema.number.optional([
                        rules.unsigned()
                    ]),
                    permission_id: schema.number.optional([
                        rules.unsigned()
                    ]),
                }),
            });

            // Actualizar el registro de RolePermission si la validación pasa
            const rolePermission = await RolePermission.findOrFail(params.id);
            rolePermission.merge(payload);
            await rolePermission.save();
            return rolePermission;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un registro de RolePermission basado en el identificador
     */
    public async destroy({ params, response }: HttpContextContract) {
        const rolePermission = await RolePermission.findOrFail(params.id);
        await rolePermission.delete();
        return response.status(204);
    }
}
