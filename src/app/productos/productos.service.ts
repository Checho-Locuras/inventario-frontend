import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = '/api/productos';

  constructor(private http: HttpClient) {}

  getInventario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario`);
  }

  registrarMovimiento(movimiento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/movimiento`, movimiento);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/eliminar`, { id });
  }
}