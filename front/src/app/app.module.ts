import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';


import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductComponent } from './components/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ValidationEmailComponent } from './components/validation-email/validation-email.component';
import { HttpClientModule } from '@angular/common/http';
import { BotonComponent } from './components/boton-carrito/boton-carrito.component';
import { BotonVerComponent } from './components/boton-ver/boton-ver.component';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { ResultadosBusquedaComponent } from './components/resultados-busqueda/resultados-busqueda.component';
import { ListaHistorialComponent } from './components/lista-historial/lista-historial.component';
import { ListaRecomendadosComponent } from './components/lista-recomendados/lista-recomendados.component';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    PerfilComponent,
    CarritoComponent,
    ProductComponent,
    ValidationEmailComponent,
    BotonComponent,
    BotonVerComponent,
    BarraBusquedaComponent,
    HeaderComponent,
    ResultadosBusquedaComponent,
    ListaHistorialComponent,
    ListaRecomendadosComponent,
    ProductoTarjetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FooterComponent,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
