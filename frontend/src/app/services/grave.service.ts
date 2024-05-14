import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grave } from '../models/grave.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraveService {

  constructor(private http: HttpClient) { }

  list(): Observable<Grave[]> { // Esto es como una promesa
    return this.http.get<Grave[]>(`${environment.url_ms_negocio}/graves`);
    }
    delete(id:number){
    return this.http.delete<Grave>(`${environment.url_ms_negocio}/graves/${id}`,
    );
  }
}
