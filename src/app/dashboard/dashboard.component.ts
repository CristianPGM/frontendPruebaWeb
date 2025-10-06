import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from './dashboard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    
  filtro = '';
  productos: any[] = [];
  router=inject(Router);

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getProductos().subscribe({

      next: (data) => {
        this.productos = data; // aquí asignamos los datos
        
      },
      error: (err) => console.error('Error en dashboard', err)
    });
  }

  eliminarProducto(id: number) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    this.dashboardService.deleteProducto(id).subscribe({
      next: () => {
        console.log('Producto eliminado');
         this.ngOnInit();
      },
      error: (err) => console.error('Error al eliminar producto', err),
    });
  }

  actualizarProducto(producto: any) {
    const nuevoNombre = prompt('Nuevo nombre:', producto.name);
    const nuevoPrecio = prompt('Nuevo precio:', producto.price);

    if (!nuevoNombre || !nuevoPrecio) return;

    const actualizado = { ...producto, name: nuevoNombre, price: parseFloat(nuevoPrecio) };

    this.dashboardService.updateProducto(producto.id, actualizado).subscribe({
      next: () => {
        console.log('Producto actualizado');
        this.ngOnInit();// recarga la lista
      },
      error: (err) => console.error('Error al actualizar producto', err),
    });
  }



  get productosFiltrados() {
    return this.productos.filter((p: { name: string; }) =>
      p.name?.toLowerCase().includes(this.filtro.toLowerCase())
    )
  }

  cerrarSesion() {
    this.dashboardService.logout().subscribe({
      next: () => {
        console.log('Sesión cerrada');
        this.router.navigate(['/login']); // redirige al login
      },
      error: (err) => console.error('Error al cerrar sesión', err)
    });
  }
}
