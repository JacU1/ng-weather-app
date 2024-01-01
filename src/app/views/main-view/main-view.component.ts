import { Component } from '@angular/core';
import { DayBoxComponent } from './dumb-components/day-box/day-box.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [DayBoxComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

}
