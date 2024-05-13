import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Driver } from "../models/driver.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DriverService {
  constructor(private http: HttpClient) {}
  list(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.url_ms_negocio}/drivers`);
  }
  delete(id: number) {
    return this.http.delete<Driver>(
      `${environment.url_ms_negocio}/drivers/${id}`
    );
  }
}
