import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../models/client.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private http: HttpClient) { }
  list(): Observable<Client[]> { // Esto es como una promesa
    return this.http.get<Client[]>(`${environment.url_ms_negocio}/client`);
  }
  delete(id:number){
    return this.http.delete<Client>(`${environment.url_ms_negocio}/client/${id}`);
  }
  view(id:number):Observable<Client> {
    return this.http.get<Client>(`${environment.url_ms_negocio}/client/${id}`);
  }
  create(newClient: Client): Observable<Client> {
    return this.http.post<Client>(`${environment.url_ms_negocio}/client`, newClient);
  }
  update(theClient: Client): Observable<Client> {
    return this.http.put<Client>(`${environment.url_ms_negocio}/client/${theClient.id}`, theClient);
  }
}
