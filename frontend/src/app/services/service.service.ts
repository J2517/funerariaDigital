import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  list(): Observable<Service[]> { // Esto es como una promesa
    return this.http.get<Service[]>(`${environment.url_ms_negocio}/services`);
    }
    delete(id:number){
    return this.http.delete<Service>(`${environment.url_ms_negocio}/services/${id}`,
    );
  }
}
