import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Camera from "App/Models/Camera";
import CameraValidator from "App/Validators/CameraValidator"; // Importamos el validador de Camera

export default class CamerasController {
  // Método para listar o buscar una cámara específica
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theCamera: Camera = await Camera.findOrFail(params.id);
      return theCamera;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Camera.query().paginate(page, perPage);
      } else {
        return await Camera.query();
      }
    }
  }

  // Método para crear una nueva cámara
  public async create({ request }: HttpContextContract) {
    // Validamos los datos de la solicitud usando el validador de Camera
    const validatedData = await request.validate(CameraValidator);

    // Creamos una nueva instancia de Camera con los datos validados
    const theCamera: Camera = await Camera.create(validatedData);

    // Devolvemos la cámara creada
    return theCamera;
  }
}



