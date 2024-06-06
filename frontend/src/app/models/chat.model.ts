import {ServiceExecution} from "./service-execution.model";
import {ListComponent} from "../pages/message/list/list.component"

export class Chat {
  id?:string;
  execution:ServiceExecution;
  message:ListComponent;

  public sendMessage(): void{
  }

  public receiveMessage(): void{
  }

  public moderateMessage(): void{
  }
}
