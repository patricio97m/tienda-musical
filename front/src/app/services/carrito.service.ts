import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito';
  private conteoProductosSource = new BehaviorSubject<number>(0);
  conteoProductos$ = this.conteoProductosSource.asObservable();

  compraRealizada = new BehaviorSubject<boolean>(false);

  notificarCompraRealizada(): void {
    this.compraRealizada.next(true);
  }

  resetearNotificacionCompra(): void {
    this.compraRealizada.next(false);
  }

  constructor(private http: HttpClient) {
    this.actualizarConteoProductos();
  }

  obtenerCarrito(): any[] {
    const carrito = localStorage.getItem(this.carritoKey);
    return carrito ? JSON.parse(carrito) : [];
  }

  actualizarConteoProductos(): void {
    const conteo = this.obtenerCarrito().length;
    this.conteoProductosSource.next(conteo);
  }

  añadirAlCarrito(product: any): void {
    const carrito = this.obtenerCarrito();
    carrito.push(product);
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
    this.actualizarConteoProductos();
  }

  obtenerPrecioTotal(): number {
    const carrito = this.obtenerCarrito();
    let precioTotal = 0;
    carrito.forEach(producto => {
      precioTotal += producto.precio;
    });
    return precioTotal;
  }

  eliminarDelCarrito(productId: number): void {
    let carrito = this.obtenerCarrito();
    const productoIndex = carrito.findIndex(p => p.id === productId);
    if (productoIndex !== -1) {
      carrito.splice(productoIndex, 1);
      localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
      this.actualizarConteoProductos();
    }
  }

  limpiarCarrito(): void {
    localStorage.removeItem(this.carritoKey);
    this.actualizarConteoProductos();
  }

  enviarCarrito(userName: string): void {
    const carrito = this.obtenerCarrito();
    const precioTotal = this.obtenerPrecioTotal();
    this.http.post('http://localhost:3000/api/compra/', {usuario: userName , precioTotal: precioTotal, productos: carrito} )
      .subscribe({
        next: (response) => console.log('Carrito enviado con éxito', response),
        error: (error) => console.error('Error al enviar el carrito', error)
      });
  }
}
