import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.css'
})

export class BarraBusquedaComponent {
  busqueda: string = '';
  categorias: string[] = ['Cuerdas', 'Teclados', 'Percusión', 'Vientos', 'Micrófonos y Audio', 'Amplificadores', 'Efectos y Accesorios'];

  constructor(private router: Router) {}

  buscar() {
    if (!this.busqueda.trim()) {
      return;
    }
    this.router.navigate(['/resultados-busqueda'], { queryParams: { busqueda: this.busqueda } });
  }

  buscarPorCategoria(categoria: string) {
    this.router.navigate(['/resultados-busqueda'], { queryParams: { categoria: categoria } });
  }
}
