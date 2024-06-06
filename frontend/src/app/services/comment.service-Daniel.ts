import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/comment.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/comments`;
  }
  list(): Observable<Comment[]> { // Esto es como una promesa
    return this.http.get<Comment[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Comment>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/${id}`);
  }
  create(newComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl, newComment);
  }
  update(theComment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/${theComment.id}`, theComment);
  }
  getCommentsByServiceExecution(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_business}/service_executions/${id}/comments`);
  }
}
