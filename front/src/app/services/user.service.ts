import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarioApiUrl = 'http://localhost:3000/api/usuario';
  private compraApiUrl = '//localhost:3000/api/compra';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.usuarioApiUrl}/login`, loginData);
  }

  signUp(username: string, password: string, email: string, name:string, family_name:string, address:string): Observable<any> {
    const signUpData = { username, password, email, name, family_name, address};
    return this.http.post(`${this.usuarioApiUrl}/signup`, signUpData);
  }

  confirmAccount(username: string, confirmationCode: string): Observable<any> {
    const confirmData = { username, confirmationCode };
    return this.http.post(`${this.usuarioApiUrl}/confirmAccount`, confirmData);
  }

  getUserInfo(){
    return this.http.get(`${this.usuarioApiUrl}/userInfo`);
  }

  getUser() : any {
    return this.http.get(`${this.usuarioApiUrl}/getUser`);
  }

  getHistorial(username: any){
    return this.http.get(`${this.compraApiUrl}/${username}`);
  }

  logout(username: string): Observable<any> {
    const logoutData = { username};
    return this.http.post(`${this.usuarioApiUrl}/logout`, logoutData);
  }
}
