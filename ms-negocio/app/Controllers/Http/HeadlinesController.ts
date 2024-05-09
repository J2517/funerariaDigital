import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Headline from "App/Models/Headline";

export default class HeadlinesController {
  /**
   * Lista todos los titulares
   */
  public async index() {
    return Headline.all();
  }

  /**
   * Almacena la información de un titular
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body();
    const newHeadline = await Headline.create(body);
    return newHeadline;
  }

  /**
   * Muestra la información de un solo titular
   */
  public async show({ params }: HttpContextContract) {
    return Headline.query().where("id", params.id).preload("beneficiaries");
  }

  /**
   * Actualiza la información de un titular basado en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body();
    const newHeadline = await Headline.findOrFail(params.id);
    newHeadline.merge(body);
    await newHeadline.save();
    return newHeadline;
  }

  /**
   * Elimina a un titular basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const newHeadline = await Headline.findOrFail(params.id);
    return newHeadline.delete();
  }
}
