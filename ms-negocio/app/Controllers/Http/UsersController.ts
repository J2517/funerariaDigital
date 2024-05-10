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
        const theUser=await User.create(body);
        return theUser;
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
        const theUser=await User.findOrFail(params.id);
        theUser.name=body.name;
        theUser.email=body.email;
        theUser.password=Encryption.encrypt(body.password);
        return theUser.save();
    }
    /**
    * Elimina a un usuario basado en el identificador
    */
    public async destroy({params}:HttpContextContract) {
        const theUser=await User.findOrFail(params.id);
        return theUser.delete();
    }
}