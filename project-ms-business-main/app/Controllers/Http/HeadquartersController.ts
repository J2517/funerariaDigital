import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Headquarter from "App/Models/Headquarter";
import axios from "axios";

import Env from "@ioc:Adonis/Core/Env";
import HeadquarterValidator from "App/Validators/HeadquarterValidator";

export default class HeadquartersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Headquarter.findOrFail(params.id);
    }
    const data = request.all();

    if ("page" in data && "per_page" in data) {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);

      return await Headquarter.query().paginate(page, perPage);
    }
    return await Headquarter.all();
  }

  public async create({ request }: HttpContextContract) {
    if (await this.existsCity(request.input("city"))) {
      return { message: "The city does not exist" };
    }

    const body = await request.validate(HeadquarterValidator);
    return await Headquarter.create(body);
  }

  public async update({ request, params }: HttpContextContract) {
    if (await this.existsCity(request.input("city"))) {
      return { message: "The city does not exist" };
    }
    const data = request.body();
    const headquarter = await Headquarter.findOrFail(params.id);
    headquarter.merge(data);
    return await headquarter.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const headquarter = await Headquarter.findOrFail(params.id);
    response.status(204);
    return await headquarter.delete();
  }

  //Obtener las ciudades de la API
  static async getDepartmentsAndCities() {
    try {
      const response = await axios.get(Env.get("API_SODA_COLOMBIA"));
      return response.data;
    } catch (error) {
      console.error("Error fetching departments and cities:", error);
      return [];
    }
  }

  public async existsCity(city: string) {
    const data = await HeadquartersController.getDepartmentsAndCities();
    return data.some(
      (item) => item.municipio.toLowerCase() === city.toLowerCase()
    );
  }
}
