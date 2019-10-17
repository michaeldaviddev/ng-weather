import { Component } from '@angular/core';
import {CurrentWeatherService} from "./services/current-weather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'weather';

  constructor(private weatherService : CurrentWeatherService) {}

  ngOnInit(){
    this.weatherService.weather$.subscribe(console.log);
  }
}
