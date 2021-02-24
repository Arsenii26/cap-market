import {Inject, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CurrencyModule {

  id: number;
  type: string;
  conversionRate: number;


  constructor(@Inject('id') id: number, @Inject('type') type: string, @Inject('conversionRate') conversionRate: number) {
    this.id = id;
    this.type = type;
    this.conversionRate = conversionRate;
  }
}

