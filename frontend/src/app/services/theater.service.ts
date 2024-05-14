import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theater } from '../models/theater.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private http: HttpClient) { }

  list(): Observable<Theater[]> { // Esto es como una promesa
    return this.http.get<Theater[]>(`${environment.url_ms_negocio}/theaters`);
    }
    delete(id:number){
    return this.http.delete<Theater>(`${environment.url_ms_negocio}/theaters/${id}`,
    );
  }
}
