import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito: any[] = [];
  userInfo: any = undefined;
  userName: any = undefined;

  constructor(private carritoService: CarritoService,private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  eliminarDelCarrito(productId: number): void {
    this.carritoService.eliminarDelCarrito(productId);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  finalizarCompra(): void {
    this.userService.getUser().subscribe(
      data => {
        if (!data || !data['cognito:username']) {
          this.router.navigate(['/login']);
          return;
        }
        this.userName = data['cognito:username'];
        this.carritoService.enviarCarrito(this.userName);
        this.limpiarCarrito();
        this.carritoService.notificarCompraRealizada();
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error al obtener el nombre del usuario', error);
        this.router.navigate(['/login']);
      }
    );
  }

  totalCarrito(): number {
    return this.carritoService.obtenerPrecioTotal();
  }

  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
    this.carrito = [];
  }

}
