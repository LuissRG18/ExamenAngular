import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DBInterface, ApiResponse } from '../common/dbinterface';


@Injectable({
  providedIn: 'root',
})
export class DBapiService {
  private readonly URL = "https://dragonball-api.com/api/characters";

  constructor(private http: HttpClient) {}

  getPersonajes(page: number = 1, limit: number = 10): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.URL}?page=${page}&limit=${limit}`);
  }

  getPersonaje(id: string): Observable<DBInterface> {
    return this.http.get<DBInterface>(`${this.URL}/${id}`);
  }

  getPersonajesByUrl(url: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url);
  }
}
