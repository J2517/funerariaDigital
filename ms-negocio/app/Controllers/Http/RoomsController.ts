import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
    /**
    * Lista todas las salas
    */
    public async index() {
        return Room.all();
    }

    /**
    * Almacena la información de una sala
    */
    public async store({ request }: HttpContextContract) {
        const body = request.body();
        const theRoom = await Room.create(body);
        return theRoom;
    }

    /**
    * Muestra la información de una sola sala
    */
    public async show({ params }: HttpContextContract) {
        return Room.findOrFail(params.id);
    }

    /**
    * Actualiza la información de una sala basada en el identificador y nuevos parámetros
    */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theRoom = await Room.findOrFail(params.id);
        theRoom.merge(body);
        await theRoom.save();
        return theRoom;
    }

    /**
    * Elimina una sala basada en el identificador
    */
    public async destroy({ params }: HttpContextContract) {
        const theRoom = await Room.findOrFail(params.id);
        return theRoom.delete();
    }
}

