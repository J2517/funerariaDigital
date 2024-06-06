import {Usuario} from "./usuario.model";
import {Chat} from "./chat.model";
export class Message {
  id?:string;
  information:string;
  usuario:Usuario;
  chat:Chat;
}
