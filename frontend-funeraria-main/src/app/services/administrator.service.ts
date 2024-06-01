import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/administrators`;
  }
  list(): Observable<Administrator[]> { // Esto es como una promesa
    return this.http.get<Administrator[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Administrator>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Administrator> {
    return this.http.get<Administrator>(`${this.baseUrl}/${id}`);
  }
  create(newAdministrator: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(this.baseUrl, newAdministrator);
  }
  update(theAdministrator: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(`${this.baseUrl}/${theAdministrator.id}`, theAdministrator);
  }
}
