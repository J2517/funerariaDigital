import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Chat} from "../models/chat.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  list(): Observable<Chat[]> { // Esto es como una promesa
    return this.http.get<Chat[]>(`${environment.url_ms_negocio}/chat`);
  }
  delete(id:string){
    return this.http.delete<Chat>(`${environment.url_ms_negocio}/chat/${id}`);
  }
}
