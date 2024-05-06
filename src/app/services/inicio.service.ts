import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('tokenSesion') })
  }

  ConsularCitasActual(fecha: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/citas/fecha?fecha=${fecha}`, this.httpOptions
    );
  }
}
