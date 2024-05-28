import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Subscription} from "../models/subscription.model";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/subscriptions`;
  }
  list(): Observable<Subscription[]> { // Esto es como una promesa
    return this.http.get<Subscription[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Subscription>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Subscription> {
    return this.http.get<Subscription>(`${this.baseUrl}/${id}`);
  }
  create(newSubscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.baseUrl, newSubscription);
  }
  update(theSubscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.baseUrl}/${theSubscription.id}`, theSubscription);
  }
  getSubscriptionsByCustomer(id: string): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${environment.url_ms_business}/customers/${id}/subscriptions`);
  }
}
