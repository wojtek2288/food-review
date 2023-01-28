import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsMainComponent } from './statistics-main/statistics-main.component';
import { MainModule } from '../main/main.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    StatisticsMainComponent
  ],
  imports: [
    CommonModule,
    MainModule,
    NgxChartsModule
  ]
})
export class StatisticsModule { }
