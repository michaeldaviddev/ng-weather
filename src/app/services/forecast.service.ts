import {Injectable, isDevMode} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Coords} from "../interfaces/coords";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Weather} from "../interfaces/weather";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endpoint: string = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {
    this.weather$ = this.weatherSubject.asObservable().pipe(map(this.structureData));
    this.get({
      lat: 19.427025,
      lon: -99.167665
    });
  }

  structureData(data: any) {
    let minMaxPerDay = {};
    data.list.forEach(weatherObject => {
      let date = new Date(weatherObject.dt * 1000);
      let hours = date.getHours();
      let month = date.getMonth();
      let day = date.getDate();
      let key = `${month}-${day}`;

      let tempPerDay: Weather = minMaxPerDay[key] || {
        minMaxTemp: {}
      };

      if (!tempPerDay.minMaxTemp.min || (weatherObject.main.temp_min < tempPerDay.minMaxTemp.min)) {
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      }
      if (!tempPerDay.minMaxTemp.max || (weatherObject.main.temp_max > tempPerDay.minMaxTemp.max)) {
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      }

      minMaxPerDay[key] = tempPerDay;
    });

    return minMaxPerDay;
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url = this.endpoint + args;

    if (isDevMode()) {
      url = 'assets/forecast.json';
    }

    this.http.get(url).subscribe(this.weatherSubject);
  }
}
