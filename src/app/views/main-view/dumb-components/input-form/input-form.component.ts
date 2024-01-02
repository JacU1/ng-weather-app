import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Input, initTE, Timepicker, Datepicker } from 'tw-elements';


@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormComponent implements OnInit {
  ngOnInit(): void {
    initTE({ Input, Timepicker, Datepicker });
  }
}
