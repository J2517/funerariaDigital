import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceExecution } from '../models/service-execution.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceExecutionService {

  constructor(private http: HttpClient) { }

  list(): Observable<ServiceExecution[]> { // Esto es como una promesa
    return this.http.get<ServiceExecution[]>(`${environment.url_ms_negocio}/serviceExecutions`);
    }
    delete(id:string){
    return this.http.delete<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecutions/${id}`,
    );
  }
}
