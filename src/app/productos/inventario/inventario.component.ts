import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductosService } from '../productos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-inventario',
    templateUrl: './inventario.component.html',
    styleUrls: ['./inventario.component.css'],
    standalone: false
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  productoForm!: FormGroup;
  modalRef!: BsModalRef;
  showProductForm = false;

  @ViewChild('productModal') productModal!: TemplateRef<any>; 

  constructor(
    private productosService: ProductosService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm(); 
    this.cargarInventario();
  }

  initForm(): void {
    this.productoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      cantidad: [0, [Validators.required, Validators.min(0)]]
    });
  }

  cargarInventario(): void {
    this.productosService.getInventario().subscribe({
      next: (response) => {
        this.productos = response.sort((a: any, b: any) => a.id - b.id);
      },
      error: (error) => {
        console.error('Error al obtener el inventario', error);
      }
    });
  }

  incrementarCantidad(producto: any): void {
    this.actualizarProducto(producto, true);
  }

  decrementarCantidad(producto: any): void {
    this.actualizarProducto(producto, false);
  }

  actualizarProducto(producto: any, isEnter: boolean): void {
    const movimiento = {
      ProductoId: producto.id,
      Cantidad: 1,
      Tipo: isEnter ? 1 : 0
    };

    this.productosService.registrarMovimiento(movimiento).subscribe({
      next: () => {
        this.cargarInventario();
      },
      error: (error) => {
        console.error('Error al registrar el movimiento', error);
        // Revertir cambio en caso de error
        this.cargarInventario();
      }
    });
  }

  openProductModal(): void {
    // Utilizamos ViewChild que ya está inicializado después de ngOnInit
    this.initForm(); // Resetear formulario
    this.modalRef = this.modalService.show(this.productModal);
  }

  closeProductModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  // Alternativa para MatCard
  toggleProductForm(): void {
    this.showProductForm = !this.showProductForm;
    if (this.showProductForm) {
      this.initForm();
    }
  }

  guardarProducto(): void {
    if (this.productoForm.valid) {
      const nuevoProducto = this.productoForm.value;

      this.productosService.agregarProducto(nuevoProducto).subscribe({
        next: (response) => {
          this.cargarInventario();

          // Cerrar modal o formulario
          if (this.modalRef) {
            this.closeProductModal();
          } else {
            this.showProductForm = false;
          }

          alert('Producto creado con éxito');
        },
        error: (error) => {
          alert('Error al crear el producto');
        }
      });
    }
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe({
        next: () => {
          alert('Producto eliminado con éxito');
          this.cargarInventario();
        },
        error: (error) => {
          alert('Error al eliminar el producto');
        }
      });
    }
  }

  close(): void {
    if (confirm('¿Está seguro de que desea salir?')) {
      this.authService.logout();
    }
  }
}