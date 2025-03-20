import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  getInventario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Productos/inventario`);
  }

  registrarMovimiento(movimiento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Productos/movimiento`, movimiento);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Productos/agregar`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Productos/eliminar`, { id });
  }
}