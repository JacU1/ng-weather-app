import { Component } from '@angular/core';
import { DayBoxComponent } from './dumb-components/day-box/day-box.component';
import { InputFormComponent } from './dumb-components/input-form/input-form.component';
import { MapComponent } from './dumb-components/map/map.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [DayBoxComponent, InputFormComponent, MapComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  inputForm: FormGroup;

  constructor(private readonly _fb: FormBuilder){
    
    this.inputForm = this._fb.group({
      location: new FormControl<string>(''),
      time: new FormControl(''),
      date: new FormControl('')
    });
  
    this.inputForm.valueChanges.subscribe(res => console.log(this.inputForm));
  }

}
