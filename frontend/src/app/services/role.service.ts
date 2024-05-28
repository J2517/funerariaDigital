import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../models/role.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/roles`;
  }
  list(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Role>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`);
  }
  create(newRole: Role): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, newRole);
  }
  update(theRole: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/${theRole.id}`, theRole);
  }
}
