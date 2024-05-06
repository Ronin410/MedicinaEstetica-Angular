import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { NgForOf, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, RouterLink, LoginComponent, NgIf, NgForOf, HttpClientModule]
})
export class AppComponent implements AfterViewInit {

  title = 'Login';

  sesion = true;
  constructor(@Inject(Router) private router: Router) {
  }


  ngAfterViewInit() {

  }

}


