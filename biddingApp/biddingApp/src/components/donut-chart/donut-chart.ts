import { Component } from '@angular/core';

/**
 * Generated class for the DonutChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'donut-chart',
  templateUrl: 'donut-chart.html'
})
export class DonutChartComponent {

  text: string;

  constructor() {
    console.log('Hello DonutChartComponent Component');
    this.text = 'Hello World';
  }

}
