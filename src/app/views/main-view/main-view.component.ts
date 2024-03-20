import { Component } from '@angular/core';
import { DayBoxComponent } from './dumb-components/day-box/day-box.component';
import { InputFormComponent } from './dumb-components/input-form/input-form.component';
import { MapComponent } from './dumb-components/map/map.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationService } from 'src/app/shared/services/location.service';
import { Observable } from 'rxjs';

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

  constructor(private readonly _fb: FormBuilder, private readonly _locationService: LocationService){
    
    this.inputForm = this._fb.group({
      location: new FormControl<string>(''),
      time: new FormControl(''),
      date: new FormControl('')
    });
  
    this.inputForm.valueChanges.subscribe(res => console.log(this.inputForm));
    console.log('main view');
    this._locationService.currentPosition$.subscribe(res => {
      console.log(res);
    });
  }

}
