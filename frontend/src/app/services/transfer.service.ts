import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  list(): Observable<Transfer[]> { // Esto es como una promesa
    return this.http.get<Transfer[]>(`${environment.url_ms_cinema}/transfers`);
    }
    delete(id:string){
    return this.http.delete<Transfer>(`${environment.url_ms_cinema}/transfers/${id}`,
    );
  }
}
