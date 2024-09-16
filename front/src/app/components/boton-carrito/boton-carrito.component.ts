import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

declare var bootstrap: any;

@Component({
  selector: 'app-boton-carrito',
  templateUrl: './boton-carrito.component.html',
  styleUrls: ['./boton-carrito.component.css']
})
export class BotonComponent implements AfterViewInit {
  @ViewChild('tooltipButton') tooltipButton!: ElementRef;
  @Input() product: any;


  constructor(private cartService: CarritoService) {}

  ngAfterViewInit(): void {
    new bootstrap.Tooltip(this.tooltipButton.nativeElement, {
      title: '¡Producto añadido al carrito!',
      trigger: 'manual',
    });
  }

  addToCart(): void {
    event.stopPropagation();
    this.cartService.añadirAlCarrito(this.product);
    const tooltip = bootstrap.Tooltip.getInstance(this.tooltipButton.nativeElement);
    tooltip.show();
    setTimeout(() => tooltip.hide(), 1500);
  }
}
