import { defaults } from './../../shared/defaults';
import { Component, inject, signal } from '@angular/core';
import { InputFormComponent } from './smart-components/input-form/input-form.component';
import { MapComponent } from './smart-components/map/map.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  switchMap,
  take,
  tap,
} from 'rxjs';
import { WeatherDataService } from 'src/app/shared/services/weather-data.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { Coord } from 'src/app/shared/models/weather';
import { LocationWeather } from 'src/app/shared/models/location';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    InputFormComponent,
    MapComponent,
    CommonModule,
    SharedModule,
    NgbAccordionModule,
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent {
  private readonly fb = inject(FormBuilder);
  private readonly weatherService = inject(WeatherDataService);
  private readonly locationService = inject(LocationService);

  public inputForm: FormGroup = this.fb.group({
    time: new FormControl(''),
    date: new FormControl(''),
  });

  newMapLocation!: Coord;
  locationData = signal<LocationWeather | null>(null);
  defaults = defaults;

  constructor() {
    this.getCurrentLocationData();
  }

  getCurrentLocationData(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setLocationData(
          position.coords.longitude,
          position.coords.latitude
        );
      }, this.showError);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  setLocationData(lon: number, lat: number): void {
    this.locationService
      .getLocationReverse(lon, lat)
      .pipe(
        take(1),
        switchMap((location) => {
          return this.weatherService
            .getCurrentWeather(location.query.lon, location.query.lat)
            .pipe(
              tap((weather) => {
                this.locationData.set({ weather, location });
              })
            );
        })
      )
      .subscribe();
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

  onSelectedLocation(value: Coord): void {
    this.setLocationData(value.lon, value.lat);
  }
}
