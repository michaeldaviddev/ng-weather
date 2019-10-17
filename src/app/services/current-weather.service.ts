import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Coords} from "../interfaces/coords";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any> = this.weatherSubject.asObservable();

  endpoint: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {
    this.get({
      lat: 35,
      lon: 139
    });
  }

  get(coords: Coords) {
    //let observable = this.http.get('assets/weather.json').subscribe(this.weatherSubject);
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}`;
    let observable = this.http.get(this.endpoint+args).subscribe(this.weatherSubject);
  }
}
