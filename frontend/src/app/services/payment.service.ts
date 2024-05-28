import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Payment} from "../models/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/payments`;
  }
  list(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Payment>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${id}`);
  }
  create(newPayment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.baseUrl, newPayment);
  }
  update(thePayment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/${thePayment.id}`, thePayment);
  }
  getPaymentsBySubscription(id: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.url_ms_business}/subscriptions/${id}/payments`);
  }
}
