import {ServiceExecution} from "./service-execution.model";
import {ListComponent} from "../pages/message/list/list.component"

export class Chat {
  id?:string;
  serviceExecution:ServiceExecution;
  message:ListComponent;
}
