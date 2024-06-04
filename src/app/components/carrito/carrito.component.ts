import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { HojaclinicaComponent } from '../hojaclinica/hojaclinica.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {
  showModal: boolean = false; // Controlar la visibilidad del modal
  @ViewChild('myDialog') dialog!: ElementRef;

  constructor(
    private hojaComponent: HojaclinicaComponent,
  ) { }

  ngOnInit(): void { }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  CerrarDialog() {

    this.hojaComponent.CerrarDialog();

  }

  regresar() {
    this.hojaComponent.paginaActual = 'paso1'
  }


}    
