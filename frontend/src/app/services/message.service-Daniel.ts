import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Message} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/messages`;
  }
  list(): Observable<Message[]> { // Esto es como una promesa
    return this.http.get<Message[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Message>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/${id}`);
  }
  create(newMessage: Message): Observable<Message> {
    return this.http.post<Message>(this.baseUrl, newMessage);
  }
  update(theMessage: Message): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}/${theMessage.id}`, theMessage);
  }
}
