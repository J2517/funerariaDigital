import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grave } from '../models/sepulture.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraveService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/graves`;
  }
  list(): Observable<Grave[]> {
    return this.http.get<Grave[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Grave>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Grave> {
    return this.http.get<Grave>(`${this.baseUrl}/${id}`);
  }
  create(newGrave: Grave): Observable<Grave> {
    return this.http.post<Grave>(this.baseUrl, newGrave);
  }
  update(theGrave: Grave): Observable<Grave> {
    return this.http.put<Grave>(`${this.baseUrl}/${theGrave.id}`, theGrave);
  }
}
