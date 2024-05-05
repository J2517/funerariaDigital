import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Encryption from '@ioc:Adonis/Core/Encryption'

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
    public async store({request}:HttpContextContract){
        const body=request.body();
        body.password=Encryption.encrypt(body.password);
        const nuevo_usuario=await User.create(body);
        return nuevo_usuario;
    }
    /**
    * Muestra la información de un solo usuario
    */
    public async show({params}:HttpContextContract) {
        return User.findOrFail(params.id);
    }
    /**
    * Actualiza la información de un usuario basado
    * en el identificador y nuevos parámetros
    */
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_usuario=await User.findOrFail(params.id);
        el_usuario.name=body.name;
        el_usuario.email=body.email;
        el_usuario.password=Encryption.encrypt(body.password);
        return el_usuario.save();
    }
    /**
    * Elimina a un usuario basado en el identificador
    */
    public async destroy({params}:HttpContextContract) {
        const el_usuario=await User.findOrFail(params.id);
        return el_usuario.delete();
    }
}