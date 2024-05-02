import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/comment.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  list(): Observable<Comment[]> { // Esto es como una promesa
    return this.http.get<Comment[]>(`${environment.url_ms_negocio}/comment`);
  }
  delete(id:string){
    return this.http.delete<Comment>(`${environment.url_ms_negocio}/comment/${id}`);
  }
}
