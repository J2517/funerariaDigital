import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";

export default class ServicesController {
  /**
   * Lista todos los servicios
   */
  public async index() {
    return Service.all();
  }

  /**
   * Almacena la información de un servicio
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body();
    const theService = await Service.create(body);
    return theService;
  }

  /**
   * Muestra la información de un solo servicio
   */
  public async show({ params }: HttpContextContract) {
    let theService: Service = await Service.query()
      .where("id", params.id)
      .preload("users")
      .firstOrFail();
    const users = await theService.related("users").query();
    const servicesExecutions = users.map((user) => {
      return {
       "date": user.$extras.pivot_date,
        "description": user.$extras.pivot_description,
        "price": user.$extras.pivot_price,
        "user": user.toJSON()
      };
    });
    return { ...theService.toJSON(), "servicesExecutions": servicesExecutions };
  }

  /**
   * Actualiza la información de un servicio basado en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body();
    const theService = await Service.findOrFail(params.id);
    theService.merge(body);
    await theService.save();
    return theService;
  }

  /**
   * Elimina un servicio basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const theService = await Service.findOrFail(params.id);
    return theService.delete();
  }
}
