import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AgendarService } from '../../services/agendar.service';
import { InventarioService } from '../../services/inventario.service';

import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmergentMessageComponent } from "../emergent-message/emergent-message.component";

@Component({
  selector: 'app-agendar',
  standalone: true,
  templateUrl: './agendar.component.html',
  styleUrl: '../Portal/portal.component.scss',
  imports: [RouterOutlet, RouterLink, NgIf, NgFor, EmergentMessageComponent]
})
export class AgendarComponent implements OnInit {
  fecha: any;
  formattedDate: any;
  i = 0;
  cliente: any;
  id: any;
  cita: any;
  hora: any;
  minutos: any;
  doctora: any;
  visible = false;
  guardado = false;
  vacios = false;
  noGuardado = false;
  inventario: any[] = [];

  carrito: any[] = [];
  totalPagar: any;
  idUltimo: any;

  constructor(@Inject(Router) private router: Router, private agendarService: AgendarService, private inventarioService: InventarioService) {
    this.ConsultarInventario();

  }
  ngOnInit(): void {
    this.ConsultarUltimo();
  }

  AgregarCita() {
    this.InicializarCampos();
    this.FormatearFecha();
    this.ValidarCamposVacios();

    if (this.vacios == true) {
      return
    }

    var json = {
      "idCita": this.id.value,
      "cliente": this.cliente.value,
      "doctora": this.doctora.value,
      "fecha": this.formattedDate,
      "status": 0
    }

    var jsonConverter = JSON.stringify(json);

    this.agendarService.AgregarCitas(jsonConverter).subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          this.visible = true;
          this.guardado = true;
          this.noGuardado = false;
          this.vacios = false;
          this.LimpiarCamposGuardados();
          this.ConsultarUltimo();
        } else {
          console.log("no")
          this.noGuardado = true;

        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );
    this.AgregarDetalleCita();

  }

  ValidarHora() {
    this.hora = document.getElementById("Hora") as HTMLInputElement;
    if (this.hora.value > 24) {
      this.hora.value = "";
    }
  }
  ValidarMinutos() {
    this.minutos = document.getElementById("Minutos") as HTMLInputElement;
    if (this.minutos.value > 60) {
      this.minutos.value = "";
    }
  }

  FormatearFecha() {
    this.formattedDate = "";
    if (this.fecha.value != "") {
      this.formattedDate = new Date(this.fecha.value);
      this.formattedDate.setHours(this.hora.value);
      this.formattedDate.setMinutes(this.minutos.value);
      this.formattedDate = new Date(this.formattedDate).toISOString();
      this.formattedDate = this.formattedDate.slice(0, -1) + "-07:00"; // Add time zone offset


    }
  }

  ValidarCamposVacios() {
    if (this.cliente.value == "" || this.id.value == "" || this.fecha.value == ""
      || this.hora.value == "" || this.minutos.value == "" || this.doctora.value == "") {

      this.vacios = true;

    } else {
      this.vacios = false;
      this.guardado = false;
      this.noGuardado = false;

    }
  }

  LimpiarCampos() {
    this.InicializarCampos();
    this.cliente.value = "";
    this.fecha.value = "";
    this.hora.value = "";
    this.minutos.value = ""
    this.doctora.value = ""

    this.guardado = false;
    this.noGuardado = false;
    this.vacios = false;
    this.totalPagar.value = 0;

    this.carrito = [];
  }

  LimpiarCamposGuardados() {
    this.InicializarCampos();
    this.cliente.value = "";
    this.fecha.value = "";
    this.hora.value = "";
    this.minutos.value = ""
    this.doctora.value = ""
    this.totalPagar.value = 0;

    this.noGuardado = false;
    this.vacios = false;
    this.carrito = [];
  }

  InicializarCampos() {
    this.cliente = document.getElementById("Cliente") as HTMLInputElement;
    this.id = document.getElementById("Id") as HTMLInputElement;
    this.fecha = document.getElementById("Fecha") as HTMLInputElement;
    this.hora = document.getElementById("Hora") as HTMLInputElement;
    this.minutos = document.getElementById("Minutos") as HTMLInputElement;
    this.doctora = document.getElementById("Doctora") as HTMLInputElement;
    this.totalPagar = document.getElementById("Total") as HTMLInputElement;
    console.log("");
  }

  ConsultarInventario() {
    this.InicializarCampos();

    this.inventarioService.ConsultarInventario().subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          this.inventario = response.data
        } else {
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );
  }

  AgregarCarrito(id: any) {
    this.InicializarCampos();
    this.carrito.push(this.inventario[id - 1]);
    this.totalPagar.value = 0;
    for (this.i = 0; this.i < this.carrito.length; this.i++) {

      this.totalPagar.value = Number(this.totalPagar.value) + Number(this.carrito[this.i].precio);
    }
  }

  EliminarCarrito(id: any) {
    this.InicializarCampos();
    let arreglo = this.carrito;
    arreglo = arreglo.slice(0, id).concat(arreglo.slice(id + 1));
    this.carrito = arreglo;
    this.totalPagar.value = 0;
    for (this.i = 0; this.i < this.carrito.length; this.i++) {
      this.totalPagar.value = Number(this.totalPagar.value) + Number(this.carrito[this.i].precio);
    }
  }

  AgregarDetalleCita() {
    this.InicializarCampos();
    this.ValidarCamposVacios();
    var json;
    if (this.vacios == true) {
      return
    }
    if (this.carrito.length > 0) {


      for (this.i = 0; this.i < this.carrito.length; this.i++) {
        json = {
          "idCita": this.id.value,
          "numProd": this.carrito[this.i].idProc,
          "nomProd": this.carrito[this.i].nomProc,
          "precio": this.carrito[this.i].precio,

        }
        this.carrito[this.i] = json;
      }
      var jsonConverter = JSON.stringify(this.carrito);

      this.agendarService.AgregarDetalleCita(jsonConverter).subscribe(
        (response) => {
          if (response.meta.statusCode == 200) {

          } else {
            console.log("no")
            this.noGuardado = true;

          }
        },
        (error) => {
          console.error('Error al obtener datos del empleado:', error);
        }
      );
    }
  }

  ConsultarUltimo() {
    this.InicializarCampos();
    this.agendarService.ConsultarUltimo().subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          this.id.value = response.data + 1;
        } else {
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );
  }
}
