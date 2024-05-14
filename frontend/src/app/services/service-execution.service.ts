import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceExecution } from '../models/service-execution.model';
import { environment } from '../../environments/environment';
import {Comment} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceExecutionService {

  constructor(private http: HttpClient) { }
  list(): Observable<ServiceExecution[]> { // Esto es como una promesa
    return this.http.get<ServiceExecution[]>(`${environment.url_ms_negocio}/serviceExecution`);
  }
  delete(id:number){
    return this.http.delete<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecution/${id}`);
  }
  view(id:number):Observable<ServiceExecution> {
    return this.http.get<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecution/${id}`);
  }
  create(newServiceExecution: ServiceExecution): Observable<ServiceExecution> {
    return this.http.post<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecution`, newServiceExecution);
  }
  update(theServiceExecution: ServiceExecution): Observable<ServiceExecution> {
    return this.http.put<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecution/${theServiceExecution.id}`, theServiceExecution);
  }
}
