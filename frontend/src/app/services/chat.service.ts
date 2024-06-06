import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Chat} from "../models/chat.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/chats`;
  }
  list(): Observable<Chat[]> { // Esto es como una promesa
    return this.http.get<Chat[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Chat>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Chat> {
    return this.http.get<Chat>(`${this.baseUrl}/${id}`);
  }
  create(newChat: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.baseUrl, newChat);
  }
  update(theChat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${this.baseUrl}/${theChat.id}`, theChat);
  }
  getChatsByServiceAndCustomer(
    idCustomer: string,
    idService: string,
  ): Observable<Chat[]> {
    return this.http.get<Chat[]>(
      `${environment.url_ms_business}/customers/${idCustomer}/service_executions/${idService}/chats`,
    );
  }
}
