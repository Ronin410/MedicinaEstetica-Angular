import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../services/auth.service'
import { HttpClientModule } from '@angular/common/http';
import { reduce } from 'rxjs';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  inicioSesion = true;
  validaSesion: any;
  correo: any;
  contrasena: any;
  isValidCredentials = true;
  constructor(@Inject(Router) private router: Router, private authService: AuthService) {
    localStorage.setItem("logueado", "0");
    localStorage.setItem("tokenSesion", "");

  }

  login(): void {
    this.loguearse();

  }

  loguearse() {
    this.correo = document.getElementById("correo") as HTMLInputElement;
    this.contrasena = document.getElementById("contrasena") as HTMLInputElement;

    var json = {
      "usuario": this.correo.value,
      "pass": this.contrasena.value
    }


    var jsonLogin = JSON.stringify(json);

    this.authService.postLogin(jsonLogin).subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          if (response.data == "Credenciales invalidas") {
            this.isValidCredentials = false;
          } else {
            localStorage.setItem("tokenSesion", response.data);
            this.router.navigate(['/inicio']);
            this.isValidCredentials = true;
          }

        } else {
          this.validaSesion = document.getElementById("validaSesion") as HTMLInputElement;
          this.validaSesion.value = "error al entrar"
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );
  }
}
