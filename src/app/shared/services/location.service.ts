import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { LocationRoot } from '../models/location';
import { ReverseLocation } from '../models/reverseLocation';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class LocationService {
  public currentLocation$: Subject<ReverseLocation> = new Subject<ReverseLocation>();

  constructor(private readonly _http: HttpClient) {}

  getLocation(location: string): Observable<LocationRoot> {
    return this._http.get<LocationRoot>(`${environment.locationApiUrl}/autocomplete?text=${location}&apiKey=${environment.locationApiKey}`)
  }
  getLocationReverse(lon: number, lat: number): Observable<ReverseLocation> {
    return this._http.get<ReverseLocation>(`${environment.locationApiUrl}/reverse?lat=${lat}&lon=${lon}&apiKey=${environment.locationApiKey}`)
  }
}
