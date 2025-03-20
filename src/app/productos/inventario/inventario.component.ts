import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductosService } from '../productos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// Alternativa usando MatDialog en lugar de ngx-bootstrap
// import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-inventario',
    templateUrl: './inventario.component.html',
    styleUrls: ['./inventario.component.css'],
    standalone: false
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  productoForm!: FormGroup; // Utilizando el operador ! para inicialización diferida
  modalRef!: BsModalRef; // Utilizando el operador ! para inicialización diferida
  showProductForm = false; // Para la alternativa de MatCard

  @ViewChild('productModal') productModal!: TemplateRef<any>; // Utilizando el operador ! para inicialización diferida

  constructor(
    private productosService: ProductosService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
    // private dialog: MatDialog // Alternativa usando MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm(); // Movido a ngOnInit para asegurar que FormBuilder esté disponible
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
        this.productos = response;
      },
      error: (error) => {
        console.error('Error al obtener el inventario', error);
      }
    });
  }

  incrementarCantidad(producto: any): void {
    producto.cantidad++;
    this.actualizarProducto(producto);
  }

  decrementarCantidad(producto: any): void {
    if (producto.cantidad > 0) {
      producto.cantidad--;
      this.actualizarProducto(producto);
    }
  }

  actualizarProducto(producto: any): void {
    this.productosService.actualizarProducto(producto).subscribe({
      next: () => {
        console.log('Producto actualizado con éxito');
      },
      error: (error) => {
        console.error('Error al actualizar el producto', error);
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
      
      this.productosService.crearProducto(nuevoProducto).subscribe({
        next: (response) => {
          console.log('Producto creado con éxito', response);
          this.cargarInventario();
          
          // Cerrar modal o formulario
          if (this.modalRef) {
            this.closeProductModal();
          } else {
            this.showProductForm = false;
          }
        },
        error: (error) => {
          console.error('Error al crear el producto', error);
        }
      });
    }
  }
}