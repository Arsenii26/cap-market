import {Inject, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StockModule {


  id: number;
  company: string;
  price: number;
  priceDiff: number;


  constructor(@Inject('id') id: number, @Inject('company') company: string, @Inject('price') price: number) {
    this.id = id;
    this.company = company;
    this.price = price;
  }
}
