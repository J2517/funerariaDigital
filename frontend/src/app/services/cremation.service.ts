import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cremation } from '../models/cremation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CremationService {

  constructor(private http: HttpClient) { }

    list(): Observable<Cremation[]> { // Esto es como una promesa
      return this.http.get<Cremation[]>(`${environment.url_ms_negocio}/cremations`);
      }
      delete(id:string){
      return this.http.delete<Cremation>(`${environment.url_ms_negocio}/Cremations/${id}`,
      );
  }
}
