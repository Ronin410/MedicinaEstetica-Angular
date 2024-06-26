import { Component, Inject } from '@angular/core';
import { InicioService } from '../../services/inicio.service'
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  citasHoy: any[] = [];
  fecha: any;
  formattedDate: any;
  i = 0;
  constructor(private inicioService: InicioService, private router: Router) {
    this.CitasFechaActual();
  }

  NgOnInit() {
    this.CitasFechaActual();
  }

  CitasFechaActual() {
    this.fecha = new Date();
    this.formattedDate = this.fecha.toISOString().replace(/\.\d{3}Z$/, '.000-07:00'); // Adjust milliseconds and timezone
    this.inicioService.ConsularCitasActual(this.formattedDate).subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          this.citasHoy = response.data;
          for (this.i = 0; this.i < this.citasHoy.length; this.i++) {
            this.fecha = new Date(this.citasHoy[this.i].fecha);
            this.citasHoy[this.i].fechaSola = `${this.fecha.getFullYear()}-${this.fecha.getMonth() + 1}-${this.fecha.getDate()}`;
            this.citasHoy[this.i].hora = `${this.fecha.getHours()}:${this.fecha.getMinutes()}:${this.fecha.getSeconds()}`;
          }
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );

  }

  atenderCita(cita: any) {
    //this.router.navigateByUrl('/hojaclinica', { state: { cita } });
    this.router.navigate(['/hojaclinica/', cita.idCita]);
  }
}
