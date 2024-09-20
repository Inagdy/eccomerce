import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllCategoriesService {
  private readonly _httpClient = inject(HttpClient);

  getCategories(): Observable<any> {
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategories(id:string): Observable<any> {
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/categories/${id}`);
  }
}
