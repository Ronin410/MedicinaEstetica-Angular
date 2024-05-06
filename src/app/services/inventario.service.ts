import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('tokenSesion') })
  }

  ConsultarInventario(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/inventario/consultar/todo`, this.httpOptions
    );
  }
}
