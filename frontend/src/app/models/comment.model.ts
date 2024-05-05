import {ServiceExecution} from "./service-execution.model";
export class Comment {
  id?:string;
  message:string;
  sendDate:Date;
  execution:ServiceExecution;
}
