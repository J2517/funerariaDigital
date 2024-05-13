import { User } from "./user.model";
import { Chat } from "./chat.model";
export class Message {
  id?: string;
  information: string;
  User: User;
  chat: Chat;
}
