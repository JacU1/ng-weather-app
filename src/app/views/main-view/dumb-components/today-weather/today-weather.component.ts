import { Component, Input } from '@angular/core';
import { WeatherTypesEnum } from 'src/app/shared/models/weather';
import { SharedModule } from 'src/app/shared/shared.module';
import { DayBoxComponent } from "../day-box/day-box.component";

@Component({
  selector: 'app-today-weather',
  standalone: true,
  imports: [SharedModule, DayBoxComponent],
  templateUrl: './today-weather.component.html',
  styleUrl: './today-weather.component.scss'
})
export class TodayWeatherComponent {
  @Input() location!: string;
  @Input() temp!: number;
  @Input() description!: WeatherTypesEnum | string;
  @Input() tempMin!: number;
  @Input() tempMax!: number;
}
