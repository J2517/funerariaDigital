import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Relocation from "App/Models/Relocation";
import RelocationValidator from "App/Validators/RelocationValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class relocationsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Relocation.findOrFail(params.id);
    }
    const data = request.all();

    if ("page" in data && "per_page" in data) {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);

      return await Relocation.query().paginate(page, perPage);
    }
    return await Relocation.all();
  }

  public async create({ request }: HttpContextContract) {
    if (await this.exitsCity(request.input("origin"))) {
      return { message: "The origin city does not exist" };
    }
    if (await this.exitsCity(request.input("destination"))) {
      return { message: "The origin city does not exist" };
    }
    const data = await request.validate(RelocationValidator);
    return await Relocation.create(data);
  }

  public async update({ request, params }: HttpContextContract) {
    if (await this.exitsCity(request.input("origin"))) {
      return { message: "The origin city does not exist" };
    }
    if (await this.exitsCity(request.input("destination"))) {
      return { message: "The destination city does not exist" };
    }
    const relocation: Relocation = await Relocation.findOrFail(params.id);
    const data = request.body();
    relocation.merge(data);
    return await relocation.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const relocation = await Relocation.findOrFail(params.id);
    response.status(204);
    return await relocation.delete();
  }

//Obtener las ciudades de la API
static async getCity() {
  try {
    const response = await axios.get(Env.get("API_MAP_NATIONAL"));
    return response.data;
  } catch (error) {
    return error;
  }
}

public async exitsCity(city: string) {
  const cities = await relocationsController.getCity();
  return cities.includes(city);
  //return axios.get(`${Env.get("API_MAP_NATIONAL")}/?Department=${city}`);
}
}
