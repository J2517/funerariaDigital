import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  list(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_ms_negocio}/users`);
  }
  delete(id: number) {
    return this.http.delete<User>(`${environment.url_ms_negocio}/users/${id}`);
  }
}
