import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Campus} from "../models/campus.model";

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  constructor(private http: HttpClient) { }
  list(): Observable<Campus[]> { // Esto es como una promesa
    return this.http.get<Campus[]>(`${environment.url_ms_negocio}/campus`);
  }
  delete(id:number){
    return this.http.delete<Campus>(`${environment.url_ms_negocio}/campus/${id}`);
  }
  view(id:number):Observable<Campus> {
    return this.http.get<Campus>(`${environment.url_ms_negocio}/campus/${id}`);
  }
  create(newCampus: Campus): Observable<Campus> {
    return this.http.post<Campus>(`${environment.url_ms_negocio}/campus`, newCampus);
  }
  update(theCampus: Campus): Observable<Campus> {
    return this.http.put<Campus>(`${environment.url_ms_negocio}/campus/${theCampus.id}`, theCampus);
  }
}
