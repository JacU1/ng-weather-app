import { Component } from '@angular/core';
import { DayBoxComponent } from './dumb-components/day-box/day-box.component';
import { InputFormComponent } from './dumb-components/input-form/input-form.component';
import { MapComponent } from './smart-components/map/map.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [DayBoxComponent, InputFormComponent, MapComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

}
