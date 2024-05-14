import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RolesController {
    /**
     * Lista todos los roles
     */
    public async index(){
        return Role.all();
    }

    /**
     * Almacena la información de un rol
     */
    public async store({ request, response }: HttpContextContract){
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string({}, [
                        rules.required(),
                        rules.maxLength(255)
                    ]),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ])
                }),
            });

            // Crear el rol si la validación pasa
            const role = await Role.create(payload);
            return role;
        } catch (error) {
            console.error("Error al crear el rol:", error); // Imprimir el error en la consola
            return response.status(400).send(error.messages);
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
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    description: schema.string.optional({}, [
                        rules.maxLength(255)
                    ])
                }),
            });

            // Actualizar el rol si la validación pasa
            const role = await Role.findOrFail(params.id);
            role.merge(payload);
            await role.save();
            return role;
        } catch (error) {
            console.error("Error al actualizar el rol:", error); // Imprimir el error en la consola
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina a un rol basado en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const role = await Role.findOrFail(params.id);
        return role.delete();
    }
}

