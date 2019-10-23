import { Component, OnInit } from '@angular/core';
import {ForecastService} from "../services/forecast.service";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(public forecastService: ForecastService) { }

  ngOnInit() {
  }

}
