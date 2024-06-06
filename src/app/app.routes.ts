import { Routes } from '@angular/router';
import { PortalComponent } from './components/Portal/portal.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendarComponent } from './components/agendar/agendar.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { loginGuard } from './guards/login.guard';
import { InicioComponent } from './components/Inicio/inicio.component';
import { HojaclinicaComponent } from './components/hojaclinica/hojaclinica.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
        canActivate: [loginGuard],
    },
    {
        path: '',
        title: 'inicio',
        component: PortalComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'inicio',
                title: 'Inicio',
                component: InicioComponent,
            },
            {
                path: 'agenda',
                title: 'Agenda',
                component: AgendaComponent,
            },
            {
                path: 'agendar',
                title: 'Agendar',
                component: AgendarComponent,
            },
            {
                path: 'inventario',
                title: 'Inventario',
                component: InventarioComponent,
            },
            {
                path: 'configuracion',
                title: 'Configuracion',
                component: ConfiguracionComponent,
            },
            {
                path: 'hojaclinica/:id',
                title: 'Hoja Clinica',
                component: HojaclinicaComponent,
            }
        ]
    },
    {
        path: '**',
        outlet: 'main',
        component: NotfoundComponent
    }

];
