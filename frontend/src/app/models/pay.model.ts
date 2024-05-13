import {Subscription} from "./subscription.model";

export class Pay {
  id?: String;
  amount: number;
  description: string;
  date: Date;
  subscription: Subscription;
}
