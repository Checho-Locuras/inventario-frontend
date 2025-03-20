import { Routes } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { InventarioComponent } from './app/productos/inventario/inventario.component';
import { AuthGuard } from './app/auth/auth.guard';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


// Define las rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/login' } // Ruta para manejar errores 404
];

// Configura la aplicación con el enrutamiento
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));