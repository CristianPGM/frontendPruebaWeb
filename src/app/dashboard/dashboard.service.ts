import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
 
  name: string;
  description: string;
  
  price: number;
  
  stock: number;
  
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8000/api/productos/outlet'; // URL de tu backend Laravel
private apilogoutUrl = 'http://localhost:8000/api/logout';



  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

   deleteProducto(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProducto(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apilogoutUrl}`, {});
  }
}
