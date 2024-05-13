import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../models/client.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private http: HttpClient) {}
  list(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.url_ms_negocio}/client`);
  }
  delete(id: number) {
    return this.http.delete<Client>(
      `${environment.url_ms_negocio}/client/${id}`
    );
  }
}
