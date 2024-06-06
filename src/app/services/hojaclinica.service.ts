import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HojaclinicaService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('tokenSesion'), 'Content-Type': 'application/json' })
  }

  consultarInfoHoja(id: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/hojaclinica/consultar?id=${id}`, this.httpOptions
    );
  }

  AgregarHojaClinica(json: String): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/hojaclinica/agregar`, json, this.httpOptions
    );
  }
}
