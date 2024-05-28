import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Beneficiary } from "../models/beneficiary.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BeneficiaryService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/beneficiaries`;
  }
  list(): Observable<Beneficiary[]> { // Esto es como una promesa
    return this.http.get<Beneficiary[]>(this.baseUrl);
  }
  view(id:number):Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.baseUrl}/${id}`);
  }
  create(newBeneficiary: Beneficiary): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(this.baseUrl, newBeneficiary);
  }
  update(theBeneficiary: Beneficiary): Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${this.baseUrl}/${theBeneficiary.id}`, theBeneficiary);
  }
  getBeneficiariesByOwner(id: number): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(
      `${environment.url_ms_business}/owners/${id}/beneficiaries`,
    );
  }
  delete(id: number): Observable<Beneficiary> {
    return this.http.delete<Beneficiary>(`${this.baseUrl}/${id}`);
  }
}
