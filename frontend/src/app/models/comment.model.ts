import { Service_execution } from "./service_execution.model";

export class Comment {
  id?: number;
  user_id: number;
  rating: number;
  comment: string;
  service_execution_id?: number;
}
