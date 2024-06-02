import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Headline } from "../models/owner.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HeadlineService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/owners`;
  }
  list(): Observable<Headline[]> { // Esto es como una promesa
    return this.http.get<Headline[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Headline>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Headline> {
    return this.http.get<Headline>(`${this.baseUrl}/${id}`);
  }
  create(newHeadline: Headline): Observable<Headline> {
    return this.http.post<Headline>(this.baseUrl, newHeadline);
  }
  update(theHeadline: Headline): Observable<Headline> {
    return this.http.put<Headline>(`${this.baseUrl}/${theHeadline.id}`, theHeadline);
  }
}
