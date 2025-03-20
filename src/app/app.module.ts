import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module'; 
import { LoginComponent } from './auth/login/login.component';
import { InventarioComponent } from './productos/inventario/inventario.component';
import { MovimientoComponent } from './productos/movimiento/movimiento.component';
import { AuthGuard } from './auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';


// Define las rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: 'movimiento', component: MovimientoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/login' } // Ruta para manejar errores 404
];

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AuthModule 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }