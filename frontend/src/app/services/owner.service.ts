import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Owner } from "../models/owner.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OwnerService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/owners`;
  }
  list(): Observable<Owner[]> { // Esto es como una promesa
    return this.http.get<Owner[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Owner>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Owner> {
    return this.http.get<Owner>(`${this.baseUrl}/${id}`);
  }
  create(newOwner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.baseUrl, newOwner);
  }
  update(theOwner: Owner): Observable<Owner> {
    return this.http.put<Owner>(`${this.baseUrl}/${theOwner.id}`, theOwner);
  }
}
