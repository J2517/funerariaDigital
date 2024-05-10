import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Role from "App/Models/Role";

export default class RolesController {
  /**
   * Lista todos los roles
   */
  public async index() {
    return Role.all();
  }

  /**
   * Almacena la información de un rol
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body();
    const theRole = await Role.create(body);
    return theRole;
  }

  /**
   * Muestra la información de un solo rol
   */
  public async show({ params }: HttpContextContract) {
    return Role.query().where("id", params.id).preload("users");
    // return Rol.findOrFail(params.id);
  }

  /**
   * Actualiza la información de un rol basado en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body();
    const theRole = await Role.findOrFail(params.id);
    theRole.merge(body);
    await theRole.save();
    return theRole;
  }

  /**
   * Elimina a un rol basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const theRole = await Role.findOrFail(params.id);
    return theRole.delete();
  }
}
