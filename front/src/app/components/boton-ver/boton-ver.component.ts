import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductoService, Producto} from "../../services/producto.service"

@Component({
  selector: 'app-boton-ver',
  templateUrl: './boton-ver.component.html',
  styleUrl: './boton-ver.component.css'
})

export class BotonVerComponent {
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() product: any;

  constructor(private productoService:ProductoService, private router: Router){}
 
  navegarAProducto() : void {
    this.router.navigate(['/product', this.product.id]);
    window.scrollTo(0, 0);
  }
}
