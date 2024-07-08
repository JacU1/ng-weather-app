import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocationRoot } from '../models/location';
import { config } from '../config';
import { ReverseLocation } from '../models/reverseLocation';

@Injectable()
export class LocationService {
  public currentLocation$: Subject<ReverseLocation> = new Subject<ReverseLocation>();

  constructor(private readonly _http: HttpClient) {
    this.getCurrentLocation();
   }

  getLocation(location: string): Observable<LocationRoot> {
    return this._http.get<LocationRoot>(`${config.locationApiUrl}/autocomplete?text=${location}&apiKey=${environment.locationApiKey}`)
  }
  getLocationReverse(lat: number, lon: number): Observable<ReverseLocation> {
    return this._http.get<ReverseLocation>(`${config.locationApiUrl}/reverse?lat=${lat}&lon=${lon}&apiKey=${environment.locationApiKey}`)
  }

  getCurrentLocation() { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((values) => {
        console.log(values);
        this.getLocationReverse(values.coords.latitude, values.coords.longitude).subscribe(res => {
          console.log(res);
          this.currentLocation$.next(res);
        });
      }, this.showError);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.');
        break;
    }
  }
}
