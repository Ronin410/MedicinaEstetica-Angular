import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('tokenSesion') })
  }

  ConsularCitas(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/citas/consultar/todos`, this.httpOptions
    );
  }

  BuscarCitas(id: String, nombre: string, fecha: String): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/citas/consultar/cita?id=${id}&nombre=${nombre}&fecha=${fecha}`, this.httpOptions
    );
  }
}
