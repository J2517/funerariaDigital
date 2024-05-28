import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Room} from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/rooms`;
  }
  list(): Observable<Room[]> { // Esto es como una promesa
    return this.http.get<Room[]>(this.baseUrl);
  }
  delete(id:number){
    return this.http.delete<Room>(`${this.baseUrl}/${id}`);
  }
  view(id:number):Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/${id}`);
  }
  create(newRoom: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl, newRoom);
  }
  update(theRoom: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${theRoom.id}`, theRoom);
  }
}
