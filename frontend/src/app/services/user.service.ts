import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_security}/users`;
  }
  list(): Observable<User[]> { // Esto es como una promesa
    return this.http.get<User[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  create(newUser: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, newUser);
  }
  update(theUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${theUser.id}`, theUser);
  }
}
