import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Coords} from "../interfaces/coords";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Weather} from "../interfaces/weather";

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endpoint: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {
    this.weather$ = this.weatherSubject.asObservable().pipe(
      map((data: any)=>{
        let mainWeather = data.weather[0];

        let weather: Weather = {
          name: data.name,
          cod: data.cod,
          temp: data.main.temp,
          ...mainWeather
        };
        return weather;
      })
    );

    this.get({
      lat: 19.427025,
      lon: -99.167665
    });
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}`;
    let url = this.endpoint + args;

    if(isDevMode()) {
      url = 'assets/weather.json';
    }

    this.http.get(url).subscribe(this.weatherSubject);
  }
}
