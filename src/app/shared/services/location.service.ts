import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LocationService {
  public currentPosition$: Subject<GeolocationPosition> = new Subject<GeolocationPosition>;

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.showError
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showPosition(res: GeolocationPosition): GeolocationPosition {
    console.log(res);
    console.log(this.currentPosition$);
    this.currentPosition$.next(res);
    return res;
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
