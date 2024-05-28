import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Driver } from "../models/driver.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DriverService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/drivers`;
  }
  list(): Observable<Driver[]> { // Esto es como una promesa
    return this.http.get<Driver[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Driver>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Driver> {
    return this.http.get<Driver>(`${this.baseUrl}/${id}`);
  }
  create(newDriver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.baseUrl, newDriver);
  }
  update(theDriver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.baseUrl}/${theDriver.id}`, theDriver);
  }
}
