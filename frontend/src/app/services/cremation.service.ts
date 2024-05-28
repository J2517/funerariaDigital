import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cremation } from '../models/cremation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CremationService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/cremations`;
  }
  list(): Observable<Cremation[]> { // Esto es como una promesa
    return this.http.get<Cremation[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Cremation>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Cremation> {
    return this.http.get<Cremation>(`${this.baseUrl}/${id}`);
  }
  create(newCremation: Cremation): Observable<Cremation> {
    return this.http.post<Cremation>(this.baseUrl, newCremation);
  }
  update(theCremation: Cremation): Observable<Cremation> {
    return this.http.put<Cremation>(`${this.baseUrl}/${theCremation.id}`, theCremation);
  }
}
