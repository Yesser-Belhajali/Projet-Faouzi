import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurant: string;
  type: string;
  store_id: number;
  image?: string;
  available?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(filters?: {
    type?: string;
    available?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Observable<ProductsResponse> {
    let params = new HttpParams();
    
    if (filters?.type) params = params.set('type', filters.type);
    if (filters?.available !== undefined) params = params.set('available', filters.available.toString());
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.page) params = params.set('page', filters.page.toString());
    if (filters?.limit) params = params.set('limit', filters.limit.toString());

    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Helper methods for specific types
  getRestaurantProducts(): Observable<ProductsResponse> {
    return this.getProducts({ type: 'restaurant' });
  }

  getPharmacyProducts(): Observable<ProductsResponse> {
    return this.getProducts({ type: 'pharmacy' });
  }

  getBoutiqueProducts(): Observable<ProductsResponse> {
    return this.getProducts({ type: 'boutique' });
  }
}
