import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class LocationService {
  public currentPosition$!: Subject<GeolocationPosition>;
  public position!: any;

  constructor() {
    this.currentPosition$ = new Subject<GeolocationPosition>();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition.bind(this),
        this.showError.bind(this)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position: GeolocationPosition): void {
    console.log(position);
    this.position = position;
    this.currentPosition$.next(position);
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
