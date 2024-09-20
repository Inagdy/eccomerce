import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);
  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/products`);
  }
  getSpecificProducts(id: string | null): Observable<any> {
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/products/${id}`);
  }
}
