import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/customers`;
  }
  list(): Observable<Customer[]> { // Esto es como una promesa
    return this.http.get<Customer[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Customer>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }
  create(newCustomer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, newCustomer);
  }
  update(theCustomer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${theCustomer.id}`, theCustomer);
  }
}
