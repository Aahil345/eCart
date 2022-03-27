import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements Resolve<any> {

  cartList: any[] = [];

  constructor(public http: HttpClient) { }

  resolve() {
    return forkJoin({
        products: this.getProducts(),
        categories: this.getCategories()
      });
  }

  getProducts(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products');
  }

  getOneProduct(prod): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/${prod}`);
  }

  getCategories(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products/categories');
  }

  getCatProducts(category): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/category/${category}`);
  }
}
