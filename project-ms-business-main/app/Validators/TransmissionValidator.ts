import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TransmissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.required(),
    ]),
    end_date: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.required(),
    ]),
  });

  public messages: CustomMessages = {
    "start_date.required": "La fecha de inicio es obligatoria.",
    "start_date.date": "La fecha de inicio debe estar en un formato válido (yyyy-MM-dd HH:mm:ss).",
    "end_date.required": "La fecha de fin es obligatoria.",
    "end_date.date": "La fecha de fin debe estar en un formato válido (yyyy-MM-dd HH:mm:ss).",
  };
}

