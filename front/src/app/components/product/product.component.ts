import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ProductoService, Producto} from "../../services/producto.service"
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from 'src/app/services/carrito.service';

declare var bootstrap: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @ViewChild('addToCartButton') addToCartButton!: ElementRef;
  product: any;

  productos: Producto[];
  productoPrincipal: Producto;
  productoId: number;

  constructor(private productoService:ProductoService, private route: ActivatedRoute, private router: Router,    private http: HttpClient,private cartService: CarritoService){}

  ngAfterViewInit(): void {
    new bootstrap.Tooltip(this.addToCartButton.nativeElement, {
      title: '¡Producto añadido al carrito!',
      trigger: 'manual',
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoId = +params['id'];
      if (!productoIdEsValido(this.productoId)) {
        this.router.navigate(['/']);
        return;
      }
      this.cargarProductoPrincipal();
    });
    this.cargarProductosCarrousel(8);

    const productId = this.route.snapshot.paramMap.get('id'); //obtiene la informacion actual de la url para sacar la id del producto. snapshot es una propiedad de ActivatedRoute, obtiene la ruta en este preciso momento
    this.http.get(`http://localhost:3000/api/producto/${productId}`).subscribe((data: any) => { //obtenemos los detalles del producto con la peticion http
      this.product = data;
    });
  }

  addToCart(): void {
     this.cartService.añadirAlCarrito(this.product);
    const tooltip = bootstrap.Tooltip.getInstance(this.addToCartButton.nativeElement);
    tooltip.show();
    setTimeout(() => tooltip.hide(), 1500);
  }

  cargarProductoPrincipal() {
    this.route.params.subscribe(params => {
      if (!productoIdEsValido(+params['id'])) {
        this.router.navigate(['/']);
        return;
      }
      this.productoId = +params['id'];

      this.productoService
        .cargarProducto(this.productoId)
        .subscribe(productoPrincipal => this.productoPrincipal = productoPrincipal);
    });
  }

  cargarProductosCarrousel(cantidad:number){
    this.productoService
      .cargarProductos(cantidad)
      .subscribe(productos => this.productos = productos);
  }
}
function productoIdEsValido(productoId: number): boolean {
  return (productoId != null && productoId > 0);
}

