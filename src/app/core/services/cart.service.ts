import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _Httpclient: HttpClient) {}


  
  



  addProductToCart(data: string): Observable<any> {
    return this._Httpclient.post(
      `${enviroment.baseUrl}/api/v1/cart`,
      {
        productId: data,
      }
    );
  }

  getAllItemsOnTheCart(): Observable<any> {
    return this._Httpclient.get(`${enviroment.baseUrl}/api/v1/cart`);
  }

  deleteSpecificItem(data: string): Observable<any> {
    return this._Httpclient.delete(
      `${enviroment.baseUrl}/api/v1/cart/${data}`);
  }

  clearUsercart(): Observable<any> {
    return this._Httpclient.delete(`${enviroment.baseUrl}/api/v1/cart`);
  }

  checkOut(data: object, id: string | null): Observable<any> {
    return this._Httpclient.post(
      `${enviroment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${enviroment.URL}`,
      {
        shippingAddress: data,
      }
    );
  }
}
