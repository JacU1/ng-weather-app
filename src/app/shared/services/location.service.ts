import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

  constructor() { }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(res: GeolocationPosition): GeolocationCoordinates {
    console.log(res);
    return res.coords;
  }

  showError(error: any) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
}
