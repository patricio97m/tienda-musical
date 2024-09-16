import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-historial',
  templateUrl: './lista-historial.component.html',
  styleUrl: './lista-historial.component.css'
})
export class ListaHistorialComponent implements OnInit {
  @Input() user: any[];
  @Input() compras: any[];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.fetchCompras(this.user['cognito:username']);
  }

  get todasLasCompras(): any[] {
    return this.compras ? this.compras.map(compra => {
      const productosParseados = JSON.parse(compra.productos);
      const precioTotal = compra.precioTotal;
      const fechaCompra = new Date(compra.createdAt).toLocaleDateString();
      const nombreProductos = productosParseados.map(producto => producto.nombre).join(', ');
      return {
        id: compra.id,
        precioTotal: precioTotal,
        nombreProductos: nombreProductos,
        fechaCompra: fechaCompra
      };
    }) : [];
  }

  fetchCompras(username: any): void {
    this.userService.getHistorial(username)
      .subscribe(
        compras => {
          this.compras = (compras as any[]) || [];
        },
        error => {
          console.error('Error fetching purchases:', error);
        }
      );
  }
}
