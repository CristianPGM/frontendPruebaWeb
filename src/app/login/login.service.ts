import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;                   // id del usuario
  name: string;                 // name
  email: string;                // email
  email_verified_at?: string | null; // nullable, Laravel lo maneja como datetime
  password?: string;            // usualmente no se envía al frontend
  remember_token?: string | null;    // opcional
  created_at?: string;          // timestamps, opcional
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  private apiLoginUrl = 'http://localhost:8000/api/login';
  

  getLogin(data: any) {
    return this.http.post<User[]>(`${this.apiLoginUrl}`, data);
  }

   

  
}
