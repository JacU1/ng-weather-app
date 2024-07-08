import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { WeatherData } from '../models/weather';
import { config } from '../config';

@Injectable()

export class WeatherDataService {
  constructor(private readonly _http: HttpClient) { }

  public getCurrentWeather(lat: number, lon: number): Observable<WeatherData> {
    const url = `${config.weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}`
    return this._http.get<any>(url);
  }

  public getHistoryWeather(lat: string, lon: string, time: string): Observable<any>{
    const url = `${config.weatherApiUrl}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&units=metric&appid=${environment.weatherApiKey}`
    return this._http.get<any>(url);
  }

  public getFutureWeather(lat: string, lon: string): Observable<any>{
    const url = `${config.weatherApiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${environment.weatherApiKey}`
    return this._http.get<any>(url);
  }
}
