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
      return true;
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

  validaToken(token: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/valida/token?token=${token}`, ""
    );
  }




  /*postLogin(json: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/login`,
      json, this.options
    );
  }*/
}
