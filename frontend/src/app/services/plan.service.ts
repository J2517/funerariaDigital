import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/plans`;
  }
  list(): Observable<Plan[]> { // Esto es como una promesa
    return this.http.get<Plan[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Plan>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Plan> {
    return this.http.get<Plan>(`${this.baseUrl}/${id}`);
  }
  create(newPlan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.baseUrl, newPlan);
  }
  update(thePlan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.baseUrl}/${thePlan.id}`, thePlan);
  }
}
