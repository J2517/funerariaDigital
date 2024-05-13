import {Customer} from "./customer.model";
import {Plan} from "./plan.model";

export class Subscription {
  id?: String;
  start_date: Date;
  end_date: Date;
  status: number;
  customer: Customer;
  plan: Plan;
}
