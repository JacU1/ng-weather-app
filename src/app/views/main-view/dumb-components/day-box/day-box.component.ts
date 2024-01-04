import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { initTE, Ripple } from 'tw-elements';

@Component({
  selector: 'app-day-box',
  standalone: true,
  imports: [],
  templateUrl: './day-box.component.html',
  styleUrl: './day-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayBoxComponent implements OnInit {
  ngOnInit(): void {
    initTE({ Ripple });
  }
}

