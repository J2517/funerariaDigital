import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Permission } from "../models/permission.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/permissions`;
  }
  list(): Observable<Permission[]> { // Esto es como una promesa
    return this.http.get<Permission[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Permission>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Permission> {
    return this.http.get<Permission>(`${this.baseUrl}/${id}`);
  }
  create(newPermission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.baseUrl, newPermission);
  }
  update(thePermission: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${this.baseUrl}/${thePermission.id}`, thePermission);
  }
}
