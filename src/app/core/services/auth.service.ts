import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { jwtDecode } from 'jwt-decode';
import { IuserData } from '../../interfaces/iuser-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //  httpclient------> import aap.com

  private readonly _httpClient = inject(HttpClient);
  private readonly _route = inject(Router);

  userData!: IuserData;

  setRegisterForm(data: object): Observable<any> {
    return this._httpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/signup`,
      data

    );
  }

  loginFrom(data: object): Observable<any> {
    return this._httpClient.post(
      `${enviroment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }
  logout() {
    localStorage.removeItem('userToken');
    this._route.navigate(['/login']);

    this.userData.id = '';
    this.userData.name = '';
    this.userData.role = '';
    this.userData.iat = 0;
    this.userData.exp = 0;
  }
  verifyEmail(data:object):Observable<any>{
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  verifyCode(data:object):Observable<any>{
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  setResetPassword(data:object):Observable<any>{
    return this._httpClient.put(`${enviroment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}
