import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  list(): Observable<Plan[]> { // Esto es como una promesa
    return this.http.get<Plan[]>(`${environment.url_ms_negocio}/plans`);
    }
    delete(id:string){
    return this.http.delete<Plan>(`${environment.url_ms_negocio}/plans/${id}`,
    );
  }
}
