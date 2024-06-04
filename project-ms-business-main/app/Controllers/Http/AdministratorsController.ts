import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Administrator from "App/Models/Administrator";
import AdministratorValidator from "App/Validators/AdministratorValidator";

export default class AdministratorsController {
  public async find({ request, params }: HttpContextContract) {
    const { page, per_page } = request.only(["page", "per_page"]);
    let administrators;

    if (params.id) {
      administrators = [await Administrator.findOrFail(params.id)];
    } else if (page && per_page) {
      administrators = await Administrator.query().paginate(page, per_page);
    } else {
      administrators = await Administrator.all();
    }

    if (page && per_page) {
      return {
        meta: administrators.getMeta(),
        data: administrators.toJSON(),
      };
    }

    return administrators;
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(AdministratorValidator);
    const theAdministrator: Administrator = await Administrator.create(body);
    return theAdministrator;
  }

  public async update({ params, request }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
    const data = request.body();
    theAdministrator.merge(data);
    return await theAdministrator.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
    response.status(204);
    return await theAdministrator.delete();
  }
}

