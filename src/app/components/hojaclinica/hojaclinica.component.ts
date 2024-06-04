import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarritoComponent } from "../carrito/carrito.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-hojaclinica',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hojaclinica.component.html',
  styleUrl: './hojaclinica.component.scss',
  imports: [CarritoComponent, NgIf]
})
export class HojaclinicaComponent {
  mostrarCarrito = false;
  @ViewChild('myCarrito') dialog!: ElementRef;
  public paginaActual: string = 'paso1';

  constructor(
  ) {
    this.paginaActual = 'paso1';
  }
  ngOnInit(): void {

  }

  abrirCarrito() {
    this.paginaActual = 'paso2';
  }


  AbrirDialog() {

    this.dialog.nativeElement.show();
    //this.mostrar = false;
  }

  CerrarDialog() {

    this.dialog.nativeElement.close();

  }
}
