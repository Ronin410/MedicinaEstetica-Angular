import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendarService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('tokenSesion'), 'Content-Type': 'application/json' })
  }

  AgregarCitas(json: String): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/citas/agregar`, json, this.httpOptions
    );
  }

  AgregarDetalleCita(json: String): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/citas/agregar/detalle`, json, this.httpOptions
    );
  }

  ConsultarUltimo(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/citas/ultimo`, this.httpOptions
    );
  }
}
