import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProductComponent } from './components/product/product.component';
import { ValidationEmailComponent } from './components/validation-email/validation-email.component';
import { ResultadosBusquedaComponent } from './components/resultados-busqueda/resultados-busqueda.component';


const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'carrito', component: CarritoComponent },
  { path: 'login', component: LoginComponent},
  { path: 'perfil', component: PerfilComponent },
  { path: 'product', component: ProductComponent },
  { path: 'validationEmail', component: ValidationEmailComponent},
  { path: 'resultados-busqueda', component: ResultadosBusquedaComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }