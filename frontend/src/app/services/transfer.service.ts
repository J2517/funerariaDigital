import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/transfers`;
  }
  list(): Observable<Transfer[]> { // Esto es como una promesa
    return this.http.get<Transfer[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Transfer>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Transfer> {
    return this.http.get<Transfer>(`${this.baseUrl}/${id}`);
  }
  create(newTransfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(this.baseUrl, newTransfer);
  }
  update(theTransfer: Transfer): Observable<Transfer> {
    return this.http.put<Transfer>(`${this.baseUrl}/${theTransfer.id}`, theTransfer);
  }
}
