import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/services`;
  }
  list(): Observable<Service[]> { // Esto es como una promesa
    return this.http.get<Service[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Service>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/${id}`);
  }
  create(newService: Service): Observable<Service> {
    return this.http.post<Service>(this.baseUrl, newService);
  }
  update(theService: Service): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/${theService.id}`, theService);
  }
}
