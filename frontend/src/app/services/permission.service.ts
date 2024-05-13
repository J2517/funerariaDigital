import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Permission } from "../models/permission.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  constructor(private http: HttpClient) {}
  list(): Observable<Permission[]> {
    return this.http.get<Permission[]>(
      `${environment.url_ms_negocio}/permissions`
    );
  }
  delete(id: number) {
    return this.http.delete<Permission>(
      `${environment.url_ms_negocio}/permissions/${id}`
    );
  }
}
