import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { HojaclinicaComponent } from '../hojaclinica/hojaclinica.component';
import { InventarioService } from '../../services/inventario.service';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  showModal: boolean = false; // Controlar la visibilidad del modal
  @ViewChild('myDialog') dialog!: ElementRef;
  inventario: any;

  carrito: any[] = [];
  totalPagar: any;
  cantidad: any;

  constructor(
    private hojaComponent: HojaclinicaComponent,
    private inventarioService: InventarioService,
  ) {
    this.ConsultarInventario();
  }

  ngOnInit(): void { }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  regresar() {
    this.hojaComponent.paginaActual = 'paso1';
  }

  sumar(i: number) {
    this.cantidad = document.getElementById("cantidad" + i) as HTMLInputElement;
    //let intValue: number = +this.cantidad.value; // intValue will be 123

    this.cantidad.value = +this.cantidad.value + 1;
  }
  restar(i: number) {
    this.cantidad = document.getElementById("cantidad" + i) as HTMLInputElement;
    if (this.cantidad.value > 0) {
      this.cantidad.value = +this.cantidad.value - 1;
    }
  }

  ConsultarInventario() {
    //this.InicializarCampos();

    this.inventarioService.ConsultarInventario().subscribe(
      (response) => {
        if (response.meta.statusCode == 200) {
          this.inventario = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
      }
    );
  }

  AgregarCarrito(id: any) {
    //this.InicializarCampos();
    this.carrito.push(this.inventario[id - 1]);
    this.totalPagar.value = 500;
    for (var i = 0; i < this.carrito.length; i++) {

      this.totalPagar.value = Number(this.totalPagar.value) + Number(this.carrito[i].precio);
    }
  }

  EliminarCarrito(id: any) {
    //this.InicializarCampos();
    let arreglo = this.carrito;
    arreglo = arreglo.slice(0, id).concat(arreglo.slice(id + 1));
    this.carrito = arreglo;
    this.totalPagar.value = 500;
    for (var i = 0; i < this.carrito.length; i++) {
      this.totalPagar.value = Number(this.totalPagar.value) + Number(this.carrito[i].precio);
    }
  }

  /*AgregarDetalleCita() {
    //this.InicializarCampos();
    //this.ValidarCamposVacios();
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
            this.noGuardado = true;

          }
        },
        (error) => {
          console.error('Error al obtener datos del empleado:', error);
        }
      );
    }
  }*/

}    
