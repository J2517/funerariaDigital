import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Transmission from "App/Models/Transmission";
import TransmissionValidator from "App/Validators/TransmissionValidator"; // Importamos el validador de Transmission

export default class TransmissionsController {
  // Método para listar o buscar una transmisión específica
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theTransmission: Transmission = await Transmission.findOrFail(params.id);
      return theTransmission;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Transmission.query().paginate(page, perPage);
      } else {
        return await Transmission.query();
      }
    }
  }

  // Método para crear una nueva transmisión
  public async create({ request }: HttpContextContract) {
    // Validamos los datos de la solicitud usando el validador de Transmission
    const validatedData = await request.validate(TransmissionValidator);

    // Creamos una nueva instancia de Transmission con los datos validados
    const theTransmission: Transmission = await Transmission.create(validatedData);

    // Devolvemos la transmisión creada
    return theTransmission;
  }
}




