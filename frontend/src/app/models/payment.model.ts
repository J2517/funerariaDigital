import { Subscription } from "./subscription.model";

export class Payment {
  id?: number;
  amount: number;
  payment_method: string;
  payment_date: Date;
  subscription_id?: number;  
}
