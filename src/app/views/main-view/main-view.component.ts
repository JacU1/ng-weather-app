import { Component } from '@angular/core';
import { DayBoxComponent } from './dumb-components/day-box/day-box.component';
import { InputFormComponent } from './smart-components/input-form/input-form.component';
import { MapComponent } from './dumb-components/map/map.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable } from 'rxjs';
import { LocationProperties } from 'src/app/shared/models/location';
import { WeatherDataService } from 'src/app/shared/services/weather-data.service';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [DayBoxComponent, InputFormComponent, MapComponent ,CommonModule, SharedModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  public inputForm: FormGroup;
  public currentLocation$!: Observable<GeolocationPosition>;
  public newMapLocation!: LocationProperties;
  public weatherData$: Observable<any>;

  constructor(private readonly _fb: FormBuilder, private readonly weatherService: WeatherDataService){
    
    this.inputForm = this._fb.group({
      time: new FormControl(''),
      date: new FormControl('')
    });
  }

  onSelectedLocation(event: LocationProperties | null): void {
    this.newMapLocation = event!;
    this.weatherService.getCurrentWeather(event!.lat, event!.lon).subscribe(res => console.log(res))
  }
}
