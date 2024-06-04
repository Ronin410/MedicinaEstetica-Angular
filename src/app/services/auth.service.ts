import { provideHttpClient, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  isAuth() {
    this.token = localStorage.getItem('tokenSesion');

    if (this.token == null || this.token == "") {
      return false;
    } else {

      return this.validarToken().subscribe(
        (response) => {
          if (response.meta.statusCode == 200) {
            if (response.data != true) {
              localStorage.setItem("tokenSesion", "");
              return false;
            }

            return true;
          } else {
            console.error('Error al validar el token:');
            return false;
          }
        },
        (error) => {
          console.error('Error al validar el token:', error);
        }
      );

    }
  }

  isLog() {
    this.token = localStorage.getItem('logueado');
    if (this.token == "0") {
      return false;
    } else {
      return true;
    }
  }

  postLogin(json: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/login`, json, this.httpOptions
    );
  }

  validarToken(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/valida/token?token=${this.token}`, null
    );
  }

  validaToken(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/auth/validar/token`
    );
  }

  postToken(json: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/login`, json, this.httpOptions
    );
  }

}