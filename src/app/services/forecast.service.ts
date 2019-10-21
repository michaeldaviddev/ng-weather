import {Injectable, isDevMode} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Coords} from "../interfaces/coords";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endpoint: string = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {
    this.weather$ = this.weatherSubject.asObservable();
    this.get({
      lat: 19.427025,
      lon: -99.167665
    });
  }

  structureData(data: any) {
    data.list.forEach(weatherObject => {
      let date = new Date(weatherObject.dt * 1000);
      let hours = date.getHours();
      let month = date.getMonth();
      let day = date.getDate();
    });
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
