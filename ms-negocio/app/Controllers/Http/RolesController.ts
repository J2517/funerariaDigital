import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Rol from "App/Models/Role";

export default class RolesController {
  /**
   * Lista todos los roles
   */
  public async index() {
    return Rol.all();
  }

  /**
   * Almacena la información de un rol
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body();
    const nuevo_rol = await Rol.create(body);
    return nuevo_rol;
  }

  /**
   * Muestra la información de un solo rol
   */
  public async show({ params }: HttpContextContract) {
    return Rol.query().where("id", params.id).preload("usuarios");
    // return Rol.findOrFail(params.id);
  }

  /**
   * Actualiza la información de un rol basado en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body();
    const el_rol = await Rol.findOrFail(params.id);
    el_rol.merge(body);
    await el_rol.save();
    return el_rol;
  }

  /**
   * Elimina a un rol basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const el_rol = await Rol.findOrFail(params.id);
    return el_rol.delete();
  }
}
