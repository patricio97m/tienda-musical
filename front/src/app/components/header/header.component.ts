import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  conteoProductos: number = 0;
  private suscripcion: Subscription;

  constructor(private cartService: CarritoService) {}

  ngOnInit(): void {
    this.suscripcion = this.cartService.conteoProductos$.subscribe(conteo => {
      this.conteoProductos = conteo;
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
