import { Beneficiary } from "./beneficiary.model";

export class Accountholder {
  id?: number;
  name: string;
  email: string;
  password: string;
  beneficiaries?: Beneficiary[];
}
