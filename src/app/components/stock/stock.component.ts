import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {StockService} from '../../service/stock.service';
import {StockModule} from '../../model/stock/stock.module';
import { timer } from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
  stocks: Array<StockModule> = [];
  stocksCopy: Array<StockModule> = [];
  priceDiff: Array<number> = [];
  isLoading = false;
  // stocks = new Array();
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    // this.subscription = this.stockService.getAllStocks().subscribe(data => {
    //     // console.log('GOOT ' + data);
    //     console.log('data is: ' + JSON.stringify(data));
    //     for (let i = 0; i < data.length; i++){
    //       // console.log(data[i].requirement);
    //       this.stocks.push(data[i]);
    //     }
    //     // temp solution
    //     // console.log('aaa is: ' + this.stocks);
    //   },
    //   (error) => {
    //     // this.openSnackBar('Server is offline, can\'t load task details');
    //     console.log('Some error! ' + error);
    //   });
    this.isLoading = true;
    this.subscription = interval(5000)
      .pipe(
        flatMap(() => this.stockService.getAllStocks())
      )
      .subscribe(data => {
          this.stocksCopy = this.stocks;
          this.stocks = [];
          for (let i = 0; i < data.length; i++){
            // console.log(data[i].requirement);
            this.stocks.push(data[i]);
          }
          this.isLoading = false;
        },
        (error) => {
          console.log('Some error! ' + error);
          this.isLoading = false;
        });

  }

  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    console.log("DESTROY");
    // this.stocks = [];
    this.subscription.unsubscribe();
  }
}
