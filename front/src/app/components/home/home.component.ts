import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ProductoService, Producto } from "../../services/producto.service";
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('miModal') miModal: ElementRef;

  productos: Producto[];

  constructor(private productoService: ProductoService, private carritoService: CarritoService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productoService.cargarProductos(16).subscribe(productos => this.productos = productos);
  }

  ngAfterViewInit(): void {
    this.carritoService.compraRealizada.subscribe((realizada) => {
      if (realizada) {
        this.mostrarModalCompraExitosa();
        this.carritoService.resetearNotificacionCompra();
      }
    });
  }

  mostrarModalCompraExitosa(): void {
    this.cdr.detectChanges();
    const modalElement = this.miModal.nativeElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  navegarACategoria(categoria: string) {
    this.router.navigate(['/resultados-busqueda'], { queryParams: { categoria: categoria } });
  }
}
