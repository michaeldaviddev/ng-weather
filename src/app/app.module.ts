import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LoadingComponent } from './loading/loading.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherIconComponent,
    WeatherCardComponent,
    ForecastComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
