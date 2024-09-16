import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductoService, Producto} from "../../services/producto.service"

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrl: './resultados-busqueda.component.css'
})
export class ResultadosBusquedaComponent implements OnInit {
  productos: any[] = [];

  constructor(private route: ActivatedRoute, private productoService: ProductoService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const busqueda = params['busqueda'];
      const categoria = params['categoria'];
      if (busqueda) {
        this.productoService.buscarProducto(busqueda).subscribe(productos => {
          this.productos = productos;
        });
      } else if (categoria) {
        this.productoService.traerProductosPorCategoria(categoria).subscribe(productos => {
          this.productos = productos;
        });
      }
    });
  }
}
