import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;                   // id del usuario
  name: string;                 // name
  email: string;                // email
  email_verified_at?: string | null; 
  password?: string;           
  remember_token?: string | null;    
  created_at?: string;          
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
