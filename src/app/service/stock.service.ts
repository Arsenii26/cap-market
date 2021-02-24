import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { interval } from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';
const API_URL = 'http://localhost:8003/transaction/';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  public getAllStocks(): Observable<any> {
    const queryUrl = API_URL + 'stock/all';
    return this.http.get(queryUrl,
      {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

}
