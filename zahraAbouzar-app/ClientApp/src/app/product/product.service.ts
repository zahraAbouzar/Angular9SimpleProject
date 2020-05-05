import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { map, catchError, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = "http://localhost:5555/products/";
  constructor(private http: HttpClient) { }

  addProduct(product): Observable<any> {
    return this.http.post(this.productUrl, product, httpOptions)
      .pipe(
        tap(Product => console.log("Product: " + JSON.stringify(Product))),
        catchError(this.handleError(product))
      );
  }

  fetchData() {
    return this.http.get(this.productUrl, httpOptions);
  };

  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
