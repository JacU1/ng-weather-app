import { Component, OnDestroy, OnInit } from '@angular/core';
import { DayBoxComponent } from './dumb-components/day-box/day-box.component';
import { InputFormComponent } from './smart-components/input-form/input-form.component';
import { MapComponent } from './smart-components/map/map.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable, Subscription, map, mergeMap, switchMap, take, tap } from 'rxjs';
import { WeatherDataService } from 'src/app/shared/services/weather-data.service';
import { FutureWaetherComponent } from './dumb-components/future-waether/future-waether.component';
import { TodayWeatherComponent } from './dumb-components/today-weather/today-weather.component';
import { LocationService } from 'src/app/shared/services/location.service';
import { Coord } from 'src/app/shared/models/weather';
import { LocationWeather } from 'src/app/shared/models/location';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    DayBoxComponent,
    InputFormComponent,
    MapComponent,
    CommonModule,
    SharedModule,
    FutureWaetherComponent,
    TodayWeatherComponent,
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnDestroy {
  public inputForm: FormGroup;
  public newMapLocation!: Coord;
  public locationData$?: Observable<LocationWeather>;

  private sub: Subscription = new Subscription();

  constructor(
    private readonly _fb: FormBuilder,
    private readonly weatherService: WeatherDataService,
    private readonly locationService: LocationService
  ) {
    this.inputForm = this._fb.group({
      time: new FormControl(''),
      date: new FormControl(''),
    });

    this.getCurrentLocationData();
  }

  getCurrentLocationData(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setLocationData(
          position.coords.latitude,
          position.coords.longitude
        );
      }, this.showError);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  setLocationData(lat: number, lon: number): void {
    this.locationData$ = this.locationService.getLocationReverse(lat, lon).pipe(
      take(1),
      mergeMap((location) => {
        return this.weatherService
          .getCurrentWeather(location.query.lat, location.query.lon)
          .pipe(
            map((weather) => {
              return {location, weather}
            }),
          );
      })
    );
  }

  showError(error: any): void {
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelectedLocation(value: Coord): void {
    this.setLocationData(value.lat, value.lon);
  }
}
