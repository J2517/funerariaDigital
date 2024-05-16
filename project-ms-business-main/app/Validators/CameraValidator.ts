import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CameraValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ancho: schema.number([
      rules.required(),
      rules.range(0, 100)
    ]),
    alto: schema.number([
      rules.required(),
      rules.range(0, 100)
    ]),
  });

  public messages: CustomMessages = {
    "ancho.required": "El ancho es requerido.",
    "ancho.range": "El ancho debe estar entre 0 y 100.",
    "alto.required": "El alto es requerido.",
    "alto.range": "El alto debe estar entre 0 y 100."
  };
}

