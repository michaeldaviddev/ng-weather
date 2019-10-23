import {Injectable, isDevMode} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Coords} from "../interfaces/coords";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Weather} from "../interfaces/weather";
import {map} from "rxjs/operators";
import {GeolocationService} from "./geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endpoint: string = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient, private geolocationService: GeolocationService) {
    this.weather$ = this.weatherSubject.asObservable().pipe(map(this.structureData));
    this.geolocationService.coords$.subscribe((coords)=>{
      this.get(coords);
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

      if (!tempPerDay.cod || hours == 16) {
        let source = weatherObject.weather[0];
        tempPerDay = { ...tempPerDay, ...source};
        tempPerDay.cod = source.id;
        tempPerDay.name = data.city.name;
      }

      if (!tempPerDay.minMaxTemp.min || (weatherObject.main.temp_min < tempPerDay.minMaxTemp.min)) {
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      }
      if (!tempPerDay.minMaxTemp.max || (weatherObject.main.temp_max > tempPerDay.minMaxTemp.max)) {
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      }

      minMaxPerDay[key] = tempPerDay;
    });

    return Object.values(minMaxPerDay);
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url = this.endpoint + args;

    /*if (isDevMode()) {
      url = 'assets/forecast.json';
    }*/

    this.http.get(url).subscribe(this.weatherSubject);
  }
}
