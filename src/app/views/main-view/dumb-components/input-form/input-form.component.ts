import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { initTE, Timepicker, Datepicker } from 'tw-elements';


@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormComponent implements OnInit {
  @Input() inputForm!: FormGroup;

  ngOnInit(): void {
    initTE({ Input, Timepicker, Datepicker });
  }
}
