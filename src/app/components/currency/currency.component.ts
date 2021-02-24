import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {CurrencyService} from '../../service/currency.service';
import {BehaviorSubject, interval, Observable, ReplaySubject, Subscription} from 'rxjs';
import {CurrencyModule} from '../../model/currency/currency.module';
import {timer} from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})

export class CurrencyComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currencies: Array<CurrencyModule>;
  isLoading = false;
  private routerInfo: BehaviorSubject<number>;
  private routerInfo2: BehaviorSubject<number>;
  constructor(private snackBar: MatSnackBar, private currService: CurrencyService) {
  }

  // @Input() myProp:String;
  // @Output() myPropChange:EventEmitter<String> = new EventEmitter<String>();


  inputCurrency = 0;
  from = 1;
  // to = this.from / 0.2;
  // to = (this.inputCurrency * this.from) / 0.2;
  to = 0;

  selectedValue: string;
  selectedValue2: string;

  // https://stackoverflow.com/questions/35359358/angular-2-change-event-on-every-keypress
  onSearchChange(searchValue: number): void {
    // from
    // to
    // NEW WAY
    this.to = (searchValue * this.routerInfo.value / this.routerInfo2.value);
    // WITH TIMOUT REFRESH
    // setInterval(() => {
    //   // this.to = Number((Math.round(searchValue * this.routerInfo.value / this.routerInfo2.value)).toFixed(5));
    //   this.to = (searchValue * this.routerInfo.value / this.routerInfo2.value);
    // }, 1);


    // OLD WAY
    // // from
    // this.routerInfo.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`)
    // });
    // // to
    // this.routerInfo2.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`)
    // });
  }

  changeClient(currencyTypeFrom){
    this.currService.getCurrencyByType(currencyTypeFrom).subscribe(data => {
      // console.log('data is: ' + JSON.stringify(data));
      // {"id":11,"type":"INR","conversionRate":0.42868797120132196}
      // this.from = data.conversionRate;
      // GET VALUE TO BehaviorSubject
      this.routerInfo = new BehaviorSubject<number>(data.conversionRate);
      this.routerInfo.next(data.conversionRate);
      // 2 WAY BINDING refresh component
      this.to = (this.inputCurrency * this.routerInfo.value / this.routerInfo2.value);
    });
  }
  changeClient2(currencyTypeTo){
    this.currService.getCurrencyByType(currencyTypeTo).subscribe(data => {
      this.routerInfo2 = new BehaviorSubject<number>(data.conversionRate);
      this.routerInfo2.next(data.conversionRate);
      this.to = (this.inputCurrency * this.routerInfo.value / this.routerInfo2.value);
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.currService.getAllCurrency().subscribe(data => {
        this.currencies = [];
        for (let i = 0; i < data.length; i++){
          this.currencies.push(data[i]);
          this.isLoading = false;
        }
      },
      (error) => {
        console.log('Some error! ' + error);
        this.isLoading = false;
      });


    // every 5 sec

    // this.subscription = interval(5000)
    //   .pipe(
    //     flatMap(() => this.currService.getAllCurrency())
    //   )
    //   .subscribe(data => {
    //       this.currencies = [];
    //       console.log('data is: ' + JSON.stringify(data));
    //       for (let i = 0; i < data.length; i++){
    //         // console.log(data[i].requirement);
    //         this.currencies.push(data[i]);
    //       }
    //       this.isLoading = false;
    //     },
    //     (error) => {
    //       console.log('Some error! ' + error);
    //       this.isLoading = false;
    //     });
  }


  // getCurrency(type: string) {
  //   this.currService.getCurrencyByType(type).subscribe(data => {
  //     console.log('data is: ' + JSON.stringify(data));
  //   });
  // }
  ngOnDestroy(): void {
    // this.currencies = [];
    this.subscription.unsubscribe();
  }

  onOrder() {
    // console.log("Sold: " + this.from + ", ordered: " + this.to);
    this.openSnackBar(`Sold: ${this.from}, ordered: ${this.to}`);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['green-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

}
