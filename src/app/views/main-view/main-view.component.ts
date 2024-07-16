import { Component, OnDestroy, OnInit } from '@angular/core';
import { DayBoxComponent } from './dumb-components/day-box/day-box.component';
import { InputFormComponent } from './smart-components/input-form/input-form.component';
import { MapComponent } from './smart-components/map/map.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable, Subscription, map, switchMap, take } from 'rxjs';
import { LocationProperties } from 'src/app/shared/models/location';
import { WeatherDataService } from 'src/app/shared/services/weather-data.service';
import { FutureWaetherComponent } from './dumb-components/future-waether/future-waether.component';
import { TodayWeatherComponent } from './dumb-components/today-weather/today-weather.component';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [DayBoxComponent, InputFormComponent, MapComponent, CommonModule, SharedModule, FutureWaetherComponent, TodayWeatherComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent implements OnDestroy {
  public inputForm: FormGroup;
  public newMapLocation!: LocationProperties;
  public currentLocationData$!: Observable<any>;

  private sub: Subscription = new Subscription();

  constructor(private readonly _fb: FormBuilder, 
    private readonly weatherService: WeatherDataService,
    readonly locationService: LocationService){
      this.inputForm = this._fb.group({
      time: new FormControl(''),
      date: new FormControl('')
    });

    this.getCurrentLocationData();
  }

  getCurrentLocationData() { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((values) => {

        this.currentLocationData$ = this.locationService.getLocationReverse(values.coords.latitude, values.coords.longitude).pipe(switchMap(location => {
          return this.weatherService.getCurrentWeather(location.query.lat, location.query.lon)
        })) 

        this.locationService.getLocationReverse(values.coords.latitude, values.coords.longitude).subscribe(res => {
          this.locationService.currentLocation$.next(res);
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelectedLocation(event: LocationProperties | null): void {
    this.newMapLocation = event!;
    this.sub.add(
      this.weatherService.getCurrentWeather(event!.lat, event!.lon).subscribe(res => console.log(res))
    );
  }
}
