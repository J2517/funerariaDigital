import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Message} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  list(): Observable<Message[]> { // Esto es como una promesa
    return this.http.get<Message[]>(`${environment.url_ms_negocio}/message`);
  }
  delete(id:string){
    return this.http.delete<Message>(`${environment.url_ms_negocio}/message/${id}`);
  }
}
