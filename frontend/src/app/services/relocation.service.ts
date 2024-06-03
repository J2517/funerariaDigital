import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relocation } from '../models/relocation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelocationService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/relocations`;
  }
  list(): Observable<Relocation[]> { // Esto es como una promesa
    return this.http.get<Relocation[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Relocation>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Relocation> {
    return this.http.get<Relocation>(`${this.baseUrl}/${id}`);
  }
  create(newRelocation: Relocation): Observable<Relocation> {
    return this.http.post<Relocation>(this.baseUrl, newRelocation);
  }
  update(theRelocation: Relocation): Observable<Relocation> {
    return this.http.put<Relocation>(`${this.baseUrl}/${theRelocation.id}`, theRelocation);
  }
}
