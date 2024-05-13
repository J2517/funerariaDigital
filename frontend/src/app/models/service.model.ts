import { Driver } from "./driver.model";

export class Service {
  id?: number;
  nombre: string;
  descripción: string;
  costo: number;
  drivers?: Driver[];
}
