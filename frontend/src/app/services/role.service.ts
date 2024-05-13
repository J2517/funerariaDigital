import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../models/role.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private http: HttpClient) {}
  list(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_ms_negocio}/roles`);
  }
  delete(id: number) {
    return this.http.delete<Role>(`${environment.url_ms_negocio}/roles/${id}`);
  }
}
