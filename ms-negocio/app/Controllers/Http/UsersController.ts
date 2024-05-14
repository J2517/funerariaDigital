import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
    /**
     * Lista todos los usuarios
     */
    public async index(){
        return User.all();
    }

    /**
     * Almacena la información de un usuario
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
                    email: schema.string({}, [
                        rules.required(),
                        rules.email(),
                        rules.maxLength(255)
                    ]),
                    password: schema.string({}, [
                        rules.required(),
                        rules.maxLength(255)
                    ]),
                    role_id: schema.number([
                        rules.required(),
                        rules.unsigned()
                    ])
                }),
            });

            // Almacenar el usuario si la validación pasa
            const user = await User.create(payload);
            return user;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Muestra la información de un solo usuario
     */
    public async show({ params }: HttpContextContract) {
        return User.findOrFail(params.id);
    }

    /**
     * Actualiza la información de un usuario basado en el identificador y nuevos parámetros
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    email: schema.string.optional({}, [
                        rules.email(),
                        rules.maxLength(255)
                    ]),
                    password: schema.string.optional({}, [
                        rules.maxLength(255)
                    ]),
                    role_id: schema.number.optional([
                        rules.unsigned()
                    ])
                }),
            });

            // Actualizar el usuario si la validación pasa
            const user = await User.findOrFail(params.id);
            user.merge(payload);
            await user.save();
            return user;
        } catch (error) {
            return response.status(400).send(error.messages);
        }
    }

    /**
     * Elimina un usuario basado en el identificador
     */
    public async destroy({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id);
        await user.delete();
        return { message: 'User deleted successfully' };
    }
}
