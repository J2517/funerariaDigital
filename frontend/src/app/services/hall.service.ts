import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Hall} from "../models/hall.model";

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http: HttpClient) { }
  list(): Observable<Hall[]> { // Esto es como una promesa
    return this.http.get<Hall[]>(`${environment.url_ms_negocio}/hall`);
  }
  delete(id:string){
    return this.http.delete<Hall>(`${environment.url_ms_negocio}/hall/${id}`);
  }
}
