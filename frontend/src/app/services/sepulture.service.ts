import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sepulture } from '../models/sepulture.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SepultureService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/sepultures`;
  }
  list(): Observable<Sepulture[]> {
    return this.http.get<Sepulture[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Sepulture>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Sepulture> {
    return this.http.get<Sepulture>(`${this.baseUrl}/${id}`);
  }
  create(newSepulture: Sepulture): Observable<Sepulture> {
    return this.http.post<Sepulture>(this.baseUrl, newSepulture);
  }
  update(theSepulture: Sepulture): Observable<Sepulture> {
    return this.http.put<Sepulture>(`${this.baseUrl}/${theSepulture.id}`, theSepulture);
  }
}
