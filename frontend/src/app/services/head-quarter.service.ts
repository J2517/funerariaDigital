import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Headquarter} from "../models/headquarter.model";

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/headquarters`;
  }
  list(): Observable<Headquarter[]> { // Esto es como una promesa
    return this.http.get<Headquarter[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Headquarter>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Headquarter> {
    return this.http.get<Headquarter>(`${this.baseUrl}/${id}`);
  }
  create(newHeadquarter: Headquarter): Observable<Headquarter> {
    return this.http.post<Headquarter>(this.baseUrl, newHeadquarter);
  }
  update(theHeadquarter: Headquarter): Observable<Headquarter> {
    return this.http.put<Headquarter>(`${this.baseUrl}/${theHeadquarter.id}`, theHeadquarter);
  }
}
