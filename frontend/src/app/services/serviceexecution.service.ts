import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Serviceexecution } from '../models/service_execution.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceexecutionService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/serviceexecutions`;
  }
  list(): Observable<Serviceexecution[]> { // Esto es como una promesa
    return this.http.get<Serviceexecution[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Serviceexecution>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Serviceexecution> {
    return this.http.get<Serviceexecution>(`${this.baseUrl}/${id}`);
  }
  create(newServiceexecution: Serviceexecution): Observable<Serviceexecution> {
    return this.http.post<Serviceexecution>(this.baseUrl, newServiceexecution);
  }
  update(theServiceexecution: Serviceexecution): Observable<Serviceexecution> {
    return this.http.put<Serviceexecution>(`${this.baseUrl}/${theServiceexecution.id}`, theServiceexecution);
  }
  getServiceexecutionByCustomer(id: number): Observable<Serviceexecution[]> {
    return this.http.get<Serviceexecution[]>(`${environment.url_ms_business}/customer/${id}`);
  }
}
