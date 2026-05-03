import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductListResponse } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products`;

  getAll(filters: { category?: string; search?: string } = {}): Observable<ProductListResponse> {
    let params = new HttpParams();
    if (filters.category) params = params.set('category', filters.category);
    if (filters.search) params = params.set('search', filters.search);
    return this.http.get<ProductListResponse>(this.apiUrl, { params });
  }

  getById(id: number): Observable<{ product: Product }> {
    return this.http.get<{ product: Product }>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<{ categories: string[] }> {
    return this.http.get<{ categories: string[] }>(`${this.apiUrl}/categories`);
  }
}
