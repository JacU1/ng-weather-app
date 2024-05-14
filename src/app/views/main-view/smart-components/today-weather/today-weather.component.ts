import { Component, Input } from '@angular/core';
import { WeatherTypesEnum } from 'src/app/shared/models/weather';

@Component({
  selector: 'app-today-weather',
  standalone: true,
  imports: [],
  templateUrl: './today-weather.component.html',
  styleUrl: './today-weather.component.scss'
})
export class TodayWeatherComponent {
  @Input() location!: string;
  @Input() temp!: number;
  @Input() type!: WeatherTypesEnum;
  @Input() tempMin!: number;
  @Input() tempMax!: number;
}
