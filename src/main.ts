import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/auth/login/login.component';
import { InventarioComponent } from './app/productos/inventario/inventario.component';
import { MovimientoComponent } from './app/productos/movimiento/movimiento.component';
import { AuthGuard } from './app/auth/auth.guard';
import { provideHttpClient } from '@angular/common/http';

// Define las rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: 'movimiento', component: MovimientoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/login' } // Ruta para manejar errores 404
];

// Configura la aplicación con el enrutamiento
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provee las rutas
    provideHttpClient()
  ]
}).catch(err => console.error(err));