import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Pay} from "../models/pay.model";

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http: HttpClient) { }
  list(): Observable<Pay[]> { // Esto es como una promesa
    return this.http.get<Pay[]>(`${environment.url_ms_negocio}/pay`);
  }
  delete(id:number){
    return this.http.delete<Pay>(`${environment.url_ms_negocio}/pay/${id}`);
  }
  view(id:number):Observable<Pay> {
    return this.http.get<Pay>(`${environment.url_ms_negocio}/pay/${id}`);
  }
  create(newPay: Pay): Observable<Pay> {
    return this.http.post<Pay>(`${environment.url_ms_negocio}/pay`, newPay);
  }
  update(thePay: Pay): Observable<Pay> {
    return this.http.put<Pay>(`${environment.url_ms_negocio}/campus/${thePay.id}`, thePay);
  }
}
