import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service_execution } from '../models/service_execution.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Service_executionService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/service_executions`;
  }
  list(): Observable<Service_execution[]> { // Esto es como una promesa
    return this.http.get<Service_execution[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Service_execution>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Service_execution> {
    return this.http.get<Service_execution>(`${this.baseUrl}/${id}`);
  }
  create(newService_execution: Service_execution): Observable<Service_execution> {
    return this.http.post<Service_execution>(this.baseUrl, newService_execution);
  }
  update(theService_execution: Service_execution): Observable<Service_execution> {
    return this.http.put<Service_execution>(`${this.baseUrl}/${theService_execution.id}`, theService_execution);
  }
  getService_executionByCustomer(id: number): Observable<Service_execution[]> {
    return this.http.get<Service_execution[]>(`${environment.url_ms_business}/customer/${id}`);
  }
}
