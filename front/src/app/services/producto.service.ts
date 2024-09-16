import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productosApiUrl = "http://localhost:3000/api/producto/";
  
  constructor(private http: HttpClient, private location: Location) { }

  cargarProductos(cantidad?: number): Observable<Producto[]> {
    let url = this.productosApiUrl;
    if(cantidad!=null){
      url += "cantidad/" + cantidad
    }

    return this.http.get<Producto[]>(url)
      .pipe(catchError(this.handleError<Producto[]>("cargarProductos", [])))
      
  }

  cargarProducto(id: any): Observable<Producto> {
    var url = this.productosApiUrl;
    url += id

    return this.http.get<Producto>(url)
      .pipe(
        catchError(this.handleError<Producto>("cargarProducto")))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  buscarProducto(busqueda: string) {
    const params = new HttpParams().set('nombre', busqueda);
    return this.http.get<any[]>(this.productosApiUrl, { params });
  }

  traerProductosPorCategoria(categoria: string) {
    const params = new HttpParams().set('categoria', categoria);
    return this.http.get<any[]>(this.productosApiUrl, {params});
  }
}

export class Producto{

  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;

  constructor(){}
}