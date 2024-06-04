import { Component } from '@angular/core';
import { AgendaService } from '../../services/agenda.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {
  citas: any[] = [];
  fecha: any;
  formattedDate: any;
  i = 0;
  clienteBuscar: any;
  idBuscar: any;
  fechaBuscar: any;

  constructor(private agendaService: AgendaService) {
    this.CitasFechaActual();
  }

  CitasFechaActual() {
    this.agendaService.ConsularCitas().subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          this.citas = response.data;
          for (this.i = 0; this.i < this.citas.length; this.i++) {
            this.fecha = new Date(this.citas[this.i].fecha);
            this.citas[this.i].fechaSola = `${this.fecha.getFullYear()}-${this.fecha.getMonth() + 1}-${this.fecha.getDate()}`;
            this.citas[this.i].hora = `${this.fecha.getHours()}:${this.fecha.getMinutes()}:${this.fecha.getSeconds()}`;
          }
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );

  }

  buscar() {
    this.clienteBuscar = document.getElementById("ClienteBuscar") as HTMLInputElement;
    this.idBuscar = document.getElementById("IdBuscar") as HTMLInputElement;
    this.fechaBuscar = document.getElementById("FechaBuscar") as HTMLInputElement;
    this.formattedDate = "";
    if (this.fechaBuscar.value != "") {
      this.formattedDate = new Date(this.fechaBuscar.value).toISOString();
    }

    this.agendaService.BuscarCitas(this.idBuscar.value, this.clienteBuscar.value.toUpperCase(), this.formattedDate).subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          this.citas = response.data;
          for (this.i = 0; this.i < this.citas.length; this.i++) {
            this.fecha = new Date(this.citas[this.i].fecha);
            this.citas[this.i].fechaSola = `${this.fecha.getFullYear()}-${this.fecha.getMonth() + 1}-${this.fecha.getDate()}`;
            this.citas[this.i].hora = `${this.fecha.getHours()}:${this.fecha.getMinutes()}:${this.fecha.getSeconds()}`;
          }
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );
  }

  Limpiar() {
    this.clienteBuscar = document.getElementById("ClienteBuscar") as HTMLInputElement;
    this.idBuscar = document.getElementById("IdBuscar") as HTMLInputElement;
    this.fechaBuscar = document.getElementById("FechaBuscar") as HTMLInputElement;
    this.clienteBuscar.value = "";
    this.idBuscar.value = "";
    this.fechaBuscar.value = "";

  }


}