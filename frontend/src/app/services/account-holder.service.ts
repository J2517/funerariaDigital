import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Accountholder } from "../models/accountholder.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AccountHolderService {
  constructor(private http: HttpClient) { }
  list(): Observable<Accountholder[]> { // Esto es como una promesa
    return this.http.get<Accountholder[]>(`${environment.url_ms_negocio}/accountholder`);
  }
  delete(id:number){
    return this.http.delete<Accountholder>(`${environment.url_ms_negocio}/accountholder/${id}`);
  }
  view(id:number):Observable<Accountholder> {
    return this.http.get<Accountholder>(`${environment.url_ms_negocio}/accountholder/${id}`);
  }
  create(newAccountholder: Accountholder): Observable<Accountholder> {
    return this.http.post<Accountholder>(`${environment.url_ms_negocio}/accountholder`, newAccountholder);
  }
  update(theAccountholder: Accountholder): Observable<Accountholder> {
    return this.http.put<Accountholder>(`${environment.url_ms_negocio}/accountholder/${theAccountholder.id}`, theAccountholder);
  }
}
