import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Accountholder } from "../models/accountholder.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AccountHolderService {
  constructor(private http: HttpClient) {}
  list(): Observable<Accountholder[]> {
    return this.http.get<Accountholder[]>(
      `${environment.url_ms_negocio}/account-holders`
    );
  }
  delete(id: number) {
    return this.http.delete<Accountholder>(
      `${environment.url_ms_negocio}/account-holders/${id}`
    );
  }
}
