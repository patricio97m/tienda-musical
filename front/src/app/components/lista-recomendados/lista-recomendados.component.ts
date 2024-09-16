import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lista-recomendados',
  templateUrl: './lista-recomendados.component.html',
  styleUrl: './lista-recomendados.component.css'
})
export class ListaRecomendadosComponent implements OnInit {
  @Input() categoria: string;
  @Input() id: any;
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.traerProductosPorCategoria(this.categoria).subscribe(productos => {
      this.productos = productos;
      const itemIndex = this.productos.findIndex(producto => producto.id === this.id);

      if (itemIndex !== -1) {
      this.productos.splice(itemIndex, 1);
      }
    });
  }
}

