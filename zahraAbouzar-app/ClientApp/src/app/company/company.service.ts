import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { map, catchError, tap } from 'rxjs/operators';
import { Company } from './company';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyUrl = "http://localhost:5555/companyes/";
  constructor(private http: HttpClient) { }

  addCompany(_company: Company): Observable<Company> {
    return this.http.post<Company>(this.companyUrl, _company, httpOptions)
      .pipe(
        tap(Company => console.log("Company: " + JSON.stringify(Company))),
        catchError(this.handleError(_company))
      );
  }

  fetchData() {
   return this.http.get(this.companyUrl,httpOptions);     
  };

  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
