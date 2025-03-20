import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InventarioComponent } from './productos/inventario/inventario.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

export { routes };

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule ],
  exports: [RouterModule
  ]
})
export class AppRoutingModule { }