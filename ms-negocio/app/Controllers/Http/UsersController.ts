import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Encryption from '@ioc:Adonis/Core/Encryption'
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
            await request.validate({
                schema: schema.create({
                    name: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(60),
                    ]),
                    email: schema.string({ trim: true }, [
                        rules.required(),
                        rules.email(),
                        rules.maxLength(254),
                    ]),
                    password: schema.string({ trim: true }, [
                        rules.required(),
                        rules.maxLength(256),
                    ]),
                }),
            })

            // Encriptar la contraseña antes de almacenarla
            const body = request.body();
            body.password = Encryption.encrypt(body.password);

            // Crear el usuario si la validación pasa
            const theUser = await User.create(body);
            return theUser;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }
    /**
    * Muestra la información de un solo usuario
    */
    public async show({ params }: HttpContextContract) {
        return User.findOrFail(params.id);
    }
    /**
    * Actualiza la información de un usuario basado
    * en el identificador y nuevos parámetros
    */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Validar los datos de entrada
            await request.validate({
                schema: schema.create({
                    name: schema.string.optional({ trim: true }, [
                        rules.maxLength(60),
                    ]),
                    email: schema.string.optional({ trim: true }, [
                        rules.email(),
                        rules.maxLength(254),
                    ]),
                    password: schema.string.optional({ trim: true }, [
                        rules.maxLength(256),
                    ]),
                }),
            })

            // Encriptar la nueva contraseña antes de almacenarla
            const body = request.body();
            if (body.password) {
                body.password = Encryption.encrypt(body.password);
            }

            // Actualizar el usuario si la validación pasa
            const theUser = await User.findOrFail(params.id);
            theUser.name = body.name || theUser.name;
            theUser.email = body.email || theUser.email;
            theUser.password = body.password || theUser.password;
            await theUser.save();
            return theUser;
        } catch (error) {
            return response.status(400).send(error.messages)
        }
    }
    /**
    * Elimina a un usuario basado en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theUser = await User.findOrFail(params.id);
        return theUser.delete();
    }
}