import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DayBoxComponent } from "../day-box/day-box.component";
import { CloudsInfo, MainWeatherInfo, WindInfo } from 'src/app/shared/models/weather';
import { Rank, Timezone } from 'src/app/shared/models/reverseLocation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-today-weather',
  standalone: true,
  imports: [SharedModule, DayBoxComponent, CommonModule],
  templateUrl: './today-weather.component.html',
  styleUrl: './today-weather.component.scss'
})
export class TodayWeatherComponent {
  @Input() location!: string;
  @Input() mainWeather!: MainWeatherInfo;
  @Input() descriptionShort!: string;
  @Input() wind!: WindInfo;
  @Input() timezone!: Timezone;
  @Input() clouds!: CloudsInfo;
  @Input() rank!: Rank;
}
