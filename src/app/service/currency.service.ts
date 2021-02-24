import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
const API_URL = 'http://localhost:8003/transaction/';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  public getAllCurrency(): Observable<any> {
    const queryUrl = API_URL + 'currency/all';
    return this.http.get(queryUrl,
      {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  public getCurrencyByType(type: string): Observable<any> {
    const queryUrl = API_URL + 'currency/name/' + type;
    return this.http.get(queryUrl,
      {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }
}
