import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather';
import { environment } from 'src/environments/environment.prod';

@Injectable()

export class WeatherDataService {
  _http = inject(HttpClient);

  public getCurrentWeather(lon: number, lat: number): Observable<WeatherData> {
    const url = `${environment.weatherApiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${environment.weatherApiKey}`
    return this._http.get<WeatherData>(url);
  }

  public getFutureWeather(lon: number, lat: number): Observable<WeatherData>{
    const url = `${environment.weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${environment.weatherApiKey}`
    return this._http.get<WeatherData>(url);
  }
}
