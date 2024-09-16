import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ResultadosBusquedaComponent } from './components/resultados-busqueda/resultados-busqueda.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'profile', component: PerfilComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resultados-busqueda', component: ResultadosBusquedaComponent },
  { path: '**', component: HomeComponent },
];
