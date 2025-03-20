import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent {
  movimiento = { tipo: 'entrada', cantidad: 0, productoId: 0 };

  constructor(private productosService: ProductosService) {}

  registrarMovimiento() {
    this.productosService.registrarMovimiento(this.movimiento).subscribe(
      (response) => {
        alert('Movimiento registrado correctamente');
      },
      (error) => {
        console.error('Error al registrar el movimiento', error);
      }
    );
  }
}