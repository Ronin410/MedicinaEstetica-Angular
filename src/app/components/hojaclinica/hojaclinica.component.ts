import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, EmbeddedViewRef, OnInit, ViewChild } from '@angular/core';
import { CarritoComponent } from "../carrito/carrito.component";
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HojaclinicaService } from '../../services/hojaclinica.service';
import { InventarioService } from '../../services/inventario.service';
import { AgendarService } from '../../services/agendar.service';

@Component({
  selector: 'app-hojaclinica',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hojaclinica.component.html',
  styleUrl: './hojaclinica.component.scss',
  imports: [CarritoComponent, NgIf, NgFor]
})
export class HojaclinicaComponent {
  mostrarCarrito = false;
  @ViewChild('myCarrito') dialog!: ElementRef;
  public paginaActual: string = 'paso1';

  idCita: any;
  cliente: any;
  doctora: any;
  fechaAtencion: any;
  fechaNacimiento: any;
  antecedentes: any;
  resumen: any;
  tratamiento: any;
  observaciones: any;
  antecedentesInfo: any;
  resumenInfo: any;
  tratamientoInfo: any;
  observacionesInfo: any;
  vacios: any;
  cantidad: any;
  inventario: any;
  carrito: any[] = [];
  jsonCarrito: any[] = [];
  totalPagar: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hojaClinicaService: HojaclinicaService,
    private inventarioService: InventarioService,
    private agendarService: AgendarService
  ) {
    this.paginaActual = 'paso1';
    this.ConsultarInventario();
  }

  ngOnInit(): void {
    this.idCita = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID de cita desde ActivatedRoute:', this.idCita);
  }

  ngAfterViewInit() {
    this.cargarInfo();

  }

  abrirCarrito() {
    this.paginaActual = 'paso2';

    this.antecedentes = document.getElementById("antecedentes") as HTMLInputElement;
    this.resumen = document.getElementById("resumen") as HTMLInputElement;
    this.tratamiento = document.getElementById("tratamiento") as HTMLInputElement;
    this.observaciones = document.getElementById("observaciones") as HTMLInputElement;

    this.antecedentesInfo = this.antecedentes.value;
    this.resumenInfo = this.resumen.value;
    this.tratamientoInfo = this.tratamiento.value;
    this.observacionesInfo = this.observaciones.value;

    document.addEventListener("DOMContentLoaded", () => {
      for (let index = 0; index < this.inventario.length; index++) {
        this.cantidad = document.getElementById("cantidad" + index) as HTMLInputElement;
        this.cantidad.value = this.carrito[index];
      }
    });
  }

  cargarInfo() {
    this.cliente = document.getElementById("nombreCliente") as HTMLInputElement;
    this.doctora = document.getElementById("doctora") as HTMLInputElement;
    this.fechaAtencion = document.getElementById("fecha_atencion") as HTMLInputElement;
    this.fechaNacimiento = document.getElementById("fecha_nacimiento") as HTMLInputElement;
    this.antecedentes = document.getElementById("antecedentes") as HTMLInputElement;
    this.resumen = document.getElementById("resumen") as HTMLInputElement;
    this.tratamiento = document.getElementById("tratamiento") as HTMLInputElement;
    this.observaciones = document.getElementById("observaciones") as HTMLInputElement;

    this.hojaClinicaService.consultarInfoHoja(this.idCita).subscribe(
      (response) => {
        if (response.meta.statusCode == 200 && response.data != null) {
          this.cliente.value = response.data.cliente;
          this.doctora.value = response.data.doctora;
          this.fechaAtencion.value = response.data.fechaAtencion;
          this.fechaNacimiento.value = response.data.fechaNacimiento;
          this.antecedentes.value = response.data.antecedentes;
          this.resumen.value = response.data.resumen;
          this.tratamiento.value = response.data.tratamiento;
          this.observaciones.value = response.data.observaciones;
          console.log(response.idCita);
        }
      },
      (error) => {
        console.error('Error al obtener datos de la hoja clinica:', error);
      }
    );

  }

  AgregarHojaClinica() {

    this.ValidarCamposVacios();

    if (this.vacios == true) {
      return
    }

    var json = {
      "idCita": this.idCita,
      "cliente": this.cliente.value,
      "doctora": this.doctora.value,
      "fechaAtencion": this.fechaAtencion.value,
      "fechaNacimiento": this.fechaNacimiento.value,
      "antecedentes": this.antecedentes.value,
      "resumen": this.resumen.value,
      "tratamiento": this.tratamiento.value,
      "observaciones": this.observaciones.value,
    }

    var jsonConverter = JSON.stringify(json);

    this.hojaClinicaService.AgregarHojaClinica(jsonConverter).subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          console.log("efw");
          this.guardarCarrito();
          this.ConsultarInventario();
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );



  }

  ValidarCamposVacios() {
    this.cliente = document.getElementById("nombreCliente") as HTMLInputElement;
    this.doctora = document.getElementById("doctora") as HTMLInputElement;
    this.fechaAtencion = document.getElementById("fecha_atencion") as HTMLInputElement;
    this.fechaNacimiento = document.getElementById("fecha_nacimiento") as HTMLInputElement;

    if (this.cliente.value == "" || this.doctora.value == ""
      || this.fechaAtencion.value == "" || this.fechaNacimiento.value == ""
    ) {
      this.vacios = true;
    } else {
      this.vacios = false;
    }
  }

  regresar() {
    this.paginaActual = 'paso1';
  }

  sumar(i: number) {
    this.cantidad = document.getElementById("cantidad" + i) as HTMLInputElement;
    this.totalPagar = document.getElementById("Total") as HTMLInputElement;
    this.carrito[i] = this.carrito[i] != null ? this.carrito[i] + 1 : 1;
    this.cantidad.value = this.carrito[i];
    this.calcularTotal();

  }

  calcularTotal() {
    this.totalPagar.value = 500;
    var totalProc;
    for (let i = 0; i < this.carrito.length; i++) {
      this.cantidad = document.getElementById("cantidad" + i) as HTMLInputElement;
      if (this.cantidad.value != null) {
        totalProc = +this.cantidad.value * +this.inventario[i].precio;
        this.totalPagar.value = +this.totalPagar.value + totalProc;
      }
    }
  }


  restar(i: number) {
    this.cantidad = document.getElementById("cantidad" + i) as HTMLInputElement;
    if (this.cantidad.value > 0) {
      this.carrito[i] = this.carrito[i] - 1;
      this.cantidad.value = this.carrito[i];
      this.calcularTotal();
    }
  }

  ConsultarInventario() {
    this.inventarioService.ConsultarInventario().subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          this.inventario = response.data;
          this.carrito = new Array(this.inventario.length);
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );
  }

  guardarCarrito() {
    var json;
    for (let i = 0; i < this.carrito.length; i++) {

      if (this.carrito[i] != null) {
        json = {
          "idCita": this.idCita,
          "numProd": this.inventario[i].idProc,
          "nomProd": this.inventario[i].nomProc,
          "precio": this.inventario[i].precio,
          "cantidad": this.carrito[i]
        }
        this.jsonCarrito[i] = json;
        console.log(this.carrito[i]);
      }

    }
    var jsonConverter = JSON.stringify(this.jsonCarrito);

    this.agendarService.AgregarDetalleCita(jsonConverter).subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          console.log(response.data);
          console.log(this.carrito[0]);
          this.jsonCarrito = [];
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );
  }
}
