import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocationRoot } from '../models/location';

@Injectable()
export class LocationService {
  public currentLocation$: Subject<GeolocationPosition> = new Subject<GeolocationPosition>();

  constructor(private readonly _http: HttpClient) {
    this.getCurrentLocation();
   }

  getLocation(location: string): Observable<LocationRoot> {
    return this._http.get<LocationRoot>(`${environment.autocompleteAPIUrl}${location}&apiKey=${environment.autocompleteAPIKey}`)
  }
  // https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=aee5d9b00ea24a06bfef416ecc28f8b2
  getLocationReverse(): Observable<any> {
    return this._http.get<LocationRoot>(`${environment.autocompleteAPIUrl}${location}&apiKey=${environment.autocompleteAPIKey}`)
  }

  getCurrentLocation() { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((values) => {
        console.log(values);
        this.currentLocation$.next(values);
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
