import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { initTE, Timepicker, Datepicker } from 'tw-elements';


@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgSelectModule, CommonModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormComponent implements OnInit {
  @Input() inputForm!: FormGroup;

  public selectedLocation!: number;
  
  public locations = [
    {id: 1, name: 'London'},
    {id: 2, name: 'Berlin'},
    {id: 3, name: 'Paris'}
  ]

  ngOnInit(): void {
    initTE({ Input, Timepicker, Datepicker });
  }

  onSelectSearch(event: any): void {
    console.log(event);
  }

  onScrollSearch(event: any): void {
    console.log(event);
  }
}
